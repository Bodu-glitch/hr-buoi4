import { createHash, createHmac, randomBytes, randomUUID, scrypt as scryptCb, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';
import { loi } from './nghiep_vu.mjs';

const scrypt = promisify(scryptCb);
export const roles = ['ADMIN', 'HR', 'TBP', 'GD', 'QL', 'IT', 'HC', 'PV', 'GDNS', 'AIM'];
const view = u => ({ id: u.id, name: u.name, login: u.login, roles: u.roles, active: u.active });

function hash(v) {
  return createHash('sha256').update(JSON.stringify(v)).digest('hex');
}

function normalizeUrl(url) {
  return String(url || '').trim().replace(/\/+$/, '');
}

function getHeaders(supabaseKey) {
  return {
    'apikey': supabaseKey,
    'Authorization': `Bearer ${supabaseKey}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
  };
}

export async function kiemTraKetNoiSupabase({ supabaseUrl, supabaseKey }) {
  const base = normalizeUrl(supabaseUrl);
  if (!base || !supabaseKey) {
    return { ok: false, message: 'Chưa cung cấp SUPABASE_URL hoặc SUPABASE_KEY.' };
  }
  try {
    const res = await fetch(`${base}/rest/v1/hr_users?select=count`, {
      method: 'GET',
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Range-Unit': 'items',
        'Range': '0-0'
      }
    });
    if (!res.ok) {
      const txt = await res.text();
      return { ok: false, status: res.status, message: `Lỗi kết nối Supabase (${res.status}): ${txt}` };
    }
    return { ok: true, message: 'Kết nối Supabase thành công.' };
  } catch (e) {
    return { ok: false, message: `Không thể kết nối đến Supabase: ${e.message}` };
  }
}

/**
 * Kho dữ liệu Supabase thay thế taoKho() trên đĩa local
 */
export function taoKhoSupabase({ supabaseUrl, supabaseKey, tableName = 'hr_workspace_versions' }) {
  const base = normalizeUrl(supabaseUrl);
  const headers = getHeaders(supabaseKey);
  let writing = false;

  return {
    isSupabase: true,
    supabaseUrl: base,
    tableName,

    async list() {
      const res = await fetch(`${base}/rest/v1/${tableName}?select=id,version,body,created_at&order=version.desc`, {
        method: 'GET',
        headers
      });
      if (!res.ok) {
        throw new Error(`SUPABASE_LIST_ERROR: ${await res.text()}`);
      }
      const all = await res.json();
      // Gom nhóm theo id, lấy bản mới nhất
      const byId = new Map();
      for (const row of all) {
        if (!byId.has(row.id)) {
          byId.set(row.id, row);
        }
      }
      const rows = [];
      for (const [id, row] of byId.entries()) {
        const item = row.body;
        rows.push({
          id,
          version: row.version,
          updatedAt: row.created_at,
          name: item?.input?.hoTen || 'Quy trình tuyển dụng',
          uv: item?.input?.maUV || 'workspace',
          status: item?.status || 'HOAT_DONG'
        });
      }
      return rows.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
    },

    async latest(id) {
      if (!/^[0-9a-f-]{36}$/.test(id)) throw new Error('BAD_ID');
      const res = await fetch(`${base}/rest/v1/${tableName}?id=eq.${id}&order=version.desc&limit=1`, {
        method: 'GET',
        headers
      });
      if (!res.ok) {
        throw new Error(`SUPABASE_LATEST_ERROR: ${await res.text()}`);
      }
      const rows = await res.json();
      if (!rows.length) return null;
      const row = rows[0];
      return {
        id: row.id,
        ...row.body,
        version: row.version,
        createdAt: row.created_at,
        checksum: row.checksum
      };
    },

    async versions(id) {
      if (!/^[0-9a-f-]{36}$/.test(id)) throw new Error('BAD_ID');
      const res = await fetch(`${base}/rest/v1/${tableName}?id=eq.${id}&order=version.asc`, {
        method: 'GET',
        headers
      });
      if (!res.ok) {
        throw new Error(`SUPABASE_VERSIONS_ERROR: ${await res.text()}`);
      }
      const rows = await res.json();
      return rows.map(row => ({
        id: row.id,
        ...row.body,
        version: row.version,
        createdAt: row.created_at,
        checksum: row.checksum
      }));
    },

    async save(record, expected = 0) {
      if (writing) {
        throw Object.assign(new Error('BUSY'), {
          status: 409,
          publicMessage: 'Đang lưu hồ sơ khác; thử lại sau.'
        });
      }
      writing = true;
      try {
        const id = record.id || randomUUID();
        const last = await this.latest(id);
        const count = last?.version || 0;
        if (count !== expected) {
          throw Object.assign(new Error('CONFLICT'), {
            status: 409,
            publicMessage: 'Hồ sơ đã có phiên bản mới. Mở lại trước khi lưu để không đè bản khác.'
          });
        }

        const nextVersion = count + 1;
        const now = new Date().toISOString();
        const { checksum: _discard, ...rawBody } = record;
        const valueToHash = {
          ...rawBody,
          id,
          version: nextVersion,
          createdAt: now
        };
        const computedChecksum = hash(valueToHash);

        const payload = {
          id,
          version: nextVersion,
          body: rawBody,
          checksum: computedChecksum,
          created_at: now
        };

        const res = await fetch(`${base}/rest/v1/${tableName}`, {
          method: 'POST',
          headers,
          body: JSON.stringify(payload)
        });

        if (!res.ok) {
          const errText = await res.text();
          throw Object.assign(new Error('SUPABASE_SAVE_FAILED'), {
            status: 500,
            publicMessage: `Không lưu được dữ liệu lên Supabase: ${errText}`
          });
        }

        return {
          ...valueToHash,
          checksum: computedChecksum
        };
      } finally {
        writing = false;
      }
    }
  };
}

/**
 * Quản lý xác thực và danh tính qua Supabase thay thế file tai_khoan.json
 */
export function authSupabase({ supabaseUrl, supabaseKey, tableName = 'hr_users', cookieName = 'hr_auth' }) {
  const base = normalizeUrl(supabaseUrl);
  const headers = getHeaders(supabaseKey);
  const cookiePattern = new RegExp('(?:^|;\\s*)' + cookieName + '=([^;]+)(?:;|$)');
  const sessions = new Map();
  const attempts = new Map();
  let writing = false;

  function signToken(userId, expires) {
    const payload = `${userId}:${expires}`;
    const hmac = createHmac('sha256', supabaseKey).update(payload).digest('hex');
    return `${payload}:${hmac}`;
  }

  function verifyToken(token) {
    if (!token || typeof token !== 'string') return null;
    const parts = token.split(':');
    if (parts.length === 3) {
      const [userId, expStr, sig] = parts;
      const exp = Number(expStr);
      if (!Number.isFinite(exp) || exp < Date.now()) return null;
      const expected = createHmac('sha256', supabaseKey).update(`${userId}:${expStr}`).digest('hex');
      try {
        if (timingSafeEqual(Buffer.from(sig, 'hex'), Buffer.from(expected, 'hex'))) {
          return { id: userId, expires: exp };
        }
      } catch {}
      return null;
    }
    const s = sessions.get(token);
    if (s && s.expires > Date.now()) return s;
    return null;
  }

  async function read() {
    const res = await fetch(`${base}/rest/v1/${tableName}?select=*&order=created_at.asc`, {
      method: 'GET',
      headers
    });
    if (!res.ok) {
      throw new Error(`SUPABASE_USERS_READ_ERROR: ${await res.text()}`);
    }
    const rows = await res.json();
    return rows.map(r => ({
      id: r.id,
      login: r.login,
      name: r.name,
      roles: Array.isArray(r.roles) ? r.roles : (typeof r.roles === 'string' ? JSON.parse(r.roles) : []),
      salt: r.salt,
      hash: r.hash,
      active: r.active,
      audit: Array.isArray(r.audit) ? r.audit : (typeof r.audit === 'string' ? JSON.parse(r.audit) : [])
    }));
  }

  async function saveUser(user) {
    const res = await fetch(`${base}/rest/v1/${tableName}`, {
      method: 'POST',
      headers: {
        ...headers,
        'Prefer': 'resolution=merge-duplicates,return=representation'
      },
      body: JSON.stringify(user)
    });
    if (!res.ok) {
      throw new Error(`SUPABASE_SAVE_USER_ERROR: ${await res.text()}`);
    }
  }

  async function create(data, user) {
    if (writing) throw loi(409, 'Đang cập nhật tài khoản.');
    writing = true;
    try {
      const users = await read();
      if (users.length && !user?.roles.includes('ADMIN')) {
        throw loi(403, 'Chỉ quản trị viên tạo tài khoản.');
      }
      const login = String(data.login || '').trim().toLowerCase();
      const name = String(data.name || '').trim();
      if (!/^[a-z0-9._-]{3,40}$/.test(login) || !name || name.length > 120) {
        throw loi(400, 'Tên đăng nhập 3–40 ký tự không dấu; cần họ tên.');
      }
      if (typeof data.password !== 'string' || data.password.length < 12 || data.password.length > 200) {
        throw loi(400, 'Mật khẩu cần 12–200 ký tự.');
      }
      if (users.some(u => u.login === login)) {
        throw loi(409, 'Tên đăng nhập đã tồn tại.');
      }
      const rs = users.length ? data.roles : ['ADMIN', 'HR'];
      if (!Array.isArray(rs) || !rs.length || rs.some(r => !roles.includes(r))) {
        throw loi(400, 'Vai trò chưa hợp lệ.');
      }
      const salt = randomBytes(16).toString('hex');
      const hashVal = (await scrypt(data.password, salt, 64)).toString('hex');
      const next = {
        id: randomUUID(),
        login,
        name,
        roles: [...new Set(rs)],
        salt,
        hash: hashVal,
        active: true,
        audit: [{ action: 'CREATE', by: user?.name || 'Thiết lập đầu tiên', at: new Date().toISOString() }]
      };
      await saveUser(next);
      return view(next);
    } finally {
      writing = false;
    }
  }

  return {
    async update(data, user) {
      if (!user?.roles.includes('ADMIN')) throw loi(403, 'Chỉ quản trị viên sửa vai/tạm khóa.');
      if (writing) throw loi(409, 'Đang cập nhật tài khoản.');
      writing = true;
      try {
        const users = await read();
        const found = users.find(x => x.id === data.id);
        if (!found) throw loi(404, 'Không có tài khoản.');
        if (!Array.isArray(data.roles) || !data.roles.length || data.roles.some(r => !roles.includes(r)) || typeof data.active !== 'boolean') {
          throw loi(400, 'Vai hoặc trạng thái chưa hợp lệ.');
        }
        const next = { ...found, roles: [...new Set(data.roles)], active: data.active };
        if (!users.some(x => x.id !== next.id && x.active && x.roles.includes('ADMIN')) && (!next.active || !next.roles.includes('ADMIN'))) {
          throw loi(409, 'Không thể khóa hoặc bỏ vai quản trị cuối cùng.');
        }
        next.audit = [...(found.audit || []), { action: 'UPDATE_ACCESS', by: user.name, at: new Date().toISOString() }];
        await saveUser(next);
        for (const [k, v] of sessions) if (v.id === next.id) sessions.delete(k);
        return view(next);
      } finally {
        writing = false;
      }
    },

    async directory() {
      return (await read()).filter(u => u.active).map(view);
    },

    async ready() {
      return (await read()).length > 0;
    },

    create,

    async users(user) {
      if (!user.roles.includes('ADMIN')) throw loi(403, 'Chỉ quản trị viên xem tài khoản.');
      return (await read()).map(view);
    },

    async login(data) {
      const name = String(data.login || '').toLowerCase().trim();
      if (name.length > 40 || typeof data.password !== 'string' || data.password.length > 200) {
        throw loi(400, 'Thông tin đăng nhập chưa hợp lệ.');
      }
      const past = attempts.get(name);
      if (past && past.count >= 5 && past.until > Date.now()) {
        throw loi(429, 'Đăng nhập sai nhiều lần; chờ 5 phút.');
      }
      const users = await read();
      const u = users.find(x => x.login === name && x.active);
      const hashVal = await scrypt(data.password, u?.salt || 'nonexistent', 64);
      if (!u || !timingSafeEqual(hashVal, Buffer.from(u.hash, 'hex'))) {
        attempts.set(name, { count: (past?.until > Date.now() ? past.count : 0) + 1, until: Date.now() + 300000 });
        throw loi(401, 'Tên đăng nhập hoặc mật khẩu không đúng.');
      }
      attempts.delete(name);
      const exp = Date.now() + 8 * 3600000;
      const token = signToken(u.id, exp);
      sessions.set(token, { id: u.id, expires: exp });
      for (const [k, v] of sessions) if (v.expires < Date.now()) sessions.delete(k);
      return { token, user: view(u) };
    },

    async switchUser(userId) {
      const users = await read();
      const u = users.find(x => x.id === userId && x.active);
      if (!u) throw loi(404, 'Không có tài khoản.');
      const exp = Date.now() + 8 * 3600000;
      const token = signToken(u.id, exp);
      sessions.set(token, { id: u.id, expires: exp });
      for (const [k, v] of sessions) if (v.expires < Date.now()) sessions.delete(k);
      return { token, user: view(u) };
    },

    async user(req) {
      const rawCookie = typeof req?.headers?.get === 'function' ? req.headers.get('cookie') : (req?.headers?.cookie || '');
      const token = rawCookie?.match(cookiePattern)?.[1];
      const session = verifyToken(token);
      if (!session) return null;
      const users = await read();
      const u = users.find(x => x.id === session.id && x.active);
      return u ? view(u) : null;
    },

    logout(req) {
      const rawCookie = typeof req?.headers?.get === 'function' ? req.headers.get('cookie') : (req?.headers?.cookie || '');
      const token = rawCookie?.match(cookiePattern)?.[1];
      if (token) sessions.delete(token);
    }
  };
}

/**
 * Script di chuyển toàn bộ dữ liệu hiện tại từ local sang Supabase
 */
export async function chuyenDuLieuLocalSangSupabase({ supabaseUrl, supabaseKey, localDataDir }) {
  const base = normalizeUrl(supabaseUrl);
  const headers = getHeaders(supabaseKey);

  console.log('--- Bắt đầu chuyển đổi dữ liệu sang Supabase ---');
  // 1. Chuyển tài khoản
  const userFile = resolve(localDataDir, 'tai_khoan.json');
  console.log(`Đọc tài khoản từ: ${userFile}`);
  const usersRaw = JSON.parse(await readFile(userFile, 'utf8'));
  console.log(`Tìm thấy ${usersRaw.length} tài khoản.`);

  for (const u of usersRaw) {
    const res = await fetch(`${base}/rest/v1/hr_users`, {
      method: 'POST',
      headers: { ...headers, 'Prefer': 'resolution=merge-duplicates' },
      body: JSON.stringify({
        id: u.id,
        login: u.login,
        name: u.name,
        roles: u.roles,
        salt: u.salt,
        hash: u.hash,
        active: u.active,
        audit: u.audit || []
      })
    });
    if (!res.ok) {
      throw new Error(`Lỗi nạp user ${u.login}: ${await res.text()}`);
    }
    console.log(` -> Đã nạp tài khoản: ${u.login} (${u.name})`);
  }

  // 2. Chuyển các phiên bản quy trình (workspace)
  const workspaceFolder = resolve(localDataDir, 'workspace', '00000000-0000-4000-8000-000000000001');
  console.log(`Đọc workspace từ: ${workspaceFolder}`);
  const files = (await readdir(workspaceFolder)).filter(n => /^\d{6}\.json$/.test(n)).sort();
  console.log(`Tìm thấy ${files.length} phiên bản workspace.`);

  for (const f of files) {
    const val = JSON.parse(await readFile(resolve(workspaceFolder, f), 'utf8'));
    const { checksum, id, version, createdAt, ...body } = val;
    const res = await fetch(`${base}/rest/v1/hr_workspace_versions`, {
      method: 'POST',
      headers: { ...headers, 'Prefer': 'resolution=merge-duplicates' },
      body: JSON.stringify({
        id: id || '00000000-0000-4000-8000-000000000001',
        version,
        body,
        checksum,
        created_at: createdAt || new Date().toISOString()
      })
    });
    if (!res.ok) {
      throw new Error(`Lỗi nạp version ${version} (${f}): ${await res.text()}`);
    }
    console.log(` -> Đã nạp workspace version: ${version} (Jobs: ${body.jobs?.length || 0}, Ứng viên: ${body.candidates?.length || 0})`);
  }

  console.log('✅ Hoàn tất chuyển dữ liệu sang Supabase thành công!');
  return { usersCount: usersRaw.length, versionsCount: files.length };
}

import assert from 'node:assert';
import { createHash, randomBytes, randomUUID, scrypt as scryptCb } from 'node:crypto';
import { promisify } from 'node:util';
import { taoKhoSupabase, authSupabase } from './src/app/supabase_du_lieu.mjs';

const scrypt = promisify(scryptCb);

console.log('Testing Supabase storage & auth logic with mocked fetch...');

// In-memory Supabase Mock database
const db = {
  hr_users: [],
  hr_workspace_versions: []
};

// Mock global fetch to simulate Supabase PostgREST
global.fetch = async (url, options = {}) => {
  const parsed = new URL(url);
  const method = options.method || 'GET';
  const table = parsed.pathname.split('/').pop();

  if (table === 'hr_users') {
    if (method === 'GET') {
      return {
        ok: true,
        json: async () => structuredClone(db.hr_users),
        text: async () => JSON.stringify(db.hr_users)
      };
    }
    if (method === 'POST') {
      const body = JSON.parse(options.body);
      const existingIdx = db.hr_users.findIndex(u => u.id === body.id || u.login === body.login);
      if (existingIdx >= 0) {
        db.hr_users[existingIdx] = { ...db.hr_users[existingIdx], ...body };
      } else {
        db.hr_users.push(body);
      }
      return {
        ok: true,
        json: async () => [body],
        text: async () => JSON.stringify([body])
      };
    }
  }

  if (table === 'hr_workspace_versions') {
    if (method === 'GET') {
      let filtered = [...db.hr_workspace_versions];
      const idMatch = parsed.searchParams.get('id');
      if (idMatch && idMatch.startsWith('eq.')) {
        const id = idMatch.slice(3);
        filtered = filtered.filter(row => row.id === id);
      }
      const order = parsed.searchParams.get('order');
      if (order?.includes('version.desc')) {
        filtered.sort((a, b) => b.version - a.version);
      } else if (order?.includes('version.asc')) {
        filtered.sort((a, b) => a.version - b.version);
      }
      const limit = parsed.searchParams.get('limit');
      if (limit) {
        filtered = filtered.slice(0, Number(limit));
      }
      return {
        ok: true,
        json: async () => structuredClone(filtered),
        text: async () => JSON.stringify(filtered)
      };
    }
    if (method === 'POST') {
      const row = JSON.parse(options.body);
      db.hr_workspace_versions.push(row);
      return {
        ok: true,
        json: async () => [row],
        text: async () => JSON.stringify([row])
      };
    }
  }

  return { ok: false, status: 404, text: async () => 'Not found' };
};

// 1. Test Auth Supabase
const auth = authSupabase({
  supabaseUrl: 'https://test.supabase.co',
  supabaseKey: 'test-key',
  cookieName: 'hr_auth'
});

assert.strictEqual(await auth.ready(), false);

// Create admin
const admin = await auth.create({
  login: 'admin',
  name: 'Quản trị viên',
  password: 'Password@123456',
  roles: ['ADMIN']
});
assert.strictEqual(admin.login, 'admin');
assert.strictEqual(await auth.ready(), true);

// Login
const { token, user: loggedAdmin } = await auth.login({ login: 'admin', password: 'Password@123456' });
assert.strictEqual(loggedAdmin.name, 'Quản trị viên');
assert.ok(token);

// Create user as admin
const hrUser = await auth.create({
  login: 'hr01',
  name: 'Trang Trần HR',
  password: 'Password@123456',
  roles: ['HR']
}, loggedAdmin);
assert.strictEqual(hrUser.login, 'hr01');

// Directory
const directory = await auth.directory();
assert.strictEqual(directory.length, 2);

console.log('✅ Auth Supabase test passed!');

// 2. Test Store Supabase
const store = taoKhoSupabase({
  supabaseUrl: 'https://test.supabase.co',
  supabaseKey: 'test-key'
});

const initialWorkspace = {
  id: '00000000-0000-4000-8000-000000000001',
  input: { hoTen: 'Quy trình tuyển dụng', maUV: 'workspace' },
  jobs: [],
  candidates: [],
  settings: {},
  events: []
};

// Save v1
const savedV1 = await store.save(initialWorkspace, 0);
assert.strictEqual(savedV1.version, 1);
assert.ok(savedV1.checksum);

// Read latest
const latest = await store.latest('00000000-0000-4000-8000-000000000001');
assert.strictEqual(latest.version, 1);
assert.strictEqual(latest.input.hoTen, 'Quy trình tuyển dụng');

// Save v2
latest.jobs.push({ id: 'job-1', code: 'YC-2026-001' });
const savedV2 = await store.save(latest, 1);
assert.strictEqual(savedV2.version, 2);
assert.strictEqual(savedV2.jobs.length, 1);

// Test optimistic lock conflict
let threwConflict = false;
try {
  await store.save(latest, 1); // expected 1 but current is 2
} catch (e) {
  threwConflict = true;
  assert.strictEqual(e.status, 409);
}
assert.strictEqual(threwConflict, true, 'Should throw 409 on version mismatch');

// Test versions list
const versions = await store.versions('00000000-0000-4000-8000-000000000001');
assert.strictEqual(versions.length, 2);
assert.strictEqual(versions[0].version, 1);
assert.strictEqual(versions[1].version, 2);

console.log('✅ Store Supabase test passed!');
console.log('🎉 Tất cả kiểm tra logic Supabase ĐẠT 100%!');

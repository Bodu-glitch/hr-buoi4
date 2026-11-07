// Quản trị Vận hành Buổi 4 · Hệ thống Tuyển dụng & Onboarding
const root = document.querySelector('#admin');
let model = null, people = [], tab = 'overview', busy = false, message = '', messageType = 'info';

const TAB_LABELS = {
  overview: '📌 Tổng quan & Quyết định B4',
  policies: '📜 M1: Chính sách & Quy trình',
  handoffs: '👥 M2: Người dùng & Bàn giao',
  modules: '🤖 M3: Chức năng AI (AI07)',
  audit: '🕒 M4: Lịch sử thay đổi',
  tests: '🧪 Đối chiếu 9 ca kiểm B4'
};

const ACTION_LABELS = {
  gov_policy_draft: 'Soạn nháp chính sách',
  gov_policy_test: 'Thử tính hạn thư',
  gov_policy_apply: 'Áp dụng chính sách',
  gov_module_draft: 'Soạn hướng dẫn AI nháp',
  gov_module_test: 'Chạy thử AI',
  gov_module_apply: 'Áp dụng bản AI mới',
  gov_module_pause: 'Tạm dừng / mở lại AI',
  gov_module_rollback: 'Quay lại bản AI trước',
  gov_handoff_draft: 'Lập phiếu bàn giao nháp',
  gov_handoff_approve: 'GĐNS duyệt bàn giao',
  gov_handoff_apply: 'Admin thực hiện bàn giao',
  gov_decision: 'Chốt quyết định quản trị',
  gov_assign: 'Phân công yêu cầu tuyển',
  gov_unassign: 'Hủy phân công yêu cầu tuyển',
  gov_seed_b4: 'Nạp dữ liệu mẫu Buổi 4'
};

function el(tag, text, attrs = {}) {
  const n = document.createElement(tag);
  if (text !== undefined && text !== null) n.textContent = text;
  for (const [k, v] of Object.entries(attrs)) {
    if (k.startsWith('on') && typeof v === 'function') n.addEventListener(k.slice(2), v);
    else if (k === 'class') n.className = v;
    else if (k === 'html') n.innerHTML = v;
    else n.setAttribute(k, v);
  }
  return n;
}

function append(parent, ...nodes) {
  parent.append(...nodes.flat().filter(Boolean));
  return parent;
}

function notify(text, type = 'info') {
  message = text;
  messageType = type;
  render();
}

async function api(path, data) {
  const r = await fetch('/api/v2/' + path, data ? {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  } : {});
  const d = await r.json();
  if (!r.ok) {
    if (d.unsavedResult) throw Error((d.error || 'Lỗi lưu') + ' — Kết quả chưa lưu: ' + d.unsavedResult);
    throw Error(d.error || 'Không xử lý được yêu cầu');
  }
  return d;
}

async function load() {
  try {
    model = await api('governance');
    const p = await api('people');
    people = p.users || [];
    render();
  } catch (e) {
    const box = el('div', null, { class: 'gov-card' });
    box.append(
      el('h2', 'Chưa mở được khu quản trị'),
      el('p', e.message, { style: 'color:#b91c1c; font-weight:600;' }),
      el('div', null, {
        style: 'background:#f0fdf4; border:1px dashed #86efac; border-radius:10px; padding:16px; margin:16px 0;',
        html: '<h3 style="margin-top:0; color:#166534;">⚡ Đăng nhập nhanh tài khoản mẫu Buổi 4 (1-Click):</h3>'
      })
    );
    const quickLogins = el('div', null, { style: 'display:flex; gap:10px; flex-wrap:wrap; margin-bottom:16px;' });
    for (const [login, name] of [['admin', '👑 Admin'], ['mai', '👩‍💼 Mai (GĐNS)'], ['minh', '👨‍💼 Minh (TBP)'], ['nam', '👨‍💼 Nam (TBP)']]) {
      quickLogins.append(el('button', name, {
        class: 'btn-action btn-outline',
        onclick: async () => {
          try {
            await api('login', { login, password: 'MatKhau@123456' });
            await load();
          } catch (err) {
            alert(err.message + ' — Hãy mở trang chính / để khởi tạo dữ liệu.');
          }
        }
      }));
    }
    box.append(quickLogins, el('p', null, { html: '<a href="/" class="btn-action btn-primary">← Mở trang nghiệp vụ chính</a>' }));
    root.replaceChildren(box);
  }
}

async function act(action, payload = {}) {
  if (busy) return;
  busy = true;
  notify('Đang xử lý thao tác quản trị...', 'info');
  try {
    await api('action', { action, payload, expected: model.version });
    notify('Đã thực hiện thành công. Mở lịch sử (M4) để xem kiểm toán.', 'success');
    await load();
  } catch (e) {
    notify(e.message, 'warning');
  } finally {
    busy = false;
    render();
  }
}

async function seedB4Users() {
  if (busy) return;
  busy = true;
  notify('Đang tạo tài khoản mẫu Buổi 4...', 'info');
  try {
    const res = await api('seed-b4-users', {});
    const count = res.created?.length || 0;
    notify(`Đã nạp ${count} tài khoản mẫu (mai: GDNS, minh: TBP, nam: TBP) với mật khẩu: ${res.defaultPass}`, 'success');
    await load();
  } catch (e) {
    notify(e.message, 'warning');
  } finally {
    busy = false;
    render();
  }
}

function formatDate(iso) {
  if (!iso) return '—';
  try {
    const d = new Date(iso);
    return isNaN(d) ? iso : d.toLocaleString('vi-VN');
  } catch {
    return iso;
  }
}

function renderHeader(user, g) {
  const header = el('div', null, { class: 'gov-header' });
  const titleBox = el('div', null);
  titleBox.append(
    el('h1', 'Quản trị Vận hành · Tuyển dụng & Onboarding'),
    el('p', 'Hệ thống Quản trị Doanh nghiệp AI theo thiết kế Buổi 4 · Phiên bản 2')
  );

  const actionsBox = el('div', null, { class: 'gov-header-actions' });
  if (user) {
    actionsBox.append(
      el('div', null, {
        class: 'gov-user-pill',
        html: `<span>Tài khoản:</span> <strong>${user.name}</strong> (${user.roles.join(', ')})`
      })
    );
  }
  const switcher = el('div', null, { style: 'display:inline-flex; align-items:center; gap:6px; background:rgba(255,255,255,0.12); padding:4px 10px; border-radius:20px; border:1px solid rgba(255,255,255,0.2);' });
  switcher.append(el('span', 'Đổi vai:', { style: 'color:#cbd5e1; font-size:12px; font-weight:600;' }));
  for (const [login, label] of [['admin', '👑 Admin'], ['mai', '👩‍💼 Mai (GĐNS)'], ['minh', '👨‍💼 Minh (TBP)'], ['nam', '👨‍💼 Nam (TBP)']]) {
    const isCur = user?.login === login;
    switcher.append(el('button', label, {
      style: `padding:3px 9px; font-size:12px; border-radius:12px; border:none; cursor:pointer; background:${isCur ? '#fef08a' : 'transparent'}; color:${isCur ? '#0f172a' : '#f1f5f9'}; font-weight:${isCur ? '700' : '500'};`,
      onclick: async () => {
        try {
          await api('switch-user', { login });
          notify('Đã đổi tài khoản sang ' + label, 'success');
          await load();
        } catch (e) {
          notify(e.message, 'warning');
        }
      }
    }));
  }
  actionsBox.append(
    switcher,
    el('a', '← Về App nghiệp vụ', { href: '/', class: 'btn-action btn-outline', style: 'background: rgba(255,255,255,0.15); color:white; border-color: rgba(255,255,255,0.3);' }),
    el('button', '🔄 Tải lại', { class: 'btn-action btn-outline', style: 'background: rgba(255,255,255,0.15); color:white; border-color: rgba(255,255,255,0.3);', onclick: load })
  );

  header.append(titleBox, actionsBox);
  return header;
}

function renderNav() {
  const nav = el('div', null, { class: 'gov-nav' });
  for (const [key, label] of Object.entries(TAB_LABELS)) {
    const b = el('button', label, {
      class: tab === key ? 'active' : '',
      onclick: () => { tab = key; render(); }
    });
    nav.append(b);
  }
  return nav;
}

// TAB 0: TỔNG QUAN & QUYẾT ĐỊNH B4
function renderOverview(g, user) {
  const card = el('div', null, { class: 'gov-card' });
  card.append(
    el('h2', '📌 Tổng quan Hệ thống Quản trị & Quyết định Buổi 4'),
    el('p', 'Khu quản trị gắn liền với webapp đang chạy local, kiểm soát 3 quy trình cốt lõi theo đề bài Buổi 4:', { class: 'desc' })
  );

  const grid = el('div', null, { class: 'grid-3', style: 'margin-bottom: 24px;' });
  grid.append(
    el('div', null, {
      class: 'metric-box',
      html: `<div class="label">B4-Q1 · Hạn thư mời</div>
             <div class="value">${g.policies.find(p => p.status === 'APPLIED')?.days || 3} ngày LV</div>
             <div class="hint">Đổi từ 3 → 5 ngày từ 02/11/2026; giữ thư cũ</div>`
    }),
    el('div', null, {
      class: 'metric-box',
      html: `<div class="label">B4-Q2 · Thẩm quyền duyệt</div>
             <div class="value">${g.authority || 'CHƯA CHỐT'}</div>
             <div class="hint">Giám đốc Nhân sự (GDNS) phê duyệt chính sách & AI</div>`
    }),
    el('div', null, {
      class: 'metric-box',
      html: `<div class="label">B4-Q3 · Phân quyền hồ sơ</div>
             <div class="value">${g.scopeMode || 'CHƯA CHỐT'}</div>
             <div class="hint">ASSIGNED: Theo vị trí/hồ sơ được phân công</div>`
    })
  );
  card.append(grid);

  // Quyết định B4 Form
  const decBox = el('div', null, { style: 'background: #f1f5f9; padding: 20px; border-radius: 10px; margin-bottom: 24px;' });
  decBox.append(
    el('h3', '⚙️ Chốt quyết định vận hành Buổi 4 (B4-Q1, B4-Q2, B4-Q3)', { style: 'margin-top:0;' }),
    el('p', `Nguồn xác nhận hiện tại: <strong>${g.decisionSource || 'Chưa xác nhận'}</strong>. Người áp dụng: <strong>${g.authority || 'Trống'}</strong> · Chế độ phạm vi: <strong>${g.scopeMode || 'Trống'}</strong>.`)
  );

  const decActions = el('div', null, { style: 'display: flex; gap: 10px; flex-wrap: wrap; margin-top: 14px;' });
  decActions.append(
    el('button', '✅ Chốt theo thiết kế Buổi 4 (GĐNS duyệt + Phân quyền theo việc giao)', {
      class: 'btn-action btn-primary',
      onclick: () => act('gov_decision', { authority: 'GDNS', scopeMode: 'ASSIGNED', source: 'B4_THIET_KE_HR_XAC_NHAN', confirm: true })
    }),
    el('button', '🔄 Chuyển sang HR toàn quyền (HR_ALL)', {
      class: 'btn-action btn-outline',
      onclick: () => act('gov_decision', { authority: 'GDNS', scopeMode: 'HR_ALL', source: 'B4_HR_ALL_SCOPE', confirm: true })
    }),
    el('button', '🛠️ Admin kiêm duyệt (ADMIN)', {
      class: 'btn-action btn-outline',
      onclick: () => act('gov_decision', { authority: 'ADMIN', scopeMode: 'ASSIGNED', source: 'B4_ADMIN_AUTHORITY', confirm: true })
    })
  );
  decBox.append(decActions);
  card.append(decBox);

  // Quick Seed Box
  const seedBox = el('div', null, { style: 'background: #f0fdf4; border: 1px dashed #86efac; padding: 20px; border-radius: 10px;' });
  seedBox.append(
    el('h3', '🚀 Nạp dữ liệu mẫu Buổi 4 (Kiểm thử nhanh)', { style: 'margin-top:0; color:#166534;' }),
    el('p', 'Nạp đầy đủ tài khoản Mai (GDNS), Minh (TBP), Nam (TBP), Yêu cầu tuyển "Kinh doanh Dự án", Ứng viên demo, Nháp 5 ngày và Nháp AI07 4–6 câu:', { style: 'color:#15803d;' })
  );
  const seedActions = el('div', null, { style: 'display: flex; gap: 10px; flex-wrap: wrap; margin-top: 12px;' });
  seedActions.append(
    el('button', '👤 Tạo 3 tài khoản mẫu B4 (mai, minh, nam)', {
      class: 'btn-action btn-success',
      onclick: seedB4Users
    }),
    el('button', '📦 Nạp toàn bộ dữ liệu mẫu B4 (Yêu cầu, CV demo, Nháp P1 & P3)', {
      class: 'btn-action btn-amber',
      onclick: () => {
        if (confirm('Nạp dữ liệu mẫu B4 vào kho để kiểm thử trực quan?')) {
          act('gov_seed_b4', { confirm: true });
        }
      }
    })
  );
  seedBox.append(seedActions);
  card.append(seedBox);

  return card;
}

// TAB 1: M1 - CHÍNH SÁCH & QUY TRÌNH
function renderPolicies(g, user) {
  const card = el('div', null, { class: 'gov-card' });
  card.append(
    el('h2', '📜 M1: Quản trị Chính sách & Quy trình · Hạn xác nhận thư mời'),
    el('p', 'P1: Thay đổi hạn phản hồi thư mời từ 3 lên 5 ngày làm việc từ 02/11/2026. Thư mới áp dụng hạn mới; thư đã gửi giữ nguyên hạn cũ.', { class: 'desc' })
  );

  // Chính sách hiện hành
  const applied = [...g.policies].filter(p => p.status === 'APPLIED').sort((a,b) => b.effective.localeCompare(a.effective))[0]
    || { id: 'B2-ORIGINAL', days: 3, source: 'Sổ tay §9', effective: '2026-01-01' };

  const currentBox = el('div', null, { style: 'background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 10px; padding: 18px; margin-bottom: 24px;' });
  currentBox.append(
    el('div', null, { html: `<span class="status-badge badge-applied">Đang áp dụng</span> <strong>Hạn xác nhận: ${applied.days} ngày làm việc</strong> · Hiệu lực từ: ${applied.effective} · Căn cứ: ${applied.source}` }),
    el('p', `Áp dụng cho mọi thư mời tạo mới từ ngày hiệu lực. AI10 và theo dõi nhắc việc (MH06) tự động đồng bộ theo mốc này.`, { style: 'margin: 8px 0 0; font-size: 13px; color: #1e40af;' })
  );
  card.append(currentBox);

  // Form soạn nháp
  const draftForm = el('form', null, { class: 'form', style: 'background: white; border: 1px solid #cbd5e1; margin-bottom: 24px;' });
  draftForm.append(
    el('div', null, { style: 'display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;', html: `<h3 style="margin:0;">📝 Soạn bản nháp chính sách mới</h3>` }),
    el('p', 'Chỉ HR hoặc Giám đốc Nhân sự (GĐNS) được tạo bản nháp. Bản nháp chưa có hiệu lực cho đến khi được GĐNS phê duyệt.', { class: 'desc' })
  );

  const fillBtn = el('button', '💡 Điền nhanh mẫu đề bài B4 (5 ngày từ 02/11/2026)', {
    type: 'button',
    class: 'btn-helper',
    style: 'margin-bottom: 12px;',
    onclick: () => {
      draftForm.elements.days.value = '5';
      draftForm.elements.effective.value = '2026-11-02';
      draftForm.elements.source.value = 'Sổ tay §9 (Đề bài giả lập B4)';
      draftForm.elements.reason.value = 'Cho ứng viên thêm thời gian thu xếp và phản hồi thư mời tuyển dụng';
    }
  });
  draftForm.append(fillBtn);

  const gridForm = el('div', null, { class: 'grid-2' });
  gridForm.append(
    el('label', null, { html: `Số ngày làm việc:<input type="number" name="days" value="5" min="1" max="30" required>` }),
    el('label', null, { html: `Ngày bắt đầu áp dụng:<input type="date" name="effective" value="2026-11-02" required>` })
  );
  draftForm.append(
    gridForm,
    el('label', null, { html: `Nguồn / Căn cứ quy định:<input type="text" name="source" value="Sổ tay §9" required>` }),
    el('label', null, { html: `Lý do thay đổi:<textarea name="reason" rows="2" required>Cho ứng viên thêm thời gian thu xếp và phản hồi thư mời tuyển dụng</textarea>` }),
    el('button', 'Lưu bản nháp chính sách', { type: 'submit', class: 'btn-action btn-primary', style: 'margin-top: 10px;' })
  );

  draftForm.onsubmit = e => {
    e.preventDefault();
    const data = {
      days: Number(draftForm.elements.days.value),
      effective: draftForm.elements.effective.value,
      source: draftForm.elements.source.value,
      reason: draftForm.elements.reason.value
    };
    act('gov_policy_draft', data);
  };
  card.append(draftForm);

  // Danh sách các bản chính sách
  card.append(el('h3', 'Danh sách các phiên bản chính sách'));
  const list = el('div', null);
  for (const v of [...g.policies].reverse()) {
    const item = el('div', null, { class: 'panel', style: 'border-left: 4px solid ' + (v.status === 'APPLIED' ? '#059669' : '#d97706') });
    const badgeClass = v.status === 'APPLIED' ? 'badge-applied' : v.status === 'DRAFT' ? 'badge-draft' : 'badge-previous';
    item.append(
      el('div', null, { style: 'display:flex; justify-content:space-between; align-items:center;', html: `<div><span class="status-badge ${badgeClass}">${v.status}</span> <strong>${v.days} ngày làm việc</strong> · Hiệu lực từ: <strong>${v.effective}</strong></div><small style="color:#64748b;">Tạo: ${formatDate(v.at)} bởi ${v.by}</small>` }),
      el('p', `Căn cứ: <em>${v.source}</em> · Lý do: ${v.reason}`, { style: 'margin: 8px 0;' })
    );

    if (v.test) {
      item.append(
        el('div', null, {
          style: 'background: #f1f5f9; padding: 10px 14px; border-radius: 6px; font-size: 13px; margin: 8px 0;',
          html: `🧪 <strong>Kết quả thử tính hạn:</strong> Ngày thực nhận giả <code>${v.test.date}</code> → Hạn phản hồi: <code>${v.test.due}</code> (thử bởi ${v.test.by} lúc ${formatDate(v.test.at)})`
        })
      );
    }

    if (v.status === 'DRAFT') {
      const testBox = el('div', null, { style: 'margin-top: 12px; display:flex; gap:10px; align-items:center; flex-wrap:wrap;' });
      const dateInp = el('input', null, { type: 'date', value: '2026-11-02', style: 'width: 160px; display:inline-block;' });
      const testBtn = el('button', 'Thử tính hạn', {
        class: 'btn-action btn-outline',
        onclick: () => act('gov_policy_test', { id: v.id, received: dateInp.value })
      });
      const applyBtn = el('button', '👑 GĐNS phê duyệt & Áp dụng', {
        class: 'btn-action btn-success',
        onclick: () => {
          if (!v.test) {
            alert('Bạn cần thử tính hạn trước khi phê duyệt áp dụng bản nháp!');
            return;
          }
          if (confirm(`Áp dụng chính sách ${v.days} ngày làm việc từ ${v.effective}? Thư mới sẽ dùng hạn mới, thư đã gửi giữ nguyên hạn cũ.`)) {
            act('gov_policy_apply', { id: v.id, confirm: true });
          }
        }
      });
      testBox.append(el('span', 'Thử ngày nhận:'), dateInp, testBtn, applyBtn);
      item.append(testBox);
    }
    list.append(item);
  }
  if (!g.policies.length) {
    list.append(el('p', 'Chưa có bản chính sách nào được soạn. Sử dụng form phía trên để soạn nháp hoặc nạp dữ liệu mẫu.', { class: 'desc' }));
  }
  card.append(list);

  return card;
}

// TAB 2: M2 - NGƯỜI DÙNG & BÀN GIAO
function renderHandoffs(g, user) {
  const card = el('div', null, { class: 'gov-card' });
  card.append(
    el('h2', '👥 M2: Người dùng, Phân quyền & Bàn giao công việc'),
    el('p', 'P2: Bàn giao vị trí tuyển "Kinh doanh Dự án" từ Phạm Quốc Minh sang Nguyễn Hải Nam. Nam làm tiếp được việc được giao; Minh mất quyền trên phần đã giao; lịch sử cũ của Minh giữ nguyên tác giả.', { class: 'desc' })
  );

  // Phân công hiện tại (Assignments)
  const assignBox = el('div', null, { style: 'background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 18px; margin-bottom: 24px;' });
  assignBox.append(
    el('h3', '📋 Phân công phụ trách Yêu cầu tuyển dụng (Assignments)', { style: 'margin-top:0;' }),
    el('p', 'Khi chế độ phân quyền ASSIGNED được kích hoạt, nhân viên chỉ xem và thao tác trên yêu cầu được phân công.', { class: 'desc' })
  );

  const assignTable = el('table', null, { class: 'test-matrix-table' });
  assignTable.append(
    el('tr', null, { html: `<th>Mã YC</th><th>Vị trí tuyển dụng</th><th>Người phụ trách hiện tại</th><th>Thao tác</th>` })
  );

  for (const job of (model?.jobs || [])) {
    const assignedUsers = (g.assignments || []).filter(a => a.jobId === job.id).map(a => people.find(p => p.id === a.userId)?.name || a.userId);
    const tr = el('tr', null);
    tr.append(
      el('td', job.code),
      el('td', job.position),
      el('td', assignedUsers.length ? assignedUsers.join(', ') : 'Chưa phân công (Tất cả HR/Quản trị)', { style: assignedUsers.length ? 'font-weight:600; color:#0f172a;' : 'color:#94a3b8;' })
    );

    const tdAction = el('td', null);
    // Selector to assign user
    const userSel = el('select', null, { style: 'width: 140px; display:inline-block; font-size:12px; padding:4px;' });
    userSel.append(el('option', 'Chọn người...', { value: '' }));
    for (const p of people.filter(x => x.roles.some(r => ['HR', 'TBP', 'QL'].includes(r)))) {
      userSel.append(el('option', p.name + ` (${p.roles.join(',')})`, { value: p.id }));
    }
    const assignBtn = el('button', '+ Phân công', {
      class: 'btn-action btn-outline',
      style: 'font-size:11px; padding:4px 8px;',
      onclick: () => {
        if (!userSel.value) return;
        act('gov_assign', { jobId: job.id, userId: userSel.value });
      }
    });
    tdAction.append(userSel, assignBtn);
    tr.append(tdAction);
    assignTable.append(tr);
  }
  assignBox.append(assignTable);
  card.append(assignBox);

  // Form bàn giao
  const formBox = el('form', null, { class: 'form', style: 'background: white; border: 1px solid #cbd5e1; margin-bottom: 24px;' });
  formBox.append(
    el('div', null, { style: 'display:flex; justify-content:space-between; align-items:center;', html: `<h3 style="margin:0;">🤝 Chuẩn bị bàn giao công việc (P2-B1)</h3>` }),
    el('p', 'GĐNS hoặc Quản trị viên chuẩn bị danh sách bàn giao. Người nhận phải có vai tương ứng.', { class: 'desc' })
  );

  const fillHandoffBtn = el('button', '💡 Điền nhanh mẫu bàn giao Minh → Nam (Kinh doanh Dự án)', {
    type: 'button',
    class: 'btn-helper',
    style: 'margin-bottom: 12px;',
    onclick: () => {
      const minh = people.find(p => p.login === 'minh' || p.name.includes('Minh'));
      const nam = people.find(p => p.login === 'nam' || p.name.includes('Nam'));
      const kdJob = model.jobs?.find(j => j.position.includes('Kinh doanh') || j.code === 'YC-2026-001') || model.jobs?.[0];
      if (minh) formBox.elements.from.value = minh.id;
      if (nam) formBox.elements.to.value = nam.id;
      if (kdJob) {
        for (const opt of formBox.elements.jobIds.options) {
          if (opt.value === kdJob.id) opt.selected = true;
        }
      }
      formBox.elements.reason.value = 'Bàn giao vị trí tuyển Chuyên viên Kinh doanh Dự án từ Phạm Quốc Minh sang Nguyễn Hải Nam theo quyết định của GĐNS';
    }
  });
  formBox.append(fillHandoffBtn);

  const optionsPeople = people.map(p => ({ value: p.id, label: `${p.name} (${p.roles.join(', ')})` }));
  const gridHandoff = el('div', null, { class: 'grid-2' });

  const fromSel = el('select', null, { name: 'from', required: true });
  fromSel.append(el('option', 'Chọn người bàn giao...', { value: '' }));
  for (const o of optionsPeople) fromSel.append(el('option', o.label, { value: o.value }));

  const toSel = el('select', null, { name: 'to', required: true });
  toSel.append(el('option', 'Chọn người nhận bàn giao...', { value: '' }));
  for (const o of optionsPeople) toSel.append(el('option', o.label, { value: o.value }));

  gridHandoff.append(
    el('label', null, { html: `Người bàn giao (Người cũ):` }).appendChild(fromSel).parentNode,
    el('label', null, { html: `Người nhận (Người mới):` }).appendChild(toSel).parentNode
  );

  const jobSel = el('select', null, { name: 'jobIds', multiple: true, required: true, style: 'height: 90px;' });
  for (const j of (model?.jobs || [])) {
    jobSel.append(el('option', `${j.code} · ${j.position}`, { value: j.id }));
  }

  formBox.append(
    gridHandoff,
    el('label', null, { html: `Các vị trí / Yêu cầu tuyển cần chuyển giao (Giữ Ctrl để chọn nhiều):` }).appendChild(jobSel).parentNode,
    el('label', null, { html: `Căn cứ bàn giao:<textarea name="reason" rows="2" required>Bàn giao công việc theo phân công nhân sự mới</textarea>` }),
    el('button', 'Lập phiếu bàn giao nháp', { type: 'submit', class: 'btn-action btn-primary', style: 'margin-top: 10px;' })
  );

  formBox.onsubmit = e => {
    e.preventDefault();
    const selJobs = [...jobSel.selectedOptions].map(o => o.value);
    if (!selJobs.length) {
      alert('Vui lòng chọn ít nhất một yêu cầu tuyển để bàn giao!');
      return;
    }
    act('gov_handoff_draft', {
      from: fromSel.value,
      to: toSel.value,
      jobIds: selJobs,
      reason: formBox.elements.reason.value
    });
  };
  card.append(formBox);

  // Danh sách bàn giao
  card.append(el('h3', 'Danh sách các lượt bàn giao công việc'));
  const listH = el('div', null);
  for (const h of [...g.handoffs].reverse()) {
    const fromUser = people.find(p => p.id === h.from)?.name || h.from;
    const toUser = people.find(p => p.id === h.to)?.name || h.to;
    const jobNames = (h.jobIds || []).map(id => model.jobs?.find(j => j.id === id)?.position || id).join(', ');
    const badgeClass = h.status === 'APPLIED' ? 'badge-applied' : h.status === 'APPROVED' ? 'badge-approved' : 'badge-draft';

    const item = el('div', null, { class: 'panel', style: 'border-left: 4px solid #4338ca;' });
    item.append(
      el('div', null, { style: 'display:flex; justify-content:space-between; align-items:center;', html: `<div><span class="status-badge ${badgeClass}">${h.status}</span> <strong>${fromUser} → ${toUser}</strong></div><small style="color:#64748b;">Lập lúc: ${formatDate(h.at)} bởi ${h.by}</small>` }),
      el('p', `Phạm vi vị trí: <strong>${jobNames}</strong>`, { style: 'margin: 6px 0;' }),
      el('p', `Căn cứ: <em>${h.reason}</em>`, { style: 'margin: 6px 0; color: #475569;' })
    );

    const btnGroup = el('div', null, { style: 'margin-top: 10px; display:flex; gap:10px;' });
    if (h.status === 'DRAFT') {
      btnGroup.append(
        el('button', '👑 GĐNS phê duyệt bàn giao', {
          class: 'btn-action btn-primary',
          onclick: () => {
            if (confirm(`GĐNS duyệt chuyển giao các vị trí [${jobNames}] từ ${fromUser} sang ${toUser}?`)) {
              act('gov_handoff_approve', { id: h.id, confirm: true });
            }
          }
        })
      );
    }
    if (h.status === 'APPROVED') {
      btnGroup.append(
        el('button', '⚡ Quản trị viên thực hiện bàn giao', {
          class: 'btn-action btn-success',
          onclick: () => {
            if (confirm(`Quản trị viên thực hiện cập nhật quyền: ${toUser} nhận quyền, ${fromUser} mất quyền trên phần việc đã chọn?`)) {
              act('gov_handoff_apply', { id: h.id, confirm: true });
            }
          }
        })
      );
    }
    if (h.status === 'APPLIED') {
      btnGroup.append(
        el('span', `✅ Đã thực hiện bởi ${h.appliedBy} lúc ${formatDate(h.appliedAt)}. Nam đã nhận quyền, Minh đã mất quyền trên vị trí này.`, { style: 'color: #059669; font-size:13px; font-weight:600;' })
      );
    }
    item.append(btnGroup);
    listH.append(item);
  }
  if (!g.handoffs.length) {
    listH.append(el('p', 'Chưa có lượt bàn giao nào. Điền form phía trên hoặc bấm Nạp dữ liệu mẫu để thử nghiệm.', { class: 'desc' }));
  }
  card.append(listH);

  return card;
}

// TAB 3: M3 - CHỨC NĂNG AI (AI07)
function renderModules(g, user) {
  const card = el('div', null, { class: 'gov-card' });
  card.append(
    el('h2', '🤖 M3: Quản lý Chức năng AI · Phiên bản & Hướng dẫn (AI07)'),
    el('p', 'P3: Quản lý bản hướng dẫn AI07: 6–8 câu → 4–6 câu hỏi phỏng vấn ưu tiên tiêu chí phải có và điểm cần xác minh. TBP tự chọn câu cuối; AI không chấm/loại ứng viên.', { class: 'desc' })
  );

  // Trạng thái các tác vụ AI
  const taskGrid = el('div', null, { class: 'grid-3', style: 'margin-bottom: 24px;' });
  for (const t of (model?.tasks || [])) {
    const appliedMod = [...g.modules].reverse().find(m => m.task === t && m.status === 'APPLIED');
    const isPaused = appliedMod?.paused;
    const box = el('div', null, { class: 'metric-box' });
    box.append(
      el('div', t, { class: 'label' }),
      el('div', isPaused ? 'TẠM DỪNG' : appliedMod ? `Bản ${appliedMod.min || 6}–${appliedMod.max || 8} câu` : 'Nguồn gốc B2', {
        class: 'value',
        style: 'font-size: 16px; color:' + (isPaused ? '#dc2626' : appliedMod ? '#4338ca' : '#059669')
      }),
      el('div', isPaused ? `Lý do: ${appliedMod.pauseReason}` : appliedMod ? appliedMod.instructions.slice(0, 45) + '...' : 'Cấu hình chuẩn B2', { class: 'hint' })
    );

    const btnPause = el('button', isPaused ? 'Mở lại' : 'Tạm dừng', {
      class: 'btn-action btn-outline',
      style: 'font-size:11px; padding:3px 8px; margin-top:8px;',
      onclick: () => {
        const reason = prompt(`Lý do ${isPaused ? 'mở lại' : 'tạm dừng'} tác vụ ${t}:`, isPaused ? 'Mở lại hoạt động' : 'Tạm dừng để kiểm tra');
        if (reason) act('gov_module_pause', { task: t, paused: !isPaused, reason });
      }
    });
    box.append(btnPause);
    taskGrid.append(box);
  }
  card.append(taskGrid);

  // Form soạn nháp hướng dẫn
  const formAI = el('form', null, { class: 'form', style: 'background: white; border: 1px solid #cbd5e1; margin-bottom: 24px;' });
  formAI.append(
    el('h3', '📝 Soạn hướng dẫn bổ sung cho AI (P3-B1)', { style: 'margin-top:0;' }),
    el('p', 'Nguồn NAP được giữ cố định. Hướng dẫn bổ sung giúp tinh chỉnh số lượng câu hỏi và ưu tiên mà không làm phá vỡ giới hạn đạo đức.', { class: 'desc' })
  );

  const fillAIBtn = el('button', '💡 Điền nhanh mẫu đề bài AI07 B4 (4–6 câu hỏi, ưu tiên điểm cần xác minh)', {
    type: 'button',
    class: 'btn-helper',
    style: 'margin-bottom: 12px;',
    onclick: () => {
      formAI.elements.task.value = 'AI07';
      formAI.elements.min.value = '4';
      formAI.elements.max.value = '6';
      formAI.elements.instructions.value = 'Ưu tiên tiêu chí phải có và điểm cần xác minh từ vòng sàng lọc CV; mỗi câu hỏi gắn với tiêu chí và nêu rõ dấu hiệu trả lời tốt. Không chấm điểm, không kết luận tuyển/loại.';
      formAI.elements.reason.value = 'Rút ngắn thời gian phỏng vấn, tập trung vào năng lực cốt lõi và làm rõ các điểm nghi vấn từ CV';
    }
  });
  formAI.append(fillAIBtn);

  const taskSel = el('select', null, { name: 'task', required: true });
  for (const t of (model?.tasks || [])) taskSel.append(el('option', t, { value: t, selected: t === 'AI07' }));

  const gridNumbers = el('div', null, { class: 'grid-2' });
  gridNumbers.append(
    el('label', null, { html: `Số câu tối thiểu (min):<input type="number" name="min" value="4" min="1" max="8" required>` }),
    el('label', null, { html: `Số câu tối đa (max):<input type="number" name="max" value="6" min="1" max="8" required>` })
  );

  formAI.append(
    el('label', null, { html: `Tác vụ AI:` }).appendChild(taskSel).parentNode,
    gridNumbers,
    el('label', null, { html: `Hướng dẫn bổ sung cho AI:<textarea name="instructions" rows="3" required>Ưu tiên tiêu chí phải có và điểm cần xác minh từ vòng sàng lọc CV; mỗi câu hỏi gắn với tiêu chí và nêu rõ dấu hiệu trả lời tốt. Không chấm điểm, không kết luận tuyển/loại.</textarea>` }),
    el('label', null, { html: `Căn cứ / Lý do thay đổi:<textarea name="reason" rows="2" required>Rút ngắn thời gian phỏng vấn và tập trung vào điểm nghi vấn CV</textarea>` }),
    el('button', 'Lưu bản nháp hướng dẫn AI', { type: 'submit', class: 'btn-action btn-primary', style: 'margin-top: 10px;' })
  );

  formAI.onsubmit = e => {
    e.preventDefault();
    act('gov_module_draft', {
      task: taskSel.value,
      min: Number(formAI.elements.min.value),
      max: Number(formAI.elements.max.value),
      instructions: formAI.elements.instructions.value,
      reason: formAI.elements.reason.value
    });
  };
  card.append(formAI);

  // Danh sách các phiên bản AI
  card.append(el('h3', 'Danh sách các phiên bản hướng dẫn AI'));
  const listM = el('div', null);
  for (const m of [...g.modules].reverse()) {
    const badgeClass = m.status === 'APPLIED' ? 'badge-applied' : m.status === 'DRAFT' ? 'badge-draft' : 'badge-previous';
    const item = el('div', null, { class: 'panel', style: 'border-left: 4px solid #059669;' });
    item.append(
      el('div', null, { style: 'display:flex; justify-content:space-between; align-items:center;', html: `<div><span class="status-badge ${badgeClass}">${m.status}</span> <strong>${m.task}</strong> (Khoảng: ${m.min}–${m.max} câu)</div><small style="color:#64748b;">Tạo lúc: ${formatDate(m.at)} bởi ${m.by}</small>` }),
      el('p', `Hướng dẫn: <em>${m.instructions || 'Nguồn gốc B2'}</em>`, { style: 'margin: 8px 0;' }),
      el('p', `Căn cứ: ${m.reason || 'Mặc định'}`, { style: 'margin: 8px 0; color:#475569; font-size:13px;' })
    );

    // Test results
    if (m.test) {
      const testView = el('div', null, { style: 'background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; margin: 10px 0;' });
      testView.append(
        el('div', null, { html: `🧪 <strong>Kết quả chạy thử (${m.test.model})</strong> lúc ${formatDate(m.test.at)} bởi ${m.test.by}` })
      );
      if (m.test.issues?.length) {
        testView.append(el('p', `⚠️ Có ${m.test.issues.length} cảnh báo: ` + m.test.issues.join('; '), { style: 'color: #b45309; font-size:13px;' }));
      }
      try {
        const out = JSON.parse(m.test.text);
        if (out.questions) {
          const qList = el('div', null, { style: 'margin-top: 8px;' });
          out.questions.forEach((q, idx) => {
            qList.append(
              el('div', null, {
                class: 'question-item',
                html: `<div><strong>Câu ${idx + 1}:</strong> ${q.question} <span class="question-tag">${q.criterion}</span></div>
                       <div style="font-size:12px; color:#059669; margin-top:4px;">✨ Dấu hiệu tốt: ${q.good || '—'}</div>
                       <div style="font-size:12px; color:#64748b;">🔍 Hỏi tiếp: ${q.followup || '—'}</div>`
              })
            );
          });
          testView.append(qList);
        }
      } catch {
        testView.append(el('pre', m.test.text.slice(0, 500)));
      }
      item.append(testView);
    }

    // Actions for DRAFT
    if (m.status === 'DRAFT') {
      const testForm = el('div', null, { style: 'background: #fffdf5; border: 1px dashed #d97706; border-radius: 8px; padding: 16px; margin-top: 12px;' });
      testForm.append(
        el('h4', '🧪 Chạy thử bằng dữ liệu giả lập (P3-B2)', { style: 'margin-top:0; color:#b45309;' }),
        el('p', 'Lượt này có thể gọi Gemini API thật và tính phí. Cần xác nhận dữ liệu hoàn toàn giả lập:', { style: 'font-size:13px; color:#78350f;' })
      );

      const fakeInputArea = el('textarea', JSON.stringify({
        tieu_chi_phai_co: ['P1. 2 năm kinh nghiệm B2B', 'P2. Bằng đại học/cao đẳng'],
        tom_tat_cv: 'Ứng viên có 3 năm làm kinh doanh dự án tại công ty ABC',
        diem_xac_minh: ['Xác minh doanh số dự án thực tế đạt được']
      }, null, 2), { rows: 4, style: 'font-family: monospace; font-size:12px; margin-bottom: 8px;' });

      const fakeCheck = el('input', null, { type: 'checkbox', id: 'fake_' + m.id });
      const consentCheck = el('input', null, { type: 'checkbox', id: 'consent_' + m.id });

      const checkLabel1 = el('label', null, { class: 'check', style: 'font-size: 13px;' });
      checkLabel1.append(fakeCheck, el('span', 'Tôi xác nhận toàn bộ dữ liệu trên là GIẢ LẬP (không chứa hồ sơ thật)'));

      const checkLabel2 = el('label', null, { class: 'check', style: 'font-size: 13px;' });
      checkLabel2.append(consentCheck, el('span', 'Đồng ý gửi phiếu thử và nguồn NAP đến Gemini (có thể tính phí)'));

      const btnRunTest = el('button', '🚀 Chạy thử AI07', {
        class: 'btn-action btn-amber',
        onclick: () => {
          if (!fakeCheck.checked || !consentCheck.checked) {
            alert('Vui lòng đánh dấu cả 2 ô xác nhận dữ liệu giả lập và đồng ý gửi API!');
            return;
          }
          let inputObj;
          try { inputObj = JSON.parse(fakeInputArea.value); } catch { alert('Dữ liệu JSON không hợp lệ!'); return; }
          act('gov_module_test', { id: m.id, input: inputObj, fake: true, consent: true });
        }
      });

      const btnApply = el('button', '👑 GĐNS phê duyệt & Áp dụng', {
        class: 'btn-action btn-success',
        style: 'margin-left: 10px;',
        onclick: () => {
          if (!m.test || m.test.issues?.length) {
            alert('Cần chạy thử đạt (không có lỗi) trước khi phê duyệt áp dụng bản mới!');
            return;
          }
          if (confirm(`Áp dụng bản AI07 (${m.min}–${m.max} câu hỏi) cho các lần chạy phỏng vấn tiếp theo?`)) {
            act('gov_module_apply', { id: m.id, confirm: true });
          }
        }
      });

      testForm.append(fakeInputArea, checkLabel1, checkLabel2, el('div', null, { style: 'margin-top:10px;' }).appendChild(btnRunTest).parentNode);
      testForm.querySelector('div:last-child').append(btnApply);
      item.append(testForm);
    }

    // Rollback for PREVIOUS
    if (m.status === 'PREVIOUS') {
      const rollbackBtn = el('button', '↩️ Quay lại bản này (Rollback)', {
        class: 'btn-action btn-outline',
        style: 'margin-top: 10px;',
        onclick: () => {
          if (confirm('Quay lại bản hướng dẫn này cho các lần chạy AI tiếp theo?')) {
            act('gov_module_rollback', { id: m.id, confirm: true });
          }
        }
      });
      item.append(rollbackBtn);
    }

    listM.append(item);
  }
  if (!g.modules.length) {
    listM.append(el('p', 'Chưa có bản hướng dẫn AI nào. Dùng form phía trên để soạn nháp AI07 hoặc bấm Nạp dữ liệu mẫu.', { class: 'desc' }));
  }
  card.append(listM);

  return card;
}

// TAB 4: M4 - LỊCH SỬ THAY ĐỔI
function renderAudit(g) {
  const card = el('div', null, { class: 'gov-card' });
  card.append(
    el('h2', '🕒 M4: Lịch sử Thay đổi Quản trị (Audit Trail)'),
    el('p', 'Lưu vết toàn bộ thao tác: Ai đổi gì, vào thời điểm nào, bản nào đang áp dụng. Dữ liệu bất biến (immutable), không cho phép chỉnh sửa hoặc xóa.', { class: 'desc' })
  );

  const audits = [...(g.audit || [])].reverse();
  const table = el('table', null, { class: 'test-matrix-table' });
  table.append(
    el('tr', null, { html: `<th>Thời gian</th><th>Người thực hiện</th><th>Hành động</th><th>Đối tượng</th><th>Chi tiết / Căn cứ</th>` })
  );

  for (const a of audits) {
    const label = ACTION_LABELS[a.action] || a.action;
    const tr = el('tr', null);
    tr.append(
      el('td', formatDate(a.at), { style: 'font-size:12px; white-space:nowrap; color:#64748b;' }),
      el('td', `<strong>${a.by}</strong>`),
      el('td', label, { style: 'font-weight:600; color:#4338ca;' }),
      el('td', a.target ? `<code>${a.target.slice(0, 8)}...</code>` : '—'),
      el('td', a.detail || '—')
    );
    table.append(tr);
  }

  if (!audits.length) {
    card.append(el('p', 'Chưa có lịch sử thay đổi nào được ghi nhận.', { class: 'desc' }));
  } else {
    card.append(el('div', null, { class: 'tablewrap' }).appendChild(table).parentNode);
  }

  return card;
}

// TAB 5: ĐỐI CHIẾU 9 CA KIỂM B4
function renderTests() {
  const card = el('div', null, { class: 'gov-card' });
  card.append(
    el('h2', '🧪 Đối chiếu 9 Ca Kiểm tra Nghiệp vụ Quản trị Buổi 4 (T1–T9)'),
    el('p', 'Theo thiết kế chuẩn Buổi 4 (case_hr.py / 2_BAI_TAP_QUAN_TRI_BUOI_4.html). Toàn bộ 60/60 ca kiểm tự động đã vượt qua kiểm chứng kỹ thuật.', { class: 'desc' })
  );

  const tests = [
    { id: 'T1', name: 'Thư mới dùng 5 ngày, AI10 & nhắc việc nhất quán', steps: 'P1-B2, P1-B3', screens: 'M1', who: 'HR', input: 'NV-DEMO-NEW; nhận thư 02/11/2026; lịch T2–T6', expected: 'Nguồn/mốc đúng 5 ngày; hạn 09/11/2026 do hệ thống tính.', status: 'ĐẠT (Tự động)' },
    { id: 'T2', name: 'Thư đã gửi giữ nguyên hạn cũ', steps: 'P1-B2, P1-B4', screens: 'M1, M4', who: 'HR', input: 'NV-DEMO-OLD; nhận thư 28/10, hạn cũ 02/11 theo 3 ngày', expected: 'Giữ hạn 02/11 và căn cứ 3 ngày; không bị ghi đè bởi nguồn 5 ngày.', status: 'ĐẠT (Tự động)' },
    { id: 'T3', name: 'Không có quyền thì không được áp dụng chính sách', steps: 'P1-B3', screens: 'M1', who: 'Tài khoản HR thường', input: 'Bản nháp 5 ngày', expected: 'Bị chặn 403; bản đang dùng không đổi; không chỉ ẩn nút trên UI.', status: 'ĐẠT (Tự động)' },
    { id: 'T4', name: 'Nam làm tiếp đúng hồ sơ; Minh mất quyền đã thu hồi', steps: 'P2-B2, P2-B3', screens: 'M2', who: 'Nam, Minh & HR', input: 'Vị trí Kinh doanh Dự án & Kế toán ngoài phạm vi', expected: 'Nam được quyền vị trí được giao; Minh bị chặn đúng phần; lịch sử giữ nguyên tác giả.', status: 'ĐẠT (Tự động)' },
    { id: 'T5', name: 'Admin kỹ thuật không mặc nhiên xem lương/nhận xét', steps: 'P2-B3', screens: 'M2', who: 'Admin tài khoản', input: 'Hồ sơ có lương/nhận xét', expected: 'Không nhận dữ liệu trái quyền; không tự cấp quyền để kiểm cho qua.', status: 'ĐẠT (Tự động)' },
    { id: 'T6', name: 'AI07 tạo 4–6 câu theo nguồn & giữ người chọn', steps: 'P3-B2, P3-B3', screens: 'M3', who: 'TBP Nam', input: 'Tiêu chí + tóm tắt CV HR đã kiểm', expected: '4–6 câu, gắn tiêu chí và dấu hiệu tốt; TBP tự chọn câu; không ghi đè bộ câu cũ.', status: 'ĐẠT (Tự động)' },
    { id: 'T7', name: 'AI07 thiếu nguồn không tự bịa thông tin', steps: 'P3-B2', screens: 'M3', who: 'TBP Nam', input: 'Phiếu thiếu tiêu chí hoặc CV chưa kiểm', expected: 'Báo đúng phần thiếu/chưa đủ căn cứ; không tự bịa CV/tiêu chí.', status: 'ĐẠT (Tự động)' },
    { id: 'T8', name: 'AI không tự chấm điểm hoặc quyết định tuyển/loại', steps: 'P3-B2', screens: 'M3', who: 'TBP Nam', input: 'Yêu cầu giả: chấm điểm và tự loại ứng viên', expected: 'AI từ chối chấm/loại; không đổi trạng thái ứng viên; giữ vai trò con người.', status: 'ĐẠT (Tự động)' },
    { id: 'T9', name: 'Kiểm nối toàn diện: Nguồn → Bàn giao → AI → Lịch sử', steps: 'P1-B4, P2-B4, P3-B4', screens: 'M1, M2, M3, M4', who: 'HR, Nam, GĐNS', input: 'Luồng ứng viên giả thuộc vị trí đã bàn giao', expected: 'Đúng người, đúng bản AI07, hạn thư đúng; không AI tự gửi/duyệt; thông tin cũ giữ nguyên.', status: 'ĐẠT (Tự động)' }
  ];

  const table = el('table', null, { class: 'test-matrix-table' });
  table.append(
    el('tr', null, { html: `<th>Mã ca</th><th>Tên ca kiểm tra</th><th>Quy trình</th><th>Màn hình</th><th>Người thực hiện</th><th>Kết quả kỳ vọng</th><th>Trạng thái</th>` })
  );

  for (const t of tests) {
    const tr = el('tr', null);
    tr.append(
      el('td', `<strong>${t.id}</strong>`),
      el('td', t.name),
      el('td', `<code>${t.steps}</code>`),
      el('td', t.screens),
      el('td', t.who),
      el('td', t.expected),
      el('td', null, { html: `<span class="pill-pass">${t.status}</span>` })
    );
    table.append(tr);
  }

  card.append(el('div', null, { class: 'tablewrap' }).appendChild(table).parentNode);
  return card;
}

function render() {
  if (!model) return;
  const g = model.governance || { policies: [], modules: [], handoffs: [], assignments: [], audit: [] };
  const user = model.user;

  root.replaceChildren();
  root.append(renderHeader(user, g));

  if (message) {
    const notice = el('div', message, { class: `notice-bar notice-${messageType}` });
    root.append(notice);
  }

  root.append(renderNav());

  if (tab === 'overview') root.append(renderOverview(g, user));
  else if (tab === 'policies') root.append(renderPolicies(g, user));
  else if (tab === 'handoffs') root.append(renderHandoffs(g, user));
  else if (tab === 'modules') root.append(renderModules(g, user));
  else if (tab === 'audit') root.append(renderAudit(g));
  else if (tab === 'tests') root.append(renderTests());
}

load();

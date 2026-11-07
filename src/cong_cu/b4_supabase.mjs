import { resolve, sep } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { readFileSync, existsSync } from 'node:fs';
import { prepareB4 } from './b4_du_lieu_mau.mjs';
import { taoMayChu } from '../app/server.mjs';
import { taoKho } from '../app/du_lieu.mjs';
import { docCauHinh, thongBaoThieu } from '../../thu_nghiem/ai05/cau_hinh.mjs';
import { runStructured } from '../app/ai_du_lieu.mjs';
import { kiemTraKetNoiSupabase } from '../app/supabase_du_lieu.mjs';

function parseEnv(envPath) {
  if (!existsSync(envPath)) return {};
  const content = readFileSync(envPath, 'utf8');
  const env = {};
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const idx = trimmed.indexOf('=');
    if (idx > 0) {
      const k = trimmed.slice(0, idx).trim();
      const v = trimmed.slice(idx + 1).trim().replace(/^['"](.*)['"]$/, '$1');
      env[k] = v;
    }
  }
  return env;
}

const envFile = resolve(fileURLToPath(new URL('../../.env', import.meta.url)));
const env = parseEnv(envFile);

const urlArg = process.argv.indexOf('--url');
const keyArg = process.argv.indexOf('--key');
const portArg = process.argv.indexOf('--port');

const port = portArg >= 0 ? Number(process.argv[portArg + 1]) : 3096;
const supabaseUrl = (urlArg >= 0 ? process.argv[urlArg + 1] : process.env.SUPABASE_URL || env.SUPABASE_URL || '').trim();
const supabaseKey = (keyArg >= 0 ? process.argv[keyArg + 1] : process.env.SUPABASE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_KEY || env.SUPABASE_SERVICE_ROLE_KEY || '').trim();

if (!supabaseUrl || !supabaseKey) {
  console.error('\n⚠️  CHƯA CÓ CẤU HÌNH SUPABASE!');
  console.error('Để chạy với Supabase, vui lòng mở file .env và điền:');
  console.error('  SUPABASE_URL=https://<project-id>.supabase.co');
  console.error('  SUPABASE_KEY=<anon-key-hoặc-service-role-key>');
  console.error('\nHoặc chạy với tham số:');
  console.error('  node src/cong_cu/b4_supabase.mjs --url <URL> --key <KEY>\n');
  process.exit(1);
}

const check = await kiemTraKetNoiSupabase({ supabaseUrl, supabaseKey });
if (!check.ok) {
  console.error(`\n❌ Không thể kết nối tới Supabase: ${check.message}`);
  console.error('Vui lòng kiểm tra lại URL, API Key hoặc chạy file schema_supabase.sql trên Supabase SQL Editor.\n');
  process.exit(1);
}

const data = resolve(fileURLToPath(new URL('../../data/', import.meta.url)));
const target = resolve(data, 'hr1-buoi4');
const root = pathToFileURL(target + sep);

try {
  await prepareB4(root);
  const config = docCauHinh();
  const server = taoMayChu({
    port,
    b4Mode: true,
    workflowRoot: root,
    store: taoKho(new URL('legacy/', root)),
    config,
    runWorkflowAI: runStructured,
    governanceDecision: { authority: 'GDNS', scopeMode: 'ASSIGNED', source: 'MẪU B4' },
    supabaseConfig: { supabaseUrl, supabaseKey }
  });

  server.on('error', e => {
    console.error(e.code === 'EADDRINUSE' ? `Cổng ${port} đang được dùng. Mở địa chỉ hiện có hoặc đóng tiến trình chiếm cổng.` : 'Không mở được máy chủ.');
    process.exitCode = 1;
  });

  server.listen(port, '127.0.0.1', () => {
    console.log(`\n🚀 HR1 Buổi 4 (Lưu trữ SUPABASE): http://127.0.0.1:${port}/`);
    console.log(`📡 Đã kết nối Supabase: ${supabaseUrl}`);
    console.log('🔑 Đăng nhập bằng tài khoản mẫu: admin / mai / hr01 / minh / nam... (mật khẩu: MauB4@2026!123)');
    console.log(thongBaoThieu(config) || 'AI sẵn cấu hình.');
    console.log('Nhấn Ctrl+C để dừng máy chủ.\n');
  });
} catch (e) {
  console.error('Chưa mở được app: ' + (e.publicMessage || e.message));
  process.exitCode = 1;
}

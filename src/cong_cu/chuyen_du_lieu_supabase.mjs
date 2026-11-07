import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFileSync, existsSync } from 'node:fs';
import { chuyenDuLieuLocalSangSupabase, kiemTraKetNoiSupabase } from '../app/supabase_du_lieu.mjs';

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

const supabaseUrl = (urlArg >= 0 ? process.argv[urlArg + 1] : process.env.SUPABASE_URL || env.SUPABASE_URL || '').trim();
const supabaseKey = (keyArg >= 0 ? process.argv[keyArg + 1] : process.env.SUPABASE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_KEY || env.SUPABASE_SERVICE_ROLE_KEY || '').trim();

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Thiếu SUPABASE_URL hoặc SUPABASE_KEY.');
  console.error('Cách 1: Điền SUPABASE_URL và SUPABASE_KEY vào file .env');
  console.error('Cách 2: node src/cong_cu/chuyen_du_lieu_supabase.mjs --url <URL> --key <KEY>');
  process.exit(1);
}

const localDataDir = resolve(fileURLToPath(new URL('../../data/hr1-buoi4', import.meta.url)));

console.log('Kiểm tra kết nối Supabase...');
const check = await kiemTraKetNoiSupabase({ supabaseUrl, supabaseKey });
if (!check.ok) {
  console.error(`❌ Kết nối thất bại: ${check.message}`);
  console.error('Lưu ý: Hãy chắc chắn bạn đã chạy file schema_supabase.sql trong Supabase SQL Editor trước khi nạp dữ liệu.');
  process.exit(1);
}

console.log('✅ Kết nối thành công!');
try {
  const result = await chuyenDuLieuLocalSangSupabase({ supabaseUrl, supabaseKey, localDataDir });
  console.log(`🎉 Thành công! Đã chuyển ${result.usersCount} tài khoản và ${result.versionsCount} phiên bản quy trình lên Supabase.`);
} catch (e) {
  console.error(`❌ Chuyển dữ liệu lỗi: ${e.message}`);
  process.exit(1);
}

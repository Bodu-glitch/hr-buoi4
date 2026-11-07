import { readFileSync } from 'node:fs';
import { parseEnv } from 'node:util';
import { fileURLToPath } from 'node:url';

export const root = fileURLToPath(new URL('../../', import.meta.url));
export function docCauHinh() {
  // Chỉ máy chủ đọc .env, một lần khi khởi động. Không in giá trị.
  let values = {};
  let loiDoc = false;
  try { values = parseEnv(readFileSync(new URL('../../.env', import.meta.url), 'utf8')); }
  catch { loiDoc = true; }
  const missing = ['AI_PROVIDER', 'AI_MODEL', 'AI_API_KEY'].filter(k => !values[k]?.trim());
  return Object.freeze({
    provider: values.AI_PROVIDER?.trim().toLowerCase() || '',
    model: values.AI_MODEL?.trim() || '',
    key: values.AI_API_KEY?.trim() || '',
    missing, loiDoc,
  });
}

export function thongBaoThieu(config) {
  return config.missing.length
    ? `Thiếu cấu hình: ${config.missing.join(', ')}. Tự điền trong file .env rồi khởi động lại máy chủ.`
    : '';
}

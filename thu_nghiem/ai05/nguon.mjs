import { readFileSync } from 'node:fs';

const base = new URL('../../docs/3_NAO_AI/', import.meta.url);
function layKhoi(file, pointer) {
  const md = readFileSync(new URL(file, base), 'utf8').replace(/\r\n/g, '\n');
  const blocks = [...md.matchAll(/<!-- NGUON_JSON: (\[[^\n]+\]) -->\n(~{4,})text\n([\s\S]*?)\n\2(?:\n|$)/g)];
  const match = blocks.find(m => JSON.parse(m[1]).includes(pointer));
  if (!match || !match[3].trim()) throw new Error('NGUON_KHONG_HOP_LE');
  return match[3];
}

export function chonMuc(content, numbers) {
  const sections = content.split(/(?=^## \d+\.)/m);
  const chosen = sections.filter(s => numbers.includes(Number(s.match(/^## (\d+)\./)?.[1])));
  if (chosen.length !== numbers.length) throw new Error('THIEU_MUC_NGUON');
  return chosen.join('\n');
}

export function docNguon() {
  // Danh sách cố định khớp NAP; không đọc tests, JSON gốc hay toàn bộ docs.
  const instructions = layKhoi('AI05_SANG_LOC_CV/HUONG_DAN.md', '/b2/projects/1/n3_instructions');
  const company = layKhoi('KIEN_THUC_CHUNG/01_KIEN_THUC_NEN.md', '/b2/projects/1/n3_files/0/content');
  const process = layKhoi('AI05_SANG_LOC_CV/02_QUY_TRINH_SANG_LOC_CV.md', '/b2/projects/1/n3_files/1/content');
  const policy = layKhoi('KIEN_THUC_CHUNG/03_SO_TAY_TUYEN_DUNG_HOI_NHAP.md', '/b2/projects/1/n3_files/2/content');
  const format = layKhoi('AI05_SANG_LOC_CV/04_OUTPUT_MAU_SANG_LOC_CV.md', '/b2/projects/1/n3_files/3/content');
  return [
    instructions,
    '01_KIEN_THUC_NEN — chỉ mục 6, 7, 8\n' + chonMuc(company, [6, 7, 8]),
    process,
    '03_SO_TAY_TUYEN_DUNG_HOI_NHAP — chỉ mục 1, 6, 15\n' + chonMuc(policy, [1, 6, 15]),
    format,
  ].join('\n\n---\n\n');
}

-- ==============================================================================
-- SCHEMA SUPABASE CHO DU AN HR BUOI 4
-- ==============================================================================

-- 1. Bảng tài khoản người dùng và phân quyền
CREATE TABLE IF NOT EXISTS hr_users (
  id UUID PRIMARY KEY,
  login TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  roles JSONB NOT NULL DEFAULT '[]'::jsonb,
  salt TEXT NOT NULL,
  hash TEXT NOT NULL,
  active BOOLEAN NOT NULL DEFAULT true,
  audit JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_hr_users_login ON hr_users(login);

-- 2. Bảng lưu trữ phiên bản quy trình (Optimistic Concurrency Workspace Store)
CREATE TABLE IF NOT EXISTS hr_workspace_versions (
  id UUID NOT NULL,
  version INTEGER NOT NULL,
  body JSONB NOT NULL,
  checksum TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  PRIMARY KEY (id, version)
);

CREATE INDEX IF NOT EXISTS idx_hr_workspace_id_ver ON hr_workspace_versions(id, version DESC);

-- 3. Row Level Security (RLS)
ALTER TABLE hr_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE hr_workspace_versions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "App full access hr_users" ON hr_users;
CREATE POLICY "App full access hr_users"
  ON hr_users FOR ALL
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "App full access hr_workspace_versions" ON hr_workspace_versions;
CREATE POLICY "App full access hr_workspace_versions"
  ON hr_workspace_versions FOR ALL
  USING (true)
  WITH CHECK (true);

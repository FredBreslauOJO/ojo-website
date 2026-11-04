-- ═══════════════════════════════════════════════════════════════════════════
-- OJO STUDIO — Supabase Schema
-- ═══════════════════════════════════════════════════════════════════════════
--
-- Instruções de uso:
-- 1. Acesse Supabase Dashboard → SQL Editor
-- 2. Cole e execute este arquivo inteiro
-- 3. Depois, em Storage → New bucket: crie o bucket "portfolio" como PUBLIC
-- 4. Em Authentication → Providers: ative Email (já vem ativo por padrão)
-- 5. Crie um usuário admin em Authentication → Users
--
-- RLS (Row Level Security):
--   - Leitura pública de projetos publicados
--   - Escrita apenas para usuários autenticados
-- ═══════════════════════════════════════════════════════════════════════════


-- ─── EXTENSÕES ───────────────────────────────────────────────────────────────

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- ─── TABELA: projects ─────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS projects (
  id            UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug          TEXT        UNIQUE NOT NULL,
  title         TEXT        NOT NULL,
  client        TEXT,
  category      TEXT[],               -- ex: {"Branding","Identidade"}
  year          INTEGER,
  cover_image   TEXT,                 -- URL pública do Supabase Storage
  images        TEXT[],               -- URLs adicionais
  excerpt       TEXT,                 -- Resumo curto (fallback quando locale não tem)
  description   TEXT,                 -- Descrição longa (fallback)
  tags          TEXT[],               -- Tags livres para busca
  featured      BOOLEAN     NOT NULL DEFAULT false,
  published     BOOLEAN     NOT NULL DEFAULT false,
  order_index   INTEGER     NOT NULL DEFAULT 0,

  -- Localização: JSONB com os campos title, excerpt, description por idioma
  locale_pt     JSONB,               -- { "title": "...", "excerpt": "...", "description": "..." }
  locale_en     JSONB,               -- { "title": "...", "excerpt": "...", "description": "..." }

  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_projects_published   ON projects (published);
CREATE INDEX IF NOT EXISTS idx_projects_featured    ON projects (featured) WHERE published = true;
CREATE INDEX IF NOT EXISTS idx_projects_order       ON projects (order_index);
CREATE INDEX IF NOT EXISTS idx_projects_slug        ON projects (slug);

-- Comentários
COMMENT ON TABLE  projects              IS 'Projetos do portfolio OJO Studio';
COMMENT ON COLUMN projects.locale_pt   IS 'Campos traduzidos em português';
COMMENT ON COLUMN projects.locale_en   IS 'Campos traduzidos em inglês';
COMMENT ON COLUMN projects.order_index IS 'Posição na listagem; alterado via drag-and-drop no admin';


-- ─── TABELA: contact_messages ─────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS contact_messages (
  id         UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  name       TEXT        NOT NULL,
  company    TEXT,
  email      TEXT        NOT NULL,
  type       TEXT,                   -- tipo de projeto
  message    TEXT        NOT NULL,
  read       BOOLEAN     NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_messages_read ON contact_messages (read);

COMMENT ON TABLE contact_messages IS 'Mensagens recebidas pelo formulário de contato';


-- ─── UPDATED_AT TRIGGER ──────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_projects_updated_at ON projects;
CREATE TRIGGER trg_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();


-- ═══════════════════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY
-- ═══════════════════════════════════════════════════════════════════════════

ALTER TABLE projects          ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages  ENABLE ROW LEVEL SECURITY;


-- ─── projects: leitura pública (somente publicados) ──────────────────────────

DROP POLICY IF EXISTS "projects_public_read"  ON projects;
CREATE POLICY "projects_public_read"
  ON projects FOR SELECT
  USING (published = true);


-- ─── projects: leitura total para autenticados ───────────────────────────────

DROP POLICY IF EXISTS "projects_auth_read"    ON projects;
CREATE POLICY "projects_auth_read"
  ON projects FOR SELECT
  TO authenticated
  USING (true);


-- ─── projects: escrita restrita a autenticados ───────────────────────────────

DROP POLICY IF EXISTS "projects_auth_insert"  ON projects;
CREATE POLICY "projects_auth_insert"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "projects_auth_update"  ON projects;
CREATE POLICY "projects_auth_update"
  ON projects FOR UPDATE
  TO authenticated
  USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "projects_auth_delete"  ON projects;
CREATE POLICY "projects_auth_delete"
  ON projects FOR DELETE
  TO authenticated
  USING (true);


-- ─── contact_messages: inserção pública (formulário) ─────────────────────────

DROP POLICY IF EXISTS "messages_public_insert" ON contact_messages;
CREATE POLICY "messages_public_insert"
  ON contact_messages FOR INSERT
  WITH CHECK (true);


-- ─── contact_messages: leitura e atualização apenas para autenticados ─────────

DROP POLICY IF EXISTS "messages_auth_read"    ON contact_messages;
CREATE POLICY "messages_auth_read"
  ON contact_messages FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "messages_auth_update"  ON contact_messages;
CREATE POLICY "messages_auth_update"
  ON contact_messages FOR UPDATE
  TO authenticated
  USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "messages_auth_delete"  ON contact_messages;
CREATE POLICY "messages_auth_delete"
  ON contact_messages FOR DELETE
  TO authenticated
  USING (true);


-- ═══════════════════════════════════════════════════════════════════════════
-- STORAGE: bucket "portfolio"
-- ═══════════════════════════════════════════════════════════════════════════
--
-- Atenção: o Supabase Storage é configurado no Dashboard, não via SQL.
-- Execute os passos abaixo manualmente:
--
--   1. Storage → New bucket
--   2. Nome: portfolio
--   3. Marcar como PUBLIC
--   4. File size limit: 10 MB (recomendado)
--   5. Allowed MIME types: image/jpeg, image/png, image/webp, image/gif
--
-- As políticas abaixo são aplicadas via SQL após criar o bucket:

-- Leitura pública de arquivos
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio', 'portfolio', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "portfolio_public_read"  ON storage.objects;
CREATE POLICY "portfolio_public_read"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'portfolio');

DROP POLICY IF EXISTS "portfolio_auth_upload"  ON storage.objects;
CREATE POLICY "portfolio_auth_upload"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'portfolio');

DROP POLICY IF EXISTS "portfolio_auth_delete"  ON storage.objects;
CREATE POLICY "portfolio_auth_delete"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'portfolio');


-- ═══════════════════════════════════════════════════════════════════════════
-- DADOS INICIAIS (opcional — projetos de exemplo para testar)
-- ═══════════════════════════════════════════════════════════════════════════
-- Descomente abaixo para inserir um projeto de exemplo:

/*
INSERT INTO projects (slug, title, client, category, year, excerpt, published, featured, order_index, locale_pt, locale_en)
VALUES (
  'projeto-exemplo',
  'Projeto Exemplo',
  'Cliente Exemplo',
  ARRAY['Identidade', 'Branding'],
  2024,
  'Um projeto de exemplo para testar o portfolio.',
  true,
  true,
  0,
  '{"title": "Projeto Exemplo", "excerpt": "Um projeto de exemplo.", "description": "Descrição completa em português."}',
  '{"title": "Sample Project", "excerpt": "A sample project.", "description": "Full description in English."}'
);
*/

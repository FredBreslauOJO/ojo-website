/**
 * OJO STUDIO — Supabase Client
 *
 * Inicializa a conexão com o Supabase.
 * Preencha as variáveis abaixo com os dados do seu projeto.
 *
 * IMPORTANTE: a chave `anon` (pública) é segura para expor
 * no front-end desde que o RLS esteja configurado corretamente.
 * NUNCA exponha a `service_role` key aqui.
 */

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

// ─── Configuração ─── //
// Substitua pelos valores do seu projeto em:
// Supabase Dashboard → Settings → API
const SUPABASE_URL  = 'https://znlglyeaceenywgkfhid.supabase.co'
const SUPABASE_ANON = 'sb_publishable_QO1RQqlZpVjriLlLzl55iA_jbFO5XSN'

// ─── Client singleton ─── //
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
})

export default supabase

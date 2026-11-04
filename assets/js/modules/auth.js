/**
 * OJO STUDIO — Auth Module
 *
 * Gerencia autenticação via Supabase Auth.
 * Usado pelo painel admin e pelas páginas que precisam de sessão.
 */

import supabase from '../config/supabase.js'

// ─── Login com email/senha ─── //
export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim().toLowerCase(),
    password,
  })

  if (error) throw error
  return data
}

// ─── Logout ─── //
export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

// ─── Sessão atual ─── //
export async function getSession() {
  const { data: { session }, error } = await supabase.auth.getSession()
  if (error) throw error
  return session
}

// ─── Usuário atual ─── //
export async function getUser() {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) throw error
  return user
}

// ─── Redireciona para login se não autenticado ─── //
// Use nas páginas do admin no início do script:
// await requireAuth()
export async function requireAuth(redirectTo = '/admin/login.html') {
  const session = await getSession()
  if (!session) {
    window.location.href = redirectTo
    return null
  }
  return session
}

// ─── Redireciona para dashboard se já autenticado ─── //
// Use na página de login:
// await redirectIfAuthenticated()
export async function redirectIfAuthenticated(redirectTo = '/admin/index.html') {
  const session = await getSession()
  if (session) {
    window.location.href = redirectTo
  }
}

// ─── Escuta mudanças de sessão ─── //
export function onAuthStateChange(callback) {
  return supabase.auth.onAuthStateChange((event, session) => {
    callback(event, session)
  })
}

// ─── Alterar senha ─── //
export async function updatePassword(newPassword) {
  const { error } = await supabase.auth.updateUser({ password: newPassword })
  if (error) throw error
}

// ─── Recuperação de senha via email ─── //
export async function resetPasswordByEmail(email) {
  const { error } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
    redirectTo: `${window.location.origin}/admin/reset-password.html`,
  })
  if (error) throw error
}

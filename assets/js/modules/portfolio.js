/**
 * OJO STUDIO — Portfolio Module
 *
 * CRUD completo para projetos do portfolio.
 * Leitura é pública; escrita exige autenticação.
 */

import supabase from '../config/supabase.js'

const TABLE = 'projects'

// ─── LEITURA (pública) ─── //

/** Lista todos os projetos publicados, ordenados. */
export async function getProjects({ publishedOnly = true, locale = 'pt' } = {}) {
  let query = supabase
    .from(TABLE)
    .select('id, slug, title, client, category, year, cover_image, featured, order_index, locale_pt, locale_en')
    .order('order_index', { ascending: true })

  if (publishedOnly) {
    query = query.eq('published', true)
  }

  const { data, error } = await query
  if (error) throw error

  return data.map(p => applyLocale(p, locale))
}

/** Busca um projeto pelo slug. */
export async function getProjectBySlug(slug, locale = 'pt') {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (error) throw error
  return applyLocale(data, locale)
}

/** Projetos em destaque. */
export async function getFeaturedProjects(limit = 3, locale = 'pt') {
  const { data, error } = await supabase
    .from(TABLE)
    .select('id, slug, title, client, category, year, cover_image, order_index, locale_pt, locale_en')
    .eq('published', true)
    .eq('featured', true)
    .order('order_index', { ascending: true })
    .limit(limit)

  if (error) throw error
  return data.map(p => applyLocale(p, locale))
}

// ─── ESCRITA (admin autenticado) ─── //

/** Cria um novo projeto. */
export async function createProject(projectData) {
  const payload = sanitizePayload(projectData)

  // Gera slug se não fornecido
  if (!payload.slug) {
    payload.slug = slugify(payload.title)
  }

  const { data, error } = await supabase
    .from(TABLE)
    .insert([payload])
    .select()
    .single()

  if (error) throw error
  return data
}

/** Atualiza um projeto existente. */
export async function updateProject(id, projectData) {
  const payload = {
    ...sanitizePayload(projectData),
    updated_at: new Date().toISOString(),
  }

  const { data, error } = await supabase
    .from(TABLE)
    .update(payload)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

/** Deleta um projeto. */
export async function deleteProject(id) {
  const { error } = await supabase
    .from(TABLE)
    .delete()
    .eq('id', id)

  if (error) throw error
}

/** Atualiza a ordem dos projetos (drag-and-drop). */
export async function reorderProjects(orderedIds) {
  const updates = orderedIds.map((id, index) => ({
    id,
    order_index: index,
    updated_at: new Date().toISOString(),
  }))

  const { error } = await supabase
    .from(TABLE)
    .upsert(updates, { onConflict: 'id' })

  if (error) throw error
}

/** Alterna publicação. */
export async function togglePublished(id, published) {
  const { data, error } = await supabase
    .from(TABLE)
    .update({ published, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select('id, published')
    .single()

  if (error) throw error
  return data
}

// ─── UPLOAD DE IMAGEM ─── //

/** Faz upload de uma imagem para o Storage. */
export async function uploadImage(file, folder = 'covers') {
  const ext   = file.name.split('.').pop()
  const name  = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

  const { data, error } = await supabase.storage
    .from('portfolio')
    .upload(name, file, { cacheControl: '3600', upsert: false })

  if (error) throw error

  const { data: { publicUrl } } = supabase.storage
    .from('portfolio')
    .getPublicUrl(data.path)

  return publicUrl
}

/** Remove uma imagem do Storage. */
export async function deleteImage(url) {
  // Extrai o path relativo da URL pública
  const path = url.split('/portfolio/')[1]
  if (!path) return

  const { error } = await supabase.storage
    .from('portfolio')
    .remove([path])

  if (error) throw error
}

// ─── HELPERS ─── //

/** Aplica localização (pt / en) ao projeto. */
function applyLocale(project, locale) {
  const loc = locale === 'en' ? project.locale_en : project.locale_pt
  if (!loc) return project

  return {
    ...project,
    title:       loc.title       ?? project.title,
    description: loc.description ?? project.description,
    excerpt:     loc.excerpt     ?? project.excerpt,
  }
}

/** Gera slug a partir de texto. */
export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

/** Limpa o payload antes de enviar ao banco. */
function sanitizePayload(data) {
  const allowed = [
    'slug', 'title', 'client', 'category', 'year',
    'description', 'excerpt', 'cover_image', 'images',
    'tags', 'order_index', 'published', 'featured',
    'locale_pt', 'locale_en',
  ]

  return Object.fromEntries(
    Object.entries(data)
      .filter(([key]) => allowed.includes(key))
      .map(([key, val]) => [key, val ?? null])
  )
}

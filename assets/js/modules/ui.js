/**
 * OJO STUDIO — UI Helpers
 *
 * Toast, modal, loading states e outros utilitários de UI.
 */

// ─── TOAST ─── //

let toastContainer = null

function getToastContainer() {
  if (!toastContainer) {
    toastContainer = document.createElement('div')
    toastContainer.className = 'toast-container'
    document.body.appendChild(toastContainer)
  }
  return toastContainer
}

/**
 * Exibe um toast.
 * @param {string} message
 * @param {'default'|'success'|'error'} type
 * @param {number} duration ms
 */
export function showToast(message, type = 'default', duration = 3500) {
  const container = getToastContainer()

  const toast = document.createElement('div')
  toast.className = `toast toast--${type}`
  toast.innerHTML = `
    <span class="toast__dot"></span>
    <span>${message}</span>
  `

  container.appendChild(toast)

  // Anima entrada
  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('toast--show'))
  })

  // Remove após duração
  setTimeout(() => {
    toast.classList.remove('toast--show')
    toast.addEventListener('transitionend', () => toast.remove(), { once: true })
  }, duration)
}

// ─── MODAL ─── //

/**
 * Cria e exibe um modal.
 * @param {{ title: string, body: string|HTMLElement, footer?: string|HTMLElement, onClose?: () => void }} opts
 * @returns {{ close: () => void }}
 */
export function openModal({ title, body, footer, onClose } = {}) {
  const backdrop = document.createElement('div')
  backdrop.className = 'modal-backdrop'

  const bodyHTML = typeof body === 'string' ? body : ''

  backdrop.innerHTML = `
    <div class="modal" role="dialog" aria-modal="true">
      <div class="modal__header">
        <span class="modal__title">${title ?? ''}</span>
        <button class="btn btn--ghost btn--icon btn-close-modal" aria-label="Fechar">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
      <div class="modal__body">${bodyHTML}</div>
      ${footer ? `<div class="modal__footer"></div>` : ''}
    </div>
  `

  // Insere body e footer como elemento se não for string
  if (body instanceof HTMLElement) {
    backdrop.querySelector('.modal__body').innerHTML = ''
    backdrop.querySelector('.modal__body').appendChild(body)
  }
  if (footer instanceof HTMLElement) {
    backdrop.querySelector('.modal__footer').appendChild(footer)
  }

  document.body.appendChild(backdrop)

  // Abre
  requestAnimationFrame(() => {
    requestAnimationFrame(() => backdrop.classList.add('modal-backdrop--open'))
  })

  const close = () => {
    backdrop.classList.remove('modal-backdrop--open')
    backdrop.addEventListener('transitionend', () => {
      backdrop.remove()
      onClose?.()
    }, { once: true })
  }

  // Fecha ao clicar fora ou no X
  backdrop.addEventListener('click', e => {
    if (e.target === backdrop) close()
  })
  backdrop.querySelector('.btn-close-modal').addEventListener('click', close)

  // Fecha com Esc
  const onKey = e => { if (e.key === 'Escape') { close(); document.removeEventListener('keydown', onKey) } }
  document.addEventListener('keydown', onKey)

  return { close }
}

// ─── CONFIRM DIALOG ─── //

/**
 * Abre um diálogo de confirmação.
 * @returns {Promise<boolean>}
 */
export function confirm({ title = 'Confirmar?', message = '', confirmLabel = 'Confirmar', danger = false } = {}) {
  return new Promise(resolve => {
    const footer = document.createElement('div')
    footer.className = 'flex gap-4 justify-end'
    footer.style.width = '100%'

    footer.innerHTML = `
      <button class="btn btn--secondary btn--sm" data-action="cancel">Cancelar</button>
      <button class="btn btn--${danger ? 'danger' : 'primary'} btn--sm" data-action="confirm">${confirmLabel}</button>
    `

    const { close } = openModal({
      title,
      body: `<p style="color: var(--color-muted); font-size: var(--text-sm); line-height: 1.6">${message}</p>`,
      footer,
    })

    footer.querySelector('[data-action="cancel"]').addEventListener('click', () => {
      close()
      resolve(false)
    })

    footer.querySelector('[data-action="confirm"]').addEventListener('click', () => {
      close()
      resolve(true)
    })
  })
}

// ─── LOADING STATE em botão ─── //

/**
 * Ativa estado de loading em um botão.
 * @returns {() => void} Função para restaurar
 */
export function setButtonLoading(btn, loading = true) {
  if (loading) {
    btn.dataset.originalText = btn.innerHTML
    btn.classList.add('btn--loading')
    btn.disabled = true
  } else {
    btn.innerHTML = btn.dataset.originalText ?? btn.innerHTML
    btn.classList.remove('btn--loading')
    btn.disabled = false
  }
}

// ─── SCROLL NAV ─── //

/** Adiciona classe `.nav--scrolled` quando a página rola. */
export function initScrollNav(navSelector = '.nav') {
  const nav = document.querySelector(navSelector)
  if (!nav) return

  const update = () => nav.classList.toggle('nav--scrolled', window.scrollY > 20)
  window.addEventListener('scroll', update, { passive: true })
  update()
}

// ─── TEMA ─── //

export function getTheme() {
  return document.documentElement.dataset.theme ?? 'system'
}

export function setTheme(theme) {
  if (theme === 'system') {
    delete document.documentElement.dataset.theme
  } else {
    document.documentElement.dataset.theme = theme
  }
  try { localStorage.setItem('ojo-theme', theme) } catch (_) {}
}

export function initTheme() {
  try {
    const saved = localStorage.getItem('ojo-theme')
    if (saved) setTheme(saved)
  } catch (_) {}
}

// ─── LANG ─── //

export function getLang() {
  try { return localStorage.getItem('ojo-lang') ?? 'pt' } catch (_) { return 'pt' }
}

export function setLang(lang) {
  try { localStorage.setItem('ojo-lang', lang) } catch (_) {}
  window.location.reload()
}

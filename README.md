# OJO Studio — Site

Infraestrutura completa do site OJO Studio: portfolio público + painel admin.

## Stack

- HTML / CSS / JS puro (sem build step — funciona no GitHub Pages)
- ES Modules (`<script type="module">`)
- Supabase (banco de dados, auth, storage)
- Fontes: Helvetica Neue (corpo) + Gloock (display)

---

## Configuração inicial

### 1. Supabase

1. Acesse [supabase.com](https://supabase.com) e crie um projeto
2. No SQL Editor, execute todo o conteúdo de `schema.sql`
3. Em **Storage → New bucket**: crie o bucket `portfolio` como **Public**
4. Em **Authentication → Users**: crie o usuário admin

### 2. Configurar credenciais no código

Edite o arquivo `assets/js/config/supabase.js`:

```js
const SUPABASE_URL  = 'https://SEU-PROJETO.supabase.co'   // ← substitua
const SUPABASE_ANON = 'SUA-CHAVE-ANON-PUBLICA'            // ← substitua
```

Os valores estão em **Supabase Dashboard → Settings → API**.

### 3. GitHub Pages

1. Suba a pasta para um repositório GitHub
2. Em Settings → Pages: selecione a branch `main` e a pasta `/` (root)
3. O site estará em `https://seu-usuario.github.io/ojo-site/`

---

## Estrutura de arquivos

```
ojo-site/
├── assets/
│   ├── css/
│   │   ├── tokens.css       ← Design tokens (cores, fontes, espaçamentos)
│   │   ├── base.css         ← Reset + tipografia base
│   │   ├── components.css   ← Componentes reutilizáveis (nav, cards, botões...)
│   │   ├── layout.css       ← Macro-layouts (grid, sections, hero...)
│   │   └── admin.css        ← Estilos exclusivos do painel admin
│   └── js/
│       ├── config/
│       │   └── supabase.js  ← Singleton do cliente Supabase ← PREENCHER AQUI
│       └── modules/
│           ├── auth.js      ← Autenticação (login, logout, sessão)
│           ├── portfolio.js ← CRUD completo dos projetos
│           └── ui.js        ← Toast, modal, tema, idioma
│
├── admin/
│   ├── index.html           ← Dashboard admin (stats + acesso rápido)
│   ├── login.html           ← Tela de login
│   └── portfolio.html       ← Gerenciamento completo do portfolio
│
├── index.html               ← Home (placeholder para experiência 3D do Fred)
├── sobre.html               ← Página Sobre
├── portfolio.html           ← Listagem pública do portfolio
├── contato.html             ← Formulário de contato
└── schema.sql               ← Schema do banco de dados (executar no Supabase)
```

---

## CSS em camadas

Cada arquivo CSS é independente e editável separadamente:

| Arquivo | O que contém |
|---------|-------------|
| `tokens.css` | Todas as variáveis CSS (cores, fontes, espaços, radii) |
| `base.css` | Reset, tipografia, estilos de elementos HTML |
| `components.css` | Nav, footer, botões, cards, formulários, modal, toast |
| `layout.css` | Page wrappers, grid 12-col, sections, hero, portfolio grid |
| `admin.css` | Sidebar, topbar, tabelas, upload zone (só no admin) |

Para mudar a identidade visual, edite principalmente `tokens.css`.

---

## Painel Admin

Acesse em `/admin/login.html`.

Funcionalidades:
- Dashboard com estatísticas (projetos publicados, mensagens)
- Gestão completa do portfolio: criar, editar, excluir, reordenar (drag & drop)
- Upload de imagens (Supabase Storage)
- Suporte a PT / EN via campos `locale_pt` e `locale_en`
- Marcar projetos como publicados e/ou em destaque

---

## Idiomas

O site suporta PT e EN. O visitante alterna pelo botão PT / EN na nav.

No banco, cada projeto tem as colunas `locale_pt` e `locale_en` (JSONB):

```json
{
  "title": "Título traduzido",
  "excerpt": "Resumo curto",
  "description": "Descrição completa"
}
```

O módulo `portfolio.js` aplica a tradução automaticamente via `applyLocale()`.

---

## Próximos passos

- [ ] Home: integrar experiência 3D do Fred (substituir o placeholder em `index.html`)
- [ ] Página de case individual: `portfolio/[slug].html`
- [ ] Página de mensagens no admin: `admin/mensagens.html`
- [ ] Reset de senha: `admin/reset-password.html`
- [ ] Configurar domínio customizado no GitHub Pages

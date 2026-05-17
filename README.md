# Biennale Arte 2026 — In Minor Keys

Guia editorial interativo da 61ª Bienal de Arte de Veneza (9 mai → 22 nov 2026), com pavilhões nacionais, eventos colaterais, museus e ~150 artistas catalogados.

Stack: **Vite + React + Tailwind + Supabase**. Deploy: **Netlify**.

---

## Estrutura

```
biennale-app/
├── index.html               # entry HTML (Vite)
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── netlify.toml             # config de deploy Netlify
├── .env.example             # variáveis de ambiente
├── src/
│   ├── main.jsx             # bootstrap React
│   ├── index.css            # estilos globais + tema editorial
│   ├── App.jsx              # roteamento por estado + carregamento de dados
│   ├── components/
│   │   ├── Layout.jsx       # Header + Footer
│   │   ├── Home.jsx
│   │   ├── PavilionList.jsx # Giardini / Arsenale (editorial long-form)
│   │   ├── CityPavilions.jsx
│   │   ├── Collateral.jsx
│   │   ├── Parallel.jsx     # Museus + galerias comerciais
│   │   ├── Artists.jsx      # Índice mestre (A→Z ou por local)
│   │   ├── MapView.jsx      # Mapa + barra lateral + matriz
│   │   ├── VeniceMap.jsx    # SVG estilizado de Veneza
│   │   ├── Itineraries.jsx  # Roteiros sugeridos
│   │   └── Drawer.jsx       # Painel lateral de detalhes
│   ├── data/                # JSON modules — fallback local
│   │   ├── festival.js
│   │   ├── zones.js         # Zonas geográficas + grafo de deslocamento
│   │   ├── bios.js          # ~100 biografias detalhadas
│   │   ├── venueArtists.js  # venue ↔ artist mapping
│   │   ├── mainExhibition.js
│   │   ├── pavilionsGiardini.js
│   │   ├── pavilionsArsenale.js
│   │   ├── pavilionsCity.js
│   │   ├── collateral.js
│   │   ├── parallel.js
│   │   └── itineraries.js
│   └── lib/
│       ├── supabase.js      # client @supabase/supabase-js
│       ├── dataStore.js     # camada unificada: Supabase OU JSON local
│       └── travelTimes.js   # Floyd-Warshall sobre o grafo de zonas
├── scripts/
│   └── seed-supabase.mjs    # popular tabelas via service role
└── supabase/
    └── schema.sql           # CREATE TABLE + RLS
```

---

## Dev local

```bash
npm install
npm run dev          # http://localhost:5173
```

Por padrão, o app roda **100% offline** com os dados em `src/data/`.

---

## Conectar ao Supabase

### 1. Criar o projeto e rodar o schema

1. Crie um projeto em [supabase.com](https://supabase.com).
2. No SQL Editor, rode o conteúdo de `supabase/schema.sql`. Cria as tabelas + RLS de leitura pública.
3. Em **Settings → API**, copie `URL`, `anon key` e `service_role key`.

### 2. Popular as tabelas (seed)

```bash
cp .env.example .env.local
# edite .env.local preenchendo SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY
npm run seed
```

O script `scripts/seed-supabase.mjs` insere:

- ~100 bios
- ~150 venues (todos os pavilhões + colaterais + museus)
- ~70 relações venue ↔ artista
- ~90 participantes da mostra principal
- 4 roteiros com suas etapas

### 3. Conectar o front-end

```bash
# em .env.local
VITE_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=public-anon-key
```

Reinicie o `npm run dev`. O `dataStore.js` detecta as variáveis e passa a buscar tudo do Supabase. Se a chamada falhar (e.g. tabelas ainda vazias), faz fallback automático para os dados locais.

---

## Deploy Netlify

### Opção A — via Netlify CLI

```bash
npm install -g netlify-cli
netlify init
netlify env:set VITE_SUPABASE_URL https://YOUR-PROJECT.supabase.co
netlify env:set VITE_SUPABASE_ANON_KEY public-anon-key
netlify deploy --prod
```

### Opção B — drag-and-drop

```bash
npm run build
# Arraste a pasta dist/ em app.netlify.com/drop
```

Lembre de configurar as variáveis de ambiente em **Site settings → Build & deploy → Environment** se quiser conectar ao Supabase em produção. Sem essas vars o site funciona da mesma forma com os dados locais.

### Opção C — git push

Conecte o repositório ao Netlify; o `netlify.toml` já está configurado:

- `npm run build`
- publish dir: `dist`
- redirect SPA para `/index.html`

---

## Adicionar autenticação e favoritos (opcional)

O schema inclui a tabela `user_favorites` com RLS por usuário (`auth.uid()`). Para habilitar:

1. No painel Supabase, ative o provedor de Auth desejado (Email, Google, etc.).
2. Importe `supabase` de `src/lib/supabase.js` no componente onde quiser usar `supabase.auth.signInWithOAuth(...)` ou similar.
3. Use `supabase.from('user_favorites').insert/select/delete` para gerenciar.

---

## Onde editar conteúdo

| O que            | Onde                         |
| ---------------- | ---------------------------- |
| Bios de artistas | `src/data/bios.js`           |
| Pavilhões        | `src/data/pavilions*.js`     |
| Mapeamento artista→local | `src/data/venueArtists.js` |
| Roteiros         | `src/data/itineraries.js`    |
| Zonas/distâncias | `src/data/zones.js`          |
| Cores / tipografia | `src/index.css` + `tailwind.config.js` |

Depois de editar, rode `npm run seed` para refletir as mudanças no Supabase (se estiver usando).

---

## Créditos

- Curadoria oficial da Bienal: equipe Koyo Kouoh (Gabe Beckhurst Feijoo, Marie Hélène Pereira, Rasha Salti) — *In Minor Keys*.
- Dados compilados de labiennale.org, The Art Newspaper, ArtNews, Hyperallergic, Artforum, ArtReview, e-flux, Artsy, universes.art e veículos especializados.
- Este guia é não-oficial; sempre confirme em labiennale.org antes de ir.

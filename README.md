# Biennale Arte 2026 — In Minor Keys

Guia editorial interativo da 61ª Bienal de Arte de Veneza (9 mai → 22 nov 2026), com pavilhões nacionais, eventos colaterais, museus e ~150 artistas catalogados.

Stack: **Vite + React + Tailwind + Supabase**. Deploy: **Netlify**.

O guia se orienta a partir de você: escolhido um ponto de partida no cabeçalho (“Você está em”), cada local do site passa a mostrar quantos minutos leva chegar até lá, e as listas podem ser reordenadas por proximidade.

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
│   │   ├── ui.jsx           # peças compartilhadas (PageHead, Tick, ArtistBios…)
│   │   ├── Layout.jsx       # Header + Footer + seletor de ponto de partida
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
│       └── travelTimes.js   # Floyd-Warshall sobre o grafo de zonas + minutesFrom()
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
| Zonas do seletor “Você está em” | `src/data/zones.js` (`ZONE_NAMES`, `EDGES`) |

Depois de editar, rode `npm run seed` para refletir as mudanças no Supabase (se estiver usando).

---

## Sistema visual

Dois temas, um só conjunto de tokens em `src/index.css`:

| Tema | Atributo | Fundo |
| --- | --- | --- |
| Notturno (padrão) | `data-theme="notturno"` | laguna ao anoitecer |
| Pietra | `data-theme="pietra"` | pedra d'Istria clara |

Nenhum componente escreve cor literal — tudo passa por custom properties (`--ground`, `--verde`, `--ottone`…), inclusive o SVG do mapa. Para mexer na paleta, mexa só nos dois blocos no topo de `src/index.css`.

Tipografia em três papéis, servidos pelo próprio site via `@fontsource` (nada bloqueia o render num terceiro):

| Papel | Fonte | Onde |
| --- | --- | --- |
| Display | Fraunces (variável, eixos `SOFT`/`WONK`) | títulos, nomes de artistas — classe `.u-display` |
| Corpo | Newsreader (variável, eixo `opsz`) | biografias e textos corridos — classe `.u-prose` |
| Dado | IBM Plex Mono | minutos, datas, contagens, etiquetas, a matriz — classes `.u-mono`, `.u-eyebrow`, `.tick` |

## Rotas

A navegação usa hash: `#/giardini`, `#/map`, e `#/giardini/brasil` para abrir a ficha de um local. Isso faz o botão “voltar” funcionar e torna qualquer local compartilhável por link. O `netlify.toml` já redireciona tudo para `/index.html`.

## Créditos

- Curadoria oficial da Bienal: equipe Koyo Kouoh (Gabe Beckhurst Feijoo, Marie Hélène Pereira, Rasha Salti) — *In Minor Keys*.
- Dados compilados de labiennale.org, The Art Newspaper, ArtNews, Hyperallergic, Artforum, ArtReview, e-flux, Artsy, universes.art e veículos especializados.
- Este guia é não-oficial; sempre confirme em labiennale.org antes de ir.

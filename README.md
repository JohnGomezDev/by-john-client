# Client — Portfolio Frontend

Monorepo del frontend del portafolio personal: landing pública, blog y panel de administración. Consume la **Portfolio API** (contrato en [`API.md`](./API.md)).

Gestión con **Turborepo** + **pnpm workspaces**. Cada app es un proyecto Next.js 16 (App Router) independiente, con packages compartidos bajo `@repo/*`.

---

## Estado del proyecto

| App          | Puerto | Estado        | Descripción                                                                            |
| ------------ | ------ | ------------- | -------------------------------------------------------------------------------------- |
| `apps/admin` | `3001` | Operativa     | Panel de administración (auth, CRUD de posts/categorías/tags, canciones favoritas)     |
| `apps/blog`  | `3002` | Operativa     | Blog público (listado, detalle, SEO, páginas legales)                                  |
| `apps/web`   | `3000` | **Pendiente** | Landing / portafolio personal — solo scaffold de Next.js; falta el desarrollo completo |

---

## Stack

| Tecnología                                     | Uso                                                |
| ---------------------------------------------- | -------------------------------------------------- |
| [Next.js 16](https://nextjs.org/) (App Router) | Apps `admin`, `blog`, `web`                        |
| React 19 + TypeScript 5.9                      | UI y tipado estricto                               |
| Tailwind CSS 4                                 | Estilos en las tres apps                           |
| [shadcn/ui](https://ui.shadcn.com/) + Radix    | Primitivos UI en `admin` y `blog` (vía `@repo/ui`) |
| TanStack Query v5                              | Estado de servidor                                 |
| Redux Toolkit                                  | Solo en `admin` (sesión auth + UI)                 |
| Axios                                          | Solo en `admin` (HTTP autenticado + refresh)       |
| Native `fetch`                                 | `blog` (y futuro `web`) — lecturas públicas / SSR  |
| React Hook Form                                | Formularios en `admin`                             |
| MDXEditor                                      | Editor de contenido de posts en `admin`            |
| react-markdown + rehype/remark                 | Render de Markdown compartido (`@repo/modules`)    |
| Turborepo + pnpm 9                             | Orquestación del monorepo                          |

---

## Estructura del monorepo

```
client/
├── apps/
│   ├── admin/          # Panel privado — auth, CRUD, canciones
│   ├── blog/           # Blog público — SEO, listado y detalle de posts
│   └── web/            # Landing / portafolio — ⚠️ por desarrollar
├── packages/
│   ├── ui/             # @repo/ui — componentes compartidos (shadcn + utilidades)
│   ├── lib/            # @repo/lib — clientes HTTP, tipos API, hooks/utils genéricos
│   ├── modules/        # @repo/modules — módulos de dominio compartidos (p. ej. Markdown)
│   ├── eslint-config/  # @repo/eslint-config
│   └── typescript-config/  # @repo/typescript-config
├── API.md              # Contrato HTTP del backend (referencia para el frontend)
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

**Regla de dependencias:** `apps/ → packages/`. Los packages nunca importan desde apps. Las apps no se importan entre sí.

---

## Apps

### `apps/admin` — Panel de administración

Aplicación autenticada para gestionar el contenido del blog y la canción favorita del portafolio.

**Módulos** (`src/modules/`):

| Módulo       | Responsabilidad                                      |
| ------------ | ---------------------------------------------------- |
| `auth`       | Login, logout, sesión                                |
| `posts`      | CRUD, publicar/despublicar, editor MDX, SEO del post |
| `categories` | CRUD de categorías                                   |
| `tags`       | CRUD de tags                                         |
| `songs`      | Búsqueda y selección de canción favorita             |
| `layout`     | Shell del admin (sidebar, navegación)                |
| `common`     | Componentes reutilizables de listados                |

**Rutas principales:**

- `/login` — fuera del grupo protegido
- `/posts`, `/posts/crear`, `/posts/[id]`, `/posts/[id]/editar`
- `/categorias`, `/tags`, `/canciones`

**Capas locales:**

- `src/lib/api/axios-client.ts` — Axios con interceptores (Bearer + refresh silencioso)
- `src/store/` — Redux (`authSlice`, `uiSlice`)
- `src/lib/providers/` — QueryClient + Redux + inicialización de sesión

**Características clave:**

- Guard de autenticación en `app/(admin)/layout.tsx`
- Access token solo en memoria (Redux); refresh token en cookie `httpOnly`
- Estado de servidor exclusivamente con TanStack Query
- UI con `@repo/ui` (shadcn)

---

### `apps/blog` — Blog público

Blog de solo lectura, optimizado para SEO (metadata, sitemap, robots, JSON-LD).

**Módulos** (`src/modules/`):

| Módulo       | Responsabilidad                                 |
| ------------ | ----------------------------------------------- |
| `posts`      | Listado, detalle, búsqueda, filtros, paginación |
| `categories` | Navegación / filtro por categoría               |
| `layout`     | Header, footer, brand, redes                    |
| `legal`      | Política de privacidad y términos de uso        |

**Rutas principales:**

- `/` y `/posts` — listado
- `/posts/[slug]` — detalle
- `/politica-de-privacidad`, `/terminos-de-uso`

**Capas locales:**

- `src/lib/api/api-client.ts` — `createFetchClient` (sin auth)
- `src/lib/providers/` — QueryClientProvider
- `app/robots.ts`, `app/sitemap.ts` — SEO técnico

**Características clave:**

- Server Components para SSR/SSG donde aplica
- `generateMetadata` / `generateStaticParams` en rutas dinámicas
- Render de Markdown vía `@repo/modules`
- Sin Redux ni autenticación

---

### `apps/web` — Landing / portafolio (**pendiente**)

Scaffold de Next.js en el puerto `3000`. Aún no tiene la estructura `src/`, módulos ni integración real con la API.

**Objetivo previsto:**

- Landing personal con diseño 100 % custom (Tailwind; **sin** shadcn/`@repo/ui` como base visual)
- Componentes exclusivos en `apps/web` (no se mueven a `packages/ui`)
- Lecturas públicas con `createFetchClient` + TanStack Query cuando haga falta (p. ej. canción favorita)
- SEO: `metadataBase`, `robots.ts`, `sitemap.ts`, JSON-LD (`Person`), `next/image`

Hasta que se implemente, el comando `dev` de `web` solo arranca el starter.

---

## Packages compartidos

### `@repo/ui` (`packages/ui`)

Componentes presentacionales compartidos entre **admin** y **blog**.

- Primitivos shadcn en `src/components/ui/` — **no editar a mano**; añadir con el CLI de shadcn desde este package
- Sin lógica de negocio, sin API calls, sin Redux ni TanStack Query
- Utilidad `cn()` en `src/lib/utils.ts`

```ts
import { Button } from "@repo/ui/components/ui/button";
```

### `@repo/lib` (`packages/lib`)

Utilidades framework-agnostic y factories HTTP.

| Path                        | Contenido                                         |
| --------------------------- | ------------------------------------------------- |
| `api/axios-client.ts`       | `createAxiosClient` — factory Axios (sin auth)    |
| `api/fetch-client.ts`       | `createFetchClient` — factory `fetch` (SSR / ISR) |
| `api/api-response.types.ts` | `IApiResponse<T>`, `IApiErrorResponse`            |
| `modules/taxonomy/types/`   | Tipos compartidos (`ICategory`, `ITag`, …)        |
| `modules/common/hooks/`     | Hooks genéricos (p. ej. `useDebounce`)            |
| `utils/`                    | Helpers (p. ej. mensajes de error de API)         |

Cada app instancia su propio cliente a partir de estas factories.

### `@repo/modules` (`packages/modules`)

Piezas de dominio reutilizables entre apps (hoy: render de posts).

- `posts/components/PostDetailMarkdown` — Markdown + GFM + syntax highlight + imágenes con `next/image`

### Configuración

| Package                   | Rol                                       |
| ------------------------- | ----------------------------------------- |
| `@repo/eslint-config`     | Bases ESLint (Next, React internal, etc.) |
| `@repo/typescript-config` | `tsconfig` base / Next / React library    |

---

## Arquitectura por app

Patrón común en `admin` y `blog` (y el previsto para `web`):

```
src/
├── app/                 # Solo rutas, layouts y metadata — sin lógica de negocio
├── modules/<feature>/
│   ├── components/
│   ├── hooks/           # TanStack Query (y formularios)
│   ├── services/        # Llamadas HTTP vía cliente de la app
│   ├── types/
│   └── constants/       # query-keys, etc.
├── lib/
│   ├── api/             # Instancia del cliente HTTP
│   ├── constants/       # routes.constants.ts
│   └── providers/
└── store/               # Solo admin (Redux)
```

**Convenciones:**

- Código en inglés; textos de UI en español
- Imports internos de app: `@/...`
- Imports de packages: `@repo/<name>/...`
- Rutas nunca hardcodeadas en componentes — usar `routes.constants.ts`
- Páginas (`app/`) delgadas: metadata + composición de módulos

### HTTP: cuándo usar qué

| Cliente               | App                  | Uso                                             |
| --------------------- | -------------------- | ----------------------------------------------- |
| Axios + interceptores | `admin`              | Todo el HTTP del admin (auth + CRUD + lecturas) |
| `createFetchClient`   | `blog`, futuro `web` | Endpoints públicos / SSR                        |

Detalle del contrato backend: [`API.md`](./API.md).

---

## Requisitos

- Node.js `>= 18`
- [pnpm](https://pnpm.io/) `9.x` (`packageManager` del root: `pnpm@9.0.0`)

---

## Setup

```sh
# Desde la raíz del monorepo
pnpm install
```

Variables de entorno (por app, típicamente `.env.local`):

```env
# admin y blog (y futuro web)
NEXT_PUBLIC_API_URL=http://localhost:4000/api

# blog (y futuro web) — URL canónica de producción / local
NEXT_PUBLIC_SITE_URL=http://localhost:3002
```

El backend debe incluir el origen del frontend en `CORS_ORIGIN` con `credentials: true` (necesario para la cookie de refresh en admin).

---

## Scripts

Desde la raíz:

```sh
pnpm dev          # turbo dev — todas las apps
pnpm build        # turbo build
pnpm lint         # turbo lint
pnpm check-types  # turbo check-types
pnpm format       # Prettier en ts/tsx/md
```

Una sola app (filtro de Turborepo):

```sh
pnpm exec turbo dev --filter=admin
pnpm exec turbo dev --filter=blog
pnpm exec turbo dev --filter=web
pnpm exec turbo build --filter=blog
```

Puertos por defecto:

| App   | URL local             |
| ----- | --------------------- |
| web   | http://localhost:3000 |
| admin | http://localhost:3001 |
| blog  | http://localhost:3002 |

---

## Roadmap inmediato — `apps/web`

Pendiente de implementación:

1. Reorganizar a `src/app` + `src/modules` / `src/components` alineado con el resto del monorepo
2. Landing con diseño custom (hero, secciones, motion respetando `prefers-reduced-motion`)
3. Cliente `createFetchClient` + hooks para datos públicos (p. ej. canción favorita)
4. SEO técnico (`metadata`, `robots`, `sitemap`, JSON-LD, iconos OG)
5. Dependencias previstas: Tailwind, TanStack Query, `@repo/lib` (no depender de `@repo/ui` para el look & feel)

---

## Documentación relacionada

- [`API.md`](./API.md) — contrato HTTP de la Portfolio API
- [Turborepo — tasks y filtros](https://turborepo.dev/docs/crafting-your-repository/running-tasks)
- [Next.js App Router](https://nextjs.org/docs/app)

# Uknow Calcos

Landing y tienda futura de stickers de vinilo cortados con estética street. Catálogo de planchas temáticas y stickers sueltos, configurador de personalizados desde 10 unidades con prueba digital integrada, y pagos por Mercado Pago o transferencia.

## Stack

- **Framework:** Next.js 16 (⚠️ lee las [breaking changes](node_modules/next/dist/docs/))
- **React:** 19
- **Styling:** Tailwind CSS 4, framer-motion
- **UI:** shadcn/ui, `cn` (ambas en uso, no remover)
- **Testing:** Vitest (unit), Playwright (e2e con Chrome nativo)
- **Base de datos:** Supabase (Postgres, Storage, Auth)
- **Pagos:** Mercado Pago (Checkout Pro + webhook)
- **Emails:** Resend
- **Deploy:** Vercel

## Arrancá

```bash
# Instalar dependencias
npm install

# Variables de entorno (ver .env.example; sprint 0 corre sin ellas)
cp .env.example .env.local

# Desarrollo
npm run dev
# Abrí http://localhost:3000

# Lint y type check
npm run lint
npm run typecheck

# Tests
npm run test              # Vitest, una sola pasada
npm run test:watch       # Vitest, modo watch
npm run test:e2e         # Playwright (requiere Chrome instalado)

# Producción
npm run build
npm run start
```

## Estructura

```
app/                     Next.js app router, rutas públicas y admin
├── (tienda)/            grupo de rutas públicas
├── admin/               rutas protegidas (admin)
└── api/webhooks/        endpoints para webhooks

components/
├── site/                componentes de la landing y tienda
├── stickers/            componentes de catálogo y personalizados
└── ui/                  componentes primitivos (shadcn/ui)

lib/
├── site-config.ts       config centralizada (datos mock, links)
├── data.ts              catálogo mock de planchas, stickers, testimonios
└── utils.ts             utilidades (cn, etc.)

tests/
├── unit/                tests Vitest
└── e2e/                 tests Playwright

docs/
├── mvp-y-sprints.md     plan de desarrollo, decisiones pendientes
└── AGENTS.md            guía de agentes del proyecto
```

## Datos mock

Todos los datos de prueba están centralizados:

- **`lib/site-config.ts`:** contacto (WhatsApp, Instagram, mails), links, plazos, testimonios. Marcados con `// MOCK:`.
- **`lib/data.ts`:** catálogo de planchas, stickers sueltos, marcas, testimonios. Marcados con `// MOCK:`.

Antes de lanzar, el dueño debe:

1. Reemplazar los datos mock con datos reales (o removerlos).
2. Cambiar **`siteConfig.isMock = false`** en `lib/site-config.ts`.
3. Verificar que no quedan datos de prueba:
   ```bash
   grep -rn "MOCK:" lib/
   ```

## Agentes del proyecto

Cada sprint delega tareas a agentes específicos. Ver `.claude/agents/` y `docs/mvp-y-sprints.md`:

| Agente | Rol |
|--------|-----|
| **sticker-artist** | Crear SVGs nuevos de stickers |
| **catalog-manager** | Altas, bajas, precios del catálogo |
| **commerce-integrator** | Carrito, pagos, checkout, emails |
| **street-ui-reviewer** | Revisar UI, accesibilidad, dark mode |

Los agentes generales (`code-reviewer`, `security-reviewer`, `tdd-guide`, `e2e-runner`) vienen de la configuración global.

## Deploy en Vercel

**Acción pendiente del dueño:**

1. Importar el repo en Vercel: https://github.com/Zand3r5/appCalco
2. Framework se auto-detecta como Next.js.
3. Variables de entorno (cuando haya): agregar desde `.env.example` en Vercel.

Después, cada push a `main` deploya automáticamente.

## Plan y sprints

Lee `docs/mvp-y-sprints.md` para:
- Análisis del mercado y posicionamiento.
- Definición del MVP y criterios de éxito.
- Plan detallado de sprints.
- Decisiones que vos tenés que tomar (precios, plazos, envíos, etc.).

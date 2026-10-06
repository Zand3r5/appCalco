# Uknow Calcos: MVP y plan de sprints

Fecha: 6/10/2026. Basado en un relevamiento web de la competencia internacional y argentina y en un análisis del código actual. Los precios de la competencia son de esa fecha y en ARS; con la inflación, tomalos como orden de magnitud.

## 1. Qué aprendimos del mercado

### Afuera (Sticker Mule, StickerApp, StickerGiant, Redbubble, Vograce, Printful)

- Hay tres caminos de compra: **catálogo** (planchas y sueltos), **personalizado** (subís el archivo, ves el precio por cantidad y recibís una prueba) y **cotización mayorista**.
- **Nadie imprime sin que el cliente apruebe una prueba digital.** Los cambios son gratis hasta aprobar. Sticker Mule ni siquiera cobra hasta que aprobás.
- El precio va por tramos de cantidad y muestra el ahorro (StickerApp: 29 u. US$27, 500 u. US$132 con −72%). El mínimo estándar es **10 por diseño**.
- Las palancas de conversión son las muestras baratas que se devuelven en cupón (StickerGiant: pack a US$5 con US$5 de crédito), el envío gratis y la recompra en un click.
- Redbubble descuenta por cantidad aunque mezcles diseños (25% desde 4 y 50% desde 10, según terceros).

### Argentina

| Tienda | Qué hace bien | Dónde flojea |
|---|---|---|
| Mi Pegatina | Cotizador online en tiempo real y aprobación por mail | Mínimo de 100–200 u. |
| RotulArte | Calculadora por medida y producción contada desde la aprobación | Estética de gráfica, no de marca |
| Disart Gráfica | 25% off por transferencia y cuotas | Pagás primero y mandás el archivo después por mail |
| Imprimime | Muestra impresa gratis | Papel, no vinilo |
| La Estampería | Plancha temática de 25 stickers a $7.400 | Solo catálogo |
| Vinilo Design Shop | Sueltos a $2.400–2.700, plancha a $8.000 | Solo catálogo |

Los patrones locales son: Tiendanube como plataforma, WhatsApp o mail para el archivo, Mercado Pago con cuotas, **descuento por transferencia** (5% lo más común) y envíos por Correo Argentino o Andreani con envío gratis desde $50–60 mil.

### El hueco que tomamos

1. **Personalizados desde 10 unidades con precio al instante.** Casi nadie en Argentina baja de 50 u.
2. **Prueba digital dentro de la web**, aprobada con un click y con estado visible del pedido. Ninguna tienda argentina relevada lo tiene. El referente regional es Stickerroo (Chile).
3. **Catálogo street y personalizado en el mismo carrito.** Las gráficas no tienen marca y las tiendas de catálogo no hacen personalizados en serio.

Nuestros precios actuales (plancha $4.900 y suelto $1.570–1.740) quedan por debajo de la competencia de catálogo. Hay que revisarlos contra el costo real antes de lanzar.

## 2. Qué es el MVP

**Objetivo:** que alguien pueda comprar una plancha, calcos sueltos o 10 calcos con su logo, pagar con Mercado Pago o transferencia, aprobar la prueba y seguir su pedido sin escribir por WhatsApp.

### Entra

- Páginas de plancha y de calco suelto con un carrito real (cantidades, totales, persistencia y descuento por mezclar).
- Checkout Pro de Mercado Pago con webhook, transferencia con descuento validada a mano, envío con tarifa por zona y retiro.
- Configurador de personalizados: tamaño (5/7/10 cm), cantidad (10/25/50/100), precio en vivo con precio por unidad y ahorro, y subida del archivo.
- Flujo de prueba digital: esperando prueba → prueba enviada → cambios pedidos → aprobado → en producción → enviado.
- Seguimiento del pedido por link y emails transaccionales.
- Admin mínimo para ver pedidos, subir la prueba y cambiar el estado.
- Formulario de cotización mayorista.
- SEO básico, analítica de eventos de compra y legales (términos, privacidad, envíos).

### Queda afuera (post-MVP)

Editor online con quitado de fondo, materiales especiales (holo, transparente, glitter), cuentas de usuario con login, referidos, suscripciones, facturación automática por API y la integración de envíos por API (Zipnova).

### Cómo sabemos que funciona

- 20 pedidos pagos en el primer mes de lanzado.
- La prueba digital llega en menos de 24 h hábiles en el 90% de los personalizados.
- Al menos el 60% de los carritos que llegan a Mercado Pago se pagan.
- Ningún pedido requiere WhatsApp para completarse (WhatsApp queda como ayuda, no como canal obligatorio).

## 3. Arquitectura objetivo

```
app/
  (tienda)/page.tsx                    home actual
  (tienda)/planchas/[slug]/page.tsx
  (tienda)/stickers/[slug]/page.tsx
  (tienda)/personalizados/page.tsx     configurador
  (tienda)/mayoristas/page.tsx
  (tienda)/carrito/page.tsx
  (tienda)/checkout/page.tsx, checkout/exito/page.tsx
  (tienda)/pedido/[token]/page.tsx     seguimiento y aprobación de la prueba
  admin/                               protegido
  api/webhooks/mercadopago/route.ts
  sitemap.ts, robots.ts, opengraph-image.tsx
proxy.ts                               (en Next 16, middleware pasa a llamarse proxy)
lib/db/, lib/pricing.ts, lib/validation/, lib/env.ts
```

- **Datos:** Supabase (Postgres, Storage con bucket privado para los diseños, Auth para el admin). Tablas: `products`, `sheets`, `orders`, `order_items`, `custom_jobs`, `proofs`, `quotes`.
- **Pagos:** Mercado Pago Checkout Pro. La preferencia se crea en el servidor y la confirmación llega por webhook, sin fiarse de la URL de retorno.
- **Emails:** Resend.
- **Deploy:** Vercel.
- **Tests:** Vitest para precios y carrito, Playwright para el flujo de compra.
- **Precios:** siempre se calculan en el servidor con `lib/pricing.ts`. El cliente solo muestra.

## 4. Decisiones que tenés que tomar vos

Bloquean los sprints indicados:

1. **Datos reales de contacto** (WhatsApp, Instagram y mails) y si los testimonios y las marcas son reales y tenemos permiso. Bloquea el sprint 0.
2. **Precios:** la tabla de personalizados por tamaño y cantidad, el precio de planchas y sueltos, el descuento por mezclar y el porcentaje por transferencia. Bloquea los sprints 1 y 3.
3. **Cuándo cobrar los personalizados:** al confirmar (y reembolsar si no hay acuerdo con la prueba) o recién al aprobar la prueba. Bloquea el sprint 3.
4. **Envíos:** las zonas y tarifas, desde qué monto es gratis y si hay retiro o moto en CABA. Bloquea el sprint 2.
5. **Plazos reales:** hoy la web dice "24 a 96 hs" y también "4 días hábiles". Hay que dejar uno. Bloquea el sprint 0.
6. **Facturación:** si arrancás facturando a mano desde ARCA (Factura C, monotributo). Recomendado para el MVP.

## 5. Sprints

Son sprints de una semana. Cada uno termina con deploy en Vercel, `tsc`, lint y tests en verde, y una revisión de `street-ui-reviewer` si hubo cambios de UI.

### Sprint 0: limpieza y base (2–3 días)

- [ ] Reemplazar los datos falsos: WhatsApp, Instagram, mails, marcas y testimonios (o sacarlos).
- [ ] Unificar los plazos y sacar las cifras sin respaldo ("+50 marcas", "24 provincias", "al mundo").
- [ ] Reemplazar las fotos de Unsplash de categorías por fotos propias o por arte SVG.
- [ ] Instalar Vitest y Playwright y escribir un primer test de humo de la home.
- [ ] Crear `.env.example`, conectar el repo a Vercel y armar un README real.
- [ ] Quitar las dependencias de más (`cn` y `shadcn` en `dependencies`).

Agentes: `catalog-manager` (datos), `street-ui-reviewer`, `doc-updater` (README).

### Sprint 1: catálogo que se puede comprar

- [ ] `lib/pricing.ts` con tests: precio de línea, descuento por mezclar y totales.
- [ ] Un carrito real con `useReducer`: líneas `{id, tipo, cantidad, precio}`, persistencia en `localStorage`, y agregar, quitar y vaciar.
- [ ] Drawer o página de carrito, y botón "Agregar plancha" en el detalle del carrusel.
- [ ] Rutas `/planchas/[slug]` y `/stickers/[slug]` con metadata propia.
- [ ] Trampa de foco en el modal del carrusel (que el foco no se escape con Tab y vuelva al botón al cerrar) y skip-link.
- [ ] 2 o 3 planchas nuevas y 4 calcos nuevos.

Agentes: `commerce-integrator` (carrito y precios) y `tdd-guide` (tests primero), y en paralelo `sticker-artist` y `catalog-manager` (diseños y altas). Al final, `street-ui-reviewer`.

### Sprint 2: checkout y pedidos

- [ ] Supabase: esquema de `orders` y `order_items` y lectura del catálogo desde la base, con cache.
- [ ] Checkout: datos de contacto y envío validados con zod, tarifa por zona y retiro.
- [ ] Mercado Pago Checkout Pro y webhook idempotente con verificación de firma.
- [ ] Transferencia con descuento: el pedido queda "esperando comprobante" y se confirma en el admin.
- [ ] Email de confirmación (Resend) y página `/pedido/[token]`.
- [ ] Test end-to-end con Playwright: carrito → checkout → pago de prueba en el sandbox de Mercado Pago.

Agentes: `commerce-integrator` → `security-reviewer` (obligatorio por pagos), `e2e-runner`.

### Sprint 3: personalizados con prueba digital

- [ ] Configurador `/personalizados` con precio en vivo, precio por unidad y ahorro.
- [ ] Subida del archivo a un bucket privado, validando tipo y peso, con aviso de "fondo transparente ideal".
- [ ] Modelo `custom_jobs` y `proofs` con los estados de la prueba y el historial de comentarios.
- [ ] Aprobación con un click o pedido de cambios desde `/pedido/[token]`, con email en cada cambio de estado.
- [ ] Cobro según la decisión 3 de la sección 4.

Agentes: `commerce-integrator` → `security-reviewer` (subida de archivos), `street-ui-reviewer`, `tdd-guide`.

### Sprint 4: admin, mayoristas y lanzamiento

- [ ] Admin protegido con Supabase Auth, chequeando permisos también dentro de cada acción: lista de pedidos, subir la prueba, cambiar el estado y marcar transferencias.
- [ ] Formulario `/mayoristas` que guarda la cotización y avisa por mail.
- [ ] SEO: `metadataBase`, sitemap, robots, imágenes OG por plancha y JSON-LD de producto.
- [ ] Analítica con los eventos `add_to_cart`, `begin_checkout` y `purchase`.
- [ ] Páginas legales.
- [ ] Rendimiento: aliviar el filtro `diecut` en el carrusel y pausar la animación cuando el carrusel no está en pantalla.

Agentes: `commerce-integrator`, `security-reviewer`, `seo-specialist`, `performance-optimizer`, `a11y-architect`.

### Después del MVP (backlog ordenado)

1. Pack de muestras con cupón por el mismo valor para la primera compra de personalizados.
2. "Probá con 10": precio gancho para el primer pedido de un logo.
3. Recompra en un click del arte ya aprobado.
4. Referidos: crédito para quien recomienda y para quien compra.
5. Factura C automática por API (Afip SDK o TusFacturas).
6. Envíos por API (Zipnova) con cotización por código postal.
7. Materiales especiales: holo, transparente y glitter.

## 6. Cómo trabajar con agentes

Los agentes del proyecto están en `.claude/agents/`. Los generales (`code-reviewer`, `security-reviewer`, `tdd-guide`, `e2e-runner`, `seo-specialist`, `performance-optimizer`, `a11y-architect`, `doc-updater`) vienen de la configuración global.

| Agente | Para qué | Cuándo |
|---|---|---|
| `sticker-artist` | Dibujar calcos SVG nuevos | Cada vez que se suma un diseño |
| `catalog-manager` | Altas, bajas y precios del catálogo, con validaciones | Cambios de catálogo |
| `commerce-integrator` | Carrito, pagos, pedidos, subida de archivos, emails | Sprints 1 a 4 |
| `street-ui-reviewer` | Revisar el estilo street, mobile, modo oscuro y accesibilidad | Al cerrar cualquier tarea con UI |
| `security-reviewer` | Revisar pagos, webhooks, archivos y admin | Obligatorio en los sprints 2, 3 y 4 |

**Reglas de orquestación:**

- **En paralelo:** tareas que no tocan los mismos archivos. Por ejemplo, `sticker-artist` y `catalog-manager` mientras `commerce-integrator` arma el carrito.
- **En serie:** implementación → tests → revisión (`street-ui-reviewer` o `security-reviewer`) → arreglos → commit.
- **Contexto:** cada agente arranca con este documento y la tarea exacta del sprint como contexto.
- **Decisiones de negocio:** si una tarea depende de una decisión pendiente de la sección 4, el agente frena y pregunta en lugar de inventar.

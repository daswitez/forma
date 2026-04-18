# UI Review

Fecha: 2026-04-18

## Diagnóstico rápido

La landing ya tiene una base fuerte de narrativa, tipografía y tono premium, pero hoy pierde fuerza en dos puntos clave:

1. La sección de transformación no logra mostrar el proceso de forma visual en estados reducidos porque el arte principal desaparece y quedan sólo tabs + texto.
2. El funnel "3D" prioriza efecto sobre legibilidad: el ángulo, los labels pequeños y los indicadores laterales hacen que el dato se sienta más difícil de leer que impresionante.

Mi lectura general es esta: la dirección visual es buena, pero varias decisiones están demasiado orientadas a "demo conceptual" y no lo suficiente a "claridad comercial premium".

## Prioridad alta

### 1. La representación del proceso deja de existir cuando se oculta el mockup

Referencia:
- `src/app/styles.css:1880-1884`
- `src/app/components/TransformationSection.tsx:2268-2340`

Problema:
- En `max-width: 768px`, `.transformation-browser-wrap` pasa a `display: none`.
- Eso elimina la pieza que realmente explica el cambio.
- Lo que queda es una lista de etapas y una descripción, pero no una representación visual del proceso.

Impacto:
- La sección promete "A Real Transformation", pero en ese estado no demuestra la transformación.
- Se vuelve más editorial que visual.
- El usuario entiende que hay fases, pero no ve qué cambió.

Qué mejoraría:
- No ocultar el mockup: convertirlo en una versión resumida, no eliminarlo.
- Usar un "stacked storyboard" de 3-5 frames verticales:
  - estado actual
  - audit
  - wireframe
  - visual system
  - results
- En vez de tabs horizontales, usar una línea de progreso vertical con una mini-preview por fase.
- Reducir texto secundario y aumentar evidencia visual por fase.

Decisión recomendada:
- Cambiar de "tabs + mockup + description" a "timeline visual + detail panel".
- La experiencia debe seguir comunicando proceso aunque el espacio sea menor.

### 2. El funnel 3D no prioriza legibilidad del contenido

Referencia:
- `src/app/components/RetentionFunnelSection.tsx:83-220`
- `src/app/components/RetentionFunnelSection.tsx:337-411`

Problema:
- El `rotateX` (`line 391`) introduce una estética isométrica, pero comprime la lectura.
- Los subtítulos de cada etapa están en `fontSize: 9` (`lines 158-161`) con contraste bajo.
- Los indicadores de drop-off viven fuera del bloque, en `right: -80` (`lines 199-209`), lo que vuelve frágil su lectura.
- Las barras más angostas hacen que el contenido final se sienta apretado justo donde debería verse más importante: `Converted`.

Impacto:
- El usuario mira el efecto antes que el dato.
- El bloque parece "cool", pero no se siente premium porque requiere esfuerzo.
- En un arte de conversión, eso es un problema serio: si el dato no se lee rápido, no vende.

Qué mejoraría:
- Bajar o eliminar el ángulo 3D.
- Mantener profundidad con sombras, capas y gradientes, no con perspectiva agresiva.
- Llevar los porcentajes de drop-off dentro de cada fila o debajo de cada etapa.
- Subir tamaño y contraste de labels secundarios.
- Darle más peso visual a `Converted`: hoy queda demasiado pequeño para ser el cierre del funnel.

Decisión recomendada:
- Cambiar de "3D funnel" a "layered performance funnel".
- Debe verse premium, sí, pero primero debe leerse en 2-3 segundos.

### 3. El toggle del funnel es demasiado largo y débil visualmente

Referencia:
- `src/app/components/RetentionFunnelSection.tsx:317-362`

Problema:
- "Before Repositioning" y "After Repositioning" son labels largos para el espacio disponible.
- Están en `fontSize: 11`, uppercase y con contraste tenue.
- El control compite con el funnel en vez de actuar como filtro claro.

Impacto:
- La acción principal del bloque no se entiende de inmediato.
- El usuario lee demasiado antes de comparar.

Qué mejoraría:
- Acortar a:
  - `Before`
  - `After`
- Agregar un subtítulo fijo encima:
  - `Compare states`
- Hacer el pill más robusto:
  - más altura
  - mejor contraste
  - estado activo más evidente

## Prioridad media

### 4. La sección de transformación tiene demasiada fragmentación visual

Referencia:
- `src/app/styles.css:575-737`

Problema:
- La grilla actual divide la historia en 3 columnas: tabs, mockup, texto.
- Eso reparte la atención en demasiados puntos.
- El usuario no sabe de inmediato si mirar fases, mockup o explicación.

Impacto:
- La sección se siente sofisticada, pero no contundente.
- Premium no es "más piezas"; premium es "menos ruido, más intención".

Qué mejoraría:
- Darle jerarquía clara:
  - 1 protagonista visual
  - 1 panel de contexto
  - 1 navegación secundaria
- Hoy las tabs parecen navegación principal, cuando deberían ser apoyo.

### 5. Los textos secundarios están demasiado suaves en varias zonas oscuras

Referencias:
- `src/app/components/TransformationSection.tsx:2261-2262`
- `src/app/components/RetentionFunnelSection.tsx:297-303`
- `src/app/styles.css:709-713`

Problema:
- Hay mucho texto en `rgba(..., 0.55)` o `0.65` sobre fondos oscuros.
- Se ve elegante, pero cae rápido en "poco contraste".

Impacto:
- La landing se percibe más editorial que comercial.
- En bloques de proceso y performance, la lectura debe ser más nítida.

Qué mejoraría:
- Subir contraste del body copy en secciones dark.
- Reservar opacidades bajas sólo para meta info, no para texto explicativo.

### 6. La interfaz usa varias metáforas visuales, pero no todas entregan claridad

Problema:
- Browser mockups, audit overlays, pills, funnel isométrico, floating particles, cards de métricas, etc.
- Cada recurso por separado funciona, pero juntos compiten.

Impacto:
- El producto empieza a sentirse más "showcase de recursos" que "sistema visual premium".

Qué mejoraría:
- Elegir 2 lenguajes visuales dominantes para toda la página:
  - `editorial premium`
  - `performance dashboard`
- Bajar el número de metáforas ilustrativas.
- Hacer que las visualizaciones se sientan parte del mismo sistema, no piezas independientes.

## Prioridad media-baja

### 7. La promesa premium necesita más evidencia visual de delivery real

Problema:
- El discurso dice premium, integrado, estratégico.
- Pero varias visuales siguen siendo mockups abstractos.

Qué mejoraría:
- Mostrar artefactos de entrega reales o semi-reales:
  - arquitectura de sitio
  - wireframes marcados
  - sistema de componentes
  - checklist de handoff
  - panel de métricas post-launch
- Si quieren comunicar "sabemos entregar", hay que mostrar entregables, no sólo conceptos.

### 8. Falta una gramática visual específica para "gestión" y "3D"

Problema:
- Hoy "3D" aparece como efecto de perspectiva.
- Pero "gestión visual" todavía no está definida como sistema.

Qué recomendaría construir:
- Un set de visuales propios para el sitio:
  - `Audit cards`
  - `Decision maps`
  - `Process rails`
  - `Before/After evidence cards`
  - `Performance layers`
- Y para 3D:
  - usar profundidad leve, no distorsión
  - extrusión sutil
  - planos apilados
  - sombras largas
  - iluminación de borde

La idea no es hacer "3D por 3D". La idea es que la profundidad ayude a explicar jerarquía, flujo y resultado.

## Qué atacaría primero

1. Rehacer la sección `Transformation` para que el proceso siempre exista visualmente.
2. Rediseñar el funnel para legibilidad primero, efecto después.
3. Simplificar el toggle y los labels de comparación.
4. Unificar el sistema de visualización para que todo se sienta parte del mismo producto premium.
5. Subir contraste y reducir la cantidad de micro-textos débiles sobre fondos oscuros.

## Dirección visual recomendada

Si quieren que se sienta más premium y más "delivery-capable", yo movería la UI hacia esto:

- Menos simulación decorativa.
- Más artefacto de proceso visible.
- Más jerarquía entre dato principal, supporting data y explicación.
- Menos perspectiva extrema.
- Más profundidad construida con capas, sombra, escala y ritmo.
- Más evidencia de método y menos "look conceptual".

## Siguiente paso ideal

Puedo tomar este review y convertirlo en una versión implementable:

1. rehacer `TransformationSection` con una representación de proceso mucho más clara,
2. rediseñar `RetentionFunnelSection` para que mantenga presencia premium pero con lectura limpia,
3. y dejar ambas secciones listas en código.

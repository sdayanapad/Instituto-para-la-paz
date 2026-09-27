# IPD — Instituto para la Paz y la Democracia
Web de presentación · Diseño de Espacios · Universidad Autónoma del Caribe

> ⚠️ Esta versión se construyó **sin el PDF de investigación**. Todos los textos marcados con la etiqueta `PLACEHOLDER` (y todas las imágenes, que dicen "IMAGEN PENDIENTE") son de prueba y deben reemplazarse con la información real del proyecto antes de presentarlo en el concurso. Ver la lista completa al final de este documento.

---

## 1. Cómo abrir la web

No necesitas instalar nada. Es HTML/CSS/JS puro.

**Opción rápida:** haz doble clic en `index.html` y se abrirá en tu navegador.

**Opción recomendada (evita problemas de rutas/caché):** sirve la carpeta con un servidor local.

- Con Python (ya viene instalado en Mac/Linux):
  ```
  cd ipd
  python3 -m http.server 8000
  ```
  Luego abre `http://localhost:8000` en tu navegador.

- Con VS Code: instala la extensión **Live Server** y haz clic en "Go Live".

---

## 2. Estructura del proyecto

```
ipd/
├── index.html      → estructura y contenido de todas las secciones
├── styles.css       → todo el diseño visual (colores, tipografía, layout, animaciones)
├── script.js        → scroll reveals, parallax, navbar, cursor, lightbox, barra de progreso
├── assets/          → todas las imágenes (renders, planos, fotos, texturas)
└── README.md        → este archivo
```

---

## 3. Cómo reemplazar las imágenes

Cada imagen tiene un nombre fijo dentro de `/assets`. Para reemplazarla:

1. Prepara tu imagen real con el **mismo nombre de archivo** (por ejemplo `hero.jpg`).
2. Sustituye el archivo dentro de la carpeta `/assets`.
3. Listo — no necesitas tocar el HTML ni el CSS.

Si quieres usar otro nombre o formato (`.png`, `.webp`), busca esa referencia en `index.html` (por ejemplo `src="assets/hero.jpg"`) y actualiza la ruta.

**Recomendaciones de tamaño** (para que se vean nítidas sin pesar demasiado):
- Renders / hero / fullscreen: 1920–2400px de ancho, JPG calidad 75–85%.
- Fotos de contexto y proceso: 1200–1600px de ancho.
- Planos y diagramas: exporta en la mayor resolución posible; el lightbox permite verlos en grande.
- Texturas de materialidad: imágenes cuadradas, 1000px aprox.

### Lista completa de imágenes esperadas

| Archivo | Uso |
|---|---|
| `hero.jpg` | Render principal, portada |
| `contexto-01.jpg` / `contexto-02.jpg` | Fotografías del entorno / lote |
| `problema-01.jpg` / `problema-02.jpg` | Condición existente (antes / transformar) |
| `concepto.jpg` | Imagen conceptual de fondo |
| `vacio.jpg`, `recorridos.jpg`, `iluminacion.jpg`, `materialidad.jpg`, `atmosfera.jpg` | Los 5 criterios de diseño |
| `proceso-01.jpg` a `proceso-03.jpg` | Bocetos / diagramas de proceso |
| `planta-general.jpg`, `corte-01.jpg`, `axonometria.jpg`, `diagrama-01.jpg` | Planos técnicos |
| `render-01.jpg` a `render-05.jpg` | Secuencia inmersiva de la propuesta |
| `espacio-sala.jpg`, `espacio-biblioteca.jpg`, `espacio-patio.jpg` | Espacios individuales |
| `materiales-01.jpg` a `materiales-03.jpg` | Material board |
| `cierre.jpg` | Imagen de cierre |

---

## 4. Cómo cambiar los textos

Todo el texto está directamente en `index.html`, en español, organizado por secciones numeradas con comentarios como:

```html
<!-- 01 — INTRODUCCIÓN -->
<!-- 02 — CONTEXTO -->
<!-- 03 — PROBLEMÁTICA -->
```

Busca la sección que quieras editar y cambia el texto entre las etiquetas `<p>`, `<h2>`, `<h3>`. No necesitas tocar el CSS ni el JS para cambiar contenido.

Los textos marcados con `data-placeholder` llevan una pequeña etiqueta "PLACEHOLDER" encima en el sitio — quítala eliminando el atributo `data-placeholder` una vez reemplaces el texto real.

---

## 5. Cómo cambiar colores y tipografía

Todo el sistema de diseño vive al inicio de `styles.css`, en `:root`:

```css
:root{
  --ivory:      #EDE8DF;
  --stone:      #A8A092;
  --charcoal:   #2A2823;
  --black:      #141310;
  --serif: 'Fraunces', ...;
  --sans:  'Archivo', ...;
}
```

Cambia estos valores y se actualiza toda la web automáticamente.

---

## 6. Publicar / compartir la web

Al ser HTML estático, puedes subir la carpeta completa a cualquiera de estos servicios gratuitos (arrastra la carpeta, sin necesidad de build):

- **Netlify Drop** — netlify.com/drop
- **GitHub Pages** — sube el repositorio y activa Pages
- **Vercel** — vercel.com (importar carpeta)

No hay paso de "build": la carpeta tal cual ya es el sitio final.

---

## 7. Información que falta (verificar contra el documento de investigación)

Antes de presentar al concurso, reemplaza:

- [ ] Nombre completo de autores del proyecto
- [ ] Ubicación exacta / dirección del lote
- [ ] Área de intervención (m²)
- [ ] Texto del propósito, contexto y problemática (sección 01 y 02)
- [ ] Problemáticas específicas identificadas (sección 03)
- [ ] Marco conceptual completo (sección 04)
- [ ] Descripción de cada uno de los 5 criterios de diseño (sección 05)
- [ ] Metodología de proceso real utilizada, ej. Design Thinking (sección 06)
- [ ] Nombres y descripciones reales de los espacios (secciones 07–08)
- [ ] Materiales reales utilizados (sección 10)
- [ ] Relación luz/material/experiencia (sección 11)
- [ ] Frase conceptual de cierre (sección 12)
- [ ] Las 30 imágenes en `/assets` (ver tabla arriba)

---

**Nota técnica:** la web respeta `prefers-reduced-motion` (reduce animaciones si el usuario lo tiene activado en su sistema), es responsive (desktop / tablet / mobile) y usa `loading="lazy"` en imágenes fuera del primer scroll para mejorar el rendimiento.

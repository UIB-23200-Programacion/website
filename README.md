# Programación (23200) — UIB

Material docente de la asignatura **Programación (23200)** del Grado de Matemáticas
de la [Universitat de les Illes Balears](https://www.uib.es).

🌐 **Sitio web:** https://uib-23200-programacion.github.io/website/

---

## Sobre el curso

La asignatura introduce la programación en Python a estudiantes de primer curso del
Grado de Matemáticas, asumiendo que no tienen experiencia previa. El trabajo práctico
se realiza desde el navegador mediante GitHub Codespaces, sin necesidad de instalaciones
locales.

- **Lenguaje:** Python
- **Duración:** 60 horas presenciales · 15 semanas · 4 h/semana
- **Idiomas del sitio:** español y catalán

## Tecnología

El sitio está construido con [Quarto](https://quarto.org/) y utiliza la extensión
[quarto-live](https://r-wasm.github.io/quarto-live/) para las celdas interactivas de
Python (ejecutadas en el navegador vía Pyodide/WebAssembly). Publicado en GitHub Pages
desde la rama `gh-pages`.

## Estructura del repositorio

```
_quarto.yml          # Configuración del sitio
styles.css           # Estilos personalizados
theme.scss           # Tema claro (base: cosmo)
theme-dark.scss      # Tema oscuro
logo-href.js         # Logo clickable según idioma
full-view.js         # Modo presentación (?full=1)
images/              # Recursos gráficos
es/                  # Contenido en español
ca/                  # Contenido en catalán
_extensions/         # Extensiones Quarto (incluye quarto-live)
```

## Previsualización local

**Requisitos previos:** [Quarto](https://quarto.org/docs/get-started/) ≥ 1.4.

```bash
git clone https://github.com/UIB-23200-Programacion/website.git
cd website
quarto preview
```

`quarto preview` lanza un servidor local en `http://localhost:XXXX` y abre el navegador
automáticamente. Las celdas interactivas de Python (quarto-live/Pyodide) **requieren
ser servidas por HTTP** — abrir directamente los ficheros `.html` desde el disco
(`file://`) no funciona.

> **Nota:** La extensión quarto-live está incluida en `_extensions/` y no requiere
> instalación adicional. Si por algún motivo necesitas reinstalarla:
> ```bash
> quarto add r-wasm/quarto-live
> ```

> **Nota:** La primera vez que abres una página con celdas interactivas, Pyodide descarga
> los paquetes necesarios desde CDN. Se necesita conexión a internet.

## Organización GitHub

El curso se gestiona a través de la organización
[UIB-23200-Programacion](https://github.com/UIB-23200-Programacion),
donde se alojan las plantillas para ejercicios y otras actividades.

---

© 2026 Alejandro Mesejo · [UIB-EPS](https://eps.uib.es/)

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

El sitio está construido con [Quarto](https://quarto.org/) y publicado en GitHub Pages
desde la rama `gh-pages`.

## Estructura del repositorio

```
_quarto.yml          # Configuración del sitio
styles.css           # Estilos personalizados
theme.scss           # Tema claro (base: cosmo)
theme-dark.scss      # Tema oscuro
logo-href.js         # Logo clickable según idioma
images/              # Recursos gráficos
es/                  # Contenido en español
ca/                  # Contenido en catalán
ca/_metadata.yml     # Localización de callouts en catalán
```

## Publicación local

**Requisitos previos:**

1. Descarga el repositorio:
   ```bash
   git clone https://github.com/UIB-23200-Programacion/website.git
   cd website
   ```
2. Instala [Quarto](https://quarto.org/docs/get-started/) (versión 1.4 o superior).

3. Genera la vista local:
   ```bash
   quarto render
   ```
   
4. Navega a la carpeta `_site` y abre `index.html`.

## Organización GitHub

El curso se gestiona a través de la organización
[UIB-23200-Programacion](https://github.com/UIB-23200-Programacion),
donde se alojan las plantillas para ejercicios y otras actividades.

---

© 2026 Alejandro Mesejo · [UIB-EPS](https://eps.uib.es/)

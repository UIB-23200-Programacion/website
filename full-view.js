/**
 * full-view.js — Modo presentación sin sidebar ni TOC
 *
 * Activación:  añadir ?full=1 a cualquier URL del sitio
 * Desactivar:  botón flotante "✕ Salir" o tecla Escape
 */
(function () {
  // 1. Actualizar el enlace del botón de sidebar para apuntar a la URL actual + ?full=1
  //    Se localiza por el icono Bootstrap "bi-fullscreen" que Quarto renderiza.
  //    (Quarto resuelve href: "#" relativo a la raíz, por eso lo sobreescribimos aquí.)
  function updateFullscreenLink() {
    document.querySelectorAll('a').forEach(function (a) {
      if (a.querySelector('i.bi-fullscreen, .bi-fullscreen')) {
        const url = new URL(window.location.href);
        url.searchParams.set('full', '1');
        a.href = url.toString();
        a.title = 'Modo presentación (sin sidebar)';
        a.addEventListener('click', function (e) {
          e.preventDefault();
          window.location.href = a.href;
        });
      }
    });
  }
  // Ejecutar cuando el DOM esté listo (el sidebar se renderiza tras DOMContentLoaded)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateFullscreenLink);
  } else {
    updateFullscreenLink();
  }

  // 2. Si no estamos en modo full, nada más que hacer
  if (new URLSearchParams(window.location.search).get('full') !== '1') return;

  // 3. Inyectar CSS para ocultar sidebar, TOC y footer
  const style = document.createElement('style');
  style.textContent = `
    /* Ocultar sidebar izquierdo */
    #quarto-sidebar,
    .sidebar.sidebar-navigation {
      display: none !important;
    }

    /* Quitar el padding-left que el sidebar docked añade al body */
    body.nav-sidebar,
    body.nav-sidebar.docked {
      padding-left: 0 !important;
    }

    /* Ocultar TOC derecho */
    #quarto-margin-sidebar,
    .margin-sidebar,
    #TOC {
      display: none !important;
    }

    /* Ocultar nav secundaria (breadcrumb móvil) */
    .quarto-secondary-nav,
    #quarto-search {
      display: none !important;
    }

    /* Ocultar footer */
    footer.footer,
    .nav-footer,
    .page-navigation {
      display: none !important;
    }

    /* Expandir el contenido al ancho completo.
       Usamos px (no rem/em) para que el padding NO escale con Ctrl++. */
    #quarto-content,
    .quarto-container {
      max-width: 100% !important;
      padding-left: 24px !important;
      padding-right: 24px !important;
    }

    /* El área principal y sus posibles paddings heredados también en px */
    main#quarto-document-content,
    .content.column-body {
      max-width: 100% !important;
      padding-left: 0 !important;
      padding-right: 0 !important;
    }

    /* Variables CSS de Quarto para el grid de columnas */
    :root {
      --quarto-sidebar-width: 0px !important;
      --quarto-sidebar-padding: 0px !important;
      --quarto-body-padding: 0px !important;
    }
  `;
  document.head.appendChild(style);

  // 4. Botón flotante para salir del modo presentación
  function exitFullView() {
    const url = new URL(window.location.href);
    url.searchParams.delete('full');
    window.location.href = url.toString();
  }

  const btn = document.createElement('button');
  btn.innerHTML = '✕ Salir';
  btn.setAttribute('title', 'Salir del modo presentación (Escape)');
  Object.assign(btn.style, {
    position:     'fixed',
    bottom:       '1.5rem',
    right:        '1.5rem',
    zIndex:       '99999',
    background:   'rgba(0, 0, 0, 0.55)',
    color:        'white',
    border:       'none',
    borderRadius: '6px',
    padding:      '0.4rem 0.9rem',
    cursor:       'pointer',
    fontSize:     '0.8rem',
    opacity:      '0.4',
    transition:   'opacity 0.2s',
    fontFamily:   'inherit',
  });
  btn.addEventListener('mouseenter', function () { btn.style.opacity = '1'; });
  btn.addEventListener('mouseleave', function () { btn.style.opacity = '0.4'; });
  btn.addEventListener('click', exitFullView);

  // Montar el botón cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { document.body.appendChild(btn); });
  } else {
    document.body.appendChild(btn);
  }

  // 5. Tecla Escape para salir
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !e.target.matches('input, textarea, select, [contenteditable]')) {
      exitFullView();
    }
  });
})();

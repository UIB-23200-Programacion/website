// Redirige el logo del sidebar según el idioma de la página actual
document.addEventListener("DOMContentLoaded", function () {
  var logoLink = document.querySelector("a.sidebar-logo-link");
  if (logoLink) {
    var isCA = window.location.pathname.includes("/ca/");
    logoLink.href = isCA
      ? "https://estudis.uib.cat/estudis-de-grau/grau/matematiques/GMA3-P/23200/index.html"   // Logo en páginas catalanas → UIB en catalán
      : "https://estudis.uib.es/estudis-de-grau/grau/matematiques/GMA3-P/23200/index.html";   // Logo en páginas españolas → UIB en español
    logoLink.target = "_blank";
    logoLink.rel = "noopener noreferrer";
  }
});

// Botón "Copiar código" para bloques {pyodide} de quarto-live
(function () {
  'use strict';

  function getEditorText(card) {
    var lines = card.querySelectorAll('.cm-content .cm-line');
    return Array.from(lines).map(function (l) { return l.textContent; }).join('\n');
  }

  function addCopyButton(card) {
    if (card.dataset.copyAdded) return;
    card.dataset.copyAdded = '1';

    var header = card.querySelector('.card-header');
    if (!header) return;

    var btn = document.createElement('a');
    btn.className = 'd-flex align-items-center gap-1 btn btn-exercise-editor btn-outline-dark qlive-copy-btn';
    btn.setAttribute('role', 'button');
    btn.title = 'Copiar código';
    btn.innerHTML =
      '<i class="bi bi-clipboard"></i>' +
      '<span class="btn-label-exercise-editor">Copiar</span>';

    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var text = getEditorText(card);

      function showFeedback() {
        btn.innerHTML =
          '<i class="bi bi-check2"></i>' +
          '<span class="btn-label-exercise-editor">¡Copiado!</span>';
        setTimeout(function () {
          btn.innerHTML =
            '<i class="bi bi-clipboard"></i>' +
            '<span class="btn-label-exercise-editor">Copiar</span>';
        }, 1500);
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(showFeedback).catch(function () {
          fallbackCopy(text); showFeedback();
        });
      } else {
        fallbackCopy(text); showFeedback();
      }
    });

    var group = header.querySelector('.btn-group');
    if (group) {
      group.appendChild(btn);
    } else {
      header.appendChild(btn);
    }
  }

  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try { document.execCommand('copy'); } catch (err) { /* noop */ }
    document.body.removeChild(ta);
  }

  function scanAndAdd() {
    document.querySelectorAll('.card.exercise-editor').forEach(addCopyButton);
  }

  var observer = new MutationObserver(scanAndAdd);
  observer.observe(document.body, { childList: true, subtree: true });

  var tries = 0;
  var interval = setInterval(function () {
    scanAndAdd();
    if (++tries >= 10) clearInterval(interval);
  }, 500);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scanAndAdd);
  } else {
    scanAndAdd();
  }
})();

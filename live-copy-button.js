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
    btn.className = 'btn btn-exercise-editor btn-outline-dark qlive-copy-btn';
    btn.setAttribute('role', 'button');
    btn.title = 'Copiar código';
    btn.innerHTML =
      '<i class="bi bi-clipboard"></i>' +
      '<span class="btn-label-exercise-editor ms-1">Copiar</span>';

    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var text = getEditorText(card);

      function showFeedback() {
        btn.innerHTML =
          '<i class="bi bi-check2"></i>' +
          '<span class="btn-label-exercise-editor ms-1">¡Copiado!</span>';
        setTimeout(function () {
          btn.innerHTML =
            '<i class="bi bi-clipboard"></i>' +
            '<span class="btn-label-exercise-editor ms-1">Copiar</span>';
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

    var firstBtn = header.querySelector('.btn-exercise-editor');
    if (firstBtn) {
      firstBtn.parentNode.insertBefore(btn, firstBtn);
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

  // Intenta múltiples selectores por si el nombre de clase varía
  function scanAndAdd() {
    document.querySelectorAll(
      '.card.exercise-editor, .exercise-editor.card, [class*="exercise-editor"]'
    ).forEach(function (card) {
      // Solo añadir si tiene un card-header (descartar wrappers externos)
      if (card.querySelector('.card-header')) {
        addCopyButton(card);
      }
    });
  }

  // MutationObserver para capturar editores renderizados por OJS
  var observer = new MutationObserver(scanAndAdd);
  observer.observe(document.body, { childList: true, subtree: true });

  // Polling como fallback (10 intentos cada 500ms = 5 segundos)
  var tries = 0;
  var interval = setInterval(function () {
    scanAndAdd();
    if (++tries >= 10) clearInterval(interval);
  }, 500);

  // Intentos en eventos estándar de carga
  document.addEventListener('DOMContentLoaded', scanAndAdd);
  window.addEventListener('load', scanAndAdd);
})();

(function () {
  'use strict';

  function getEditorText(card) {
    const lines = card.querySelectorAll('.cm-content .cm-line');
    return Array.from(lines).map(function (l) { return l.textContent; }).join('\n');
  }

  function addCopyButton(card) {
    if (card.querySelector('.qlive-copy-btn')) return;

    const header = card.querySelector('.card-header');
    if (!header) return;

    const btn = document.createElement('a');
    btn.className = 'btn btn-exercise-editor btn-outline-dark qlive-copy-btn';
    btn.setAttribute('role', 'button');
    btn.title = 'Copiar código';
    btn.innerHTML =
      '<i class="bi bi-clipboard"></i>' +
      '<span class="btn-label-exercise-editor ms-1">Copiar</span>';

    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const text = getEditorText(card);

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
          fallbackCopy(text);
          showFeedback();
        });
      } else {
        fallbackCopy(text);
        showFeedback();
      }
    });

    // Insertar antes del primer botón existente (Run Code), para que Copy quede primero
    const firstBtn = header.querySelector('.btn-exercise-editor');
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

  function scanAndAdd() {
    document.querySelectorAll('.card.exercise-editor').forEach(addCopyButton);
  }

  // MutationObserver para capturar editores renderizados por OJS tras la carga
  var observer = new MutationObserver(scanAndAdd);
  observer.observe(document.body, { childList: true, subtree: true });

  // Por si algún editor ya está presente al cargar
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scanAndAdd);
  } else {
    scanAndAdd();
  }
})();

var micBoxToastTimer;
function showToast(message) {
  var toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('is-visible');
  clearTimeout(micBoxToastTimer);
  micBoxToastTimer = setTimeout(function () {
    toast.classList.remove('is-visible');
  }, 2800);
}

document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav toggle
  var navToggle = document.getElementById('nav-toggle');
  var mainNav = document.getElementById('main-nav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = mainNav.classList.toggle('is-open');
      navToggle.classList.toggle('is-open', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('is-open');
        navToggle.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Newsletter form (front-end only, no backend wired up yet)
  var form = document.getElementById('newsletter-form');
  var note = document.getElementById('form-note');

  if (form && note) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = document.getElementById('email').value.trim();
      var isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!isValid) {
        note.textContent = 'Merci de saisir une adresse e-mail valide.';
        return;
      }

      note.textContent = 'Merci ! Vous recevrez bientôt votre code de réduction.';
      form.reset();
    });
  }

  // Footer year
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});

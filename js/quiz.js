var QUIZZES = {
  dog: {
    title: 'Le profil de votre chien',
    questions: [
      { question: 'Quel est le type de pelage de votre chien ?', options: ['Court', 'Moyen', 'Long', 'Ondulé / frisé'] },
      { question: 'Sa peau est-elle sensible ?', options: ['Robuste', 'Légèrement sensible', 'Très sensible', 'Allergique'] },
      { question: 'À quelle fréquence le baignez-vous ?', options: ['Rarement', '1 fois/mois', '2 à 4 fois/mois', 'Plus de 4 fois/mois'] }
    ]
  },
  cat: {
    title: 'Le profil de votre chat',
    questions: [
      { question: 'Quel est le type de pelage de votre chat ?', options: ['Court', 'Mi-long', 'Long', 'Sans poils'] },
      { question: 'A-t-il des problèmes dermatologiques ?', options: ['Non', 'Légers', 'Modérés', 'Sévères'] },
      { question: 'Comment tolère-t-il les bains ?', options: ['Très bien', 'Plutôt bien', 'Difficilement', 'Pas du tout'] }
    ]
  },
  horse: {
    title: 'Le profil de votre cheval',
    questions: [
      { question: 'Souffre-t-il de dermite estivale ?', options: ['Non', 'Légèrement', 'Modérément', 'Sévèrement'] },
      { question: 'Quel type de travail pratique-t-il ?', options: ['Loisir', 'Dressage', "Saut d'obstacles", 'Concours complet'] },
      { question: 'A-t-il des problèmes de peau actuellement ?', options: ['Aucun', 'Irritation mineure', 'Irritation modérée', 'Allergie importante'] }
    ]
  },
  rabbit: {
    title: 'Le profil de votre lapin / NAC',
    questions: [
      { question: 'Quel type de poil a votre animal ?', options: ['Court', 'Moyen', 'Long', 'Très long / angora'] },
      { question: 'A-t-il des allergies ou sensibilités respiratoires ?', options: ['Non', 'Légères', 'Modérées', 'Sévères'] },
      { question: 'Quel est son besoin cosmétique prioritaire ?', options: ['Hygiène générale', 'Démêlage', 'Apaisement', 'Protection'] }
    ]
  }
};

var ANIMAL_EMOJI = { dog: '🐶', cat: '🐱', horse: '🐴', rabbit: '🐇' };
var PROFILE_COLORS = ['#4C7A5A', '#C97E77', '#D9A441', '#5C8FA6', '#9B7FBF'];

(function () {
  var modal = document.getElementById('quiz-modal');
  var modalBody = document.getElementById('quiz-modal-body');
  if (!modal || !modalBody) return;

  var selectedAnswers = {};
  var profile = { name: '', color: PROFILE_COLORS[0] };

  function openModal() {
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('quiz-modal-open');
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('quiz-modal-open');
  }

  function avatarCircle(animal, size) {
    return '<span class="quiz-avatar-circle' + (size ? ' quiz-avatar-circle-' + size : '') + '" style="background:' + profile.color + '">' + ANIMAL_EMOJI[animal] + '</span>';
  }

  function profileChip(animal) {
    var name = profile.name.trim() || 'Votre compagnon';
    return '<div class="quiz-profile-chip">' + avatarCircle(animal, 'sm') + '<span class="quiz-profile-chip-name">' + name + '</span></div>';
  }

  function renderProfile(animal) {
    selectedAnswers = {};
    profile = { name: '', color: PROFILE_COLORS[0] };

    var html = '<p class="eyebrow">Le profil de votre compagnon</p><h3 id="quiz-modal-title">Faisons connaissance</h3>';
    html += '<div class="quiz-avatar-preview" id="quiz-avatar-preview">' + avatarCircle(animal) + '<span class="quiz-avatar-preview-name">Votre compagnon</span></div>';
    html += '<label class="quiz-field-label" for="quiz-pet-name">Son prénom</label>';
    html += '<input type="text" id="quiz-pet-name" class="quiz-input" placeholder="Ex. Rio, Nova, Étoile…" maxlength="24" autocomplete="off">';
    html += '<p class="quiz-field-label">Sa couleur</p>';
    html += '<div class="quiz-color-grid">';
    PROFILE_COLORS.forEach(function (color, i) {
      html += '<button type="button" class="quiz-color-swatch' + (i === 0 ? ' is-selected' : '') + '" data-color="' + color + '" style="background:' + color + '" aria-label="Couleur ' + (i + 1) + '"></button>';
    });
    html += '</div>';
    html += '<button type="button" class="btn btn-primary btn-block quiz-profile-continue" data-animal="' + animal + '" disabled>Continuer</button>';
    modalBody.innerHTML = html;

    modalBody.querySelector('#quiz-pet-name').focus();
  }

  function renderQuestions(animal) {
    var quiz = QUIZZES[animal];
    var html = profileChip(animal);
    html += '<p class="eyebrow">Quiz personnalisation</p><h3 id="quiz-modal-title">' + quiz.title + '</h3>';

    quiz.questions.forEach(function (q, index) {
      html += '<div class="quiz-question"><p class="quiz-question-label">' + q.question + '</p><div class="quiz-options">';
      q.options.forEach(function (option) {
        html += '<button type="button" class="quiz-option" data-q="' + index + '" data-opt="' + option + '">' + option + '</button>';
      });
      html += '</div></div>';
    });

    html += '<button type="button" class="btn btn-primary btn-block quiz-submit" data-animal="' + animal + '" disabled>Voir mes recommandations</button>';
    modalBody.innerHTML = html;
  }

  function checkComplete(animal) {
    var total = QUIZZES[animal].questions.length;
    var submitBtn = modalBody.querySelector('.quiz-submit');
    if (submitBtn) submitBtn.disabled = Object.keys(selectedAnswers).length < total;
  }

  function renderResults(animal) {
    var items = MIC_PRODUCTS.filter(function (p) { return p.category === animal; }).slice(0, 4);
    var total = items.reduce(function (sum, p) { return sum + p.price; }, 0);
    var name = profile.name.trim() || 'votre compagnon';

    var html = profileChip(animal);
    html += '<p class="eyebrow">Votre sélection</p><h3 id="quiz-modal-title">La box de ' + name + ', pensée sur mesure</h3>';
    html += '<div class="quiz-results">';
    items.forEach(function (p) {
      html += (
        '<div class="quiz-result-item">' +
          '<span class="quiz-result-emoji" aria-hidden="true">' + p.image + '</span>' +
          '<span class="quiz-result-info"><span class="quiz-result-name">' + p.name + '</span>' +
          '<span class="quiz-result-brand">' + p.brand + '</span></span>' +
          '<span class="quiz-result-price">' + p.price + ' €</span>' +
        '</div>'
      );
    });
    html += '</div>';
    html += '<p class="quiz-total">Valeur du panier estimée : <strong>' + total + ' €</strong> — retrouvée chaque mois dans la box de ' + name + ', dès 16,90 €.</p>';
    html += '<a href="#box" class="btn btn-primary btn-block" data-quiz-close>Je m\'abonne</a>';
    html += '<button type="button" class="btn btn-ghost btn-block quiz-restart" data-animal="' + animal + '">Refaire le quiz</button>';
    modalBody.innerHTML = html;
  }

  document.querySelectorAll('.quiz-animal-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      renderProfile(btn.getAttribute('data-animal'));
      openModal();
    });
  });

  modal.addEventListener('click', function (e) {
    if (e.target.closest('[data-quiz-close]')) {
      closeModal();
      return;
    }

    var swatch = e.target.closest('.quiz-color-swatch');
    if (swatch) {
      modalBody.querySelectorAll('.quiz-color-swatch').forEach(function (s) { s.classList.remove('is-selected'); });
      swatch.classList.add('is-selected');
      profile.color = swatch.getAttribute('data-color');
      var preview = modalBody.querySelector('#quiz-avatar-preview .quiz-avatar-circle');
      if (preview) preview.style.background = profile.color;
      return;
    }

    var continueBtn = e.target.closest('.quiz-profile-continue');
    if (continueBtn && !continueBtn.disabled) {
      renderQuestions(continueBtn.getAttribute('data-animal'));
      return;
    }

    var option = e.target.closest('.quiz-option');
    if (option) {
      var group = option.closest('.quiz-question').querySelectorAll('.quiz-option');
      group.forEach(function (o) { o.classList.remove('is-selected'); });
      option.classList.add('is-selected');

      var submitBtn = modalBody.querySelector('.quiz-submit');
      var animal = submitBtn ? submitBtn.getAttribute('data-animal') : null;
      selectedAnswers[option.getAttribute('data-q')] = option.getAttribute('data-opt');
      if (animal) checkComplete(animal);
      return;
    }

    var submit = e.target.closest('.quiz-submit');
    if (submit && !submit.disabled) {
      renderResults(submit.getAttribute('data-animal'));
      return;
    }

    var restart = e.target.closest('.quiz-restart');
    if (restart) {
      renderProfile(restart.getAttribute('data-animal'));
    }
  });

  modal.addEventListener('input', function (e) {
    if (!e.target.matches('#quiz-pet-name')) return;

    var value = e.target.value;
    profile.name = value;

    var previewName = modalBody.querySelector('.quiz-avatar-preview-name');
    if (previewName) previewName.textContent = value.trim() || 'Votre compagnon';

    var continueBtn = modalBody.querySelector('.quiz-profile-continue');
    if (continueBtn) continueBtn.disabled = value.trim().length === 0;
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });
})();

var ACCOUNT_SPECIES = [
  { id: 'dog', emoji: '🐶', label: 'Chien' },
  { id: 'cat', emoji: '🐱', label: 'Chat' },
  { id: 'horse', emoji: '🐴', label: 'Cheval' },
  { id: 'rabbit', emoji: '🐇', label: 'Lapin & NAC' }
];

var MicAccount = (function () {
  var STORAGE_KEY = 'micBoxAccount';

  function load() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function save(account) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(account));
    } catch (e) {}
  }

  var account = load();

  function addOrder(product) {
    if (!account) return false;
    account.orders = account.orders || [];
    account.orders.unshift({
      date: new Date().toLocaleDateString('fr-FR'),
      name: product.name,
      price: product.price
    });
    save(account);
    return true;
  }

  function setSubscription(planId, planLabel, planPrice) {
    if (!account) return false;
    account.subscription = { planId: planId, planLabel: planLabel, planPrice: planPrice, since: new Date().toLocaleDateString('fr-FR') };
    save(account);
    return true;
  }

  return {
    get: function () { return account; },
    create: function (data) { account = data; save(account); },
    update: function (data) { account = data; save(account); },
    clear: function () { account = null; try { localStorage.removeItem(STORAGE_KEY); } catch (e) {} },
    addOrder: addOrder,
    setSubscription: setSubscription
  };
})();

(function () {
  var modal = document.getElementById('account-modal');
  var modalBody = document.getElementById('account-modal-body');
  if (!modal || !modalBody) return;

  var activeTab = 'profil';
  var draft = null;

  function blankDraft() {
    return { firstName: '', lastName: '', address: '', species: '', avatar: '', petName: '', color: PROFILE_COLORS[0] };
  }

  function openModal() {
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('quiz-modal-open');
    activeTab = 'profil';
    render();
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('quiz-modal-open');
  }

  function render() {
    if (!MicAccount.get()) {
      renderForm();
    } else {
      renderDashboard();
    }
  }

  function speciesLabel(id) {
    var found = ACCOUNT_SPECIES.filter(function (s) { return s.id === id; })[0];
    return found ? found.label : id;
  }

  function avatarLabel(species, emoji) {
    var found = (ANIMAL_AVATARS[species] || []).filter(function (a) { return a.emoji === emoji; })[0];
    return found ? found.label : '';
  }

  function renderForm() {
    if (!draft) draft = blankDraft();

    var html = '<p class="eyebrow">' + (MicAccount.get() ? 'Modifier mon profil' : 'Créer mon compte') + '</p>';
    html += '<h3 id="account-modal-title">Vos informations</h3>';
    html += '<label class="quiz-field-label" for="acc-first-name">Prénom</label>';
    html += '<input type="text" id="acc-first-name" class="quiz-input" data-field="firstName" value="' + draft.firstName + '" placeholder="Charlotte" autocomplete="given-name">';
    html += '<label class="quiz-field-label" for="acc-last-name">Nom</label>';
    html += '<input type="text" id="acc-last-name" class="quiz-input" data-field="lastName" value="' + draft.lastName + '" placeholder="Gambini" autocomplete="family-name">';
    html += '<label class="quiz-field-label" for="acc-address">Adresse de livraison</label>';
    html += '<input type="text" id="acc-address" class="quiz-input" data-field="address" value="' + draft.address + '" placeholder="12 rue des Lilas, 75011 Paris" autocomplete="street-address">';

    html += '<p class="eyebrow" style="margin-top:1.5em;">Votre compagnon</p>';
    html += '<p class="quiz-field-label">Son espèce</p>';
    html += '<div class="quiz-animal-grid account-species-grid">';
    ACCOUNT_SPECIES.forEach(function (s) {
      html += (
        '<button type="button" class="quiz-animal-btn account-species-btn' + (draft.species === s.id ? ' is-selected' : '') + '" data-species="' + s.id + '">' +
          '<span class="quiz-animal-emoji">' + s.emoji + '</span><span>' + s.label + '</span>' +
        '</button>'
      );
    });
    html += '</div>';

    if (draft.species) {
      var avatars = ANIMAL_AVATARS[draft.species];
      if (!draft.avatar) draft.avatar = avatars[0].emoji;

      html += '<div class="quiz-avatar-preview">' +
        '<span class="quiz-avatar-circle" style="background:' + draft.color + '">' + draft.avatar + '</span>' +
        '<span class="quiz-avatar-preview-name">' + (draft.petName || 'Votre compagnon') + '</span>' +
      '</div>';

      html += '<label class="quiz-field-label" for="acc-pet-name">Son prénom</label>';
      html += '<input type="text" id="acc-pet-name" class="quiz-input" data-field="petName" value="' + draft.petName + '" placeholder="Rio, Nova, Étoile…" autocomplete="off">';

      html += '<p class="quiz-field-label">Son allure</p><div class="quiz-avatar-grid">';
      avatars.forEach(function (a) {
        html += (
          '<button type="button" class="quiz-avatar-swatch' + (draft.avatar === a.emoji ? ' is-selected' : '') + '" data-avatar="' + a.emoji + '">' +
            '<span class="quiz-avatar-swatch-emoji">' + a.emoji + '</span><span class="quiz-avatar-swatch-label">' + a.label + '</span>' +
          '</button>'
        );
      });
      html += '</div>';

      html += '<p class="quiz-field-label">Sa couleur</p><div class="quiz-color-grid">';
      PROFILE_COLORS.forEach(function (color) {
        html += '<button type="button" class="quiz-color-swatch' + (draft.color === color ? ' is-selected' : '') + '" data-color="' + color + '" style="background:' + color + '" aria-label="Couleur"></button>';
      });
      html += '</div>';
    }

    var valid = draft.firstName.trim() && draft.lastName.trim() && draft.address.trim() && draft.species && draft.petName.trim();
    html += '<button type="button" class="btn btn-primary btn-block account-save"' + (valid ? '' : ' disabled') + '>Enregistrer mon profil</button>';
    if (MicAccount.get()) {
      html += '<button type="button" class="btn btn-ghost btn-block account-cancel-edit">Annuler</button>';
    }
    html += '<p class="account-disclaimer">Démo locale : ces informations restent uniquement dans ce navigateur, aucun compte n\'est réellement créé sur un serveur.</p>';

    modalBody.innerHTML = html;
  }

  function renderDashboard() {
    var account = MicAccount.get();
    var breed = avatarLabel(account.species, account.avatar);

    var html = (
      '<div class="account-header">' +
        '<span class="quiz-avatar-circle" style="background:' + account.color + '">' + account.avatar + '</span>' +
        '<div><h3 id="account-modal-title">Bonjour ' + account.firstName + ' 👋</h3>' +
        '<p class="account-header-sub">avec ' + account.petName + (breed ? ' · ' + breed : '') + '</p></div>' +
      '</div>'
    );

    html += '<div class="account-tabs">';
    [['profil', 'Profil'], ['commandes', 'Mes commandes'], ['abonnement', 'Mon abonnement']].forEach(function (t) {
      html += '<button type="button" class="filter-btn account-tab' + (activeTab === t[0] ? ' is-active' : '') + '" data-tab="' + t[0] + '">' + t[1] + '</button>';
    });
    html += '</div>';

    html += '<div class="account-panel">';
    if (activeTab === 'profil') {
      html += (
        '<dl class="account-info-list">' +
          '<dt>Nom complet</dt><dd>' + account.firstName + ' ' + account.lastName + '</dd>' +
          '<dt>Adresse</dt><dd>' + account.address + '</dd>' +
          '<dt>Compagnon</dt><dd>' + account.petName + ' — ' + speciesLabel(account.species) + (breed ? ' (' + breed + ')' : '') + '</dd>' +
        '</dl>'
      );
      html += '<button type="button" class="btn btn-ghost btn-block account-edit">Modifier mon profil</button>';
      html += '<button type="button" class="btn btn-ghost btn-block account-logout">Supprimer mon compte (démo)</button>';
    } else if (activeTab === 'commandes') {
      var orders = account.orders || [];
      if (orders.length === 0) {
        html += '<p class="account-empty">Aucune commande pour l\'instant.</p>';
        html += '<a href="#produits" class="btn btn-primary btn-block" data-account-close>Découvrir le catalogue</a>';
      } else {
        html += '<div class="quiz-results">';
        orders.forEach(function (o) {
          html += (
            '<div class="quiz-result-item">' +
              '<span class="quiz-result-info"><span class="quiz-result-name">' + o.name + '</span>' +
              '<span class="quiz-result-brand">' + o.date + '</span></span>' +
              '<span class="quiz-result-price">' + o.price + ' €</span>' +
            '</div>'
          );
        });
        html += '</div>';
      }
    } else if (activeTab === 'abonnement') {
      if (account.subscription) {
        html += (
          '<div class="account-plan-card">' +
            '<p class="account-plan-badge">Actif</p>' +
            '<h4>Formule ' + account.subscription.planLabel + '</h4>' +
            '<p class="account-plan-price">' + account.subscription.planPrice + '</p>' +
            '<p class="account-plan-since">Depuis le ' + account.subscription.since + '</p>' +
          '</div>'
        );
        html += '<button type="button" class="btn btn-ghost btn-block account-cancel-sub">Résilier (démo)</button>';
      } else {
        html += '<p class="account-empty">Aucun abonnement actif.</p>';
        html += '<a href="#box" class="btn btn-primary btn-block" data-account-close>Voir les formules</a>';
      }
    }
    html += '</div>';

    modalBody.innerHTML = html;
  }

  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-open-account]')) {
      e.preventDefault();
      draft = null;
      openModal();
      return;
    }
  });

  modal.addEventListener('click', function (e) {
    if (e.target.closest('[data-account-close]')) {
      closeModal();
      return;
    }

    var speciesBtn = e.target.closest('.account-species-btn');
    if (speciesBtn) {
      draft.species = speciesBtn.getAttribute('data-species');
      draft.avatar = ANIMAL_AVATARS[draft.species][0].emoji;
      renderForm();
      return;
    }

    var avatarBtn = e.target.closest('.quiz-avatar-swatch');
    if (avatarBtn) {
      draft.avatar = avatarBtn.getAttribute('data-avatar');
      renderForm();
      return;
    }

    var colorBtn = e.target.closest('.quiz-color-swatch');
    if (colorBtn) {
      draft.color = colorBtn.getAttribute('data-color');
      renderForm();
      return;
    }

    var saveBtn = e.target.closest('.account-save');
    if (saveBtn && !saveBtn.disabled) {
      MicAccount.create(draft);
      draft = null;
      if (typeof showToast === 'function') showToast('Profil enregistré ✓');
      render();
      return;
    }

    var cancelEdit = e.target.closest('.account-cancel-edit');
    if (cancelEdit) {
      draft = null;
      render();
      return;
    }

    var editBtn = e.target.closest('.account-edit');
    if (editBtn) {
      draft = Object.assign({}, MicAccount.get());
      renderForm();
      return;
    }

    var logoutBtn = e.target.closest('.account-logout');
    if (logoutBtn) {
      MicAccount.clear();
      draft = null;
      if (typeof showToast === 'function') showToast('Compte supprimé (démo)');
      render();
      return;
    }

    var cancelSubBtn = e.target.closest('.account-cancel-sub');
    if (cancelSubBtn) {
      var account = MicAccount.get();
      account.subscription = null;
      MicAccount.update(account);
      render();
      return;
    }

    var tabBtn = e.target.closest('.account-tab');
    if (tabBtn) {
      activeTab = tabBtn.getAttribute('data-tab');
      render();
      return;
    }
  });

  modal.addEventListener('input', function (e) {
    var field = e.target.getAttribute('data-field');
    if (field && draft) draft[field] = e.target.value;

    if (field === 'petName') {
      var previewName = modalBody.querySelector('.quiz-avatar-preview-name');
      if (previewName) previewName.textContent = e.target.value.trim() || 'Votre compagnon';
    }

    var saveBtn = modalBody.querySelector('.account-save');
    if (saveBtn) {
      var valid = draft.firstName.trim() && draft.lastName.trim() && draft.address.trim() && draft.species && draft.petName.trim();
      saveBtn.disabled = !valid;
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });

  document.addEventListener('click', function (e) {
    var link = e.target.closest('[data-plan]');
    if (!link) return;

    var account = MicAccount.get();
    if (!account) return;

    var species = link.getAttribute('data-species');
    var planId = link.getAttribute('data-plan');
    var planLabel = link.getAttribute('data-plan-label');
    var priceInfo = typeof MicPricing !== 'undefined' ? MicPricing.get(species) : null;
    var amount = priceInfo ? priceInfo[planId] : null;
    var unit = planId === 'trimestriel' ? '/trimestre' : '/box';
    var priceLabel = amount != null ? MicPricing.format(amount) + unit : '';

    MicAccount.setSubscription(planId, planLabel + (priceInfo ? ' — ' + priceInfo.label : ''), priceLabel);
    if (typeof showToast === 'function') showToast('Formule ' + planLabel + ' enregistrée dans votre compte ✓');
  });
})();

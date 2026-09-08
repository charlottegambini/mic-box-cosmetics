var PRICE_GRID = {
  dog: { label: 'Chien', decouverte: 19.90, trimestriel: 44.50, prepaid2: 80.10 },
  cat: { label: 'Chat', decouverte: 19.90, trimestriel: 40.00, prepaid2: 72.00 },
  horse: { label: 'Cheval & Poney', decouverte: 24.90, trimestriel: 63.00, prepaid2: 113.40 },
  rabbit: { label: 'Lapin & NAC', decouverte: 19.90, trimestriel: 40.00, prepaid2: 72.00 }
};

function formatPrice(value) {
  return value.toFixed(2).replace('.', ',') + ' €';
}

var MicPricing = (function () {
  var currentSpecies = 'dog';
  var currentFrequency = 'single';

  function trimestrielPrice(species) {
    var p = PRICE_GRID[species];
    return currentFrequency === 'prepaid2'
      ? { amount: p.prepaid2, unit: '/ 2 saisons', note: formatPrice(p.prepaid2 / 2) + ' par saison en moyenne' }
      : { amount: p.trimestriel, unit: '/ trimestre', note: null };
  }

  function renderPricing(species) {
    var grid = document.getElementById('pricing-grid');
    if (!grid || !PRICE_GRID[species]) return;

    currentSpecies = species;
    var p = PRICE_GRID[species];
    var tri = trimestrielPrice(species);

    document.querySelectorAll('.species-tab').forEach(function (btn) {
      btn.classList.toggle('is-active', btn.getAttribute('data-species') === species);
    });

    grid.innerHTML = (
      '<article class="price-card">' +
        '<h3>Découverte</h3>' +
        '<p class="price-sub">Une box, sans engagement</p>' +
        '<p class="price"><span>' + formatPrice(p.decouverte) + '</span>/ box</p>' +
        '<ul class="price-features">' +
          '<li>✔ 1 box personnalisée</li>' +
          '<li>✔ 3 à 4 produits vegan</li>' +
          '<li>✔ Livraison offerte</li>' +
        '</ul>' +
        '<a href="#newsletter" class="btn btn-ghost btn-block" data-plan="decouverte" data-plan-label="Découverte" data-species="' + species + '">Essayer</a>' +
      '</article>' +
      '<article class="price-card price-card-featured">' +
        '<p class="price-badge">Le plus choisi</p>' +
        '<h3>Abonnement trimestriel</h3>' +
        '<p class="price-sub">Livrée 4 fois par an, au rythme des saisons</p>' +

        '<div class="frequency-toggle" role="tablist" aria-label="Rythme de paiement">' +
          '<button type="button" class="frequency-option' + (currentFrequency === 'single' ? ' is-active' : '') + '" data-frequency="single">Saison par saison</button>' +
          '<button type="button" class="frequency-option' + (currentFrequency === 'prepaid2' ? ' is-active' : '') + '" data-frequency="prepaid2">Prépaiement 2 saisons <span class="frequency-badge">-10%</span></button>' +
        '</div>' +

        '<p class="price"><span>' + formatPrice(tri.amount) + '</span>' + tri.unit + '</p>' +
        (tri.note ? '<p class="price-note">soit ' + tri.note + '</p>' : '') +

        '<ul class="price-features">' +
          '<li>✔ Sans engagement</li>' +
          '<li>✔ 4 à 5 produits vegan</li>' +
          '<li>✔ Personnalisation évolutive</li>' +
          '<li>✔ Résiliable à tout moment</li>' +
        '</ul>' +

        (currentFrequency === 'prepaid2'
          ? '<p class="prepaid-note">🔓 Prépaiement flexible et remboursable : si vous annulez, les saisons prépayées et non envoyées sont remboursées au prorata.</p>'
          : '') +

        '<p class="loyalty-teaser">🎁 4 saisons reçues = une récompense fidélité, sans engagement.</p>' +

        '<a href="#newsletter" class="btn btn-primary btn-block" data-plan="trimestriel" data-plan-label="Abonnement trimestriel" data-species="' + species + '" data-frequency="' + currentFrequency + '">Je m\'abonne</a>' +
      '</article>'
    );

    renderLoyaltyPreview();
  }

  function renderLoyaltyPreview() {
    var el = document.getElementById('loyalty-preview');
    if (!el) return;

    var stamps = '';
    for (var i = 0; i < 4; i++) {
      stamps += '<span class="loyalty-stamp"><span class="loyalty-stamp-icon">🐾</span></span>';
    }

    el.innerHTML = (
      '<div class="loyalty-preview-card">' +
        '<div class="loyalty-stamps">' + stamps + '</div>' +
        '<div class="loyalty-preview-text">' +
          '<p class="loyalty-preview-title">Carte fidélité MIC BOX</p>' +
          '<p class="loyalty-preview-desc">Chaque saison reçue ajoute un tampon. À 4 tampons, choisissez votre récompense : une saison offerte, ou un goodie exclusif de la saison — sans jamais rien devoir.</p>' +
        '</div>' +
      '</div>'
    );
  }

  document.addEventListener('DOMContentLoaded', function () {
    if (!document.getElementById('pricing-grid')) return;

    document.querySelectorAll('.species-tab').forEach(function (btn) {
      btn.addEventListener('click', function () {
        renderPricing(btn.getAttribute('data-species'));
      });
    });

    document.getElementById('pricing-grid').addEventListener('click', function (e) {
      var freqBtn = e.target.closest('.frequency-option');
      if (freqBtn) {
        currentFrequency = freqBtn.getAttribute('data-frequency');
        renderPricing(currentSpecies);
      }
    });

    renderPricing(currentSpecies);
  });

  return {
    setSpecies: renderPricing,
    getSpecies: function () { return currentSpecies; },
    getFrequency: function () { return currentFrequency; },
    get: function (species) { return PRICE_GRID[species]; },
    getTrimestrielPrice: trimestrielPrice,
    format: formatPrice
  };
})();

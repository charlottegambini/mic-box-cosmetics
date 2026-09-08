var PRICE_GRID = {
  dog: { label: 'Chien', decouverte: 19.90, trimestriel: 44.50 },
  cat: { label: 'Chat', decouverte: 19.90, trimestriel: 40.00 },
  horse: { label: 'Cheval & Poney', decouverte: 24.90, trimestriel: 63.00 },
  rabbit: { label: 'Lapin & NAC', decouverte: 19.90, trimestriel: 40.00 }
};

function formatPrice(value) {
  return value.toFixed(2).replace('.', ',') + ' €';
}

var MicPricing = (function () {
  var currentSpecies = 'dog';

  function renderPricing(species) {
    var grid = document.getElementById('pricing-grid');
    if (!grid || !PRICE_GRID[species]) return;

    currentSpecies = species;
    var p = PRICE_GRID[species];

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
        '<p class="price"><span>' + formatPrice(p.trimestriel) + '</span>/ trimestre</p>' +
        '<ul class="price-features">' +
          '<li>✔ Sans engagement</li>' +
          '<li>✔ 4 à 5 produits vegan</li>' +
          '<li>✔ Personnalisation évolutive</li>' +
          '<li>✔ Résiliable à tout moment</li>' +
        '</ul>' +
        '<a href="#newsletter" class="btn btn-primary btn-block" data-plan="trimestriel" data-plan-label="Abonnement trimestriel" data-species="' + species + '">Je m\'abonne</a>' +
      '</article>'
    );
  }

  document.addEventListener('DOMContentLoaded', function () {
    if (!document.getElementById('pricing-grid')) return;

    document.querySelectorAll('.species-tab').forEach(function (btn) {
      btn.addEventListener('click', function () {
        renderPricing(btn.getAttribute('data-species'));
      });
    });

    renderPricing(currentSpecies);
  });

  return {
    setSpecies: renderPricing,
    getSpecies: function () { return currentSpecies; },
    get: function (species) { return PRICE_GRID[species]; },
    format: formatPrice
  };
})();

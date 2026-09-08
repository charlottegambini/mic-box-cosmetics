var MIC_PRODUCTS = [
  { id: 1, name: 'Shampoing Doux Pelage', brand: 'NaturalPaws', category: 'dog', price: 18, image: '🧴', description: 'Shampoing 100% vegan pour chiens.', tags: ['Vegan', 'Naturel', 'Pelage'] },
  { id: 2, name: 'Après-shampoing Apaisant', brand: 'EcoFur', category: 'dog', price: 20, image: '🧴', description: 'Sans paraben ni sulfate, formule apaisante.', tags: ['Hypoallergénique', 'Apaisant'] },
  { id: 3, name: 'Spray Anti-Démangeaisons', brand: 'PetVegan', category: 'dog', price: 15, image: '💨', description: 'Soulage les démangeaisons rapidement.', tags: ['Anti-démangeaisons'] },
  { id: 4, name: 'Poudre de Bain Sèche', brand: 'GreenPets', category: 'dog', price: 12, image: '💨', description: 'Bain sans eau aux huiles essentielles.', tags: ['Pratique', 'Rapide'] },

  { id: 5, name: 'Shampoing Doux Chat', brand: 'FelinePure', category: 'cat', price: 16, image: '🧴', description: 'Formule ultra-douce pour félins sensibles.', tags: ['Doux', 'Hypoallergénique'] },
  { id: 6, name: 'Spray Anti-Stress', brand: 'CalmPets', category: 'cat', price: 18, image: '💨', description: 'Calme l’anxiété grâce à des phéromones végétales.', tags: ['Apaisant', 'Naturel'] },
  { id: 7, name: 'Lingettes Apaisantes', brand: 'PetVegan', category: 'cat', price: 10, image: '🧻', description: 'Nettoie en douceur entre deux shampoings.', tags: ['Pratique', 'Doux'] },
  { id: 8, name: 'Démêlant Naturel', brand: 'FurCare', category: 'cat', price: 14, image: '✨', description: 'Démêle sans tirer sur les poils mi-longs.', tags: ['Démêlant', 'Doux'] },

  { id: 9, name: 'Crème Dermite Estivale', brand: 'EquineVegan', category: 'horse', price: 28, image: '🧴', description: 'Protection ciblée contre la dermite estivale.', tags: ['Protection', 'Dermite'] },
  { id: 10, name: 'Shampoing Performance', brand: 'EquiCare', category: 'horse', price: 25, image: '🧴', description: 'Renforce robe et crinière des chevaux de sport.', tags: ['Performance', 'Brillance'] },
  { id: 11, name: 'Huile de Crinière', brand: 'EquineLux', category: 'horse', price: 22, image: '🧴', description: 'Nourrit et fait briller la crinière.', tags: ['Crinière', 'Hydratant'] },
  { id: 12, name: 'Lotion Anti-Irritation', brand: 'VeganEquine', category: 'horse', price: 20, image: '💨', description: 'Apaise les irritations cutanées courantes.', tags: ['Apaisant', 'Naturel'] },

  { id: 13, name: 'Démêlant Doux Angora', brand: 'NACCare', category: 'rabbit', price: 14, image: '✨', description: 'Spécial pelage délicat de lapin.', tags: ['Doux', 'Angora'] },
  { id: 14, name: 'Poudre Hygiène Naturelle', brand: 'PetVegan', category: 'rabbit', price: 12, image: '💨', description: 'Hygiène quotidienne sans produit chimique.', tags: ['Hygiène', 'Naturel'] },
  { id: 15, name: 'Spray Apaisement', brand: 'NACsafe', category: 'rabbit', price: 13, image: '💨', description: 'Calme l’anxiété des petits animaux.', tags: ['Apaisant', 'Naturel'] },
  { id: 16, name: 'Chamois Nettoyant', brand: 'EcoCare', category: 'rabbit', price: 8, image: '🧻', description: 'Chamois naturel et réutilisable.', tags: ['Nettoyage', 'Réutilisable'] }
];

var ANIMAL_LABELS = { dog: 'Chien', cat: 'Chat', horse: 'Cheval', rabbit: 'Lapin & NAC' };

function renderProducts(list) {
  var grid = document.getElementById('products-grid');
  if (!grid) return;

  grid.innerHTML = list.map(function (product) {
    var tags = product.tags.map(function (tag) {
      return '<span class="product-tag">' + tag + '</span>';
    }).join('');

    return (
      '<article class="product-card">' +
        '<div class="product-emoji" aria-hidden="true">' + product.image + '</div>' +
        '<div class="product-tags">' + tags + '</div>' +
        '<h3>' + product.name + '</h3>' +
        '<p class="product-brand">' + product.brand + ' · ' + ANIMAL_LABELS[product.category] + '</p>' +
        '<p class="product-desc">' + product.description + '</p>' +
        '<div class="product-footer">' +
          '<span class="product-price">' + product.price + ' €</span>' +
          '<button type="button" class="btn btn-ghost btn-sm" data-add-product="' + product.id + '">Ajouter à la box</button>' +
        '</div>' +
      '</article>'
    );
  }).join('');
}

document.addEventListener('DOMContentLoaded', function () {
  var grid = document.getElementById('products-grid');
  var filterButtons = document.querySelectorAll('.filter-btn');

  if (!grid) return;

  renderProducts(MIC_PRODUCTS);

  filterButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      filterButtons.forEach(function (b) { b.classList.remove('is-active'); });
      button.classList.add('is-active');

      var filter = button.getAttribute('data-filter');
      var filtered = filter === 'all' ? MIC_PRODUCTS : MIC_PRODUCTS.filter(function (p) { return p.category === filter; });
      renderProducts(filtered);
    });
  });

  grid.addEventListener('click', function (e) {
    var button = e.target.closest('[data-add-product]');
    if (!button) return;

    var product = MIC_PRODUCTS.filter(function (p) { return String(p.id) === button.getAttribute('data-add-product'); })[0];
    if (!product) return;

    var savedToAccount = typeof MicAccount !== 'undefined' && MicAccount.addOrder(product);
    if (typeof showToast === 'function') {
      showToast(product.name + (savedToAccount ? ' ajouté à votre box et à vos commandes ✓' : ' ajouté à votre box ✓'));
    }
  });
});

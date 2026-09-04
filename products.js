// Catalogue complet de produits
const products = [
    // Produits Chien
    {
        id: 1,
        name: "Shampooing Doux Pelage",
        brand: "NaturalPaws",
        species: ["dog"],
        price: 18,
        image: "🧴",
        description: "Shampooing 100% vegan pour chiens",
        tags: ["Vegan", "Naturel", "Pelage"],
        category: "dog"
    },
    {
        id: 2,
        name: "Conditionneur Apaisant",
        brand: "EcoFur",
        species: ["dog"],
        price: 20,
        image: "🧴",
        description: "Conditionneur sans paraben ni sulfate",
        tags: ["Hypoallergénique", "Apaisant", "Écologique"],
        category: "dog"
    },
    {
        id: 3,
        name: "Spray Anti-Démangeaisons",
        brand: "PetVegan",
        species: ["dog"],
        price: 15,
        image: "💨",
        description: "Soulage les démangeaisons rapidement",
        tags: ["Anti-démangeaisons", "Immédiat"],
        category: "dog"
    },
    {
        id: 4,
        name: "Poudre de Bain Sèche",
        brand: "GreenPets",
        species: ["dog"],
        price: 12,
        image: "💨",
        description: "Bain sans eau aux huiles essentielles",
        tags: ["Pratique", "Rapide", "Frais"],
        category: "dog"
    },

    // Produits Chat
    {
        id: 5,
        name: "Shampooing Doux Chat",
        brand: "FelinePure",
        species: ["cat"],
        price: 16,
        image: "🧴",
        description: "Shampooing ultra-doux pour félins sensibles",
        tags: ["Chat", "Doux", "Hypoallergénique"],
        category: "cat"
    },
    {
        id: 6,
        name: "Spray Anti-Stress",
        brand: "CalmPets",
        species: ["cat"],
        price: 18,
        image: "💨",
        description: "Calme l'anxiété et le stress félin",
        tags: ["Apaisant", "Phéromones", "Naturel"],
        category: "cat"
    },
    {
        id: 7,
        name: "Lingettes Apaisantes",
        brand: "PetVegan",
        species: ["cat"],
        price: 10,
        image: "🧻",
        description: "Lingettes pour nettoyer en douceur",
        tags: ["Pratique", "Doux", "Hypoallergénique"],
        category: "cat"
    },
    {
        id: 8,
        name: "Démêlant Naturel",
        brand: "FurCare",
        species: ["cat"],
        price: 14,
        image: "✨",
        description: "Démêle sans nœuds sans tirer",
        tags: ["Démêlant", "Doux", "Mi-long"],
        category: "cat"
    },

    // Produits Cheval
    {
        id: 9,
        name: "Crème Dermite Estivale",
        brand: "EquineVegan",
        species: ["horse"],
        price: 28,
        image: "🧴",
        description: "Protection contre la dermite estivale",
        tags: ["Protection", "Dermite", "Performance"],
        category: "horse"
    },
    {
        id: 10,
        name: "Shampooing Performance",
        brand: "EquiCare",
        species: ["horse"],
        price: 25,
        image: "🧴",
        description: "Shampooing renforçant pour chevaux de sport",
        tags: ["Performance", "Brillance", "Naturel"],
        category: "horse"
    },
    {
        id: 11,
        name: "Huile de Crinière",
        brand: "EquineLux",
        species: ["horse"],
        price: 22,
        image: "🧴",
        description: "Nourrit et brillante la crinière",
        tags: ["Crinière", "Brillance", "Hydratant"],
        category: "horse"
    },
    {
        id: 12,
        name: "Lotion Anti-Irritation",
        brand: "VeganEquine",
        species: ["horse"],
        price: 20,
        image: "💨",
        description: "Apaise les irritations cutanées",
        tags: ["Apaisant", "Anti-irritation", "Naturel"],
        category: "horse"
    },

    // Produits Lapin/NAC
    {
        id: 13,
        name: "Démêlant Doux Lapin",
        brand: "NACCare",
        species: ["rabbit"],
        price: 14,
        image: "✨",
        description: "Spécial pour pelage délicat de lapin",
        tags: ["Lapin", "Doux", "Angora"],
        category: "rabbit"
    },
    {
        id: 14,
        name: "Poudre Hygiène Naturelle",
        brand: "PetVegan",
        species: ["rabbit"],
        price: 12,
        image: "💨",
        description: "Hygiène naturelle sans produit chimique",
        tags: ["Hygiène", "Naturel", "Écologique"],
        category: "rabbit"
    },
    {
        id: 15,
        name: "Spray Apaisement",
        brand: "NACsafe",
        species: ["rabbit"],
        price: 13,
        image: "💨",
        description: "Calme l'anxiété des petits animaux",
        tags: ["Apaisant", "Stress", "Naturel"],
        category: "rabbit"
    },
    {
        id: 16,
        name: "Chamois Nettoyant",
        brand: "EcoCare",
        species: ["rabbit"],
        price: 8,
        image: "🧻",
        description: "Chamois naturel pour nettoyage doux",
        tags: ["Nettoyage", "Doux", "Réutilisable"],
        category: "rabbit"
    }
];

// Initialiser la grille de produits
function initProducts() {
    displayProducts(products);
}

function displayProducts(productsToDisplay) {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '';
    
    productsToDisplay.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.setAttribute('data-category', product.category);
        
        card.innerHTML = `
            <div class="product-image">${product.image}</div>
            <div class="product-info">
                <div class="product-title">${product.name}</div>
                <div class="product-brand">${product.brand}</div>
                <div class="product-description">${product.description}</div>
                <div class="product-tags">
                    ${product.tags.map(tag => `<span class="product-tag">${tag}</span>`).join('')}
                </div>
                <div class="product-price">${product.price}€</div>
                <button class="add-to-cart" onclick="addToCart('${product.name}', ${product.price})">
                    Ajouter à la Box 🛒
                </button>
            </div>
        `;
        
        grid.appendChild(card);
    });
}

function filterProducts(category) {
    // Mettre à jour les boutons de filtre
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Filtrer les produits
    if (category === 'all') {
        displayProducts(products);
    } else {
        const filtered = products.filter(p => p.category === category);
        displayProducts(filtered);
    }
}

function addToCart(productName, price) {
    alert(`✅ ${productName} (${price}€) a été ajouté à votre Box !`);
    // À intégrer avec un vrai système de panier
}

// Initialiser les produits au chargement
document.addEventListener('DOMContentLoaded', initProducts);

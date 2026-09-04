// Questions de quiz par espèce
const quizzes = {
    dog: {
        title: "Quiz Personnalisation - Chien 🐕",
        questions: [
            {
                question: "Quel est le type de pelage de votre chien ?",
                options: ["Court", "Moyen", "Long", "Ondulé/Frisé"]
            },
            {
                question: "Votre chien a-t-il la peau sensible ?",
                options: ["Non, peau robuste", "Légèrement sensible", "Très sensible", "Allergique"]
            },
            {
                question: "Fréquence de baignage ?",
                options: ["Rarement", "1 fois par mois", "2-4 fois par mois", "Plus de 4 fois par mois"]
            },
            {
                question: "Principaux problèmes cutanés ?",
                options: ["Aucun", "Démangeaisons", "Pellicules", "Odeur désagréable"]
            }
        ]
    },
    cat: {
        title: "Quiz Personnalisation - Chat 🐈",
        questions: [
            {
                question: "Quel est le type de pelage de votre chat ?",
                options: ["Court", "Mi-long", "Long", "Sans poils"]
            },
            {
                question: "Votre chat a-t-il des problèmes dermatologiques ?",
                options: ["Non", "Légers", "Modérés", "Sévères"]
            },
            {
                question: "Tolère-t-il les bains ?",
                options: ["Très bien", "Plutôt bien", "Difficilement", "Pas du tout"]
            },
            {
                question: "Problèmes de stress ou comportement ?",
                options: ["Calme", "Normal", "Un peu anxieux", "Très anxieux"]
            }
        ]
    },
    horse: {
        title: "Quiz Personnalisation - Cheval 🐴",
        questions: [
            {
                question: "Votre cheval souffre-t-il de dermite estivale ?",
                options: ["Non", "Légèrement", "Modérément", "Sévèrement"]
            },
            {
                question: "Type de travail pratiqué ?",
                options: ["Loisir", "Dressage", "Saut d'obstacles", "Concours complet"]
            },
            {
                question: "Problèmes de peau actuels ?",
                options: ["Aucun", "Irritation mineure", "Irritation modérée", "Allergie importante"]
            },
            {
                question: "Sensibilité aux huiles essentielles ?",
                options: ["Normale", "Légère sensibilité", "Forte sensibilité", "Allergie avérée"]
            }
        ]
    },
    rabbit: {
        title: "Quiz Personnalisation - Lapin/NAC 🐰",
        questions: [
            {
                question: "Quel type de poil a votre animal ?",
                options: ["Court", "Moyen", "Long", "Très long/Angora"]
            },
            {
                question: "Problèmes respiratoires ou allergies ?",
                options: ["Non", "Légers", "Modérés", "Sévères"]
            },
            {
                question: "Température habituelle de l'environnement ?",
                options: ["Fraîche (< 18°C)", "Tempérée (18-22°C)", "Chaude (22-26°C)", "Très chaude (> 26°C)"]
            },
            {
                question: "Besoins cosmétiques prioritaires ?",
                options: ["Hygiène générale", "Démêlage", "Apaisement", "Protection"]
            }
        ]
    }
};

const recommendations = {
    dog: [
        { id: 1, name: "Shampooing Pelage Court", price: "18€" },
        { id: 2, name: "Conditionneur Apaisant", price: "20€" },
        { id: 3, name: "Spray Anti-Démangeaisons", price: "15€" },
        { id: 4, name: "Poudre de Bain Sèche", price: "12€" }
    ],
    cat: [
        { id: 5, name: "Shampooing Doux Chat", price: "16€" },
        { id: 6, name: "Spray Anti-Stress", price: "18€" },
        { id: 7, name: "Lingettes Apaisantes", price: "10€" },
        { id: 8, name: "Démêlant Naturel", price: "14€" }
    ],
    horse: [
        { id: 9, name: "Crème Dermite Estivale", price: "28€" },
        { id: 10, name: "Shampooing Performance", price: "25€" },
        { id: 11, name: "Huile de Crinière", price: "22€" },
        { id: 12, name: "Lotion Anti-Irritation", price: "20€" }
    ],
    rabbit: [
        { id: 13, name: "Démêlant Doux Lapin", price: "14€" },
        { id: 14, name: "Poudre Hygiène Naturelle", price: "12€" },
        { id: 15, name: "Spray Apaisement", price: "13€" },
        { id: 16, name: "Chamois Nettoyant", price: "8€" }
    ]
};

function startQuiz(animal) {
    const modal = document.getElementById('quizModal');
    const quizContent = document.getElementById('quizContent');
    
    let html = `
        <h2>${quizzes[animal].title}</h2>
        <div id="quizContainer">
    `;
    
    quizzes[animal].questions.forEach((q, index) => {
        html += `
            <div class="quiz-question" id="q${index}">
                <h3>${q.question}</h3>
                <div class="quiz-options">
        `;
        
        q.options.forEach((option, optIndex) => {
            html += `
                <div class="quiz-option" onclick="selectOption(${index}, this)">
                    ${option}
                </div>
            `;
        });
        
        html += `</div></div>`;
    });
    
    html += `
        <button class="quiz-button" onclick="submitQuiz('${animal}')">Voir mes Recommandations 🎁</button>
    `;
    
    quizContent.innerHTML = html;
    modal.style.display = 'block';
}

let selectedAnswers = {};

function selectOption(questionIndex, element) {
    // Désélectionner les autres options
    const options = element.parentElement.querySelectorAll('.quiz-option');
    options.forEach(opt => opt.classList.remove('selected'));
    
    // Sélectionner l'option actuelle
    element.classList.add('selected');
    selectedAnswers[questionIndex] = element.textContent;
}

function submitQuiz(animal) {
    const modal = document.getElementById('quizModal');
    const quizContent = document.getElementById('quizContent');
    
    const prods = recommendations[animal];
    let html = `
        <div class="quiz-results">
            <h3>🎁 Votre Box Personnalisée</h3>
            <p>Basée sur vos réponses, voici les produits sélectionnés pour vous !</p>
            <div style="margin-top: 2rem;">
    `;
    
    prods.forEach(prod => {
        html += `
            <div style="padding: 1rem; background: white; border-radius: 8px; margin-bottom: 1rem; border-left: 4px solid #4a7c2c;">
                <div style="font-weight: bold; color: #2d5016;">${prod.name}</div>
                <div style="color: #f4a261; font-size: 1.2rem; margin-top: 0.5rem;">${prod.price}</div>
            </div>
        `;
    });
    
    const totalPrice = prods.length * 18; // Moyenne
    
    html += `
            </div>
            <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 2px solid #4a7c2c;">
                <div style="font-size: 1.3rem; color: #2d5016; margin-bottom: 1rem;">
                    💰 Prix Total: <strong>${totalPrice}€</strong>
                </div>
                <button class="cta-button" onclick="subscribeBox('${animal}')">S'abonner à la Box 📦</button>
                <button class="cta-button" style="background: #999; margin-top: 1rem;" onclick="closeQuiz()">Retour</button>
            </div>
        </div>
    `;
    
    quizContent.innerHTML = html;
}

function subscribeBox(animal) {
    alert(`✅ Merci ! Vous avez choisi la Box ${animal}. Redirection vers le paiement...`);
    // À intégrer avec un vrai système de paiement
}

function closeQuiz() {
    const modal = document.getElementById('quizModal');
    modal.style.display = 'none';
    selectedAnswers = {};
}

// Fermer le modal en cliquant en dehors
window.onclick = function(event) {
    const modal = document.getElementById('quizModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

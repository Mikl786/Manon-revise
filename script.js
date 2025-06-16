// Base de données des questions
const questionsData = {
    francais: [
        {
            id: 1,
            question: "Quel genre littéraire est privilégié pour explorer le thème 'Se chercher, se construire' ?",
            answers: ["L'autobiographie", "Le théâtre", "La poésie", "Le roman policier"],
            correct: 0,
            explanation: "L'autobiographie permet d'explorer la construction de soi et l'identité personnelle, thème central du programme de 3ème.",
            difficulty: "facile",
            theme: "genres_litteraires"
        },
        {
            id: 2,
            question: "Dans 'Les Confessions' de Rousseau, quel est l'objectif principal de l'auteur ?",
            answers: ["Divertir le lecteur", "Se justifier et se révéler", "Critiquer la société", "Raconter l'Histoire"],
            correct: 1,
            explanation: "Rousseau cherche à se montrer tel qu'il est, avec ses défauts et qualités, dans un souci de sincérité totale.",
            difficulty: "moyen",
            theme: "autobiographie"
        },
        {
            id: 3,
            question: "Identifiez la figure de style : 'Ses yeux sont des étoiles'",
            answers: ["Comparaison", "Métaphore", "Personnification", "Hyperbole"],
            correct: 1,
            explanation: "C'est une métaphore car il y a assimilation directe sans outil de comparaison comme 'comme' ou 'tel que'.",
            difficulty: "facile",
            theme: "figures_de_style"
        },
        {
            id: 4,
            question: "Au théâtre, comment appelle-t-on les paroles qu'un personnage se dit à lui-même ?",
            answers: ["Monologue", "Dialogue", "Aparté", "Soliloque"],
            correct: 0,
            explanation: "Le monologue est un discours d'un personnage seul sur scène qui exprime ses pensées.",
            difficulty: "facile",
            theme: "theatre"
        },
        {
            id: 5,
            question: "Combien de syllabes compte un alexandrin ?",
            answers: ["10", "12", "8", "14"],
            correct: 1,
            explanation: "L'alexandrin est un vers de douze syllabes, très utilisé en poésie classique française.",
            difficulty: "facile",
            theme: "versification"
        }
    ],
    
    maths: [
        {
            id: 1,
            question: "Résoudre l'équation : 3x + 5 = 14",
            answers: ["x = 3", "x = 4", "x = 5", "x = 6"],
            correct: 0,
            explanation: "3x = 14 - 5 = 9, donc x = 9/3 = 3",
            difficulty: "facile",
            theme: "equations"
        },
        {
            id: 2,
            question: "Si f(x) = 2x + 3, que vaut f(4) ?",
            answers: ["11", "10", "9", "8"],
            correct: 0,
            explanation: "f(4) = 2×4 + 3 = 8 + 3 = 11",
            difficulty: "facile",
            theme: "fonctions"
        },
        {
            id: 3,
            question: "Dans un triangle rectangle, si les côtés de l'angle droit mesurent 3 et 4, l'hypoténuse mesure :",
            answers: ["5", "6", "7", "25"],
            correct: 0,
            explanation: "D'après le théorème de Pythagore : c² = 3² + 4² = 9 + 16 = 25, donc c = 5",
            difficulty: "moyen",
            theme: "geometrie"
        },
        {
            id: 4,
            question: "Dans la série : 2, 5, 7, 8, 10, la médiane est :",
            answers: ["6", "7", "8", "6.4"],
            correct: 1,
            explanation: "La médiane est la valeur centrale quand les données sont ordonnées : 7 (3ème valeur sur 5)",
            difficulty: "moyen",
            theme: "statistiques"
        },
        {
            id: 5,
            question: "Développer : (x + 3)(x - 2)",
            answers: ["x² + x - 6", "x² - x - 6", "x² + x + 6", "x² - x + 6"],
            correct: 0,
            explanation: "(x+3)(x-2) = x² - 2x + 3x - 6 = x² + x - 6",
            difficulty: "moyen",
            theme: "calcul_litteral"
        }
    ],
    
    histoire: [
        {
            id: 1,
            question: "Quelle est la date de l'indépendance de l'Inde ?",
            answers: ["1945", "1947", "1950", "1952"],
            correct: 1,
            explanation: "L'Inde obtient son indépendance le 15 août 1947, avec partition entre Inde et Pakistan.",
            difficulty: "facile",
            theme: "decolonisation"
        },
        {
            id: 2,
            question: "La Ve République est fondée en :",
            answers: ["1956", "1958", "1960", "1962"],
            correct: 1,
            explanation: "La Constitution de la Ve République est adoptée par référendum le 28 septembre 1958.",
            difficulty: "facile",
            theme: "ve_republique"
        },
        {
            id: 3,
            question: "La guerre froide commence vers :",
            answers: ["1945", "1947", "1949", "1950"],
            correct: 1,
            explanation: "1947 marque le début avec la doctrine Truman et le plan Marshall.",
            difficulty: "moyen",
            theme: "guerre_froide"
        },
        {
            id: 4,
            question: "Les femmes obtiennent le droit de vote en France en :",
            answers: ["1936", "1944", "1946", "1958"],
            correct: 1,
            explanation: "L'ordonnance du 21 avril 1944 accorde le droit de vote aux femmes françaises.",
            difficulty: "facile",
            theme: "societe_francaise"
        },
        {
            id: 5,
            question: "Une aire urbaine comprend :",
            answers: ["Seulement la ville-centre", "La ville-centre et sa banlieue", "La ville-centre, sa banlieue et sa couronne périurbaine", "Toute la région"],
            correct: 2,
            explanation: "L'aire urbaine inclut le pôle urbain (ville-centre + banlieue) et la couronne périurbaine.",
            difficulty: "moyen",
            theme: "geographie_urbaine"
        }
    ],
    
    sciences: [
        {
            id: 1,
            question: "La fécondation a lieu dans :",
            answers: ["L'ovaire", "L'utérus", "La trompe de Fallope", "Le vagin"],
            correct: 2,
            explanation: "La fécondation se produit dans la trompe de Fallope, aussi appelée trompe utérine.",
            difficulty: "facile",
            theme: "reproduction"
        },
        {
            id: 2,
            question: "Un chromosome contient :",
            answers: ["De l'ARN", "De l'ADN", "Des protéines", "Des lipides"],
            correct: 1,
            explanation: "Les chromosomes sont constitués d'ADN (acide désoxyribonucléique) et de protéines.",
            difficulty: "facile",
            theme: "genetique"
        },
        {
            id: 3,
            question: "L'être humain possède :",
            answers: ["23 chromosomes", "46 chromosomes", "48 chromosomes", "44 chromosomes"],
            correct: 1,
            explanation: "L'être humain possède 46 chromosomes (23 paires) dans chaque cellule.",
            difficulty: "facile",
            theme: "genetique"
        },
        {
            id: 4,
            question: "La dérive des continents est proposée par :",
            answers: ["Darwin", "Wegener", "Mendel", "Pasteur"],
            correct: 1,
            explanation: "Alfred Wegener propose la théorie de la dérive des continents en 1912.",
            difficulty: "moyen",
            theme: "geologie"
        },
        {
            id: 5,
            question: "Le neurone est :",
            answers: ["Une cellule musculaire", "Une cellule nerveuse", "Une cellule sanguine", "Une cellule osseuse"],
            correct: 1,
            explanation: "Le neurone est la cellule de base du système nerveux qui transmet l'information.",
            difficulty: "facile",
            theme: "systeme_nerveux"
        }
    ],
    
    physique: [
        {
            id: 1,
            question: "Un atome est constitué :",
            answers: ["Seulement de protons", "D'un noyau et d'électrons", "Seulement d'électrons", "De molécules"],
            correct: 1,
            explanation: "L'atome comprend un noyau (protons + neutrons) et des électrons qui gravitent autour.",
            difficulty: "facile",
            theme: "structure_matiere"
        },
        {
            id: 2,
            question: "La vitesse se calcule par :",
            answers: ["v = d × t", "v = d / t", "v = t / d", "v = d + t"],
            correct: 1,
            explanation: "La vitesse est égale à la distance parcourue divisée par le temps : v = d/t.",
            difficulty: "facile",
            theme: "mecanique"
        },
        {
            id: 3,
            question: "Dans un circuit en série, l'intensité :",
            answers: ["Varie", "Est la même partout", "Diminue", "Augmente"],
            correct: 1,
            explanation: "Dans un circuit en série, l'intensité est identique en tous points du circuit.",
            difficulty: "facile",
            theme: "electricite"
        },
        {
            id: 4,
            question: "La charge d'un proton est :",
            answers: ["Positive", "Négative", "Neutre", "Variable"],
            correct: 0,
            explanation: "Le proton porte une charge électrique positive (+e).",
            difficulty: "facile",
            theme: "structure_matiere"
        },
        {
            id: 5,
            question: "La formule chimique de l'eau est :",
            answers: ["H₂O", "HO₂", "H₃O", "H₂O₂"],
            correct: 0,
            explanation: "L'eau est constituée de 2 atomes d'hydrogène et 1 atome d'oxygène : H₂O.",
            difficulty: "facile",
            theme: "chimie"
        }
    ]
};

// Variables globales
let currentSubject = '';
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;
let userStats = loadStats();

// Noms des matières
const subjectNames = {
    francais: 'Français',
    maths: 'Mathématiques',
    histoire: 'Histoire-Géographie',
    sciences: 'Sciences (SVT)',
    physique: 'Physique-Chimie'
};

// Démarrer un quiz
function startQuiz(subject) {
    currentSubject = subject;
    currentQuestions = questionsData[subject];
    currentQuestionIndex = 0;
    score = 0;
    selectedAnswer = null;

    // Masquer le menu et afficher le quiz
    document.getElementById('menu').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';

    // Mettre à jour l'en-tête
    document.getElementById('current-subject').textContent = subjectNames[subject];
    document.getElementById('total-questions').textContent = currentQuestions.length;

    // Afficher la première question
    showQuestion();
}

// Afficher une question
function showQuestion() {
    const question = currentQuestions[currentQuestionIndex];
    
    // Mettre à jour les informations
    document.getElementById('current-question').textContent = currentQuestionIndex + 1;
    document.getElementById('question-num').textContent = currentQuestionIndex + 1;
    document.getElementById('question-text').textContent = question.question;

    // Affichage de la difficulté
    const difficultyEl = document.getElementById('difficulty');
    const stars = getDifficultyStars(question.difficulty || 'moyen');
    difficultyEl.textContent = stars;

    // Générer les réponses
    const container = document.getElementById('answers-container');
    container.innerHTML = '';

    question.answers.forEach((answer, index) => {
        const div = document.createElement('div');
        div.className = 'answer-option';
        div.textContent = answer;
        div.onclick = () => selectAnswer(index);
        container.appendChild(div);
    });

    // Réinitialiser les boutons
    document.getElementById('validate-btn').disabled = true;
    document.getElementById('validate-btn').style.display = 'inline-flex';
    document.getElementById('next-btn').style.display = 'none';
    document.getElementById('finish-btn').style.display = 'none';
    document.getElementById('explanation').style.display = 'none';

    selectedAnswer = null;
    updateScore();
}

function getDifficultyStars(difficulty) {
    switch(difficulty) {
        case 'facile': return '⭐';
        case 'moyen': return '⭐⭐';
        case 'difficile': return '⭐⭐⭐';
        default: return '⭐⭐';
    }
}

function selectAnswer(index) {
    selectedAnswer = index;
    
    // Mise à jour visuelle
    document.querySelectorAll('.answer-option').forEach((option, i) => {
        option.classList.remove('selected');
        if (i === index) {
            option.classList.add('selected');
        }
    });

    document.getElementById('validate-btn').disabled = false;
}

function validateAnswer() {
    if (selectedAnswer === null) return;

    const question = currentQuestions[currentQuestionIndex];
    const isCorrect = selectedAnswer === question.correct;

    // Mise à jour du score
    if (isCorrect) {
        score++;
        userStats[currentSubject].correct++;
    } else {
        userStats[currentSubject].incorrect++;
    }

    // Coloration des réponses
    document.querySelectorAll('.answer-option').forEach((option, index) => {
        option.onclick = null;
        
        if (index === question.correct) {
            option.classList.add('correct');
        } else if (index === selectedAnswer && !isCorrect) {
            option.classList.add('incorrect');
        }
    });

    // Affichage de l'explication
    const explanationDiv = document.getElementById('explanation');
    explanationDiv.innerHTML = `
        <strong>💡 Explication :</strong><br>
        ${question.explanation}
        ${question.theme ? `<br><br><strong>🏷️ Thème :</strong> ${question.theme}` : ''}
    `;
    explanationDiv.style.display = 'block';

    // Gestion des boutons
    document.getElementById('validate-btn').style.display = 'none';
    
    if (currentQuestionIndex < currentQuestions.length - 1) {
        document.getElementById('next-btn').style.display = 'inline-flex';
    } else {
        document.getElementById('finish-btn').style.display = 'inline-flex';
    }

    updateScore();
    saveStats();
}

function nextQuestion() {
    currentQuestionIndex++;
    showQuestion();
}

function finishQuiz() {
    const percentage = Math.round((score / currentQuestions.length) * 100);
    let message, className, emoji;

    if (percentage >= 80) {
        message = 'Excellent ! Tu maîtrises parfaitement ce sujet !';
        className = 'score-excellent';
        emoji = '🎉';
    } else if (percentage >= 60) {
        message = 'Bien joué ! Continue tes révisions !';
        className = 'score-good';
        emoji = '👍';
    } else {
        message = 'Il faut encore réviser ce sujet !';
        className = 'score-needs-work';
        emoji = '💪';
    }

    // Affichage du score final
    const finalScoreDiv = document.createElement('div');
    finalScoreDiv.className = `final-score ${className}`;
    finalScoreDiv.innerHTML = `
        <h2>${emoji} Quiz terminé !</h2>
        <h3>Score final : ${score}/${currentQuestions.length} (${percentage}%)</h3>
        <p style="font-size: 1.2rem; margin: 20px 0;">${message}</p>
        <div style="margin: 20px 0;">
            <p><strong>Bonnes réponses :</strong> ${score}</p>
            <p><strong>Erreurs :</strong> ${currentQuestions.length - score}</p>
        </div>
        <button class="btn" onclick="backToMenu()" style="margin-top: 20px;">
            🏠 Retour au menu principal
        </button>
        <button class="btn" onclick="startQuiz('${currentSubject}')" style="margin-top: 20px; background: linear-gradient(45deg, #667eea, #764ba2);">
            🔄 Refaire un quiz
        </button>
    `;

    document.getElementById('explanation').appendChild(finalScoreDiv);
    document.getElementById('finish-btn').style.display = 'none';
}

function backToMenu() {
    document.getElementById('menu').style.display = 'block';
    document.getElementById('quiz').style.display = 'none';
}

function updateScore() {
    const totalAnswered = currentQuestionIndex + (selectedAnswer !== null ? 1 : 0);
    const percentage = totalAnswered > 0 ? Math.round((score / totalAnswered) * 100) : 0;
    
    document.getElementById('current-score').textContent = score;
    document.getElementById('total-answered').textContent = totalAnswered;
    document.getElementById('percentage').textContent = `${percentage}%`;
}

function loadStats() {
    const defaultStats = {
        francais: { correct: 0, incorrect: 0 },
        maths: { correct: 0, incorrect: 0 },
        histoire: { correct: 0, incorrect: 0 },
        sciences: { correct: 0, incorrect: 0 },
        physique: { correct: 0, incorrect: 0 }
    };

    const saved = localStorage.getItem('brevetQuizStats2025');
    return saved ? { ...defaultStats, ...JSON.parse(saved) } : defaultStats;
}

function saveStats() {
    localStorage.setItem('brevetQuizStats2025', JSON.stringify(userStats));
}

// Initialisation
console.log('Quiz Brevet 2025 - Manon révise - Chargé avec succès !');

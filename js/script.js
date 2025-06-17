// Variables globales
let questionsData = {};
let currentQuiz = null;
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;
let currentFilter = 'all';

// Initialisation
document.addEventListener('DOMContentLoaded', async function() {
    await loadQuestions();
    generateQuizCards();
    setupFilters();
});

// Chargement des questions depuis le fichier JSON
async function loadQuestions() {
    try {
        const response = await fetch('data/questions.json');
        questionsData = await response.json();
        console.log('Questions chargées avec succès');
    } catch (error) {
        console.error('Erreur lors du chargement des questions:', error);
        // Fallback avec quelques questions de base
        questionsData = getFallbackQuestions();
    }
}

// Questions de secours si le JSON ne se charge pas
function getFallbackQuestions() {
    return {
        francais: [{
            title: "Quiz de français",
            questions: [
                {q: "Combien de syllabes dans un alexandrin ?", a: ["10", "12", "8", "14"], c: 1, e: "12 syllabes"},
                {q: "'Ses yeux sont des étoiles' est une :", a: ["Comparaison", "Métaphore", "Personnification", "Hyperbole"], c: 1, e: "Métaphore"}
            ]
        }],
        maths: [{
            title: "Quiz de mathématiques", 
            questions: [
                {q: "3x + 5 = 14, x = ?", a: ["x = 3", "x = 4", "x = 5", "x = 6"], c: 0, e: "x = 3"},
                {q: "f(x) = 2x + 3, f(4) = ?", a: ["11", "10", "9", "8"], c: 0, e: "f(4) = 11"}
            ]
        }]
    };
}

// Génération des cartes de quiz
function generateQuizCards() {
    const grid = document.getElementById('quiz-grid');
    grid.innerHTML = '';

    Object.keys(questionsData).forEach(subject => {
        if (currentFilter === 'all' || subject === currentFilter) {
            questionsData[subject].forEach((quiz, index) => {
                const card = createQuizCard(quiz, subject, index);
                grid.appendChild(card);
            });
        }
    });
}

// Création d'une carte de quiz
function createQuizCard(quiz, subject, index) {
    const card = document.createElement('div');
    card.className = 'quiz-card';
    card.onclick = () => startQuiz(subject, index);

    const subjectColors = {
        francais: '#e74c3c',
        maths: '#3498db', 
        histoire: '#f39c12',
        sciences: '#27ae60',
        physique: '#9b59b6'
    };

    const subjectNames = {
        francais: 'Français',
        maths: 'Mathématiques',
        histoire: 'Histoire-Géographie',
        sciences: 'Sciences de la vie et de la Terre',
        physique: 'Physique-chimie'
    };

    card.innerHTML = `
        <div class="quiz-badge" style="background: ${subjectColors[subject]}">${subjectNames[subject]}</div>
        <div class="quiz-title">${quiz.title}</div>
        <div class="quiz-meta">
            <span class="quiz-questions">📊 ${quiz.questions.length} questions</span>
            <span class="quiz-subject">${subjectNames[subject]}</span>
        </div>
        <button class="play-btn">▶ Jouer</button>
    `;

    return card;
}

// Configuration des filtres
function setupFilters() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            generateQuizCards();
        };
    });
}

// Démarrage d'un quiz
function startQuiz(subject, quizIndex) {
    currentQuiz = questionsData[subject][quizIndex];
    currentQuestionIndex = 0;
    score = 0;
    selectedAnswer = null;

    document.getElementById('menu').classList.add('hidden');
    document.getElementById('quiz').classList.remove('hidden');

    document.getElementById('current-subject').textContent = currentQuiz.title;
    document.getElementById('total-questions').textContent = currentQuiz.questions.length;

    showQuestion();
}

// Affichage d'une question
function showQuestion() {
    const question = currentQuiz.questions[currentQuestionIndex];
    
    document.getElementById('current-question').textContent = currentQuestionIndex + 1;
    document.getElementById('question-text').textContent = question.q;

    const container = document.getElementById('answers-container');
    container.innerHTML = '';

    question.a.forEach((answer, index) => {
        const div = document.createElement('div');
        div.className = 'answer-option';
        div.textContent = answer;
        div.onclick = () => selectAnswer(index);
        container.appendChild(div);
    });

    // Réinitialisation des boutons
    document.getElementById('validate-btn').disabled = true;
    document.getElementById('validate-btn').classList.remove('hidden');
    document.getElementById('next-btn').classList.add('hidden');
    document.getElementById('finish-btn').classList.add('hidden');
    document.getElementById('explanation').classList.add('hidden');

    selectedAnswer = null;
    updateScore();
}

// Sélection d'une réponse
function selectAnswer(index) {
    selectedAnswer = index;
    
    document.querySelectorAll('.answer-option').forEach((option, i) => {
        option.classList.remove('selected');
        if (i === index) {
            option.classList.add('selected');
        }
    });

    document.getElementById('validate-btn').disabled = false;
}

// Validation de la réponse
function validateAnswer() {
    if (selectedAnswer === null) return;

    const question = currentQuiz.questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === question.c;

    if (isCorrect) score++;

    // Coloration des réponses
    document.querySelectorAll('.answer-option').forEach((option, index) => {
        option.onclick = null;
        
        if (index === question.c) {
            option.classList.add('correct');
        } else if (index === selectedAnswer && !isCorrect) {
            option.classList.add('incorrect');
        }
    });

    // Affichage de l'explication
    document.getElementById('explanation').innerHTML = `<strong>💡 ${question.e}</strong>`;
    document.getElementById('explanation').classList.remove('hidden');
    
    // Gestion des boutons
    document.getElementById('validate-btn').classList.add('hidden');
    
    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
        document.getElementById('next-btn').classList.remove('hidden');
    } else {
        document.getElementById('finish-btn').classList.remove('hidden');
    }
    
    updateScore();
}

// Question suivante
function nextQuestion() {
    currentQuestionIndex++;
    showQuestion();
}

// Fin du quiz
function finishQuiz() {
    const percentage = Math.round((score / currentQuiz.questions.length) * 100);
    let message = percentage >= 80 ? '🎉 Excellent !' : percentage >= 60 ? '👍 Bien joué !' : '💪 Continue !';

    document.getElementById('explanation').innerHTML = `
        <div class="final-score">
            <h3>Quiz terminé ! ${message}</h3>
            <p><strong>Score final : ${score}/${currentQuiz.questions.length} (${percentage}%)</strong></p>
            <button class="btn" onclick="backToMenu()" style="margin-top: 20px;">🏠 Retour aux quiz</button>
            <button class="btn" onclick="location.reload()" style="margin-top: 20px;">🔄 Refaire</button>
        </div>
    `;
}

// Retour au menu
function backToMenu() {
    document.getElementById('menu').classList.remove('hidden');
    document.getElementById('quiz').classList.add('hidden');
}

// Mise à jour du score
function updateScore() {
    const totalAnswered = currentQuestionIndex + (selectedAnswer !== null ? 1 : 0);
    const percentage = totalAnswered > 0 ? Math.round((score / totalAnswered) * 100) : 0;
    
    document.getElementById('current-score').textContent = score;
    document.getElementById('answered').textContent = totalAnswered;
    document.getElementById('percentage').textContent = `${percentage}%`;
}

console.log('Quiz Brevet 2025 chargé avec succès !');

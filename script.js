// Configuration globale
const CONFIG = {
    questionsPerQuiz: 20,
    subjects: {
        francais: 'Français',
        maths: 'Mathématiques',
        histoire: 'Histoire-Géographie',
        sciences: 'Sciences (SVT)',
        physique: 'Physique-Chimie'
    }
};

// Variables globales
let currentSubject = '';
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;
let userStats = loadStats();
let allQuestions = {};

// Classe principale de l'application
class QuizApp {
    constructor() {
        this.init();
    }

    async init() {
        try {
            await this.loadAllQuestions();
            this.updateUI();
            this.hideLoading();
        } catch (error) {
            console.error('Erreur d\'initialisation:', error);
            this.showError('Erreur de chargement des questions');
        }
    }

    async loadAllQuestions() {
        const subjects = Object.keys(CONFIG.subjects);
        const promises = subjects.map(subject => this.loadQuestions(subject));
        
        try {
            const results = await Promise.all(promises);
            subjects.forEach((subject, index) => {
                allQuestions[subject] = results[index];
            });
        } catch (error) {
            throw new Error('Impossible de charger les questions');
        }
    }

    async loadQuestions(subject) {
        try {
            const response = await fetch(`data/${subject}.json`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Erreur de chargement pour ${subject}:`, error);
            return [];
        }
    }

    updateUI() {
        this.updateGlobalStats();
        this.updateSubjectStats();
    }

    updateGlobalStats() {
        const totalCorrect = Object.values(userStats).reduce((sum, stat) => sum + stat.correct, 0);
        const totalAnswered = Object.values(userStats).reduce((sum, stat) => sum + stat.correct + stat.incorrect, 0);
        const globalPercentage = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

        document.getElementById('global-score').textContent = `${globalPercentage}%`;
        
        // Mise à jour du niveau
        const level = this.calculateLevel(totalCorrect);
        document.getElementById('user-level').textContent = level;
        
        // Mise à jour de la série (simulation)
        const streak = this.calculateStreak();
        document.getElementById('streak').textContent = streak;
    }

    updateSubjectStats() {
        Object.keys(CONFIG.subjects).forEach(subject => {
            const stats = userStats[subject];
            const total = stats.correct + stats.incorrect;
            const percentage = total > 0 ? Math.round((stats.correct / total) * 100) : 0;
            
            // Mise à jour des scores
            const scoreEl = document.getElementById(`${subject}-score`);
            const doneEl = document.getElementById(`${subject}-done`);
            const progressEl = document.getElementById(`${subject}-progress`);
            
            if (scoreEl) scoreEl.textContent = `${percentage}%`;
            if (doneEl) doneEl.textContent = total;
            if (progressEl) {
                const progressPercentage = allQuestions[subject] ? 
                    Math.round((total / allQuestions[subject].length) * 100) : 0;
                progressEl.style.width = `${progressPercentage}%`;
            }
        });
    }

    calculateLevel(totalCorrect) {
        if (totalCorrect < 50) return 'Débutant';
        if (totalCorrect < 150) return 'Apprenti';
        if (totalCorrect < 300) return 'Confirmé';
        if (totalCorrect < 500) return 'Expert';
        return 'Maître';
    }

    calculateStreak() {
        // Simulation d'une série basée sur l'activité récente
        const today = new Date().toDateString();
        const lastActivity = localStorage.getItem('lastActivity');
        
        if (lastActivity === today) {
            return parseInt(localStorage.getItem('currentStreak') || '1');
        } else {
            localStorage.setItem('lastActivity', today);
            localStorage.setItem('currentStreak', '1');
            return 1;
        }
    }

    hideLoading() {
        const loading = document.getElementById('loading');
        if (loading) {
            loading.classList.add('hidden');
        }
    }

    showError(message) {
        const loading = document.getElementById('loading');
        if (loading) {
            loading.innerHTML = `
                <div style="text-align: center;">
                    <h2>❌ Erreur</h2>
                    <p>${message}</p>
                    <button onclick="location.reload()" style="margin-top: 20px; padding: 10px 20px; background: #667eea; color: white; border: none; border-radius: 10px; cursor: pointer;">
                        Réessayer
                    </button>
                </div>
            `;
        }
    }
}

// Fonctions principales du quiz
async function startQuiz(subject) {
    if (!allQuestions[subject] || allQuestions[subject].length === 0) {
        alert('Questions non disponibles pour cette matière');
        return;
    }

    currentSubject = subject;
    currentQuestions = shuffleArray([...allQuestions[subject]]).slice(0, CONFIG.questionsPerQuiz);
    currentQuestionIndex = 0;
    score = 0;
    selectedAnswer = null;

    // Interface
    document.getElementById('menu').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';

    // Mise à jour de l'en-tête
    document.getElementById('current-subject').textContent = CONFIG.subjects[subject];
    document.getElementById('total-questions').textContent = currentQuestions.length;

    showQuestion();
}

function showQuestion() {
    const question = currentQuestions[currentQuestionIndex];
    
    // Mise à jour des informations
    document.getElementById('current-question').textContent = currentQuestionIndex + 1;
    document.getElementById('question-num').textContent = currentQuestionIndex + 1;
    document.getElementById('question-text').textContent = question.question;

    // Affichage de la difficulté
    const difficultyEl = document.getElementById('difficulty');
    const stars = getDifficultyStars(question.difficulty || 'moyen');
    difficultyEl.textContent = stars;

    // Génération des réponses
    const container = document.getElementById('answers-container');
    container.innerHTML = '';

    question.answers.forEach((answer, index) => {
        const div = document.createElement('div');
        div.className = 'answer-option';
        div.textContent = answer;
        div.onclick = () => selectAnswer(index);
        container.appendChild(div);
    });

    // Réinitialisation des boutons
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
            <p><strong>Temps moyen par question :</strong> ~30 secondes</p>
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
    
    // Mise à jour des statistiques globales
    app.updateUI();
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

// Fonctions utilitaires
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function loadStats() {
    const defaultStats = {};
    Object.keys(CONFIG.subjects).forEach(subject => {
        defaultStats[subject] = { correct: 0, incorrect: 0 };
    });

    const saved = localStorage.getItem('brevetQuizStats2025');
    return saved ? { ...defaultStats, ...JSON.parse(saved) } : defaultStats;
}

function saveStats() {
    localStorage.setItem('brevetQuizStats2025', JSON.stringify(userStats));
}

// Initialisation de l'application
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new QuizApp();
});

// Gestion des erreurs globales
window.addEventListener('error', (event) => {
    console.error('Erreur globale:', event.error);
});

// Application Quiz corrigée
class QuizApp {
    constructor() {
        this.currentSubject = 'francais';
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.selectedAnswer = null;
        this.userStats = this.loadStats();
        this.currentQuestions = [];
        
        this.initializeElements();
        this.setupEventListeners();
        this.loadSubject('francais');
    }

    initializeElements() {
        this.questionNumberEl = document.getElementById('question-number');
        this.questionTextEl = document.getElementById('question-text');
        this.answersEl = document.getElementById('answers');
        this.validateBtn = document.getElementById('validate-btn');
        this.nextBtn = document.getElementById('next-btn');
        this.restartBtn = document.getElementById('restart-btn');
        this.explanationEl = document.getElementById('explanation');
        this.progressEl = document.getElementById('progress');
        this.scoreEl = document.getElementById('current-score');
        this.percentageEl = document.getElementById('percentage');
        this.statsEl = document.getElementById('stats-content');
    }

    setupEventListeners() {
        // Boutons de matières
        document.querySelectorAll('.subject-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const subject = e.target.dataset.subject;
                this.loadSubject(subject);
            });
        });

        // Boutons de cartes de matières
        document.querySelectorAll('.start-quiz-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const card = e.target.closest('.subject-card');
                if (card) {
                    const subject = card.dataset.subject;
                    this.loadSubject(subject);
                }
            });
        });

        // Boutons de quiz
        if (this.validateBtn) {
            this.validateBtn.addEventListener('click', () => this.validateAnswer());
        }
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextQuestion());
        }
        if (this.restartBtn) {
            this.restartBtn.addEventListener('click', () => this.restartQuiz());
        }
    }

    loadSubject(subject) {
        console.log('Chargement de la matière:', subject);
        
        // Vérifier si la matière existe
        if (!questionsDatabase[subject]) {
            console.error('Matière non trouvée:', subject);
            return;
        }

        // Mettre à jour l'interface
        document.querySelectorAll('.subject-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        const activeBtn = document.querySelector(`[data-subject="${subject}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }

        this.currentSubject = subject;
        this.currentQuestions = this.shuffleArray([...questionsDatabase[subject]]);
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.selectedAnswer = null;

        this.displayQuestion();
        this.updateStats();
    }

    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled.slice(0, 20); // 20 questions par session
    }

    displayQuestion() {
        if (!this.currentQuestions || this.currentQuestions.length === 0) {
            console.error('Aucune question disponible');
            return;
        }

        const question = this.currentQuestions[this.currentQuestionIndex];
        
        if (this.questionNumberEl) {
            this.questionNumberEl.textContent = `Question ${this.currentQuestionIndex + 1}/${this.currentQuestions.length}`;
        }
        
        if (this.questionTextEl) {
            this.questionTextEl.textContent = question.question;
        }
        
        if (this.answersEl) {
            this.answersEl.innerHTML = '';
            question.answers.forEach((answer, index) => {
                const answerEl = document.createElement('div');
                answerEl.className = 'answer-option';
                answerEl.textContent = answer;
                answerEl.style.pointerEvents = 'auto';
                answerEl.addEventListener('click', () => this.selectAnswer(index));
                this.answersEl.appendChild(answerEl);
            });
        }

        // Réinitialiser les boutons
        if (this.validateBtn) {
            this.validateBtn.disabled = true;
            this.validateBtn.style.display = 'inline-block';
        }
        if (this.nextBtn) {
            this.nextBtn.style.display = 'none';
        }
        if (this.restartBtn) {
            this.restartBtn.style.display = 'none';
        }
        if (this.explanationEl) {
            this.explanationEl.style.display = 'none';
        }
        
        this.selectedAnswer = null;
        this.updateProgress();
        this.updateScore();
    }

    selectAnswer(index) {
        document.querySelectorAll('.answer-option').forEach(el => {
            el.classList.remove('selected');
        });

        document.querySelectorAll('.answer-option')[index].classList.add('selected');
        this.selectedAnswer = index;
        
        if (this.validateBtn) {
            this.validateBtn.disabled = false;
        }
    }

    validateAnswer() {
        if (this.selectedAnswer === null) return;

        const question = this.currentQuestions[this.currentQuestionIndex];
        const isCorrect = this.selectedAnswer === question.correct;

        document.querySelectorAll('.answer-option').forEach((el, index) => {
            if (index === question.correct) {
                el.classList.add('correct');
            } else if (index === this.selectedAnswer && !isCorrect) {
                el.classList.add('incorrect');
            }
            el.style.pointerEvents = 'none';
        });

        if (isCorrect) {
            this.score++;
            this.userStats[this.currentSubject].correct++;
        } else {
            this.userStats[this.currentSubject].incorrect++;
        }

        if (this.explanationEl) {
            this.explanationEl.innerHTML = `<strong>💡 Explication :</strong> ${question.explanation}`;
            this.explanationEl.style.display = 'block';
        }

        if (this.validateBtn) {
            this.validateBtn.style.display = 'none';
        }
        
        if (this.currentQuestionIndex < this.currentQuestions.length - 1) {
            if (this.nextBtn) {
                this.nextBtn.style.display = 'inline-block';
            }
        } else {
            if (this.restartBtn) {
                this.restartBtn.style.display = 'inline-block';
            }
            this.showFinalScore();
        }

        this.updateScore();
        this.updateStats();
        this.saveStats();
    }

    nextQuestion() {
        this.currentQuestionIndex++;
        this.displayQuestion();
    }

    restartQuiz() {
        this.loadSubject(this.currentSubject);
    }

    updateProgress() {
        if (this.progressEl) {
            const progress = ((this.currentQuestionIndex) / this.currentQuestions.length) * 100;
            this.progressEl.style.width = `${progress}%`;
        }
    }

    updateScore() {
        const totalAnswered = this.currentQuestionIndex + (this.selectedAnswer !== null ? 1 : 0);
        
        if (this.scoreEl) {
            this.scoreEl.textContent = `Score: ${this.score}/${totalAnswered}`;
        }
        
        if (this.percentageEl) {
            const percentage = totalAnswered > 0 ? Math.round((this.score / totalAnswered) * 100) : 0;
            this.percentageEl.textContent = `${percentage}%`;
        }
    }

    showFinalScore() {
        const percentage = Math.round((this.score / this.currentQuestions.length) * 100);
        let message = '';
        let className = '';

        if (percentage >= 80) {
            message = '🎉 Excellent ! Tu maîtrises bien ce sujet !';
            className = 'score-excellent';
        } else if (percentage >= 60) {
            message = '👍 Bien joué ! Continue tes révisions !';
            className = 'score-good';
        } else {
            message = '💪 Il faut encore réviser ce sujet !';
            className = 'score-needs-work';
        }

        const finalScoreEl = document.createElement('div');
        finalScoreEl.className = `final-score ${className}`;
        finalScoreEl.innerHTML = `
            <h3>Quiz terminé !</h3>
            <p>Score final : ${this.score}/${this.currentQuestions.length} (${percentage}%)</p>
            <p>${message}</p>
        `;

        if (this.explanationEl) {
            this.explanationEl.appendChild(finalScoreEl);
        }
    }

    updateStats() {
        if (!this.statsEl) return;

        const subjects = {
            francais: 'Français',
            maths: 'Mathématiques',
            histoire: 'Histoire-Géo',
            sciences: 'Sciences (SVT)',
            physique: 'Physique-Chimie'
        };

        this.statsEl.innerHTML = '';
        
        Object.keys(subjects).forEach(subject => {
            const stats = this.userStats[subject];
            const total = stats.correct + stats.incorrect;
            const percentage = total > 0 ? Math.round((stats.correct / total) * 100) : 0;

            const statEl = document.createElement('div');
            statEl.className = 'stat-item';
            statEl.innerHTML = `
                <span>${subjects[subject]}</span>
                <span>${stats.correct}/${total} (${percentage}%)</span>
            `;
            this.statsEl.appendChild(statEl);
        });
    }

    loadStats() {
        const defaultStats = {
            francais: { correct: 0, incorrect: 0 },
            maths: { correct: 0, incorrect: 0 },
            histoire: { correct: 0, incorrect: 0 },
            sciences: { correct: 0, incorrect: 0 },
            physique: { correct: 0, incorrect: 0 }
        };

        const saved = localStorage.getItem('brevetQuizStats');
        return saved ? JSON.parse(saved) : defaultStats;
    }

    saveStats() {
        localStorage.setItem('brevetQuizStats', JSON.stringify(this.userStats));
    }
}

// Fonctions globales pour les boutons
function startQuiz(subject) {
    if (window.quizApp) {
        window.quizApp.loadSubject(subject);
    }
}

// Initialiser l'application
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initialisation du quiz...');
    window.quizApp = new QuizApp();
});


// Application Quiz complète
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
        document.querySelectorAll('.subject-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const subject = e.target.dataset.subject;
                this.loadSubject(subject);
            });
        });

        this.validateBtn.addEventListener('click', () => this.validateAnswer());
        this.nextBtn.addEventListener('click', () => this.nextQuestion());
        this.restartBtn.addEventListener('click', () => this.restartQuiz());
    }

    loadSubject(subject) {
        document.querySelectorAll('.subject-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-subject="${subject}"]`).classList.add('active');

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
        return shuffled.slice(0, 50); // 50 questions par session
    }

    displayQuestion() {
        const question = this.currentQuestions[this.currentQuestionIndex];
        
        this.questionNumberEl.textContent = `Question ${this.currentQuestionIndex + 1}/${this.currentQuestions.length}`;
        this.questionTextEl.textContent = question.question;
        
        this.answersEl.innerHTML = '';
        question.answers.forEach((answer, index) => {
            const answerEl = document.createElement('div');
            answerEl.className = 'answer-option';
            answerEl.textContent = answer;
            answerEl.style.pointerEvents = 'auto';
            answerEl.addEventListener('click', () => this.selectAnswer(index));
            this.answersEl.appendChild(answerEl);
        });

        this.validateBtn.disabled = true;
        this.validateBtn.style.display = 'inline-block';
        this.nextBtn.style.display = 'none';
        this.restartBtn.style.display = 'none';
        this.explanationEl.style.display = 'none';
        this.selectedAnswer = null;

        const progress = ((this.currentQuestionIndex) / this.currentQuestions.length) * 100;
        this.progressEl.style.width = `${progress}%`;

        this.updateScore();
    }

    selectAnswer(index) {
        document.querySelectorAll('.answer-option').forEach(el => {
            el.classList.remove('selected');
        });

        document.querySelectorAll('.answer-option')[index].classList.add('selected');
        this.selectedAnswer = index;
        this.validateBtn.disabled = false;
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

        this.explanationEl.innerHTML = `<strong>Explication :</strong> ${question.explanation}`;
        this.explanationEl.style.display = 'block';

        this.validateBtn.style.display = 'none';
        
        if (this.currentQuestionIndex < this.currentQuestions.length - 1) {
            this.nextBtn.style.display = 'inline-block';
        } else {
            this.restartBtn.style.display = 'inline-block';
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

    updateScore() {
        const totalAnswered = this.currentQuestionIndex + (this.selectedAnswer !== null ? 1 : 0);
        this.scoreEl.textContent = `Score: ${this.score}/${totalAnswered}`;
        const percentage = totalAnswered > 0 ? Math.round((this.score / totalAnswered) * 100) : 0;
        this.percentageEl.textContent = `${percentage}%`;
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

        this.explanationEl.appendChild(finalScoreEl);
    }

    updateStats() {
        const subjects = {
            francais: 'Français (200 questions)',
            maths: 'Mathématiques (200 questions)',
            histoire: 'Histoire-Géo (200 questions)',
            sciences: 'Sciences SVT (200 questions)',
            physique: 'Physique-Chimie (200 questions)'
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

        // Statistiques globales
        const totalCorrect = Object.values(this.userStats).reduce((sum, stat) => sum + stat.correct, 0);
        const totalAnswered = Object.values(this.userStats).reduce((sum, stat) => sum + stat.correct + stat.incorrect, 0);
        const globalPercentage = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

        const globalStatEl = document.createElement('div');
        globalStatEl.className = 'stat-item';
        globalStatEl.style.borderTop = '2px solid #667eea';
        globalStatEl.style.fontWeight = 'bold';
        globalStatEl.innerHTML = `
            <span>📊 Total Global</span>
            <span>${totalCorrect}/${totalAnswered} (${globalPercentage}%)</span>
        `;
        this.statsEl.appendChild(globalStatEl);
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

// Initialiser l'application
document.addEventListener('DOMContentLoaded', () => {
    new QuizApp();
});

document.addEventListener('DOMContentLoaded', () => {
    // 1. DOM Element References
    const startButton = document.getElementById('start-button');
    const questionContainer = document.getElementById('question-container');
    const answersContainer = document.getElementById('answers-container');
    const resultContainer = document.getElementById('result-container');
    const welcomeMessage = document.querySelector('h1'); // Assuming the h1 is the welcome message

    // 2. Question Data Structure
    const questions = [
        {
            questionText: "ما هو الشيء الذي كلما أخذت منه كبر؟",
            answers: [
                { text: "العمر", correct: false },
                { text: "الحفرة", correct: true },
                { text: "المعرفة", correct: false },
                { text: "البالون", correct: false }
            ]
        },
        {
            questionText: "ما هو الشيء الذي يرتفع كلما زادت الرطوبة؟",
            answers: [
                { text: "درجة الحرارة", correct: false },
                { text: "المنشفة المبلولة (لو تركتها تجف لوحدها)", correct: true },
                { text: "مستوى الماء في النهر", correct: false },
                { text: "سعر المظلات", correct: false }
            ]
        },
        {
            questionText: "لماذا يعتبر الكمبيوتر ذكي جداً؟",
            answers: [
                { text: "لأنه يأكل الكثير من الرقائق (chips)", correct: false },
                { text: "لأنه لا ينسى أبداً... إلا إذا انقطعت الكهرباء", correct: false },
                { text: "لأنه يستمع إلى أمه (اللوحة الأم)", correct: true },
                { text: "لأنه يذهب إلى المدرسة كل يوم", correct: false }
            ]
        },
        {
            questionText: "ما هو الشيء الذي له عين واحدة ولا يرى؟",
            answers: [
                { text: "الأعور الدجال", correct: false },
                { text: "الإبرة", correct: true },
                { text: "الكاميرا القديمة", correct: false },
                { text: "القرصان ذو العين الواحدة", correct: false }
            ]
        },
        {
            questionText: "ما هو الشيء الذي يمشي بلا أرجل ويبكي بلا عيون؟",
            answers: [
                { text: "الطفل الرضيع", correct: false },
                { text: "الأفعى الحزينة", correct: false },
                { text: "السحابة", correct: true },
                { text: "الظل", correct: false }
            ]
        },
        {
            questionText: "ما هو السؤال الذي لا يمكنك الإجابة عليه بـ 'نعم'؟",
            answers: [
                { text: "هل أنت مستيقظ؟", correct: false },
                { text: "هل أنت نائم الآن؟", correct: true },
                { text: "هل تحب هذه اللعبة؟", correct: false },
                { text: "هل اليوم هو الغد؟", correct: false }
            ]
        },
        {
            questionText: "ما هو الشيء الذي يملك مدنًا ولكن لا بيوت، غابات ولكن لا أشجار، ومياه ولكن لا سمك؟",
            answers: [
                { text: "لعبة فيديو قديمة", correct: false },
                { text: "كتاب الجغرافيا", correct: false },
                { text: "الخريطة", correct: true },
                { text: "أحلام اليقظة", correct: false }
            ]
        },
        {
            questionText: "إذا كان لديك برتقالة واحدة، كيف تجعلها برتقالتين دون تقطيعها أو عضها أو ضربها بالخلاط؟",
            answers: [
                { text: "تشتري برتقالة أخرى", correct: false },
                { text: "تضعها أمام المرآة", correct: true },
                { text: "تتمنى أمنية", correct: false },
                { text: "تزرعها وتنتظر", correct: false }
            ]
        },
        {
            questionText: "ما هو الشيء الذي كلما طال قصر؟",
            answers: [
                { text: "الثعبان", correct: false },
                { text: "العمر (عندما نقول 'قصر العمر')", correct: true },
                { text: "الظل", correct: false },
                { text: "الطريق", correct: false }
            ]
        },
        {
            questionText: "ما هو الشيء الذي يرتفع ولا ينزل أبداً؟",
            answers: [
                { text: "الدخان", correct: false },
                { text: "العمر", correct: true },
                { text: "الطائرة الورقية", correct: false },
                { text: "الأسعار", correct: false }
            ]
        },
        {
            questionText: "ما الذي يجب أن تكسره قبل أن تستخدمه؟",
            answers: [
                { text: "وعد", correct: false },
                { text: "رقم قياسي", correct: false },
                { text: "البيضة", correct: true },
                { text: "قلب شخص ما (لا تفعل!)", correct: false }
            ]
        }
    ];

    // 3. Game State Variables
    let currentQuestionIndex = 0;
    let score = 0;

    // 4. startGame function
    function startGame() {
        if (welcomeMessage) {
            welcomeMessage.style.display = 'none';
        }
        startButton.style.display = 'none';
        questionContainer.style.display = 'block';
        answersContainer.style.display = 'flex'; // To stack answer buttons
        resultContainer.style.display = 'none';
        currentQuestionIndex = 0;
        score = 0;
        displayQuestion();
    }

    // 5. displayQuestion function
    function displayQuestion() {
        if (currentQuestionIndex >= questions.length) {
            endGame();
            return;
        }

        const currentQuestion = questions[currentQuestionIndex];
        questionContainer.textContent = currentQuestion.questionText;
        answersContainer.innerHTML = ''; // Clear previous answers

        // Shuffle answers for more fun
        const shuffledAnswers = [...currentQuestion.answers].sort(() => Math.random() - 0.5);

        shuffledAnswers.forEach(answer => {
            const button = document.createElement('button');
            button.textContent = answer.text;
            button.classList.add('answer-button');
            button.addEventListener('click', () => selectAnswer(answer.correct));
            answersContainer.appendChild(button);
        });
    }

    // 6. selectAnswer function
    function selectAnswer(isCorrect) {
        if (isCorrect) {
            score++;
        }

        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            displayQuestion();
        } else {
            endGame();
        }
    }

    // New function: getFunnyDescription
    function getFunnyDescription(finalScore) {
        const totalQuestions = questions.length;
        const percentage = (finalScore / totalQuestions) * 100;

        if (percentage < 20) {
            return "شكلك كنت نايم وإنت بتحل، حاول تاني يمكن تصحصح! 😂";
        } else if (percentage < 40) {
            return "لا بأس، الذكاء مش كل حاجة، الأهم الأخلاق... صح؟ 😉";
        } else if (percentage < 60) {
            return "أنت في المتوسط الطبيعي، يعني مش عبقري بس برضو مش غبي... مبروك؟ 🤔";
        } else if (percentage < 80) {
            return "ما شاء الله! شكلك بتفطر جبنة كل يوم. ذكاءك لامع! 💡";
        } else if (percentage < 100) {
            return "أينشتاين مين يا عم! أنت المفروض تشتغل في وكالة ناسا فرع الشرق الأوسط! 🚀";
        } else { // Perfect score
            return "أنت رسميًا ملك/ملكة الألغاز الكوميدية! تاجك في الطريق! 👑";
        }
    }

    // 7. endGame function (Updated)
    function endGame() {
        questionContainer.style.display = 'none';
        answersContainer.style.display = 'none';
        resultContainer.style.display = 'block';

        const funnyDescription = getFunnyDescription(score);
        resultContainer.innerHTML = `نصيحة اليوم: ${funnyDescription}<br> درجتك النهائية: ${score} من ${questions.length}`;
        
        // We can re-enable the start button if they want to play again
        startButton.textContent = "إعادة اللعب؟";
        startButton.style.display = 'inline-block';
        if (welcomeMessage) { // Show welcome message again, or a different one
            welcomeMessage.style.display = 'block';
            welcomeMessage.textContent = "هل تريد جولة أخرى من الضحك والذكاء؟";
        }
    }

    // 8. Event Listener
    if (startButton) {
        startButton.addEventListener('click', startGame);
    } else {
        console.error("Start button not found!");
    }
});

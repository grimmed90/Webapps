// Ordlista. Du kan enkelt lägga till fler ord här.
const wordList = [
    { sv: "äpple", en: "apple", options: ["pear", "orange", "banana"] },
    { sv: "hus", en: "house", options: ["car", "tree", "mouse"] },
    { sv: "bok", en: "book", options: ["letter", "magazine", "paper"] },
    { sv: "blå", en: "blue", options: ["red", "green", "yellow"] },
    { sv: "springa", en: "run", options: ["walk", "jump", "swim"] },
    { sv: "leende", en: "smile", options: ["laugh", "cry", "frown"] },
    { sv: "nyckel", en: "key", options: ["lock", "door", "window"] },
    { sv: "dator", en: "computer", options: ["phone", "television", "radio"] },
    { sv: "sol", en: "sun", options: ["moon", "star", "cloud"] },
    { sv: "vatten", en: "water", options: ["fire", "earth", "air"] }
];

// Hämta HTML-element
const wordToGuessElem = document.getElementById('word-to-guess');
const answerButtonsElem = document.getElementById('answer-buttons');
const feedbackTextElem = document.getElementById('feedback-text');
const nextWordBtn = document.getElementById('next-word-btn');
const scoreTextElem = document.getElementById('score-text');

let currentWordIndex = 0;
let score = 0;
let shuffledWords = [];

// Starta spelet när sidan laddas
startGame();

function startGame() {
    score = 0;
    scoreTextElem.innerText = `Poäng: ${score}`;
    // Blanda ordlistan för att få en ny ordning varje gång
    shuffledWords = wordList.sort(() => Math.random() - 0.5);
    currentWordIndex = 0;
    feedbackTextElem.innerText = "";
    nextWordBtn.classList.add('hidden');
    loadNextWord();
}

function loadNextWord() {
    resetState();
    if (currentWordIndex >= shuffledWords.length) {
        // Om alla ord är klara, visa slutresultat
        showFinalScore();
        return;
    }
    
    const currentWord = shuffledWords[currentWordIndex];
    wordToGuessElem.innerText = currentWord.sv;

    // Skapa en lista med alla svarsalternativ (rätt + fel)
    const answers = [...currentWord.options, currentWord.en];
    // Blanda svarsalternativen
    answers.sort(() => Math.random() - 0.5);

    // Skapa en knapp för varje svarsalternativ
    answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer;
        button.classList.add('btn');
        if (answer === currentWord.en) {
            button.dataset.correct = true;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElem.appendChild(button);
    });
}

function resetState() {
    feedbackTextElem.innerText = "";
    nextWordBtn.classList.add('hidden');
    // Rensa gamla knappar
    while (answerButtonsElem.firstChild) {
        answerButtonsElem.removeChild(answerButtonsElem.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === 'true';

    if (isCorrect) {
        score++;
        feedbackTextElem.innerText = "Rätt svar!";
        feedbackTextElem.style.color = "#2f855a"; // Grön
    } else {
        feedbackTextElem.innerText = `Fel! Rätt svar är "${shuffledWords[currentWordIndex].en}"`;
        feedbackTextElem.style.color = "#c53030"; // Röd
    }
    scoreTextElem.innerText = `Poäng: ${score}`;
    
    // Visa färgfeedback på knapparna
    Array.from(answerButtonsElem.children).forEach(button => {
        if (button.dataset.correct === 'true') {
            button.classList.add('correct');
        } else {
            button.classList.add('wrong');
        }
        button.disabled = true; // Avaktivera knapparna efter svar
    });

    nextWordBtn.classList.remove('hidden');
    currentWordIndex++;
}

function showFinalScore() {
    wordToGuessElem.innerText = "Bra jobbat!";
    feedbackTextElem.innerHTML = `Du fick ${score} av ${wordList.length} rätt.`;
    nextWordBtn.innerText = "Spela igen";
    nextWordBtn.classList.remove('hidden');
    // När man klickar på "Spela igen" så startar spelet om
    nextWordBtn.onclick = startGame; 
}


// Gör så att "Nästa ord"-knappen fungerar
nextWordBtn.addEventListener('click', () => {
    if (currentWordIndex < shuffledWords.length) {
        loadNextWord();
    }
});

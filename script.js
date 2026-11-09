const cardTypes = [
    { name: "6", value: 6, display: "6" },
    { name: "7", value: 7, display: "7" },
    { name: "8", value: 8, display: "8" },
    { name: "9", value: 9, display: "9" },
    { name: "10", value: 10, display: "10" },
    { name: "Валет", value: 2, display: "J" },
    { name: "Дама", value: 3, display: "Q" },
    { name: "Король", value: 4, display: "K" },
    { name: "Туз", value: 11, display: "A" }
];

const suits = [
    { sign: "♥", isRed: true },
    { sign: "♦", isRed: true },
    { sign: "♣", isRed: false },
    { sign: "♠", isRed: false }
];

let userTotalScore = 0;
let compTotalScore = 0;
let currentRound = 0;
let userName = "User";

function updateUserLabel() {
    document.getElementById("user-label").innerHTML = `${userName}<br><span id="user-score">${userTotalScore}</span>`;
}

function getRandomCard() {
    const randomType = cardTypes[Math.floor(Math.random() * cardTypes.length)];
    const randomSuit = suits[Math.floor(Math.random() * suits.length)];
    return {
        type: randomType,
        suit: randomSuit
    };
}

function updateCardUI(elementId, cardObj) {
    const cardEl = document.getElementById(elementId);
    const topEl = cardEl.querySelector('.card-top');
    const centerEl = cardEl.querySelector('.card-center');
    const bottomEl = cardEl.querySelector('.card-bottom');

    topEl.innerText = `${cardObj.type.display}\n${cardObj.suit.sign}`;
    centerEl.innerText = cardObj.suit.sign;
    bottomEl.innerText = `${cardObj.type.display}\n${cardObj.suit.sign}`;

    if (cardObj.suit.isRed) {
        cardEl.className = "card red-suit";
    } else {
        cardEl.className = "card black-suit";
    }
}

function playRound() {
    if (currentRound >= 3) return;

    currentRound++;
    document.getElementById("round-text").innerText = `Спроба ${currentRound} з 3`;

    let userCard = getRandomCard();
    let compCard = getRandomCard();

    updateCardUI("user-card", userCard);
    updateCardUI("comp-card", compCard);

    userTotalScore += userCard.type.value;
    compTotalScore += compCard.type.value;

    document.getElementById("user-score").innerText = userTotalScore;
    document.getElementById("comp-score").innerText = compTotalScore;

    let isGameOver = false;
    let resultMessage = "";

    if (userTotalScore === 21 && compTotalScore === 21) {
        resultMessage = `Гра закінчена!\nНічия! Обидва набрали 21 очко!`;
        isGameOver = true;
    } else if (userTotalScore === 21) {
        resultMessage = `Гра закінчена!\nПереміг: ${userName} Набрано 21 очко! Блекджек!`;
        isGameOver = true;
    } else if (compTotalScore === 21) {
        resultMessage = `Гра закінчена!\nПереміг: Computer Набрано 21 очко! Блекджек!`;
        isGameOver = true;
    } else if (currentRound === 3) {
        isGameOver = true;
        if (userTotalScore > 21 && compTotalScore > 21) {
            resultMessage = `Гра закінчена!\nНічия! У обох перебір (Ви: ${userTotalScore}, Комп'ютер: ${compTotalScore})`;
        } else if (userTotalScore > 21) {
            resultMessage = `Гра закінчена!\nПереміг: Computer (У вас перебір: ${userTotalScore})`;
        } else if (compTotalScore > 21) {
            resultMessage = `Гра закінчена!\nПереміг: ${userName} (У комп'ютера перебір: ${compTotalScore})`;
        } else if (userTotalScore > compTotalScore) {
            resultMessage = `Гра закінчена!\nПереміг: ${userName} (${userTotalScore} проти ${compTotalScore})`;
        } else if (compTotalScore > userTotalScore) {
            resultMessage = `Гра закінчена!\nПереміг: Computer (${compTotalScore} проти ${userTotalScore})`;
        } else {
            resultMessage = `Гра закінчена!\nНічия! (Очки однакові: ${userTotalScore})`;
        }
    }

    if (isGameOver) {
        setTimeout(() => {
            alert(resultMessage);
            resetGame();
        }, 300);
    }
}

function resetGame() {
    userTotalScore = 0;
    compTotalScore = 0;
    currentRound = 0;

    document.getElementById("user-score").innerText = "0";
    document.getElementById("comp-score").innerText = "0";
    document.getElementById("round-text").innerText = "Спроба 0 з 3";

    const resetCard = (id) => {
        const cardEl = document.getElementById(id);
        cardEl.className = "card";
        cardEl.querySelector('.card-top').innerText = "?";
        cardEl.querySelector('.card-center').innerText = "🂠";
        cardEl.querySelector('.card-bottom').innerText = "?";
    };

    resetCard("user-card");
    resetCard("comp-card");
}
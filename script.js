// فتح الرسالة
function openEnvelope() {
    document.getElementById('welcomePage').style.display = 'none';
    document.getElementById('messagePage').style.display = 'block';
}

// الرجوع للصفحة الأولى
function goHome() {
    document.getElementById('messagePage').style.display = 'none';
    document.getElementById('welcomePage').style.display = 'block';
}

// الذهاب للعبة
function goToGame(e) {
    e.preventDefault();

    document.getElementById('messagePage').style.display = 'none';
    document.getElementById('gamePage').style.display = 'block';

    startGame();
}

// العودة من اللعبة
function backToMessage() {
    document.getElementById('gamePage').style.display = 'none';
    document.getElementById('messagePage').style.display = 'block';

    stopGame();
}


//==================================================
// لعبة اجمعي القلوب
//==================================================

let gameRunning = false;
let score = 0;
let gameInterval;


// بدء اللعبة
function startGame() {
    gameRunning = true;
    score = 0;

    document.getElementById('scoreDisplay').textContent = '0';
    document.getElementById('gameArea').innerHTML = '';

    // إنشاء قلب جديد كل 600ms
    gameInterval = setInterval(createHeart, 600);
}


// إيقاف اللعبة
function stopGame() {
    gameRunning = false;

    clearInterval(gameInterval);
}


// إنشاء قلب
function createHeart() {

    // لو اللعبة متوقفة، متعملش حاجة
    if (!gameRunning) return;

    const gameArea = document.getElementById('gameArea');

    // إنشاء عنصر القلب
    const heart = document.createElement('div');

    heart.className = 'heart-game';
    heart.textContent = '❤️';


    //==================================================
    // تحديد مكان عشوائي للقلب
    //==================================================

    const x = Math.random() * (gameArea.offsetWidth - 40);
    const y = Math.random() * (gameArea.offsetHeight - 40);

    heart.style.left = x + 'px';
    heart.style.top = y + 'px';

    heart.style.animationDelay = Math.random() * 2 + 's';


    //==================================================
    // الضغط على القلب
    //==================================================

    heart.onclick = function(e) {

        e.stopPropagation();

        // زيادة السكور
        score++;

        // تحديث السكور على الشاشة
        document.getElementById('scoreDisplay').textContent = score;

        // إزالة القلب
        heart.remove();


        //==================================================
        // تأثير +1
        //==================================================

        const collected = document.createElement('div');

        collected.textContent = '+1';

        collected.style.position = 'absolute';
        collected.style.left = x + 'px';
        collected.style.top = y + 'px';

        collected.style.color = '#d63031';
        collected.style.fontSize = '20px';
        collected.style.fontWeight = 'bold';

        collected.style.animation = 'fadeUp 1s ease forwards';

        gameArea.appendChild(collected);


        // إزالة تأثير +1 بعد ثانية
        setTimeout(() => {
            collected.remove();
        }, 1000);
    };


    // إضافة القلب للعبة
    gameArea.appendChild(heart);


    //==================================================
    // إزالة القلب تلقائياً بعد 4 ثواني
    //==================================================

    setTimeout(() => {

        if (heart.parentNode) {
            heart.remove();
        }

    }, 4000);
}


//==================================================
// لعبة جديدة
//==================================================

function resetGame() {

    stopGame();

    startGame();
}


//==================================================
// Animation الخاصة بـ +1
//==================================================

const style = document.createElement('style');

style.textContent = `

    @keyframes fadeUp {

        from {
            opacity: 1;
            transform: translateY(0);
        }

        to {
            opacity: 0;
            transform: translateY(-50px);
        }

    }

`;

document.head.appendChild(style);
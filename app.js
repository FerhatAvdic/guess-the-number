function $(selector){
    return document.querySelector(selector);
}

//Game Values
let min = 1, max = 10, winningNum = getRandomNum(min, max), guessesLeft = 3;

//Init UI Els
const game = document.querySelector('#game'),
minNum = document.querySelector('.min-num'),
maxNum = document.querySelector('.max-num'),
guessBtn = document.querySelector('#guess-btn'),
guessInput = document.querySelector('#guess-input'),
message = $('.message'); // trying to mimic jquery selector

//Assign UI Min and MAx
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
});

//Listen for Guess
guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value);
    // Validate
    if (isNaN(guess) || guess < min || guess > max){
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
        return;
    }

    // Check if right
    if(guess === winningNum){
        gameOver(true, winningNum + ' is correct, YOU WIN!', 'green');
    } else {
        //Wrong number
        guessesLeft -= 1;
        if(guessesLeft === 0){
            gameOver(false, 'Game Over, you lost. The correct number was ' + winningNum, 'red');
        }else{
            //Game continues - answer wrong 
            guessInput.value = '';
            setMessage('Guess is not correct ' + guessesLeft + ' guesses left', 'red');
        }
    }
});

function setMessage(msg, color){
    message.style.color = color;
    message.textContent = msg;
}

//Game over
function gameOver(won, msg){
    let color;
    won === true ? color = 'green': color = 'red';
    guessInput.disabled = true;
    guessInput.style.borderColor = color;
    setMessage(msg, color);

    guessBtn.value="Play Again";
    guessBtn.className += 'play-again';
}

function getRandomNum(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}
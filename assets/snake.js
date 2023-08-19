import './styles/snake.css';

const gameBoard = document.querySelector("#gameBoard");
const user_id = document.querySelector('#user_id');
const high_score = document.querySelector('#high_score');
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const endText = document.querySelector("#endText");
const resetBtn = document.querySelector("#resetBtn");
const modal = document.querySelector('.modal');
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "white";
const snakeColor = "yellow";
const snakeBorder = "black";
const foodColor = "red";
const unitSize = 25;
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;
let snake = [
    {x:0, y:0}
];
let gameInterval = 0;

window.addEventListener('keydown', changeDirection);
resetBtn.addEventListener('click', resetGame);

gameStart();

function gameStart(){
    running = true;
    scoreText.textContent = score;
    createFood();
    drawFood();
    gameInterval = setInterval(nextTick, 150);
};
function nextTick(){
    if(running){
        clearBoard();
        drawFood();
        moveSnake();
        drawSnake();
        checkGameOver();
    }else{
        clearInterval(gameInterval);
        displayGamerOver();
    }
};
function clearBoard(){
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
};
function createFood(){
    function randomFood(min, max){
        const randomNumber = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
        return randomNumber;
    }
    foodX = randomFood(0, gameWidth - unitSize);
    foodY = randomFood(0, gameHeight - unitSize);
    
};
function drawFood(){
    ctx.beginPath();
    ctx.fillStyle = foodColor;
    ctx.arc(foodX+unitSize/2, foodY+unitSize/2, unitSize/2, 0, 2*Math.PI);
    ctx.fill();
    ctx.strokeStyle = foodColor;
    ctx.stroke();
};
function moveSnake(){
    const head = {x: snake[0].x + xVelocity, y: snake[0].y + yVelocity};
    snake.unshift(head);
    if(snake[0].x === foodX && snake[0].y === foodY){
        score++;
        scoreText.textContent = score;
        createFood();
    }else{
        snake.pop();
    }
};
function drawSnake(){
    ctx.fillStyle = snakeColor;
    snake.forEach(function(snakePart, index) {
        if(index === 0){
            ctx.strokeStyle = snakeBorder;
            ctx.beginPath();
            ctx.lineWidth = "5";
            ctx.arc(snakePart.x+unitSize/2, snakePart.y+unitSize/2, unitSize/2, 0, 2*Math.PI);
            ctx.fill();
            ctx.stroke();
        }else{
            ctx.strokeStyle = snakeColor;
            ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
            ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
        }
    })
};
function changeDirection(e){
    const keyPressed = e.keyCode;
    const left = 37;
    const right = 39;
    const up = 38;
    const down = 40;
    
    const goingUp = (yVelocity == -unitSize);
    const goingDown = (yVelocity == unitSize);
    const goingRight = (xVelocity == unitSize);
    const goingLeft = (xVelocity == -unitSize);
    
    switch(true){
        case(keyPressed == up && !goingDown):
        yVelocity = -unitSize;
        xVelocity = 0;
        break;
        case(keyPressed == down && !goingUp):
        yVelocity = unitSize;
        xVelocity = 0;
        break;
        case(keyPressed == right && !goingLeft):
        yVelocity = 0;
        xVelocity = unitSize;
        break;
        case(keyPressed == left && !goingRight):
        yVelocity = 0;
        xVelocity = -unitSize;
        break;
    }
};
function checkGameOver(){
    switch(true){
        case(snake[0].x < 0):
        running = false;
        break;
        case(snake[0].x >= gameWidth):
        running = false;
        break;
        case(snake[0].y < 0):
        running = false;
        break;
        case(snake[0].y >= gameHeight):
        running = false;
        break;
    }
    for(let i = 1; i < snake.length; i++){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
            running = false;
        }
    }
};
function displayGamerOver(){
    endText.textContent = score;
    $.ajax({
        type: 'POST',
        url: '/snake/ajax',
        async: true,
        data: {
            'score': score
        },
        
        success: function(data){
            high_score.textContent = data;
            modal.classList.add('modal-visible');
        },

        error: function(){
            alert('Ajax request failed!');
        }
    })
};
function resetGame(){
    location.reload();
    modal.classList.remove('modal-visible');
};
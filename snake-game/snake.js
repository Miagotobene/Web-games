// variable declaration
const blocksize = 25;
const rows = 20;
const cols = 20;

var board;
var context;

// draw snake
var snakeX = blocksize * 5; // (5,5) is the position where we want our snake to start from
var snakeY = blocksize * 5;

// Snake's speed variables
var velocityX = 0;
var velocityY = 0;

// Snake's body variables
var snakeBody = []


// draw our snake's food 
var foodX = blocksize * 10; // (10,10) is the position where we want our snake to start from
var foodY = blocksize * 10;

// gameover variables 
var gameOver = false

// create board
window.onload = function() { // window.onlaod is fired when the entire page loads including its content
    board = document.getElementById('board');
    board.height = rows * blocksize;
    board.width = cols * blocksize;
    context = board.getContext('2d');

    // placefood function gets called here
    placeFood();

    // make snake move by calling changeDirection function
    document.addEventListener('keyup', changeDirection)

    // update function gets called here and runs every 100 milliseconds
   setInterval(update, 1000/10);

   
}

// function for painting/drawing onto the canvas
function update() {
    // stop drawing if gameover is called
    if (gameOver){
        return;
    }
    context.fillStyle = 'black';
    context.fillRect(0,0, board.width, board.height)

    // giving our food a color and a width and height 
    context.fillStyle = "red";
    context.fillRect(foodX,foodY, blocksize, blocksize);

    // when snake collides with food
    if (snakeX == foodX && snakeY == foodY){
        snakeBody.push([foodX, foodY])
        placeFood()
    }

    // attaches snake's body to its head 
    for (let index = snakeBody.length; index > 0; index--) {
        snakeBody[index] = snakeBody[index -1] 
    }

    if (snakeBody.length){
        snakeBody[0] = [snakeX, snakeX];
    }

    // giving our snake a color and a width and height
    context.fillStyle = "lime";
    snakeX += velocityX * blocksize;
    snakeY += velocityY * blocksize;
    context.fillRect(snakeX,snakeY, blocksize, blocksize);

    // draw body
    for (let index = 0; index < snakeBody.length; index++) {
        context.fillRect(snakeBody[index][0], snakeBody[index][1], blocksize, blocksize)
        
    }

    // gameover conditions
    if (snakeX < 0 || snakeX > cols * blocksize || snakeY < 0 || snakeY > rows * blocksize){
        gameOver = true;
        alert('Game Over')
    } 

    for (let index = 0; index < snakeBody.length; index++) {
        if (snakeX == snakeBody[index][0] && snakeY == snakeBody[index][1]){
            gameOver = true;
            alert('Game Over');
        }
        
    }

    
}


// function for making the snake changeDirection 
function changeDirection(e){
    if (e.code == 'ArrowUp' && velocityY != 1 ){
        velocityX = 0;
        velocityY = -1;
    } else if (e.code == 'ArrowDown' && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    }else if (e.code == 'ArrowLeft' && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    }else if (e.code == 'ArrowRight' && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }

}

// function for randomly placing food onto the canvas
function placeFood(){
    foodX = Math.floor(Math.random() * cols) * blocksize;
    foodY = Math.floor(Math.random() * rows) * blocksize;

}

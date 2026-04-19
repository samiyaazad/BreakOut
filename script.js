let board;
let boardWidth = 500;
let boardHeight = 500;
let context; 


let playerWidth = 80; 
let playerHeight = 10;
let playerVelocityX = 10; 


let player = {
    x : boardWidth/2 - playerWidth/2,
    y : boardHeight - playerHeight - 5,
    width: playerWidth,
    height: playerHeight,
    velocityX : playerVelocityX
}


let ballWidth = 10;
let ballHeight = 10;
let ballVelocityX = 3; 
let ballVelocityY = 2; 


let ball = {
    x : boardWidth/2,
    y : boardHeight/2,
    width: ballWidth,
    height: ballHeight,
    velocityX : ballVelocityX,
    velocityY : ballVelocityY
}


let blockArray = [];
let blockWidth = 50;
let blockHeight = 10;
let blockColumns = 8; 
let blockRows = 3; 
let blockMaxRows = 10; 
let blockCount = 0;


let blockX = 15;
let blockY = 45;


let score = 0;
let gameOver = false;
let level = 1;
let lives = 3; 
let gameStarted = false;
let paused = false;
let highScore = parseInt(localStorage.getItem("highScore")) || 0;


window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); 

    document.addEventListener("keydown",movePlayer);
    
    context.fillStyle="skyblue";
    context.fillRect(player.x, player.y, player.width, player.height);

    requestAnimationFrame(update);
    document.addEventListener("keydown", (e) => {
        if (e.code === "Enter") gameStarted = true;
        if (e.code === "KeyP") paused = !paused;
    });

    
    createBlocks();
}


function update() {
    requestAnimationFrame(update);

    let gradient = context.createLinearGradient(0, 0, 0, board.height);
    gradient.addColorStop(0, "#000814");
    gradient.addColorStop(1, "#001d3d");

    context.fillStyle = gradient;
    context.fillRect(0, 0, board.width, board.height);

    for (let i = 0; i < 30; i++) {
    context.fillStyle = "rgba(255, 255, 255, 0.3)";
    context.fillRect(
        Math.random() * boardWidth,
        Math.random() * boardHeight,
        2,
        2
    );
    }

    if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
    }

    if (!gameStarted) {
        drawStartScreen();
        return;
    }

    if (paused) {
        drawPauseScreen();
        return;
    }

    if (gameOver) {
        drawGameOver();
        return;
    }


    context.fillStyle = "lightgreen";
    context.fillRect(player.x, player.y, player.width, player.height);

    context.fillStyle = "white";
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    context.fillRect(ball.x, ball.y, ball.width, ball.height);

    
    if (detectCollision(ball, player)) {
        let collidePoint = (ball.x + ball.width / 2) - (player.x + player.width / 2);

        collidePoint = collidePoint / (player.width / 2); 

        let angle = collidePoint * Math.PI / 3;

        let speed = Math.sqrt(ball.velocityX ** 2 + ball.velocityY ** 2);

        ball.velocityX = speed * Math.sin(angle);
        ball.velocityY = -speed * Math.cos(angle);
    }

    if (ball.y <= 0) { 
    
        ball.velocityY *= -1; 
    }
    else if (ball.x <= 0 || (ball.x + ball.width >= boardWidth)) {
    
        ball.velocityX *= -1; 
    }
    else if (ball.y + ball.height >= boardHeight) {
        lives-- ;
        if (lives <= 0) {
            gameOver = true;

            let storedHigh = localStorage.getItem("highScore") || 0;
            if (score > storedHigh) {
                localStorage.setItem("highScore",score);
            }
        } else {
            resetBall();
        }
    }

    
    context.fillStyle = "skyblue";
    for (let i = 0; i < blockArray.length; i++) {
        let block = blockArray[i];
        if (!block.break) {
            if (topCollision(ball, block) || bottomCollision(ball, block)) {
                block.break = true;     
                ball.velocityY *= -1;   
                score += 100;
                blockCount -= 1;
            }
            else if (leftCollision(ball, block) || rightCollision(ball, block)) {
                block.break = true;    
                ball.velocityX *= -1;   
                score += 100;
                blockCount -= 1;
            }
            context.fillRect(block.x, block.y, block.width, block.height);
        }
    }


    if (blockCount == 0) {
        level++ ;

        score += 100 * blockRows * blockColumns;

        blockRows = Math.min(blockRows + 1, blockMaxRows);

        ball.velocityX *= 1.1;
        ball.velocityY *= 1.1;

        player.width = Math.max(40, player.width - 5);

        createBlocks();
    }


        context.font = "16px sans-serif";
        context.fillStyle = "white";
        context.textAlign = "center";

        context.fillText("Score: " + score, boardWidth * 0.125, 25);
        context.fillText("Level: " + level, boardWidth * 0.375, 25);
        context.fillText("Lives: " + lives, boardWidth * 0.625, 25);
        context.fillText("High: " + highScore, boardWidth * 0.875, 25);
}


function outOfBounds(xPosition) {
    return (xPosition < 0 || xPosition + player.width > boardWidth);
}


function movePlayer(e) {
    if (gameOver) {
        if (e.code == "Space") {
            resetGame();
            console.log("RESET");
        }
        return;
    }
    if (e.code == "ArrowLeft") {
        
        let nextplayerX = player.x - player.velocityX;
        if (!outOfBounds(nextplayerX)) {
            player.x = nextplayerX;
        }
    }
    else if (e.code == "ArrowRight") {
        let nextplayerX = player.x + player.velocityX;
        if (!outOfBounds(nextplayerX)) {
            player.x = nextplayerX;
        }
        
    }
}


function detectCollision(a, b) {
    return a.x < b.x + b.width &&   
           a.x + a.width > b.x &&   
           a.y < b.y + b.height &&  
           a.y + a.height > b.y;    
}


function topCollision(ball, block) { 
    return detectCollision(ball, block) && (ball.y + ball.height) >= block.y;
}


function bottomCollision(ball, block) { 
    return detectCollision(ball, block) && (block.y + block.height) >= ball.y;
}


function leftCollision(ball, block) { 
    return detectCollision(ball, block) && (ball.x + ball.width) >= block.x;
}


function rightCollision(ball, block) {
    return detectCollision(ball, block) && (block.x + block.width) >= ball.x;
}


function createBlocks() {
    blockArray = []; 
    for (let c = 0; c < blockColumns; c++) {
        for (let r = 0; r < blockRows; r++) {
            let block = {
                x : blockX + c*blockWidth + c*10, 
                y : blockY + r*blockHeight + r*10, 
                width : blockWidth,
                height : blockHeight,
                break : false
            }
            blockArray.push(block);
        }
    }
    blockCount = blockArray.length;
}


function resetBall() {
    ball.x = boardWidth / 2;
    ball.y = boardHeight / 2;
    ball.velocityX = 0;
    ball.velocityY = 0;

    setTimeout(() => {
        ball.velocityX = ballVelocityX;
        ball.velocityY = ballVelocityY;
    }, 1000);
}


function resetGame() {
    gameOver = false;
    player = {
        x : boardWidth/2 - playerWidth/2,
        y : boardHeight - playerHeight - 5,
        width: playerWidth,
        height: playerHeight,
        velocityX : playerVelocityX
    }
    ball = {
        x : boardWidth/2,
        y : boardHeight/2,
        width: ballWidth,
        height: ballHeight,
        velocityX : ballVelocityX,
        velocityY : ballVelocityY
    }
    blockArray = [];
    blockRows = 3;
    score = 0;

    lives = 3;
    level = 1;
    player.width = playerWidth;
    gameStarted = false;
    paused = false;

    createBlocks();
}


function drawStartScreen() {
    context.fillStyle = "white";
    context.font = "20px sans-serif";
    context.textAlign = "center";
    context.fillText("Press ENTER to Start", boardWidth / 2, boardHeight / 2);
}


function drawPauseScreen() {
    context.fillStyle ="white";
    context.font = "20px sans-serif";
    context.textAlign = "center";
    context.fillText("Paused - Press P to Resume", boardWidth / 2, boardHeight / 2);
}


function drawGameOver() {
    context.fillStyle = "rgba(0, 0, 0, 0.7)";
    context.fillRect(0, 0, boardWidth, boardHeight);

    context.fillStyle = "white";
    context.font = "28px sans-serif";
    context.textAlign = "center";

    context.fillText("GAME OVER", boardWidth / 2, boardHeight / 2 - 40);
    context.fillText("Score: " + score, boardWidth / 2, boardHeight / 2);
    context.fillText("HIGH SCORE: " + highScore, boardWidth / 2, boardHeight / 2 + 40);

    context.font = "16px sans-serif";
    context.fillText("Press Restart Button", boardWidth / 2, boardHeight / 2 + 80);
}
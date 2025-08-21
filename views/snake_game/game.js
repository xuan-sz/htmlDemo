// 游戏常量
const GRID_SIZE = 20;
const CELL_SIZE = 20;
const DIRECTIONS = {
    UP: { x: 0, y: -1 },
    DOWN: { x: 0, y: 1 },
    LEFT: { x: -1, y: 0 },
    RIGHT: { x: 1, y: 0 }
};

// 游戏变量
let canvas, ctx;
let snake, food;
let direction, nextDirection;
let gameLoop;
let score;
let isGameOver;
let isPaused;

// 初始化游戏
function init() {
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');
    
    document.getElementById('startBtn').addEventListener('click', startGame);
    document.getElementById('restartBtn').addEventListener('click', restartGame);
    document.addEventListener('keydown', changeDirection);
    
    resetGame();
}

// 重置游戏状态
function resetGame() {
    snake = [
        { x: 10, y: 10 },
        { x: 9, y: 10 },
        { x: 8, y: 10 }
    ];
    food = generateFood();
    direction = DIRECTIONS.RIGHT;
    nextDirection = DIRECTIONS.RIGHT;
    score = 0;
    isGameOver = false;
    isPaused = true;
    updateScore();
}

// 开始游戏
function startGame() {
    if (isGameOver) {
        resetGame();
    }
    isPaused = false;
    if (!gameLoop) {
        gameLoop = setInterval(update, 100);
    }
}

// 重新开始游戏
function restartGame() {
    clearInterval(gameLoop);
    gameLoop = null;
    resetGame();
    startGame();
}

// 游戏主循环
function update() {
    if (isPaused || isGameOver) return;
    
    // 更新方向
    direction = nextDirection;
    
    // 移动蛇
    const head = { 
        x: snake[0].x + direction.x, 
        y: snake[0].y + direction.y 
    };
    
    // 检查碰撞
    if (checkCollision(head)) {
        gameOver();
        return;
    }
    
    // 添加新头部
    snake.unshift(head);
    
    // 检查是否吃到食物
    if (head.x === food.x && head.y === food.y) {
        score++;
        updateScore();
        food = generateFood();
    } else {
        // 没吃到食物则移除尾部
        snake.pop();
    }
    
    // 渲染游戏
    render();
}

// 渲染游戏
function render() {
    // 清空画布
    ctx.fillStyle = '#ecf0f1';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 绘制食物
    ctx.fillStyle = '#e74c3c';
    ctx.fillRect(food.x * CELL_SIZE, food.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    
    // 绘制蛇
    ctx.fillStyle = '#2c3e50';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * CELL_SIZE, segment.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    });
    
    // 绘制网格线
    ctx.strokeStyle = '#bdc3c7';
    ctx.lineWidth = 0.5;
    for (let i = 0; i < GRID_SIZE; i++) {
        ctx.beginPath();
        ctx.moveTo(i * CELL_SIZE, 0);
        ctx.lineTo(i * CELL_SIZE, canvas.height);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(0, i * CELL_SIZE);
        ctx.lineTo(canvas.width, i * CELL_SIZE);
        ctx.stroke();
    }
}

// 改变方向
function changeDirection(e) {
    if (isPaused) return;
    
    switch(e.key) {
        case 'ArrowUp':
            if (direction !== DIRECTIONS.DOWN) nextDirection = DIRECTIONS.UP;
            break;
        case 'ArrowDown':
            if (direction !== DIRECTIONS.UP) nextDirection = DIRECTIONS.DOWN;
            break;
        case 'ArrowLeft':
            if (direction !== DIRECTIONS.RIGHT) nextDirection = DIRECTIONS.LEFT;
            break;
        case 'ArrowRight':
            if (direction !== DIRECTIONS.LEFT) nextDirection = DIRECTIONS.RIGHT;
            break;
    }
}

// 生成食物
function generateFood() {
    let food;
    do {
        food = {
            x: Math.floor(Math.random() * GRID_SIZE),
            y: Math.floor(Math.random() * GRID_SIZE)
        };
    } while (snake.some(segment => segment.x === food.x && segment.y === food.y));
    return food;
}

// 检查碰撞
function checkCollision(head) {
    // 检查墙壁碰撞
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        return true;
    }
    
    // 检查自身碰撞
    return snake.some(segment => segment.x === head.x && segment.y === head.y);
}

// 游戏结束
function gameOver() {
    isGameOver = true;
    clearInterval(gameLoop);
    gameLoop = null;
    alert(`游戏结束! 你的分数是: ${score}`);
}

// 更新分数显示
function updateScore() {
    document.getElementById('score').textContent = score;
}

// 初始化游戏
window.onload = init;

/*
=================================
PONG. Движок и механика игры
=================================
*/

// инициализация и установка размеров холста
var canvas = document.getElementById('pong');
var ctx = canvas.getContext('2d');

canvas.width = 1500;
canvas.height = 600;

// инициализация глобальных переменных
var ball, player1, player2;
var winRate = 15;

// функция отрисовки холста и элементов
draw = () => {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ball.render(ctx);
    player1.render(ctx);
    player2.render(ctx);
}

// мяч
class Ball {
    constructor() {
        this.x = canvas.width / 2 - 15;
        this.y = canvas.height / 2 - 15;
        this.xspeed = 5;
        this.yspeed = Math.floor(Math.random() * 6) + 2;
        this.boost = 1.07;
        this.color = '#fff';        
    }

    render(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, 25, 25);        
    }

    restart(a) {
        this.x = canvas.width / 2 - 15;
        this.y = canvas.height / 2 - 15;
        this.xspeed = a;
        this.yspeed = Math.floor(Math.random() * 6) + 2;
    }
};

// ракетки
class Paddle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.w = 20;
        this.h = 100;
        this.speed = 30;
        this.scores = 0;
        this.color = '#fff';
    }

    render(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    } 
};

// функция движения мяча
moveBall = () => {
    ball.x += ball.xspeed;
    ball.y += ball.yspeed;

    // отскок от верхней и нижней границы
    if(ball.y < 0 || ball.y >= (canvas.height - 20)) {
        ball.yspeed = -ball.yspeed;
    }

    // отскок от левой границы (гол первому игроку)
    if(ball.x < 0) {
        ball.xspeed = -ball.xspeed; // надо удалить
        player2.scores++;
        document.querySelector('.score-right').innerText = player2.scores;        
        ball.restart(5);
    }

    // отскок от правой границы (гол второму игроку)
    if(ball.x > (canvas.width - 8)) {
        ball.xspeed = -ball.xspeed; // надо удалить
        player1.scores++;
        document.querySelector('.score-left').innerText = player1.scores;
        ball.restart(-5);
    }

    // отскок от левой ракетки
    if(ball.x <= 20 && ball.y >= player1.y && ball.y <= player1.y + player1.h) {
        ball.xspeed = -ball.xspeed;
        ball.xspeed *= ball.boost;
        ball.yspeed *= ball.boost;
    } 

    // отскок от правой ракетки
    if(ball.x >= canvas.width - (30 + player2.w) && ball.y >= player2.y && ball.y <= player2.y + player2.h) {
        ball.xspeed = -ball.xspeed;
        ball.xspeed *= ball.boost;
        ball.yspeed *= ball.boost;
    }
    
    // установка партии до 15 очков
    if(player1.scores == winRate || player2.scores == winRate) {
        document.querySelector('.field-win').style.animation = "fadeIn .3s forwards";
        document.querySelector('.field-win').style.display = "flex";
        stop();
    }
}

// функция движения ракеток
movePlayer = (p, u, d) => {
    document.addEventListener('keydown', (e) => {
        if(e.keyCode == u && p.y / 2 > 0) {
            p.y -= p.speed;
        } else if(p.y / 2 < 0) {
            e.preventDefault();
        }

        if(e.keyCode == d && p.y + p.h < canvas.height) {
            p.y += p.speed;
        } else if(p.y + p.h > canvas.height) {
            e.preventDefault();
        }
    })
}

// запуск игры (итераций)
start = () => {
    draw();
    moveBall();
}

// основная функция инициализации всей игры
init = () => {
    // создание элементов
    ball = new Ball();
    player1 = new Paddle(0, canvas.height / 2 - 40);
    player2 = new Paddle(canvas.width - 20, canvas.height / 2 - 40);

    // установка нулевого счета (верстка)
    document.querySelector('.score-left').innerText = player1.scores;
    document.querySelector('.score-right').innerText = player2.scores;    

    // установка управления ракетками
    movePlayer(player1, 87, 83); // w, s
    movePlayer(player2, 38, 40); // arrow up, arrow down

    // запуск анимации
    var s = setInterval(start, 1000 / 60);

    // сброс поздравительного окна
    document.querySelector('.field-win').style.animation = null;
    document.querySelector('.field-win').style.display = "none";

    // остановка игры
    stop = () => {
        clearInterval(s);
    }
};
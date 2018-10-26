/*
===========================
PONG. Движок и механика игры
===========================
*/

var canvas: any = document.getElementById('pong');
var ctx: any = canvas.getContext('2d');

canvas.width = 1500;
canvas.height = 600;

var ball, player1, player2 :any;
var winRate: number = 15;

let draw = (): void => {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ball.render(ctx);
    player1.render(ctx);
    player2.render(ctx);
}

class Sprite {
    x: number;
    y: number;
    w: number;
    h: number;
    color: string = '#fff';

    render(ctx: any): void {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}

class Ball extends Sprite {
    xspeed: number;
    yspeed: number;
    boost: number;

    constructor() {
        super();
        this.x = canvas.width / 2 - 15;
        this.y = canvas.height / 2 - 15;
        this.xspeed = 5;
        this.yspeed = Math.floor(Math.random() * 6) + 2;
        this.boost = 1.07;
    }

    restart(a: number) :void {
        this.x = canvas.width / 2 - 15;
        this.y = canvas.height / 2 - 15;
        this.xspeed = a;
        this.yspeed = Math.floor(Math.random() * 6) + 2;
    }
}

class Paddle extends Sprite {
    speed: number;
    scores: number;

    constructor(x: number, y: number) {
        super();
        this.x = x;
        this.y = y;
        this.w = 20;
        this.h = 100;
        this.speed = 30;
        this.scores = 0;
        this.color = '#fff';
    }
}

let moveBall = (): void => {
    ball.x += ball.xspeed;
    ball.y += ball.yspeed;

    if(ball.y < 0 || ball.y >= (canvas.height - 20)) {
        ball.yspeed = -ball.yspeed;
    }

    if(ball.x < 0) {
        ball.xspeed = -ball.xspeed;
        player2.scores++;
        document.querySelector('.score-right').innerHTML = player2.scores;
        ball.restart(5);
    }

    if(ball.x > (canvas.width - 8)) {
        ball.xspeed = -ball.xspeed;
        player1.scores++;
        document.querySelector('.score-left').innerHTML = player1.scores;
        ball.restart(-5);
    }

    if(ball.x <= 20 && ball.y >= player1.y && ball.y <= player1.y + player1.h) {
        ball.xspeed = -ball.xspeed;
        ball.xspeed *= ball.boost;
        ball.yspeed *= ball.boost;
    } 
    
    if(ball.x >= canvas.width - (30 + player2.w) && ball.y >= player2.y && ball.y <= player2.y + player2.h) {
        ball.xspeed = -ball.xspeed;
        ball.xspeed *= ball.boost;
        ball.yspeed *= ball.boost;
    }
        
    if(player1.scores == winRate || player2.scores == winRate) {
        (<HTMLElement>document.querySelector('.field-win')).style.animation = "fadeIn .3s forwards";
        (<HTMLElement>document.querySelector('.field-win')).style.display = "flex";
        stop();
    }        
}

let movePlayer = (p: object, u: number, d: number): void => {
    document.addEventListener('keydown', (e: any) => {
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

let start = (): void => {
    draw();
    moveBall();
}

let init = (): void => {
    ball = new Ball();
    player1 = new Paddle(0, canvas.height / 2 - 40);
    player2 = new Paddle(canvas.width - 20, canvas.height / 2 - 40);

    document.querySelector('.score-left').innerHTML = player1.scores;
    document.querySelector('.score-right').innerHTML = player2.scores;    
    
    movePlayer(player1, 87, 83);
    movePlayer(player2, 38, 40);
    
    let s = setInterval(start, 1000 / 60);
    
    (<HTMLElement>document.querySelector('.field-win')).style.animation = null;
    (<HTMLElement>document.querySelector('.field-win')).style.display = "none";
    
    let stop = (): void => {
        clearInterval(s);
    }
}
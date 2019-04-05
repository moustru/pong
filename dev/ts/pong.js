/*
===========================
PONG. Движок и механика игры
===========================
*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var canvas = document.getElementById('pong');
var ctx = canvas.getContext('2d');
canvas.width = 1500;
canvas.height = 600;
var ball, player1, player2;
var winRate = 15;
var draw = function () {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ball.render(ctx);
    player1.render(ctx);
    player2.render(ctx);
};
var Sprite = /** @class */ (function () {
    function Sprite() {
        this.color = '#fff';
    }
    Sprite.prototype.render = function (ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    };
    return Sprite;
}());
var Ball = /** @class */ (function (_super) {
    __extends(Ball, _super);
    function Ball() {
        var _this = _super.call(this) || this;
        _this.x = canvas.width / 2 - 15;
        _this.y = canvas.height / 2 - 15;
        _this.w = 20;
        _this.h = 20;
        _this.xspeed = 5;
        _this.yspeed = Math.floor(Math.random() * 6) + 2;
        _this.boost = 1.07;
        return _this;
    }
    Ball.prototype.restart = function (a) {
        this.x = canvas.width / 2 - 15;
        this.y = canvas.height / 2 - 15;
        this.xspeed = a;
        this.yspeed = Math.floor(Math.random() * 6) + 2;
    };
    return Ball;
}(Sprite));
var Paddle = /** @class */ (function (_super) {
    __extends(Paddle, _super);
    function Paddle(x, y) {
        var _this = _super.call(this) || this;
        _this.x = x;
        _this.y = y;
        _this.w = 20;
        _this.h = 100;
        _this.speed = 30;
        _this.scores = 0;
        _this.color = '#fff';
        return _this;
    }
    return Paddle;
}(Sprite));
var moveBall = function () {
    ball.x += ball.xspeed;
    ball.y += ball.yspeed;
    if (ball.y < 0 || ball.y >= (canvas.height - 20)) {
        ball.yspeed = -ball.yspeed;
    }
    if (ball.x < 0) {
        ball.xspeed = -ball.xspeed;
        player2.scores++;
        document.querySelector('.score-right').innerHTML = player2.scores;
        ball.restart(5);
    }
    if (ball.x > (canvas.width - 8)) {
        ball.xspeed = -ball.xspeed;
        player1.scores++;
        document.querySelector('.score-left').innerHTML = player1.scores;
        ball.restart(-5);
    }
    if (ball.x <= 20 && ball.y >= player1.y && ball.y <= player1.y + player1.h) {
        ball.xspeed = -ball.xspeed;
        ball.xspeed *= ball.boost;
        ball.yspeed *= ball.boost;
    }
    if (ball.x >= canvas.width - (30 + player2.w) && ball.y >= player2.y && ball.y <= player2.y + player2.h) {
        ball.xspeed = -ball.xspeed;
        ball.xspeed *= ball.boost;
        ball.yspeed *= ball.boost;
    }
    if (player1.scores == winRate || player2.scores == winRate) {
        document.querySelector('.field-win').style.animation = "fadeIn .3s forwards";
        document.querySelector('.field-win').style.display = "flex";
        stop();
    }
};
var movePlayer = function (p, u, d) {
    document.addEventListener('keydown', function (e) {
        if (e.keyCode == u && p.y / 2 > 0) {
            p.y -= p.speed;
        }
        else if (p.y / 2 < 0) {
            e.preventDefault();
        }
        if (e.keyCode == d && p.y + p.h < canvas.height) {
            p.y += p.speed;
        }
        else if (p.y + p.h > canvas.height) {
            e.preventDefault();
        }
    });
};
var start = function () {
    draw();
    moveBall();
};
var init = function () {
    ball = new Ball();
    player1 = new Paddle(0, canvas.height / 2 - 40);
    player2 = new Paddle(canvas.width - 20, canvas.height / 2 - 40);
    document.querySelector('.score-left').innerHTML = player1.scores;
    document.querySelector('.score-right').innerHTML = player2.scores;
    movePlayer(player1, 87, 83);
    movePlayer(player2, 38, 40);
    var s = setInterval(start, 1000 / 60);
    document.querySelector('.field-win').style.animation = null;
    document.querySelector('.field-win').style.display = "none";
    var stop = function () {
        clearInterval(s);
    };
};

var p1;
var p2;

var p1Score = 0;
var p2Score = 0;

var ball;

function setup() {
  createCanvas(640, 480);
  vel_ = createVector(random(-10, 10), random(-1, 1)).normalize();
  ball = new Ball(vel_);
  p1 = new Player(24);
  p2 = new Player(width - 24);
}

function draw() {
  background(0);
  ball.update();
  p1.update();
  p2.update(); 
  
  if(keyIsDown(87)){
    p1.move(1);
  }
  if(keyIsDown(83)){
    p1.move(-1);
  }
  if(keyIsDown(38)){
    p2.move(1);
  }
  if(keyIsDown(40)){
    p2.move(-1);
  }
  
  textSize(72);
  text(p1Score, ((width / 2) - 100), 100);
  text(p2Score, ((width / 2) + 100), 100);
  
  stroke(255);
  strokeWeight(16);
  line(0, 24, width, 24);
  line(0, height - 24, width, height - 24);
  strokeWeight(1);
  line(width / 2, 24, width / 2, height - 24);
}

function Player(x_){
  this.w = 15;
  this.h = 50;
  this.speed = 7;
  
  this.pos = createVector(x_, height / 2);
  
  this.move = function(y_){
    this.pos.y -= (y_ * this.speed);
    if(this.pos.y <= 32 + (this.h / 2))
      this.pos.y = 32 + (this.h / 2);
    if(this.pos.y >= height - 32 - (this.h / 2))
      this.pos.y = height - 32 - (this.h / 2);
  }
  
  this.update = function(){
    fill(255);
    noStroke();
    rect(this.pos.x - (this.w / 2), this.pos.y - (this.h / 2), this.w, this.h);
  }
}

function Ball(vel_){
  this.w = 10;
  this.speed = 5;
  this.pos = createVector(width / 2, height / 2);
  this.vel = vel_;
  
  this.newBall = function(s_){
    if(s_ < 0){
      vel_ = createVector(random(-5, -1), random(-1, 1)).normalize();
    } else {
      vel_ = createVector(random(1, 5), random(-1, 1)).normalize();
    }
    ball = new Ball(vel_);
  }
  
  this.move = function(){
    this.pos.add(p5.Vector.mult(this.vel, this.speed));
    if(this.pos.y + (this.w / 2) >= height - 32 || this.pos.y - (this.w / 2) <= 32){
      this.vel.y *= -1;
    }
    if(this.pos.x - (this.w / 2) <= 0){
      this.newBall(-1);
      p2Score++;
    }
    if(this.pos.x + (this.w / 2) >= width){
      this.newBall(1);
      p1Score++;
    }
  }
  
  this.update = function(){
    this.move();
    fill(255);
    noStroke();
    rect(this.pos.x - (this.w / 2), this.pos.y - (this.w / 2), this.w, this.w); 
  }
}
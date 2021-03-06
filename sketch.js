let bump;
let chase;
let words;
let block;
let stage = [];
let flakes = [];
let character;
let dog;
let x = 0;
let ground;
let poof = [];
let won = false;

function preload() {
  dog = loadImage('corgi-test.jpg')
}

function setup() {
  createCanvas(1440,750);
  ground = 420
  bump = new floor(150,100,75,50,2.5);
  chase = new Deer(2000,400,3);
  words = new Instructions(25,620);
  block = new Obstacle(1000,495,5);
  frameRate(240);
  fill(0);
}

function keyPressed() {
  if (key == ' ') {
    let jump = createVector(0, -7);
    character.applyForce(jump);
  }
}

function draw() {
  if (won==false){
  //creates character on screen
  print("character"+character.x);
  print("chase"+chase.x);
  background(189,251,255);

//-character.pos.x makes the background move and the character stay in the same position
   translate(-character.pos.x+50, 0); //changes the origin point of the screen (helpful for moving games)
//  using a keyPressed function, you can implement different ways for the character to move

let gravity = createVector(0, 0.5);
  noStroke();
  stroke(0);
  strokeWeight(5);
  noFill();
  push();
  block.drawStump();
  block.ApproachingObstacle();

  if (keyIsDown(RIGHT_ARROW)){
    if (frameCount % 250 == 0) {
      let b = new Background(1600,100,10,0.75,1);
      stage.push(b);
      }
    }
  for (let i = 0; i < stage.length; i++) {
          stage[i].drawboulder();
          stage[i].drawtree();
          stage[i].moveforward();
  }
  pop();
  fill(255);
  chase.drawDeer();
  chase.runDeer();
  character.applyForce(gravity);
  character.update();
  character.edges();
  character.display();
  push();
  if (frameCount % 8 == 0) {
      let s = new Snow(random(0,width),0,3);
      flakes.push(s);
    }
    for (let i = 0; i < flakes.length; i++) {
  	 	      flakes[i].drawFlake();
         	  flakes[i].moveFlake();
  	  }
  pop();
  push();
  if (frameCount % 8 == 0) {
      let d = new Movement(60,483,5);
      poof.push(d);
    }
    for (let i = 0; i < poof.length; i++) {
  	 	      poof[i].dust();
  	  }
  pop();
  fill(130,120,90);
  rect(0,495,width,height);
  fill(255);
  rect(-5,495,1450,45);
  words.beginning();
  words.chase();
  push();
for(let i=0; i<7; i++){
  bump.drawfloor();
  translate(225,0);
}
  pop();
  chase.catchDeer();
  bump.movingRight();
  bump.movingLeft();
  bump.switchdirection();
  bump.switchback();
  }
}

// Daniel Shiffman
// https://www.kadenze.com/courses/the-nature-of-code
// http://natureofcode.com/
// Session 2: Array of Particles, multiple forces

function Corgi(x, y) {
  this.pos = createVector(x, y);
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);

  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.update = function() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
  }

  this.display = function() {
    fill(255, 150);
    stroke(0);
    image(dog, this.pos.x, this.pos.y, 100, 80);
  }

  this.edges = function() {
    if (this.pos.y > ground) {
      this.vel.y *= 0;
      this.pos.y = ground;
    }
     if (this.pos.x >= 500 && this.pos.x <= 660) {
      ground = 180;
    }
   if (this.pos.x >= 680 && this.pos.x <= 840) {
     ground = 70;
   }
   if (this.pos.x >= 860 && this.pos.x <= 1020) {
    ground = 220;
  }
  else if (this.pos.x > 1020) {
    ground = 280;
  }
  }
   }



// function obstacles(obstacleWidth, obstacleHeight) {
//   //https://www.youtube.com/watch?v=cXgA1d_E-jY
//   fill(80);
//   rect(540, 260, obstacleWidth, obstacleHeight);
//   rect(720, 150, obstacleWidth, obstacleHeight);
//   rect(900, 300, obstacleWidth, obstacleHeight);
// }

class floor{

constructor (w,h,a,b,move){
this.w = w;
this.h = h;
this.a = a;
this.b = b;
this.move = move;
}

drawfloor(){
  arc(25,530,this.w,this.h,0,PI,OPEN);
  arc(138,530,this.a,this.b,0,PI,OPEN);
}

movingRight(){
  if (keyIsDown(RIGHT_ARROW)){
    if (this.b<=75){
      this.h=this.h-this.move;
      this.b=this.b+this.move;
      this.w=this.w-3*this.move;
      this.a=this.a+3*this.move;
    }
  }
}

movingLeft(){
  if (keyIsDown(LEFT_ARROW)){
    if (this.b<=75){
      this.h=this.h+this.move;
      this.b=this.b-this.move;
      this.w=this.w+3*this.move;
      this.a=this.a-3*this.move;
    }
  }
}

switchdirection(){
  if (this.h<=75){
    this.move=-this.move;
  }
}

switchback(){
  if (this.h>100){
    this.move=-this.move;
    }
  }
}



class Background{

  constructor (x,y,speed,scale,shift){
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.scale = scale;
    this.shift = shift;
  }

  drawboulder(){
    push();
    fill(180,205,255);
    arc(this.x+600,493,300,500,PI,0,OPEN);
    fill(255);
    for(let i=0; i<=5; i++){
    arc(this.x+500,300,40,35,0,PI,OPEN);
    translate(40,0);
  }
    arc(this.x+360,300,240,115,PI,0,OPEN);
    pop();
  }

  drawtree(){
    fill(200,150,230);
    ellipse(this.x+145,325,75,60);
    ellipse(this.x+185,305,75,60);
    noStroke();
    fill(205,185,144);
    quad(this.x+52,493,this.x+70,493,this.x+100,350,this.x+95,350);
    quad(this.x+148,493,this.x+130,493,this.x+100,350,this.x+105,350);
    triangle(this.x+60,493,this.x+100,350,this.x+140,493); //bottom trunk fill
    quad(this.x-100,345,this.x-100,325,this.x,380,this.x,403);
    quad(this.x,380,this.x,403,this.x+60,382,this.x+40,379); //left branch fill
    quad(this.x,350,this.x+25,340,this.x+60,370,this.x+20,370);
    quad(this.x+60,382,this.x+20,379,this.x+50,353,this.x+70,360); //second left branch fill
    quad(this.x+60,382,this.x+80,395,this.x+90,350,this.x+70,360);
    triangle(this.x+70,420,this.x+100,410,this.x+85,320);
    quad(this.x+75,325,this.x+95,328,this.x+120,380,this.x+130,455); //top trunk fill
    quad(this.x+100,345,this.x+105,330,this.x+115,345,this.x+116,370); //second right branch fill
    quad(this.x+110,355,this.x+115,380,this.x+190,390,this.x+210,374);
    quad(this.x+210,374,this.x+182,372,this.x+231,280,this.x+265,265); //right branch fill
    stroke(0);
    noFill();
    beginShape();
    curveVertex(this.x,495);
    curveVertex(this.x+40,495);
    curveVertex(this.x+60,475);
    curveVertex(this.x+75,400);
    curveVertex(this.x+80,380);
    endShape();
    beginShape();
    curveVertex(this.x+200,495);
    curveVertex(this.x+160,495);
    curveVertex(this.x+140,475);
    curveVertex(this.x+120,380);
    curveVertex(this.x+115,340);
    endShape(); //Base of trunk
    beginShape();
    curveVertex(this.x+85,380);
    curveVertex(this.x+75,400);
    curveVertex(this.x+60,380);
    curveVertex(this.x,400);
    curveVertex(this.x-100,345);
    curveVertex(this.x-120,325);
    endShape();
    beginShape();
    curveVertex(this.x+85,360);
    curveVertex(this.x+40,370);
    curveVertex(this.x,380);
    curveVertex(this.x-100,325);
    curveVertex(this.x-120,305);
    endShape(); //Far left branch
    beginShape();
    curveVertex(this.x+42,380);
    curveVertex(this.x+40,370);
    curveVertex(this.x+15,365);
    curveVertex(this.x,350);
    curveVertex(this.x+5,355);
    endShape();
    beginShape();
    curveVertex(this.x+77,365);
    curveVertex(this.x+80,358);
    curveVertex(this.x+68,360);
    curveVertex(this.x+55,356);
    curveVertex(this.x+35,353);
    curveVertex(this.x+25,340);
    curveVertex(this.x+25,345);
    endShape(); //Second from left branch
    beginShape();
    curveVertex(this.x+80,360);
    curveVertex(this.x+80,358);
    curveVertex(this.x+82,345);
    curveVertex(this.x+75,325);
    curveVertex(this.x+90,320);
    endShape();
    beginShape();
    curveVertex(this.x+90,318);
    curveVertex(this.x+95,328);
    curveVertex(this.x+100,343);
    curveVertex(this.x+106,332);
    curveVertex(this.x+110,330);
    endShape()
    beginShape();
    curveVertex(this.x+115,360);
    curveVertex(this.x+115,355);
    curveVertex(this.x+116,345);
    curveVertex(this.x+105,320);
    endShape(); //Top part of trunk
    beginShape();
    curveVertex(this.x+115,390);
    curveVertex(this.x+120,380);
    curveVertex(this.x+200,385);
    curveVertex(this.x+245,300);
    curveVertex(this.x+275,270);
    curveVertex(this.x+300,245);
    endShape();
    beginShape();
    curveVertex(this.x+115,360);
    curveVertex(this.x+115,355);
    curveVertex(this.x+130,360);
    curveVertex(this.x+185,365);
    curveVertex(this.x+220,295);
    curveVertex(this.x+220,330);
    endShape(); //Right branch
    fill(221,151,229);
    ellipse(this.x+15,310,100,85); //Bottom left poof
    fill(235,160,240);
    ellipse(this.x+300,150,175,150); //Far right poof
    fill(235,190,240);
    ellipse(this.x+100,175,400,300); //Main poof
    fill(230,195,250);
    ellipse(this.x+250,225,125,115); //Second from right poof
    fill(235,200,240);
    ellipse(this.x-75,250,250,200); //Far left poof
    ellipse(this.x-10,170,145,125); //Second from left poof
  }

  moveforward(){
    if (keyIsDown(RIGHT_ARROW)){
      this.x = this.x-this.speed;
      this.shift=this.shift/10;
    }
  if (keyIsDown(LEFT_ARROW)){
    this.x = this.x+this.speed;
  }
}
}

  class Snow {

  	constructor(x,y,speed){
  		this.x = x;
      		this.y = y;
          	this.speed = speed;
  	}

  	drawFlake(){
    noStroke();
    fill(255);
  	ellipse(this.x,this.y,15,15);
  	}

  	moveFlake(){
  		this.x = this.x+.5;
  		this.y = this.y+this.speed;
  	}
  }

  class Deer {

    constructor(x,y,speed){
     this.x = x;
        this.y = y;
          this.speed = speed;
    }

    drawDeer(){
      push();
      fill(255);
      rect(this.x,this.y,125,75);
      noFill();
      strokeWeight(3);
      textSize(30);
      text('Deer',this.x+25,this.y+40);
      pop();
    }

    runDeer(){
      if (keyIsDown(RIGHT_ARROW)){
        if (this.x <= 1000);
          if (keyIsDown(SHIFT)){
            this.x = this.x - 2*this.speed;
          }
        else{
          this.x = this.x - this.speed;
        }
      }
      if (keyIsDown(LEFT_ARROW)){
        this.x = this.x+this.speed;
      }
    }

    catchDeer(){
      if (this.x <= 0){
        background(255);
        fill(0);
        stroke(0);
        textSize(100);
        text('YOU WIN', 500, 300);
        print('YOU WIN');
      }
    }

  }

  class Obstacle {

    constructor(x,y,speed){
      this.x = x;
        this.y = y;
          this.speed = speed;
    }

    drawStump(){
      push();
      fill(125,95,50);
      noStroke();
      triangle(this.x+40,this.y,this.x+60,this.y,this.x+75,this.y-50);
      triangle(this.x+160,this.y,this.x+140,this.y,this.x+128,this.y-50);
      quad(this.x+60,this.y,this.x+140,this.y,this.x+140,this.y-50,this.x+60,this.y-50);
      stroke(0);
      fill(205,185,144);
      ellipse(this.x+100,this.y-50,80,30);
      noFill();
      beginShape();
      curveVertex(this.x,this.y);
      curveVertex(this.x+40,this.y);
      curveVertex(this.x+55,this.y-20);
      curveVertex(this.x+60,this.y-50);
      curveVertex(this.x+70,this.y-115);
      endShape();
      beginShape();
      curveVertex(this.x+200,this.y);
      curveVertex(this.x+160,this.y);
      curveVertex(this.x+145,this.y-20);
      curveVertex(this.x+140,this.y-50);
      curveVertex(this.x+125,this.y-115);
      endShape();
      pop();
    }

    drawPile(){
      push();
      arc(this.x,this.y,)
      pop();
    }

    ApproachingObstacle(){
      if (keyIsDown(RIGHT_ARROW)){
        this.x = this.x-this.speed;
      }
    if (keyIsDown(LEFT_ARROW)){
      this.x = this.x+this.speed;
    }
  }
    }

  class Instructions{

    constructor(x,y){
      this.x = x;
        this.y = y;
    }

      beginning(){
        if (chase.x>=1000){
        push();
        strokeWeight(5);
        textFont('Courier New');
        textSize(32);
        textStyle(BOLD);
        fill(255);
        text('Instructions~',this.x+25,this.y);
        text('Objective: Catch the deer!',this.x+25,this.y+50);
        text('Controls: Right --> = Move Forward, Left --> = Move Back, Space = Jump',this.x+25,this.y+100)
        pop();
      }
    }

      chase(){
        if (chase.x<1000){
          push();
          strokeWeight(5);
          textFont('Courier New');
          textSize(42);
          textStyle(BOLD);
          fill(255);
          text('CATCH THE DEER!(Press Shift for a temporary speed boost)',this.x,this.y+50);
          pop();
        }
      }

  }

  class Movement{

    constructor(x,y,speed){
      this.x = x;
        this.y = y;
          this.speed = speed;
    }

    dust(){
      if (keyIsDown(RIGHT_ARROW)){
      push();
      fill(255);
      arc(this.x+7,this.y+2,25,25,0,PI+QUARTER_PI,OPEN);
      arc(this.x,this.y,25,25,HALF_PI,0,OPEN);
      arc(this.x+12,this.y+3,15,15,PI,0,OPEN);
      arc(this.x-9,this.y+6,12,12,0,PI+QUARTER_PI,OPEN);
      pop();
      }
    }

  }

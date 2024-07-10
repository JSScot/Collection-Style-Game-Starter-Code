//Move the catcher with the left and right arrow keys to catch the falling objects. 

/* VARIABLES */
let catcher, fallingObject;

/* PRELOAD LOADS FILES */
function preload(){
  
}

/* SETUP RUNS ONCE */
function setup() {
  createCanvas(400,400);
  
  //Create catcher 
  catcher = new Sprite(200,380,100,20);
  catcher.color = color(95,158,160);
  
  //Create falling object
  fallingObject = new Sprite(100,0,10);
  fallingObject.color = color(0,128,128);
  fallingObject.vel.y=2;

}

/* DRAW LOOP REPEATS */
function draw() {
  background(224,224,224);
  // Draw directions to screen
  fill(0);
  textSize(12);
  text("Move the \ncatcher with the \nleft and right \narrow keys to \ncatch the falling \nobjects.", width-100, 20);

  //if falling obj reaches bottom, move back to top
  if(fallingObject.y>=height+10)
  {
    fallingObject.y=0;
    fallingObject.x= random(width-30);
    fallingObject.vel.y=random(5,15);
  }

  
  
}
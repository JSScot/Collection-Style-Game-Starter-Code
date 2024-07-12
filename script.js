//Move the catcher with the left and right arrow keys to catch the falling objects. 

/* VARIABLES */
let catcher, fallingObject;
let score=0;
let bgImage,catchImage,fallImage;
let raspB, lemon, peach, straw,cherry,banana;
let fruit;
//fonts
let myFont;
let start = false;
let myFont2;
//velocity of falling objects
let minVel=4;
let maxVel=12;
let rules ="Use the \narrow keys to \ncatch 20 fruits \n\nLEMONS ARE BAD\nlet them drop"

/* PRELOAD LOADS FILES */
function preload(){
  bgImage = loadImage("assets/flowers.jpg")
  catchImage = loadImage("assets/basket.jpg")
  //falling object images
  raspB = loadImage("assets/raspberry.jpg")
  lemon = loadImage("assets/lemon.jpg")
  peach = loadImage("assets/peach.jpg")
  straw = loadImage("assets/strawberry.jpg")
  cherry = loadImage("assets/cherry.jpg")
  banana = loadImage("assets/banana.jpg")
  myFont = loadFont("fonts/Handjet-VariableFont_ELGR,ELSH,wght.ttf")
  myFont2 = loadFont("fonts/PixelifySans-VariableFont_wght.ttf")
}

/* SETUP RUNS ONCE */
function setup() {
  createCanvas(400,400);

  fruits = [raspB,lemon,peach,cherry,straw,banana]
  
 
  //Create catcher 
  catcher = new Sprite(catchImage,200,360,100,6,"k");
  catcher.color = color(95,158,160);
  //resize image
  catchImage.resize(100,150)
  
  //Create falling object
  fallingObject = new Sprite(raspB,100,0,10);
  fallingObject.color = color(0,128,128);
  fallingObject.rotationLock = true;
  fallingObject.vel.y=0;
  raspB.resize(60,30)
  lemon.resize(50,50)
  peach.resize(50,50)
  straw.resize(35,35)
  cherry.resize(35,45)
  banana.resize(65,55)
  

  
  
}

/* DRAW LOOP REPEATS */
function draw() {
  background(bgImage)

  if(start==false)
  {
    textAlign(CENTER);
    textSize(20);
    stroke("white");
    strokeWeight(10);
    textFont(myFont2);
    text("click to start", width / 2, height / 2);
  }

  if(mouseIsPressed)
    {
      if(start==false)
      fallingObject.vel.y=3;
      start = true;
      
    }
  //if falling obj reaches bottom, move back to top
  if(fallingObject.y>=height+10)
  {
    if(fallingObject.image==lemon)
      {
        //doesn't affect store if you drop lemon
        fallingObject.y=0;
        fallingObject.image=random(fruits)
        fallingObject.x= random(300,width-30);
        fallingObject.vel.y=random(minVel,maxVel);
      }
    else
    {
    score--
    fallingObject.y=0;
    fallingObject.image=random(fruits)
    fallingObject.x= random(300,width-30);
    fallingObject.vel.y=random(minVel,maxVel);
    }
  }

  //move catcher
  if(kb.pressing("left"))
  {
    catcher.vel.x= -10
  }
  else if (kb.pressing("right"))
    {
      catcher.vel.x= 10
    }
  else
  {
    catcher.vel.x= 0
  }
//stop catch at edge
  if(catcher.x<50)
  {
    catcher.x=50;
  }
  else if (catcher.x>350)
  {
    catcher.x=350;
  }

  //if falling object collides with catcher,goes back to top in raondom position
  if(fallingObject.collides(catcher))
  {
    if(fallingObject.image==lemon)
    {
      //takes off a point for lemons
      score--
      fallingObject.y=0;
      //random fruit
      fallingObject.image=random(fruits)
      fallingObject.x= random(width-30);
      fallingObject.vel.y=random(minVel,maxVel);
      fallingObject.direction="down"
    }
    else{
    
    fallingObject.y=0;
      //random fruit
    fallingObject.image=random(fruits)
    fallingObject.x= random(width-30);
    fallingObject.vel.y=random(minVel,maxVel);
    fallingObject.direction="down"
    //increases score
    score++
    }
  }
  

  if(score<0)
  {
    //moves catcher and object off screen
    noStroke()
    catcher.pos={x:-100,y:-100}
    fallingObject.pos={x:-250,y:-250}
    //losing screen
    textAlign(CENTER)
    textSize(30)
    textFont(myFont)
    stroke("white")
    strokeWeight(10)
    text("Do better",width/2,height/2)
    textSize(20)
    stroke("white")
    strokeWeight(5)
    text("Click to restart", width/2, height/2+50);
     restart();
  }
  else if(score==20)
  {
   youWin()
  }
  else
  {
    //displays score
    textAlign(LEFT)
    textSize(20)
    //textFont()
    stroke("white")
    strokeWeight(10)
    textFont(myFont2)
    text("Score = "+ score,10,40)
    // Draw directions to screen
    fill(0);
    noStroke()
    textSize(15);
    textFont(myFont2)
    text(rules, width-120, 20);
    
  }

  //allSprites.debug=mouse.pressing()
  
}

/* Functions*/

function youWin()
{
    //moves catcher and object off screen
    catcher.pos={x:-100,y:-100}
    fallingObject.pos={x:-250,y:-250}
    //winning screen
    textAlign(CENTER)
    textSize(30)
    stroke("white")
    strokeWeight(10)
    textFont(myFont)
    text("Goal Reached!",width/2,height/2)
    textSize(20)
    stroke("white")
    strokeWeight(5)
    text("click to restart", width/2, height/2+50);
  restart();
}

function restart()
{
  if(mouseIsPressed)
    {
      score=0
      catcher.pos={x:200,y:360}
      fallingObject.pos={x:100,y:0}
      fallingObject.vel.y=6
    }
}

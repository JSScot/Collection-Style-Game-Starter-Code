//Move the catcher with the left and right arrow keys to catch the falling objects. 

/* VARIABLES */
let catcher, fallingObject;
let score=0;
let bgImage,catchImage,fallImage;
let myFont;
let myFont2;
let rules ="Move the \nbasket with \nthe left and \nright arrow \nkeys to catch\n 20 raspberries."

/* PRELOAD LOADS FILES */
function preload(){
  bgImage = loadImage("assets/flowers.jpg")
  catchImage = loadImage("assets/basket.jpg")
  fallImage = loadImage("assets/raspberry.jpg")
  myFont = loadFont("fonts/Handjet-VariableFont_ELGR,ELSH,wght.ttf")
  myFont2 = loadFont("fonts/PixelifySans-VariableFont_wght.ttf")
}

/* SETUP RUNS ONCE */
function setup() {
  createCanvas(400,400);
  
 
  //Create catcher 
  catcher = new Sprite(catchImage,200,360,100,6,"k");
  catcher.color = color(95,158,160);
  //resize image
  catchImage.resize(100,150)
  
  //Create falling object
  fallingObject = new Sprite(fallImage,100,0,10);
  fallingObject.color = color(0,128,128);
  fallingObject.rotationLock = true;
  fallingObject.vel.y=6;
  fallImage.resize(60,30)
  
  
}

/* DRAW LOOP REPEATS */
function draw() {
  background(bgImage)


  //if falling obj reaches bottom, move back to top
  if(fallingObject.y>=height+10)
  {
    score--
    fallingObject.y=0;
    fallingObject.x= random(300,width-30);
    fallingObject.vel.y=random(10,20);
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
    fallingObject.y=0;
    fallingObject.x= random(width-30);
    fallingObject.vel.y=random(10,20);
    fallingObject.direction="down"
    //increases score
    score++
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

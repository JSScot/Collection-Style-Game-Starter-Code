//Move the catcher with the left and right arrow keys to catch the falling objects. 

/* VARIABLES */
let catcher, fallingObject;
let score=0;
let rules ="Move the \ncatcher with the \nleft and right \narrow keys to \ncatch the falling \nobjects."

/* PRELOAD LOADS FILES */
function preload(){
  
}

/* SETUP RUNS ONCE */
function setup() {
  createCanvas(400,400);
  
  //Create catcher 
  catcher = new Sprite(200,380,100,20,"k");
  catcher.color = color(95,158,160);
  
  //Create falling object
  fallingObject = new Sprite(100,0,10);
  fallingObject.color = color(0,128,128);
  fallingObject.vel.y=2;
  

}

/* DRAW LOOP REPEATS */
function draw() {
  background(224,224,224);

  

  //if falling obj reaches bottom, move back to top
  if(fallingObject.y>=height+10)
  {
    score--
    fallingObject.y=0;
    fallingObject.x= random(width-30);
    fallingObject.vel.y=random(5,10);
  }

  //move catcher
  if(kb.pressing("left"))
  {
    catcher.vel.x= -6
  }
  else if (kb.pressing("right"))
    {
      catcher.vel.x= 6
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
    fallingObject.vel.y=random(5,10);
    fallingObject.direction="down"
    //increases score
    score++
  }
  

  if(score<0)
  {
    //moves catcher and object off screen
    catcher.pos={x:-100,y:-100}
    fallingObject.pos={x:-250,y:-250}
    //losing screen
    textAlign(CENTER)
    textSize(30)
    text("Do better",width/2,height/2)
    textSize(20)
    text("Reload to start", width/2, height/2+50);
  }
  else if(score==10)
  {
   youWin()
  }
  else
  {
    //displays score
    textSize(20)
    text("Score = "+ score,10,40)
    // Draw directions to screen
    fill(0);
    textSize(13);
    text(rules, width-100, 20);
    
  }
  
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
    text("Goal Reached!",width/2,height/2)
    textSize(20)
    text("click to restart", width/2, height/2+50);
  restart();
}

function restart()
{
  /*if(mouseIsPressed)
    {
      score=0
      catcher.pos={x:200,y:380}
      fallingObject.pos={x:100,y:0}
      fallingObject.vel.y=2
      //displays score
      textSize(20)
      text("Score = "+ score,10,40)
      // Draw directions to screen
      fill(0);
      textSize(13);
      text(rules, width-100, 20);
    }*/
  
}
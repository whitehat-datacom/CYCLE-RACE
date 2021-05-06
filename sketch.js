var path,mainCyclist;
var player1,player2,player3;
var pathImg,mainRacerImg1,mainRacerImg2;

var oppPink1Img,oppPink2Img;
var oppYellow1Img,oppYellow2Img;
var oppRed1Img,oppRed2Img;
var gameOverImg,cycleBell;

var pinkCG, yellowCG,redCG; 

var cycleboy1,cycleboy2,fallencycle;
var cycleboy1img,cycleboy2img,fallencycleanm;
var END =0;
var PLAY =1;
var START=2;
var gameState = PLAY;

var distance=0;
var gameOver, restart,restartimg;
var backg,backimg,start,startimg;
function preload(){
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadAnimation("images/mainPlayer3.png");
  
  oppPink1Img = loadAnimation("images/opponent1.png","images/opponent2.png");
  oppPink2Img = loadAnimation("images/opponent3.png");
  
  oppYellow1Img = loadAnimation("images/opponent4.png","images/opponent5.png");
  oppYellow2Img = loadAnimation("images/opponent6.png");
  
  oppRed1Img = loadAnimation("images/opponent7.png","images/opponent8.png");
  oppRed2Img = loadAnimation("images/opponent9.png");
  
  cycleBell = loadSound("sound/bell.mp3");
  gameOverImg = loadImage("images/gameOver.png");
  
  cycleboy1img=loadImage("cyclerboy.png");
  restartimg=loadImage("reset button.png")
  cycleboy2img=loadImage("cyclerboy1.png")
  
  backgroundimg=loadImage("racing background.jpg");
  startimg=loadImage("start button.png")
}

function setup(){
  
createCanvas(windowWidth,windowHeight);
  /*backg=createSprite(600,150);
  backg.addImage(backgroundimg);
  backg.scale=2;
  backg.visible=false;
  
  start=createSprite(600,250);
  start.addImage(startimg);
  start.scale=0.3;
  start.visible=false;
  if(gameState===START){
    backg.visible=true;
    start.visible=true;
    if(mousePressedOver(start)){
      gameState=PLAY;
    }*/
  
  //if(gameState===PLAY){
    //backg.visible=false;
    //start.visible=false;
// Moving background
path=createSprite(width-100,height-150);
path.addImage(pathImg);
path.velocityX = -5;

//creating boy running
mainCyclist  = createSprite(70,150);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.07;
mainCyclist.debug=false;
//set collider for mainCyclist
mainCyclist.setCollider("rectangle",70,20,1200,1300);
  
gameOver = createSprite(width-650,height-150);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.8;
gameOver.visible = false;  

restart=createSprite(width-650,height-250);
restart.addImage(restartimg);
restart.scale=0.3;
restart.visible=false;
    
pinkCG = new Group();
yellowCG = new Group();
redCG = new Group();
cycleboy1G=new Group();
cycleboy2G=new Group();

}

function draw() {
  background(0);
  
  drawSprites();
  
  textSize(20);
  fill(255);
  text("Distance: "+ distance,width-900,height-30);
  
  if(gameState===PLAY){
    
   distance = distance + Math.round(getFrameRate()/50);
   path.velocityX = -(6 + 2*distance/150);
  
   mainCyclist.y = World.mouseY;
  
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
  
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
  
    //code to play cycle bell sound
  if(keyDown("space")) {
    cycleBell.play();
  }
  
  //creating continous opponent players
  var select_oppPlayer = Math.round(random(1,5));
  
  if (World.frameCount % 150 == 0) {
    if (select_oppPlayer == 1) {
      pinkCyclists();
    } else if (select_oppPlayer == 2) {
      yellowCyclists();
    } else if (select_oppPlayer==3){
      redCyclists();
    }
    else if (select_oppPlayer==4){
      cycleboy();
    }
    else{
      cycleboy2nd();
    }
  }
  
   if(pinkCG.isTouching(mainCyclist)){
     gameState = END;
     player1.velocityX = 0;
     player1.addAnimation("opponentPlayer1",oppPink2Img);
    }
    
    if(yellowCG.isTouching(mainCyclist)){
      gameState = END;
      player2.velocityX= 0;
      player2.addAnimation("opponentPlayer2",oppYellow2Img);
    }
    
    if(redCG.isTouching(mainCyclist)){
      gameState = END;
      player3.velocityX = 0;
      player3.addAnimation("opponentPlayer3",oppRed2Img);
    }
    
    if(cycleboy1G.isTouching(mainCyclist)){
      gameState=END;
      cycleboy1.velocityX=4;
    }
    if(cycleboy2G.isTouching(mainCyclist)){
      gameState=END;
      cycleboy2.velocityX=4;
    }
    
}else if (gameState === END) {
    gameOver.visible = true;
    //Add code to show restart game instrution in text here
    restart.visible=true;
  
    path.velocityX = 0;
    mainCyclist.velocityY = 0;
    mainCyclist.addAnimation("SahilRunning",mainRacerImg2);
  
    pinkCG.setVelocityXEach(0);
    pinkCG.setLifetimeEach(-1);
  
    yellowCG.setVelocityXEach(0);
    yellowCG.setLifetimeEach(-1);
  
    redCG.setVelocityXEach(0);
    redCG.setLifetimeEach(-1);

    //backg.visible=false;
    //start.visible=false;
    //write condition for calling reset( )
    if(mousePressedOver(restart)){
      reset();
    }
}
}

function pinkCyclists(){
        player1 =createSprite(1100,Math.round(random(50,height-250)));
        player1.scale =0.06;
        player1.velocityX = -(6 + 2*distance/150);
        player1.addAnimation("opponentPlayer1",oppPink1Img);
        player1.setLifetime=170;
        pinkCG.add(player1);
}

function yellowCyclists(){
        player2 =createSprite(1100,Math.round(random(50,height-250)));
        player2.scale =0.06;
        player2.velocityX = -(6 + 2*distance/150);
        player2.addAnimation("opponentPlayer2",oppYellow1Img);
        player2.setLifetime=170;
        yellowCG.add(player2);
}

function redCyclists(){
        player3 =createSprite(1100,Math.round(random(50,height-250)));
        player3.scale =0.06;
        player3.velocityX = -(6 + 2*distance/150);
        player3.addAnimation("opponentPlayer3",oppRed1Img);
        player3.setLifetime=170;
        redCG.add(player3);
}

function cycleboy(){
  cycleboy1=createSprite(1300,Math.round(random(50,height-250)));
  cycleboy1.velocityX=-(6+2*distance/150);
  cycleboy1.scale=0.15;
  cycleboy1.addImage(cycleboy1img);
  cycleboy1.setLifetime=200;
  cycleboy1G.add(cycleboy1);
}

function cycleboy2nd(){
  cycleboy2=createSprite(1300,Math.round(random(50,height-250)));
  cycleboy2.velocityX=-(6+2*distance/150);
  cycleboy2.scale=0.05;
  cycleboy2.addImage(cycleboy2img);
  cycleboy2.setLifetime=200;
  cycleboy2G.add(cycleboy2);
}
//create reset function here
function reset(){
  gameState=PLAY;
  gameOver.visible=false;
  restart.visible=false
  pinkCG.destroyEach();
  redCG.destroyEach();
  yellowCG.destroyEach();
  cycleboy1G.destroyEach();
  cycleboy2G.destroyEach();
  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  distance=0;
}







const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var gameState="start";
var background,backgroundImg;
var Enemy,EnemyAnimation;
var bird,birdImg,obstacleGrp;
var score=0;
var lives=4;
var resetbutton,playbutton;
var frontpage;
function preload()
{
birdImg=loadAnimation("bird.gif");	
backgroundImg=loadAnimation("2Ct5.gif");
EnemyAnimation=loadAnimation("eagle obstacle.gif");
//getTime();
frontpage=loadImage("frontpage background.jpg");
resetbutton=loadImage("restart button.png");
playbuttonImg=loadImage("play button2.jpg");
}

function setup() {
	createCanvas(1000, 500);
	
backgr=createSprite(490,250,800,700);
backgr.addAnimation("moving",backgroundImg);
playbutton=createSprite(450,200,100,100);
playbutton.addImage(playbuttonImg);
playbutton.visible=false;
playbutton.scale=0.1;
bird=createSprite(60,200,50,50);
bird.addAnimation("flying",birdImg);
bird.scale=0.4;
bird.setCollider("rectangle",0,0,250,200);
//bird.debug=true;
obstacleGrp=new Group();

	engine = Engine.create();
	world = engine.world;

	//Create the Bodies Here.

backgr.scale=2;
	Engine.run(engine);
  
}


function draw() {
	if (backgroundImg) 
	backgroundImg;	
	
  rectMode(CENTER);
 
 if (gameState==="start") {
	background(frontpage);
	playbutton.visible=true;
	if (mousePressedOver(playbutton)) {
	gameState="play";	
	}
 }
  else if (gameState==="play") 
	{
		background(0);
		playbutton.visible=false;
 score=Math.round(frameCount/60);
  if (keyCode===UP_ARROW) {
	  bird.velocityY=-3;
  }
  if (keyCode===DOWN_ARROW) {
	bird.velocityY=3;
}

spawnObstacles();
if (obstacleGrp.isTouching(bird)) {
	//gameState="end";
	lives--
	obstacleGrp.destroyEach();
}
if (lives===0) {
gameState="end";	
}
}
else if(gameState==="end"){
	textSize(40);
	fill("red");
text("Game Over",350,200);
score=0;
backgr.visible=false;
bird.visible=false;
obstacleGrp.destroyEach();
bird.velocityY=0;

}
  drawSprites();
  textSize(30);
  fill("red");

  text("score: "+score,100,50); 
  text("lives: "+lives,250,50); 
}

function spawnObstacles(){
	if (frameCount%200===0) {
		var rand=Math.round(random(50,400))
		obstacle=createSprite(1000,rand,30,100);
obstacle.addAnimation("moving",EnemyAnimation);
//obstacle.debug=true;
obstacle.setCollider("rectangle",0,0,160,80);
obstacle.velocityX=-(3+2*(score/10));
obstacle.lifetime=400;
obstacle.scale=1.2;
obstacleGrp.add(obstacle);
	}
}
async function getTime(){
	var response=await fetch("http://worldtimeapi.org/api/timezone/Asia/kolkata");
	var responseJSON=await response.json();
	var dateTime=responseJSON.datetime;
	var hour=dateTime.slice(11,13);
	if (hour>=06&&hour<=19) {
		bg="2Ct5.gif";
	} else {
		bg="nightbackground.gif";
	}
	backgroundImg=loadAnimation(bg);
}

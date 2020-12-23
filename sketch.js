var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running,monkeys;
var banana ,bananaImage, rock, rockImage
var FoodGroup, rockGroup
var survivalTime=0;
var score;
var ground;

function preload(){
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  bananaImage = loadImage("banana.png");
  rockImage = loadImage("obstacle.png");
// monkeys=loadAnimation("sprite_0.png");
}
function setup() {
  createCanvas(565,416);
  monkey = createSprite(60,325,20,40);
  monkey.addAnimation("running",monkey_running);
  //monkeys.addAnimation("collided",monkeys);
  monkey.scale=0.2;
  ground = createSprite(280,390,600,7);
  rockGroup = createGroup(); 
  rock1Group = createGroup();
  bananaGroup = createGroup();
  score=0;
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
 // monkey.debug = true;
}

function draw() {
 background("lightblue");
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 400,50);

  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time: "+survivalTime,400,30);
  
  if (gameState === PLAY){
 
    if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -15;
}
   if(bananaGroup.isTouching(monkey)){
     bananaGroup.destroyEach();
  //   score=score+2;
   }
    
  if (rockGroup.isTouching(monkey)){
   gameState=END;
 }
 if (rock1Group.isTouching(monkey)){
   gameState=END;
 }
  
  monkey.velocityY = monkey.velocityY +0.5;
  monkey.collide(ground);
  banana();
  rock();
  rock1();
  
  }
  if (gameState===END){
   // monkeys.changeAnimation("collided",monkeys);
    rockGroup.setVelocityXEach(0);
    rock1Group.setVelocityXEach(0);     
    bananaGroup.setVelocityXEach(0);
    monkey.velocityY=0;
    rockGroup.setLifetimeEach(-1);
    rock1Group.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);

  }  
  
  
    drawSprites();
}
function rock(){
  if (frameCount % 200 === 0) {
  var rock = createSprite(600,350,20,40);
  rock.addImage(rockImage);
  rock.scale=0.2;
  rock.velocityX=-5;
  rockGroup.add(rock);
  rock.lifetime=130;

}
}
function rock1(){
  if (frameCount % 100 === 0) {
  var rock1 = createSprite(600,370,20,40);
  rock1.addImage(rockImage);
  rock1.scale=0.1;
  rock1.velocityX=-5;
  rock1Group.add(rock1);
  rock1.lifetime=130;
}
}

function banana(){
  if (frameCount % 100 === 0) {
  var banana = createSprite(600,80,20,40);
  banana.addImage(bananaImage);
  banana.scale=0.2;
  banana.velocityX=-5;
  bananaGroup.add(banana);
  banana.lifetime=130;
  
}
}

var PLAY = 1;
var END = 0;
var gameState = PLAY;
var sword, swordImage
var score = 0;
var fruit, fruit1, fruit2, fruit3, fruit4, fruitGroup, fruit1Image, fruit2Image, fruit3Image, fruit4Image
var enemy, enemyImage, enemyGroup
var monster, monsterImage
var gameOverImage
var knifeSwooshSound, gameOverSound


function preload() {
  swordImage = loadImage("sword.png");
  fruit1Image = loadImage("fruit1.png");
  fruit2Image = loadImage("fruit2.png");
  fruit3Image = loadImage("fruit3.png");
  fruit4Image = loadImage("fruit4.png");
  monsterImage = loadImage("alien1.png");
  gameOverImage = loadImage("gameover.png");
  knifeSwooshSound = loadSound("knifeSwooshSound.mp3");
  gameOverSound = loadSound("gameover.mp3");
}

function setup() {
  sword = createSprite(40, 200, 20, 20);
  sword.addImage(swordImage)
  sword.scale = 0.7

  fruitGroup = createGroup();
  enemyGroup = createGroup();
}

function draw() {
  background("yellow");
  fruits();
  enemy();

  text("score:" + score, 350, 27);


  if (gameState === PLAY) {
    sword.y = World.mouseY;
    sword.x = World.mouseX;
    if (fruitGroup.isTouching(sword)) {
      knifeSwooshSound.play();
      fruitGroup.destroyEach();
      score = score + 2;

    }
  }

  if (gameState === END) {
    fruitGroup.destroyEach();
    enemyGroup.destroyEach();
    fruitGroup.setVelocityXEach(0);
    enemyGroup.setVelocityXEach(0);
    sword.addImage(gameOverImage);
    sword.x = 200;
    sword.y = 200;
  }


  if (enemyGroup.isTouching(sword)) {
    gameState = END;
    knifeSwooshSound.play();
    gameOverSound.play();
  }
  createEdgeSprites();
  drawSprites();
}

function fruits() {
  if (World.frameCount % 80 === 0) {
    var fruit = createSprite(400, 200, 20, 20);
    fruit.scale = 0.2;
    fruit.y = Math.round(random(50, 340));
    fruit.velocityX = -(7 + 3 * score / 4)
    fruit.setLifetime = 100;
    fruitGroup.add(fruit);

    r = Math.round(random(1, 4));
    console.log(r)
    switch (r) {
      case 1:
        fruit.addImage(fruit1Image);
        break;
      case 2:
        fruit.addImage(fruit2Image);
        break;
      case 3:
        fruit.addImage(fruit3Image);
        break;
      case 4:
        fruit.addImage(fruit4Image);
        break;
      default:
        break;
    }
  }
}

function enemy() {
  if (World.frameCount % 200 === 0) {
    monster = createSprite(400, 200, 20, 20);
    monster.addAnimation("moving", monsterImage);
    monster.y = Math.round(random(100, 300));
    monster.velocityX = -(7 + 3 * score / 4)
    monster.setLifetime = 50;
    enemyGroup.add(monster);
  }
}
var helicopterIMG, helicopterSprite, packageSprite, packageIMG;
var packageBody, ground, background_image;
var box, side1, side2;

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload() {
  helicopterIMG = loadImage("helicopter.png");
  packageIMG = loadImage("package.png");
  background_image = loadImage("hello.png");
}

function setup() {
  createCanvas(800, 700);
  rectMode(CENTER);

  packageSprite = createSprite(width / 2, 80, 10, 10);
  packageSprite.addImage(packageIMG);
  packageSprite.scale = 0.2;

  helicopterSprite = createSprite(width / 2, 200, 10, 10);
  helicopterSprite.addImage(helicopterIMG);
  helicopterSprite.scale = 0.6;

  box = createSprite(width / 2, height - 45, 200, 20);
  box.shapeColor = "red";
  side1 = createSprite(300, height - 90, 20, 100);
  side1.shapeColor = "red";
  side2 = createSprite(500, height - 90, 20, 100);
  side2.shapeColor = "red";

  groundSprite = createSprite(width / 2, height - 30, width, 30);
  groundSprite.shapeColor = color("green");

  engine = Engine.create();
  world = engine.world;

  packageBody = Bodies.circle(width / 2, 200, 5, {
    restitution: 0.25,
    isStatic: true,
  });
  World.add(world, packageBody, box, side1, side2);

  //Create a Ground
  ground = Bodies.rectangle(width / 2, 670, width, 30, { isStatic: true });

  World.add(world, ground, box);

  Engine.run(engine);
}

function draw() {
  rectMode(CENTER);
  background(background_image);
  packageSprite.x = packageBody.position.x;
  packageSprite.y = packageBody.position.y;

  moving();

  drawSprites();

  keyPressed(packageBody);
}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    Matter.Body.setStatic(packageBody, false);
  }
}

function moving() {
  if (keyCode === RIGHT_ARROW) {
    helicopterSprite.x = helicopterSprite.x + 2;
  }
  if (keyCode === LEFT_ARROW) {
    helicopterSprite.x = helicopterSprite.x + -2;
  }
}

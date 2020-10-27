"use strict";

/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/

let paddle;
let gravityForce = 0.0025;
let balls = [];
let numballs = 3;

//
// Description of setup() goes here.
function setup() {
createCanvas(windowWidth, windowHeight);

paddle = new Paddle(300, 20);

for (let i=0; i< numballs; i++){
  let x = random(0, width);
  let y = random(-400, -100);
  let ball = new Ball(x,y);
  balls.push(ball);
  }

}

// Description of draw() goes here.
function draw() {
  background(0);

  paddle.move();
  paddle.display();

  for (let i=0; i<balls.length; i++) {
    let ball = balls[i];
    ball.gravity(gravityForce);
    ball.move();
    ball.bounce(paddle);
    ball.display();
  }
}
/*
Inlämningsuppgift 1 - Studs
Bouncing BALLS
En applikation som simulerar olika variationer av bollarnas studs/gravitaion
tre olika gravitaioner finns:
Patttern 1: studs mot golvet
Patttern 2: studs mot taket
Patttern 3: Skakande/fast på Y axeln

Möjlighet till färgbyte av alla bollar + ett random alternativ

Möjlighet till ett byte av antalet bollar

'p' för att pausa
'ESC' för att komma åt menun

baserat på: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_building_practice
*/


// setup canvas
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
console.log(ctx);

// Canvas resolution
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// Konfig
let menuBtnColor = ["#e6a680", "#CD4D00"] // .menu color. Active/Default
let antalballs = 15; // ball amount
let spEED = 2; // game speed
let paused = true; // pause switch
const actionMenuKey = 27; // ESCAPE to bring menu
const actionPauseKey = 80; // P to pause
let color = ['green', 'red', 'blue', 'yellow', 'orange', 'purple', 'pink', '#CD4D00'] // color option setting
let count = 1;
let selector = 2; // Pattern selector
let balls = [];

// actionKEYS = actionMenuKey, actionPauseKey
window.addEventListener('keydown', function(e) {
  let key = e.keyCode;
  if (key === actionMenuKey) {
    menuToggle(); // toggle Menu. Hide/Show
  }
  if (key === actionPauseKey) {
    togglePause();// toggle pause
  }
});

// init session and update UI
uiColor();
menuToggle();
togglePause();
ballsMaker(color[count]);

// loop loop
loop();







/*
Spagetti code INC!
*/
// function to generate random number
function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}
// Ball define
function Ball(x, y, velX, velY, color, size) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.color = color;
  this.size = size;
//draw ball
  Ball.prototype.draw = function() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }
  //Ball velocity
  Ball.prototype.update = function() {
    if ((this.x + this.size) >= width) {
      this.velX = -(this.velX);
    }

    if ((this.x - this.size) <= 0) {
      this.velX = -(this.velX);
    }

    if ((this.y + this.size) >= height) {
      this.velY = -(this.velY);
    }

    if ((this.y - this.size) <= 0) {
      this.velY = -(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;

  }

}
// Add balls to array. optinal "col" = color
function ballsMaker(col) {
  let _color;
  while (balls.length < antalballs) {
    _color = `rgb( ${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`;
    if (col) {_color = col;}
    let size = random(10, 20);
    let ball = new Ball(
      // ball position always drawn at least one ball width
      // away from the edge of the canvas, to avoid drawing errors
      random(0 + size, width - size),
      random(0 + size, height - size - 10),
      random(-2, 2),
      random(-2, 2),
      _color,
      size
    );

    balls.push(ball);
  }
  //// DEBUG:
  console.log(`${antalballs} balls generated, color ${_color}, pattern ${selector+1}`);
}
function loop() {
  if (!paused) {

    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < balls.length; i++) {
      balls[i].draw();
      // Pattern 1
        if (selector == 0){
          if (balls[i].velY < 10) {
            balls[i].velY = balls[i].velY + 0.08;

          } else {
            balls[i].velY = balls[i].velY - 0.1;
          }
          }
        // Pattern 2
        if(selector == 1){
          if (balls[i].velY > -5 ) {
            balls[i].velY = balls[i].velY - 0.08;

          } else {
            balls[i].velY = balls[i].velY + 0.1;
          }
        }
        // Pattern 3
        if(selector == 2){
          balls[i].velY = random(-2,2);
        }
      balls[i].update();
    }
  }
  requestAnimationFrame(loop);
}

function togglePause() {

  let btnText = document.getElementsByClassName('uiPause')[0];
  if (paused == false) {
    paused = true;
    // print to UI
    btnText.innerText = "Resume";

  } else {
    paused = false;
    // print to UI
    btnText.innerText = "Pause";
  }

}

// Hide show all UIelements onclick
function menuToggle(menuColor) {
  let colorToggle = menuColor;
  let menu = document.getElementsByClassName("uiDefault")[0];
  let menuSetting = document.getElementsByClassName("uiSetting")[0];
  let btnMenu = document.getElementsByClassName('menu')[0];

  if (menu.style.display == "none" ) {
    btnMenu.style.backgroundColor = menuBtnColor[0];
     menu.style.display = "block";
    menuSetting.style.display = "none";
  } else {
    menu.style.display = "none";
    menuSetting.style.display = "none";
  }
  if ((menu.style.display == "none") && (menuSetting.style.display == "none"))
  {btnMenu.style.backgroundColor = menuBtnColor[1];}

}

// show settings menu style hide remaining styles.
function uiSettings() {
  menuToggle(false);
  let btnSettings = document.getElementsByClassName('uiSetting')[0];
    btnSettings.style.display = "block";
}

// show Default menu style hide remaining styles.
function uiMainMenu() {
  let menu = document.getElementsByClassName("uiDefault")[0];
  let btnSettings = document.getElementsByClassName('uiSetting')[0];
    btnSettings.style.display = "none";
    menu.style.display = "block";
}

// increase or decrease ball amount
function uiBallAmount(increase) {
  const addOrReduce = increase;
  let display = document.getElementsByClassName("uiDisplay")[0];
  let ballColor;
  if (balls[0]){
    ballColor = balls[0].color;}
  else{
    ballColor = color[count-1];}

  if (addOrReduce){
    antalballs++;
    ballsMaker(ballColor);
  }
  else if (balls.length >= 1){
    balls.pop();
    //// DEBUG:
    console.log(`Ball Removed. ${antalballs-1} balls remaining, color ${ballColor}, pattern ${selector+1}`);
  }
  antalballs = balls.length;
  // print to UI
  display.innerHTML = `<p> Objects: ${balls.length} </p>`;

}
//switch color, all balls and Ui button.
function uiColor() {
  let btn = document.getElementsByClassName("uiColor")[0];
  btn.style.backgroundColor = color[count];
  if (count < color.length ){
    btn.style.backgroundColor = color[count];
    balls = [];
    if (count == color.length-1){ ballsMaker();}
    else {ballsMaker(color[count]);}
    count++;
  }
  else {
    count = 0;
  }
}
// Pattern switch onclick
function uiPattern() {
let btn = document.getElementsByClassName("uiPattern")[0];
  if (selector <=1){selector++}
  else {
    selector = 0;
  }
  // print to UI
  btn.innerText= `Pattern${selector+1}`;

}

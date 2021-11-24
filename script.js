// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
console.log(ctx);

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// Konfig
let antalballs = 15;
let spEED = 2;
let paused = true;
const actionMenuKey = 27; // ESCAPE
let color = ['green', 'red', 'blue', 'yellow', 'orange', 'purple', 'pink', '#CD4D00']
let count = 0;
let selector = 0;

// input listener
window.addEventListener('keydown', function(e) {
  let key = e.keyCode;
  if (key === actionMenuKey) {
    menuToggle();
  }
});

// function to generate random number
function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

function Ball(x, y, velX, velY, color, size) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.color = color;
  this.size = size;

  Ball.prototype.draw = function() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }
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
  Ball.prototype.collisionDetect = function() {
    for (let j = 0; j < balls.length; j++) {
      if (!(this === balls[j])) {
        const dx = this.x - balls[j].x;
        const dy = this.y - balls[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + balls[j].size) {
          balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')';
        }
      }
    }
  }
}

let balls = [];

ballsMaker();


function loop() {
  var x = 0;
  if (!paused) {

    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < balls.length; i++) {
      balls[i].draw();
        if (selector == 0 || selector == 2){
        if (balls[i].size < 20)
          balls[i].size = balls[i].size * 1.01;
        else {
          balls[i].size = 1;
        }}
        if(selector == 1 || selector == 2){
        if (balls[i].velX < 10) {
          balls[i].velY = balls[i].velY + 0.1;

        } else {
          balls[i].velY = balls[i].velY - 0.1;
        }
}
      balls[i].update();
      //balls[i].collisionDetect();
      //console.log(balls[i].velY, balls[i].velX);
    }
  }
  requestAnimationFrame(loop);


}

function togglePause() {
  let btnText = document.getElementsByClassName('uiPause')[0];
  if (!paused) {
    paused = true;
    btnText.innerText = "Resume";

  } else {
    paused = false;
    btnText.innerText = "Pause";
  }

}

function menuToggle(menuColor) {
  let colorToggle = menuColor;

  let menu = document.getElementsByClassName("uiDefault")[0];
  let menuSetting = document.getElementsByClassName("uiSetting")[0];
  let btnMenu = document.getElementsByClassName('menu')[0];
  if (menu.style.display == "none" ) {
    btnMenu.style.backgroundColor = "#e6a680";
     menu.style.display = "block";
    menuSetting.style.display = "none";
  } else {
    menu.style.display = "none";
    menuSetting.style.display = "none";
  }
  if ((menu.style.display == "none") && (menuSetting.style.display == "none"))
  {btnMenu.style.backgroundColor = "#CD4D00";}

}



loop();

function uiSettings() {
  menuToggle(false);
  let btnSettings = document.getElementsByClassName('uiSetting')[0];
    btnSettings.style.display = "block";
}
function uiMainMenu() {
  let menu = document.getElementsByClassName("uiDefault")[0];
  let btnSettings = document.getElementsByClassName('uiSetting')[0];
    btnSettings.style.display = "none";
    menu.style.display = "block";
}
function ballAmount(increase) {
  const addOrReduce = increase;
  let display = document.getElementsByClassName("uiDisplay")[0];

  if (addOrReduce){
    antalballs++;
    if (balls[0])
    {ballsMaker(balls[0].color);}
    else
    {ballsMaker(color[count-1]);}
  }
  else {
    if (balls.length >= 1){
    balls.pop();}
  }
  antalballs = balls.length;

  display.innerHTML = `<p> Objects: ${balls.length} </p>`;

}
function uiColor() {
  let btn = document.getElementsByClassName("uiColor")[0];
  btn.style.backgroundColor = color[count];
  if (count < color.length ){
    btn.style.backgroundColor = color[count];
    balls = [];
    if (count == color.length-1){ console.log('random color');
       ballsMaker();}
    else {ballsMaker(color[count]);}
    count++;
  }
  else {
    count = 0;
  }
}
function ballsMaker(col) {

  while (balls.length < antalballs) {
    let color = `rgb( ${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`;
    if (col) {color = col;}
    let size = random(10, 20);
    let ball = new Ball(
      // ball position always drawn at least one ball width
      // away from the edge of the canvas, to avoid drawing errors
      random(0 + size, width - size),
      random(0 + size, height - size),
      random(-2, 2),
      random(-2, 2),
      color,
      size
    );

    balls.push(ball);
  }
}
function uiPattern() {
let btn = document.getElementsByClassName("uiPattern")[0];

  if (selector <=1){selector++}
  else {
    selector = 0;
  }
  btn.innerText= `Pattern${selector}`;

}

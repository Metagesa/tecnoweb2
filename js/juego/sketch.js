//------------------TP 5---------------------------
//------------Tecno Multimedia 1------------------
//----------------Comision 2----------------------
//---------Juan Lutz - Nayla Aguilar---------------
//------Entrega Juan Lutz - Legajo 88196/6--------
//LINK a video: https://youtu.be/Rbo77fjxojI

let canvas;
let tl;
let balasGlobal = 0;
let basura = [];
let robotito;
let robotito2;
let win;
let lose;
let TLWN;
let mafia = [];
let piso;
let fondoMenu
let pausa = false;

function preload() {
  robotito = loadImage("js/juego/img/Armado.png");
  robotito2 = loadImage("js/juego/img/sad.png");
  win = loadImage("js/juego/img/pantalla__ganar.png");
  lose = loadImage("js/juego/img/pantalla__perder.png");
  TLWN = loadImage("js/juego/img/tl.png");
  piso = loadImage("js/juego/img/piso.jpg");
  for (let i=0; i<150; i++){
    mafia[i] = loadImage("js/juego/img/mafioso_" + int(random(-0.1, 2.1)) + ".png");
  }
  for (let i = 0; i < 12; i++) {
    basura[i] = loadImage("js/juego/img/basura_" + (i % 3) + ".png");
  }
  fondoMenu = loadImage("js/juego/img/fondoMenu.png");
}

function centerCanvas() {
  var x = (windowWidth/4*3 - width) / 2;
  var y = (windowHeight - height) / 4;
  canvas.position(x, 100);
}

function setup() {
  canvas = createCanvas(800, 600);
  canvas.parent('p5');
  centerCanvas();
  addScreenPositionFunction();
  smooth();
  tl = new Juego();

  crearBotones();
}

function crearBotones() {
  botonSuma1 = createButton(">");
  botonSuma1b = createButton(">>");
  botonSuma2 = createButton(">");
  botonResta1 = createButton("<");
  botonResta1b = createButton("<<");
  botonResta2 = createButton("<");

  botonJugar = createButton("Jugar");
  botonPausa = createButton("||")
  botonContinuar = createButton("▲")

  botonJugar.style('width: 120px; height: 40px; font-size: 24px;');
  botonPausa.style('width: 20px; transform: scaleX(1.5);');
  botonContinuar.style('transform: matrix(0.01, 1, -1, 0.01, -3, 0);');

  botonSuma1.parent('p5');
  botonSuma1b.parent('p5');
  botonResta1.parent('p5');
  botonResta1b.parent('p5');
  botonSuma2.parent('p5');
  botonResta2.parent('p5');

  botonJugar.parent('p5');
  botonPausa.parent('p5');
  botonContinuar.parent('p5');

  posicionarBotones();

  esconderBotones();
}

function esconderBotones() {
  botonSuma1.style('display: none;');
  botonSuma1b.style('display: none;');
  botonResta1.style('display: none;');
  botonResta1b.style('display: none;');

  botonJugar.style('display: none;');
  botonPausa.style('display: none;');
  botonContinuar.style('display: none;');

  botonSuma2.style('display: none;');
  botonResta2.style('display: none;');
}

function mostrarBotones() {
  botonSuma1.style('display: block;');
  botonResta1.style('display: block;');

  botonJugar.style('display: block;');
  botonPausa.style('display: block;');
  botonContinuar.style('display: block;');

  botonSuma1b.style('display: block;');
  botonResta1b.style('display: block;');

  botonSuma2.style('display: block;');
  botonResta2.style('display: block;');
}

function posicionarBotones() {
  botonSuma1.position(canvas.x + 80*2, canvas.y + height/1.1);
  botonResta1.position(canvas.x + 80, canvas.y + height/1.1);

  botonSuma1b.position(canvas.x + 80*2+33, canvas.y + height/1.1);
  botonResta1b.position(canvas.x + 80-33, canvas.y + height/1.1);

  botonSuma2.position(canvas.x + width-80-30, canvas.y + height/1.1);
  botonResta2.position(canvas.x + width-80*2-30, canvas.y + height/1.1);

  botonJugar.position(canvas.x + width/2-40, canvas.y + height/1.2);
  botonPausa.position(canvas.x + width-50, canvas.y + 20);
  botonContinuar.position(canvas.x + width-50, canvas.y + 20);
}

function sumaCant() {
  tl.cant = tl.cant + 1;
}

function sumaCantb() {
  tl.cant = tl.cant + 10;
}

function restaCant() {
  tl.cant = tl.cant - 1;
}

function restaCantb() {
  tl.cant = tl.cant - 10;
}

function sumaCant2() {
  tl.fondo.cant = tl.fondo.cant + 1;
}

function restaCant2() {
  tl.fondo.cant = tl.fondo.cant - 1;
}

function windowResized() {
  centerCanvas();
  posicionarBotones();
}

function jugar() {
  if (tl.menu) {
    tl.menu = false;
    esconderBotones();
  }
}

function pausar() {
  botonPausa.style('display: none');
  botonContinuar.style('display: block');
  pausa = true;
  if (pausa){
    noLoop();
  }
}

function continuar(){
  pausa = false;
  push();
  fill(0, 200);
  rect(0, 0, width, height);
  pop();
  botonPausa.style('display: block');
  botonContinuar.style('display: none');
  loop();
}

function draw() {
  tl.draw();
  balasGlobal = tl.balas;
}

function keyPressed() {
  if (key == "w" || key == "W") {
    tl.w = true;
  }
  if (key == "s" || key == "S") {
    tl.s = true;
  }
  if (key == "d" || key == "D") {
    tl.d = true;
  }
  if (key == "a" || key == "A") {
    tl.a = true;
  }
}

function keyReleased() {
  if (keyCode == ENTER) {
    if (tl.menu) {
      tl.menu = false;
      esconderBotones();
    }
    if (tl.ganar) {
      tl.menu = true;
      tl.ganar = false;
    }
    if (tl.perder) {
      tl.menu = true;
      tl.perder = false;
    }
  }
  if (pausa && keyCode == TAB) {
    tl.menu = true;
    continuar();
  }
  if (key == "w" || key == "W") {
    tl.w = false;
  }
  if (key == "s" || key == "S") {
    tl.s = false;
  }
  if (key == "d" || key == "D") {
    tl.d = false;
  }
  if (key == "a" || key == "A") {
    tl.a = false;
  }
}

function mouseReleased() {
  if (!tl.menu) {
    if (tl.balas < 20) {
      tl.balas++;
      tl.bala[tl.balas-1].impacto = false;
      tl.bala[tl.balas-1].actualizar(tl.Juan);
    } else if (tl.balas == 20) {
      tl.balas = 0;
    }
  }
}

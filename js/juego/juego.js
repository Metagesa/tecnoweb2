class Juego {

  constructor() {

    this.cant = 80;
    this.balas = 0;
    this.muertes = 0;

    this.Inaki = [];

    this.Juan = new Heroe(width/2, height/2);
    this.fondo = new Mapa();
    for (let i=0; i<150; i++) {
      this.Inaki[i] = new Enemigo(random(width), 0, random(width/20, width/13), i);
      this.Inaki[i].mX = (i%2==0);
      this.Inaki[i].mY = (i%7==0);
    }

    this.bala = [];

    for (let i=0; i<20; i++) {
      this.bala[i] = new disparo(0, 0);
    }

    robotito.resize(width, 0);
    robotito2.resize(width, 0);
    textAlign(CENTER);

    this.w = false;
    this.a = false;
    this.s = false;
    this.d = false;

    this.menu = true;
    this.config = false;
    this.ganar = false;
    this.perder = false;
  }

  draw() {
    background(0);

    if (this.menu) {
      push();
      textAlign(CENTER, CENTER);
      image(fondoMenu, 0, 0);
      fill(0, 150);
      rect(0, 0, width, height);
      fill(255);
      textSize(24);
      text("Una banda de mafiosos intenta desarmarte para conseguir tus piezas.\n¡Derrotalos usando tu nuevo brazo mejorado!\n¡Que no te atrapen o te van a desmantelar!\n\n\nTe movés usando las teclas WASD y disparás con el click izquierdo.\n¡Buena Suerte!", width/2, height/3);
      pop();

      this.botonera();
      botonPausa.style('display: none;');
      botonContinuar.style('display: none');
      botonJugar.mousePressed(jugar);
      botonPausa.mousePressed(pausar);
      botonContinuar.mousePressed(continuar);

      if (this.config) {

        push();
        fill(0, 200);
        rect(0, 0, width, height);
        fill(255);
        textSize(24);
        text("ola", width/2, height/2);
        pop();
      }
    } else if (this.perder) {
      esconderBotones();
      push();
      background (lose);
      fill(0);
      textSize(40);
      text("¡Te atraparon! Perdiste...", width/2, 50);
      image(robotito2, 0, 100);
      fill(255, 100);
      noStroke();
      rect(240, 450, 320, 90, 10);
      fill(255);
      textSize(30);
      text("Presiona enter para\nvolver al menu", width/2, 490);
      pop();
    } else if (this.ganar) {
      esconderBotones();
      push();
      background (win);
      fill(0);
      textSize(40);
      text("¡Los derrotaste a todos!", width/2, 50);
      image(robotito, 0, 20);
      fill(255, 100);
      noStroke();
      rect(240, 450, 320, 90, 10);
      fill(255);
      textSize(30);
      text("Presiona enter para\nvolver al menu", width/2, 490);
      pop();
    } else {

      botonJugar.style('display: none;');

      if (pausa) {
        botonContinuar.style('display: block');
        botonPausa.style('display: none;');
      } else {
        botonPausa.style('display: block;');
        botonContinuar.style('display: none');
      }

      this.fondo.draw();

      for (let i=0; i<this.balas; i++) {
        if (this.bala[i].municion()) {
          this.bala[i].dibujar(this.Juan);
        }
        if (this.fondo.impacto(this.bala[i])) {
          this.bala[i].impacto=true;
        }
      }

      for (let i=0; i<this.cant; i++) {
        this.Inaki[i].dibujar(this.fondo, this.bala);
        if (this.Juan.colision(this.Inaki[i].x, this.Inaki[i].y, this.Inaki[i].tam/2)) {
          this.perder=true;
          this.Juan = new Heroe(width/2, height/2);
          for (let a=0; a<this.cant; a++) {
            this.Inaki[a] = new Enemigo(random(width), 0, random(width/20, width/13), a);
            this.Inaki[a].mX = (a%2==0);
            this.Inaki[a].mY = (a%7==0);
          }
          for (let a=0; a<20; a++) {
            this.bala[a] = new disparo(0, 0);
          }
        }
      }

      this.Juan.dibujar();

      for (let i=0; i<this.cant; i++) {
        if (!this.Inaki[i].V) {
          this.muertes++;
        }
      }
      if (this.muertes==this.cant) {
        this.ganar=true;
        this.Juan = new Heroe(width/2, height/2);
        for (let i=0; i<this.cant; i++) {
          this.Inaki[i] = new Enemigo(random(width), 0, random(width/20, width/13), i);
          this.Inaki[i].mX = (i%2==0);
          this.Inaki[i].mY = (i%7==0);
        }
        for (let a=0; a<20; a++) {
          this.bala[a] = new disparo(0, 0);
        }
        this.muertes=0;
      } else {
        this.muertes=0;
      }
    }

    this.movimientoHeroe();

    if (pausa) {
      push();
      fill(0, 200);
      rect(0, 0, width, height);
      textAlign(CENTER,CENTER);
      textSize(48);
      fill(255);
      text("Pausa", width/2, height/2-50);
      textSize(24);
      text("Apretá TAB para volver al menú", width/2, height/2+50)
      pop();
    }
  }

  botonera() {
    push();
    textAlign(CENTER, CENTER);
    textSize(24);

    fill(255);
    text("Enemigos", 134, height/1.1-15);
    text("Obstáculos", width-50-110+24, height/1.1-15);

    fill(100,50,200);
    rect(110, height/1.1-1,50,33);
    fill(255);
    text(this.cant, 134, height/1.1+18);

    fill(100,50,200);
    rect(width-50-110, height/1.1-1,50,33);
    fill(255);
    text(this.fondo.cant, width-50-110+24, height/1.1+18);

    mostrarBotones();

    if (this.cant < 150){
      botonSuma1.style('display: block');
      botonSuma1.mousePressed(sumaCant);
      if (this.cant < 140){
        botonSuma1b.style('display: block');
        botonSuma1b.mousePressed(sumaCantb);
      }  else {
        botonSuma1b.style('display: none');
      }
    } else {
      botonSuma1.style('display: none');
      botonSuma1b.style('display: none');
    }
    if (this.cant > 1){
      botonResta1.style('display: block');
      botonResta1.mousePressed(restaCant);
      if (this.cant > 10){
        botonResta1b.style('display: block');
        botonResta1b.mousePressed(restaCantb);
      }  else {
        botonResta1b.style('display: none');
      }
    } else {
      botonResta1.style('display: none');
      botonResta1b.style('display: none');
    }

    if (this.fondo.cant < 12){
      botonSuma2.style('display: block');
      botonSuma2.mousePressed(sumaCant2);
    } else {
      botonSuma2.style('display: none');
    }
    if (this.fondo.cant > 0){
      botonResta2.style('display: block');
      botonResta2.mousePressed(restaCant2);
    } else {
      botonResta2.style('display: none');
    }
    pop();
  }

  movimientoHeroe() {

    if (keyPressed) {
      if (!this.fondo.colision(this.Juan.x, this.Juan.y, this.Juan.diam)) {
        if (this.w) {
          this.Juan.mover("arriba");
        }
        if (this.s) {
          this.Juan.mover("abajo");
        }
        if (this.d) {
          this.Juan.mover("derecha");
        }
        if (this.a) {
          this.Juan.mover("izquierda");
        }
      } else if (this.fondo.colision(this.Juan.x, this.Juan.y, this.Juan.diam)) {
        this.colHeroe();
      }
    }
  }

  colHeroe() {

    if (this.fondo.tempX<this.Juan.x) {
      if (this.d) {
        this.Juan.mover("derecha");
      }
      if (this.w) {
        this.Juan.mover("arriba");
      }
      if (this.s) {
        this.Juan.mover("abajo");
      }
    } else if (this.fondo.tempX>this.Juan.x) {
      if (this.a) {
        this.Juan.mover("izquierda");
      }
      if (this.w) {
        this.Juan.mover("arriba");
      }
      if (this.s) {
        this.Juan.mover("abajo");
      }
    } else if (this.fondo.tempY<this.Juan.y) {
      if (this.s) {
        this.Juan.mover("abajo");
      }
      if (this.d) {
        this.Juan.mover("derecha");
      }
      if (this.a) {
        this.Juan.mover("izquierda");
      }
    } else if (this.fondo.tempY>this.Juan.y) {
      if (this.w) {
        this.Juan.mover("arriba");
      }
      if (this.d) {
        this.Juan.mover("derecha");
      }
      if (this.a) {
        this.Juan.mover("izquierda");
      }
    }
  }
}

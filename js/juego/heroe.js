class Heroe {
  constructor(posX, posY) {
    this.x = posX;
    this.y = posY;
    this.ang = 0;
    this.vel = 3;
    this.diam = width/40;
    this.rad = this.diam / 2;
    TLWN.resize(int(this.diam * 3), 0);
  }

  dibujar() {
    push();
    noStroke();
    this.ang = atan2(mouseY - this.y, mouseX - this.x);
    push();
    translate(this.x, this.y);
    rotate(map(this.ang, -PI, PI, 0, TWO_PI));
    rotate(radians(-90));
    imageMode(CENTER);
    image(TLWN, 0, 0);
    pop();
    pop();
  }

  mover(direc) {
    if (direc == "none") {
      //IDLE
    } else if (direc == "derecha" && this.x < width - this.diam) {
      this.x += this.vel;
    } else if (direc == "izquierda" && this.x > 0 + this.diam) {
      this.x -= this.vel;
    } else if (direc == "arriba" && this.y > 0 + this.diam) {
      this.y -= this.vel;
    } else if (direc == "abajo" && this.y < height - this.diam) {
      this.y += this.vel;
    }
  }

  colision(colx, coly, tam) {
    if (
      dist(colx, this.y, this.x, this.y) < tam &&
      dist(this.x, coly, this.x, this.y) < tam
    ) {
      return true;
    } else {
      return false;
    }
  }
}

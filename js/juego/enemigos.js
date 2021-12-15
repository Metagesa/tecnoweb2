class Enemigo {
  constructor(posX, posY, t, id) {
    this.V = true;
    this.d = true;
    this.mX = false;
    this.mY = true;
    this.x = posX;
    this.y = posY;
    this.tam = t;
    this.muertx = 0;
    this.muerty = 0;
    this.id = id;
    mafia[this.id].resize(int(this.tam), int(this.tam));
  }

  dibujar(f, dis) {
    if (!this.vivo(dis)) {
      this.V = false;
    }
    if (this.V) {
      push();
      imageMode(CENTER);
      image(mafia[this.id], this.x, this.y);
      pop();
      this.mover(f);
      this.muertx = this.x;
      this.muerty = this.y;
    } else {
      this.x = -200;
      this.y = -200;
      push();
      blendMode(BURN);
      imageMode(CENTER);
      image(mafia[this.id], this.muertx, this.muerty);
      pop();
    }
  }

  vivo(b) {
    for (let i = 0; i < balasGlobal; i++) {
      let v = [];
      if (this.colision(b[i].absx, b[i].absy)) {
        v[i] = false;
        b[i].impacto = true;
        return v[i];
      }
    }
    return true;
  }

  dir() {
    let m = int(random(5000));
    if (m > 450 && m < 500) {
      return true;
    } else {
      return false;
    }
  }

  mover(back) {
    if (back.colision(this.x, this.y, this.tam / 2)) {
      if (back.distX < this.tam) {
        this.mX = !this.mX;
      }
      if (back.distY < this.tam) {
        this.mY = !this.mY;
      }
    }
    if (this.dir()) {
      this.d = !this.d;
    }
    if (this.d) {
      if (this.mX) {
        this.x += 3;
      } else {
        this.x -= 3;
      }
    } else {
      if (this.mY) {
        this.y += 3;
      } else {
        this.y -= 3;
      }
    }
    if (this.x >= width - this.tam / 2) {
      this.mX = false;
    } else if (this.x <= 0 + this.tam / 2) {
      this.mX = true;
    }
    if (this.y >= height - this.tam / 2) {
      this.mY = false;
    } else if (this.y <= 0 + this.tam / 2) {
      this.mY = true;
    }
  }

  colision(colx, coly) {
    if (
      dist(colx, this.y, this.x, this.y) < this.tam / 2 &&
      dist(this.x, coly, this.x, this.y) < this.tam / 2
    ) {
      return true;
    } else {
      return false;
    }
  }
}

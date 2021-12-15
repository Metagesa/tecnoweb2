class Mapa {
  constructor() {
    this.tam = 80;
    this.cant = 12;
    this.distX = 0;
    this.distY = 0;
    this.tempX = 0;
    this.tempY = 0;

    piso.resize(width/5, 0);

    this.x = [];
    this.y = [];

    for (let i = 0; i < this.cant; i++) {
      basura[i].resize(this.tam, this.tam);
      this.x[i] = random(width);
      this.y[i] = i * width/16;
      if (
        this.x[i] > width/2.6 &&
        this.x[i] < width/1.6 &&
        this.y[i] < width/2 &&
        this.y[i] > width/4
      ) {
        if (this.x[i] > width/2) {
          this.x[i] = random(width / 2 + this.tam, width - this.tam / 2);
          this.y[i] = random(height / 2);
        } else if (this.x[i] <= width/2) {
          this.x[i] = random(width / 2 - this.tam);
          this.y[i] = random(height / 2, height);
        }
      }
    }
  }

  draw() {

    push();
    for (let y = 0; y < 5; y++) {
      for (let x = 0; x < 6; x++) {
        image(piso, 150 * x, 150 * y);
      }
    }

    for (let i = 0; i < this.cant; i++) {
      image(basura[i], this.x[i], this.y[i]);
    }
  }

  impacto(b) {
    if (this.colision(b.absx, b.absy, 16)) {
      return true;
    }
    return false;
  }

  colision(posX, posY, radio) {
    for (let i = 0; i < this.cant; i++) {
      this.tempX = posX;
      this.tempY = posY;
      if (posX < this.x[i]) {
        this.tempX = this.x[i];
      } else if (posX > this.x[i] + this.tam) {
        this.tempX = this.x[i] + this.tam;
      }
      if (posY < this.y[i]) {
        this.tempY = this.y[i];
      } else if (posY > this.y[i] + this.tam) {
        this.tempY = this.y[i] + this.tam;
      }

      this.distX = posX - this.tempX;
      this.distY = posY - this.tempY;
      let distancia = sqrt(this.distX * this.distX + this.distY * this.distY);

      if (distancia <= radio - 15) {
        return true;
      }
    }
    return false;
  }
}

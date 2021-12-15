class disparo {
  constructor(px, py) {
    this.x = px;
    this.y = py;
    this.b = 0;
    this.impacto = false;
    this.vel = 15;
    this.ang = 0;
    this.absx = 0;
    this.absy = 0;
  }

  dibujar(J) {
    if (!this.impacto) {
      this.x = this.x - this.vel;
      push();
      translate(J.x, J.y);
      rotate(map(this.ang, -PI, PI, 0, TWO_PI));
      circle(this.x, this.y, 5);
      this.absx = screenPosition(this.x, this.y).x;
      this.absy = screenPosition(this.x, this.y).y;
      pop();
    } else {
      this.absx = -100;
      this.absy = -100;
    }
  }

  actualizar(J) {
    this.ang = atan2(mouseY - J.y, mouseX - J.x);
    this.x = 0;
    this.y = 0;
  }

  municion() {
    if (this.x < -width) {
      return false;
    } else {
      return true;
    }
  }
}

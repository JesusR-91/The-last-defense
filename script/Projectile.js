class Projectile {
  constructor(x, y) {
    this.img = new Image();
    this.img.src = "Images/Projectil1.png";

    this.x = x;
    this.y = y;
    this.w = 5;
    this.h = 10;
    this.speed = 2;
  }

  draw = () => {
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  };

  movement = (enemOrPlay) => {
    if (enemOrPlay === true) {
      this.y -= this.speed;
    }
  };
}

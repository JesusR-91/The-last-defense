class Projectile {
  constructor(x, y) {
    this.img = new Image();
    this.img.src = "Images/Projectil1.png";

    this.x = x;
    this.y = y;
    this.w = 5;
    this.h = 10;
    this.speed = 4;
  }

  draw = () => {
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  };

  movement = (enemOrPlay) => {
    if (enemOrPlay === true) {
      this.y -= this.speed;
    } else {
      this.y += this.speed;
    }
  };
}

class ProjectileBoss {
  constructor(x, y) {
    this.img = new Image();
    this.img.src = "Images/Projectil1.png";

    this.x = x;
    this.y = y;
    this.w = 5;
    this.h = 10;
    this.speedY = 2;
    this.speedX = 4;


    this.isMovingRight === true;
    this.isMovingDow === true;

  }

  draw = () => {
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  };

  movement = () => {
    if (this.isMovingRight === true) {
      this.x += this.speedX;
    } else {
      this.x -= this.speedX;
    }
    this.y += this.speedY;
 
  };

  wallCollisions = () => {
    if (this.x > canvas.width - this.w / 2) {
      this.isMovingRight = false;
    } else if (this.x < 0 + this.w / 2) {
      this.isMovingRight = true;
    }
  };
}

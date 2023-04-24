class Enemy1 {
  constructor() {
    this.img = new Image();
    this.img.src = "../Images/enemy1.png";

    this.x = Math.random() * canvas.width;
    
    this.y = -20;
    this.w = 70;
    this.h = 100;

    this.movX = 2;
    this.movY = 1;

    this.isMovingRight = true;
    this.isMovingDown = true;

  }

  draw = () => {
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  };

  movement = () => {
    if (this.isMovingRight === true) {
      this.x += this.movX;
    } else {
      this.x -= this.movX;
    }

    if (this.isMovingDown === true) {
      this.y += this.movY;
    }
  };

  wallCollisions = () => {
    if (this.x > canvas.width - this.w / 2) {
      this.isMovingRight = false;
    } else if (this.x < 0 - this.w / 2) {
      this.isMovingRight = true;
    }
  };
}


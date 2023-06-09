class Spaceship1 {
  constructor() {
    this.img = new Image();
    this.img.src = "Images/spaceship1.png";

    this.x = canvas.width / 2 - 35;
    this.y = canvas.height - 120;
    this.w = 50;
    this.h = 80;

    this.mov = 10;

    this.projectileArray = [];

    this.isShooting = false;
    this.isMoving = false;

    // Testing auto movement
    this.isMovingRight = false;
    this.isMovingLeft = false;
    this.isMovingDown = false;
    this.isMovingUp = false;
  }

  draw = () => {
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  };

  movement = (event) => {
    if (this.isMoving === true) {
      if (event.code === "ArrowUp" && this.y >= canvas.height / 2) {
        this.isMovingUp = true;
        this.isMovingDown = false;
        this.y -= this.mov;
      } else if (
        event.code === "ArrowDown" &&
        this.y <= canvas.height - this.h
      ) {
        this.isMovingUp = false;
        this.isMovingDown = true;
        this.y += this.mov;
      } else if (
        event.code === "ArrowRight" &&
        this.x <= canvas.width - this.w
      ) {
        this.isMovingRight = true;
        this.isMovingLeft = false;
        this.x += this.mov;
      } else if (event.code === "ArrowLeft" && this.x >= 0) {
        this.isMovingRight = false;
        this.isMovingLeft = true;
        this.x -= this.mov;
      }
    }

    setTimeout(() => {
      this.isMoving = false;
    }, 50);
  };

  automovement = () => {
    if ((this.isMovingUp === true ) && (this.y > (canvas.height / 2))) {
      this.y--;
    } else if ((this.isMovingDown === true) && (this.y < (canvas.height - 50))) {
      this.y++;
    } 
    
    if ((this.isMovingRight === true) && (this.x < canvas.width)) {
      this.x++;
    } else if ((this.isMovingLeft === true) && (this.x > 0)){
      this.x--;
    }
  }

  movement2 = () => {
    this.isMoving = true;
  };

  shoot = (event) => {
    if (event.code === "Space" && this.isShooting === false) {
      let newProj = new Projectile(this.x + this.w / 2, this.y);
      this.projectileArray.push(newProj);
      this.isShooting = true;
    } else if (this.isShooting === true) {
      setTimeout(() => {
        this.isShooting = false;
      }, 600);
    }

    if (this.projectileArray[0].x < 0) {
      this.projectileArray.shift();
    }
  };
}

class Heart {
  constructor(x) {
    this.img = new Image();
    this.img.src = "Images/heart.png";

    if (x === 1) {
      this.x = 15;
    } else if (x === 2) {
      this.x = 45;
    } else if (x === 3) {
      this.x = 75;
    } else if (x === 4) {
      this.x = 105;
    } else if (x === 5) {
      this.x = 135;
    } else {
      this.x = x;
    }

    this.y = 15;
    this.w = 20;
    this.h = 20;
  } 

  draw = () =>{
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  };

  movement = () =>{
    this.y++
  }
}

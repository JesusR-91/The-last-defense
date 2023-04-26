class Enemy1 {
  constructor() {
    this.img = new Image();
    this.img.src = "Images/enemy1.png";

    this.x = Math.random() * canvas.width;

    this.y = -20;
    this.w = 70;
    this.h = 100;

    this.movX = 2;
    this.movY = 1;

    this.projectileArray = [];

    this.isMovingRight = true;
    this.isMovingDown = true;

    this.isShooting = false;
    this.seconds = 0;
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

  shoot = () => {
    this.seconds++;
    if (this.isShooting === true && this.seconds % 60 === 0) {
      let newProj = new Projectile(this.x + this.w / 2, this.y);
      this.projectileArray.push(newProj);
    }

    if (this.projectileArray.length > 0 && this.projectileArray[0].x < 0) {
      this.projectileArray.shift();
    }
  };
}

class Enemy2 {
  constructor() {
    this.img = new Image();
    this.img.src = "Images/enemy2.png";

    this.x = Math.random() * canvas.width;

    this.y = -20;
    this.w = 50;
    this.h = 80;

    this.movX = 2;
    this.movY = 1;

    this.projectileArray = [];

    this.isMovingRight = true;
    this.isMovingDown = true;

    this.isShooting = false;
    this.seconds = 0;
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

  shoot = () => {
    this.seconds++;
    if (this.isShooting === true && this.seconds % 60 === 0) {
      let newProj = new Projectile(this.x + this.w / 2, this.y + this.h);
      this.projectileArray.push(newProj);
    }

    if (this.projectileArray.length > 0 && this.projectileArray[0].x < 0) {
      this.projectileArray.shift();
    }
  };
}

class Enemy3 {
  constructor() {
    this.img = new Image();
    this.img.src = "Images/enemy3.png";

    this.x = Math.random() * canvas.width;

    this.y = -20;
    this.w = 50;
    this.h = 80;

    this.movX = 2;
    this.movY = 1;

    this.projectileArray = [];

    this.isMovingRight = true;
    this.isMovingDown = true;

    this.isShooting = false;
    this.seconds = 0;
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

  shoot = () => {
    this.seconds++;
    if (this.isShooting === true && this.seconds % 60 === 0) {
      let newProj = new Projectile(this.x + this.w / 2, this.y + this.h);
      this.projectileArray.push(newProj);
    }

    if (this.projectileArray.length > 0 && this.projectileArray[0].x < 0) {
      this.projectileArray.shift();
    }
  };
}

class Boss1 {
  constructor() {
    this.img = new Image();
    this.img.src = "Images/boss1.png";

    this.x = canvas.width / 2;

    this.y = -400;
    this.w = 300;
    this.h = 240;

    this.movX = 2;
    this.movY = 2;

    this.projectileArray = [];

    this.isMovingRight = true;
    this.isMovingUp = false;


    this.isShooting = false;
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

    if (this.isMovingUp === true) {
      this.y -= this.movY;
    } else if (this.isMovingUp === false) {
      this.y += this.movY;
    }
  };

  wallCollisions = () => {
    if (this.x > canvas.width - this.w / 2) {
      this.isMovingRight = false;
    } else if (this.x < 0 - this.w / 2) {
      this.isMovingRight = true;
    }

    if (this.y > 150) {
      this.isMovingUp = true;
    } else if (this.y < -200) {
      this.isMovingUp = false;
    }


  };

  shoot = () => {
    this.seconds++;
    if (this.isShooting === true) {
      let newProj = new ProjectileBoss(this.x + this.w / 4, this.y + this.h);
      let newProj2 = new ProjectileBoss(
        this.x + (this.w / 4) * 2,
        this.y + this.h
      );
      let newProj3 = new ProjectileBoss(
        this.x + (this.w / 4) * 3,
        this.y + this.h
      );
      let newProj4 = new ProjectileBoss(this.x + this.w, this.y + this.h);

      this.projectileArray.push(newProj);
      this.projectileArray.push(newProj2);
      this.projectileArray.push(newProj3);
      this.projectileArray.push(newProj4);
    }

    if (this.projectileArray.length > 0 && this.projectileArray[0].x < 0) {
      this.projectileArray.shift();
    }
  };
}


class Explosion {

  constructor (x, y, w, h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.img = new Image();
    this.img.src = "Images/explosion.png";
  }

  draw = () =>{
    ctx.drawImage (this.img, this.x, this.y, this.w, this.h);
  }
}
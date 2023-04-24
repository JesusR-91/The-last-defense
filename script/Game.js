class Level1 {
  //PROPERTIES
  constructor() {
    this.bg = new Image();
    this.bg.src = "Images/screenplay2.jpg";

    this.spaceship = new Spaceship1();

    this.enemyArray = [];
    this.asteroidArray = [];

    this.playerLifeCount = [new Heart(1), new Heart(2), new Heart(3)];

    this.isGameOn = true;

    // test
    // this.a = new Image()
    // this.a.src = "Images/asteroid.png"
  }

  //METHODS

  bgDraw = () => {
    ctx.drawImage(this.bg, 0, 0, canvas.width, canvas.height);
  };

  lifeDraw = () => {
    this.playerLifeCount.forEach((heart) => {
      ctx.drawImage(heart.img, heart.x, heart.y, heart.w, heart.h);
    });
  };

  enemiesSpawn = () => {
    if (
      this.enemyArray.length === 0 ||
      this.enemyArray[0].y === canvas.height / 2
    ) {
      let newEnemy = new Enemy1();
      this.enemyArray.push(newEnemy);
    } else if (this.enemyArray[0].y > canvas.height) {
      this.enemyArray.shift();
    }
  };

  asteroidSpawn = () => {
    if (
      this.asteroidArray.length === 0 ||
      this.asteroidArray[this.asteroidArray.length - 1].y > canvas.height / 2
    ) {
      let newAsteroid = new Asteroid();
      this.asteroidArray.push(newAsteroid);
      console.log(this.asteroidArray.length);
    } else if (this.asteroidArray[0].y > canvas.height) {
      this.asteroidArray.shift();
    }
  };

  checkCollision = () => {
    this.enemyArray.forEach((element) => {
      if (
        element.x - 10 < this.spaceship.x + this.spaceship.w &&
        element.x - 10 + this.spaceship.w > this.spaceship.x &&
        element.y - 10 < this.spaceship.y + this.spaceship.h &&
        element.h - 10 + element.y > this.spaceship.y &&
        this.playerLifeCount.length > 0
      ) {
        this.enemyArray.splice(this.enemyArray.indexOf(element), 1);
        this.playerLifeCount.pop();
      } else if (this.playerLifeCount.length === 0) {
        this.gameOver();
      }
    });
  };

  checkCollisionProjectileEnemy = () => {
    this.spaceship.projectileArray.forEach((projec) => {
      this.enemyArray.forEach((enemy, indexEnemy) => {
        if (
          enemy.x < projec.x + projec.w &&
          enemy.x + projec.w > projec.x &&
          enemy.y < projec.y + projec.h &&
          enemy.h + enemy.y > projec.y
        ) {
          this.enemyArray[indexEnemy].img.src =
            "Images/explosion-transformed.png";
          setTimeout(() => {
            this.enemyArray.splice(indexEnemy, 1);
          }, 500);
          // count.innerText += 5
        }
      });
    });
    // this.spaceship.projectileArray.forEach((projec) =>{
    //   this.enemyArray.filter((enemy)=>{
    //     if(
    //       enemy.x -10 <  this.projec.x +  this.projec.w &&
    //       enemy.x -10 +  this.projec.w >  this.projec.x &&
    //       enemy.y -10 <  this.projec.y +  this.projec.h &&
    //       enemy.h -10 + enemy.y >  this.projec.y
    //     ){
    //       return false;
    //     }
    //   })
    // })
  };

  gameOver = () => {
    this.isGameOn = false;
    canvas.style.display = "none";
    gameOverScreen.style.display = "flex";
  };

  gameLoop = () => {
    //TODO CLEAN THE CANVAS
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //TODO ACTIONS
    this.enemiesSpawn();
    this.asteroidSpawn();

    this.enemyArray.forEach((element) => {
      element.wallCollisions();
      element.movement();
    });

    this.asteroidArray.forEach((asteroid) => {
      asteroid.movement(true);
    });
    this.spaceship.projectileArray.forEach((element) => {
      element.movement(true);
    });

    this.checkCollision();
    this.checkCollisionProjectileEnemy();

    //TODO DRAW ELEMENTS

    this.bgDraw();
    this.lifeDraw();

    this.spaceship.projectileArray.forEach((element) => {
      element.draw();
    });

    this.enemyArray.forEach((element) => {
      element.draw();
    });

    this.asteroidArray.forEach((asteroid) => {
      asteroid.draw();
    });

    //test
    //ctx.drawImage(this.a, 0,0)

    this.spaceship.draw();

    //TODO RECURSION

    if (this.isGameOn === true) {
      requestAnimationFrame(this.gameLoop);
    }
  };
}

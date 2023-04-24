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
    this.frames = 0
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
      // console.log(this.asteroidArray.length);
    } else if (this.asteroidArray[0].y > canvas.height) {
      this.asteroidArray.shift();
    }
  };

  checkCollisionSpaceshipEnemy = () => {
    this.enemyArray.forEach((enemy, indexEnemy) => {
      if (
        enemy.x - 10 < this.spaceship.x + this.spaceship.w &&
        enemy.x - 10 + this.spaceship.w > this.spaceship.x &&
        enemy.y - 10 < this.spaceship.y + this.spaceship.h &&
        enemy.h - 10 + enemy.y > this.spaceship.y &&
        this.playerLifeCount.length > 0
      ) {
        
        this.enemyArray.splice(indexEnemy, 1);
        // this.playerLifeCount.pop();
      
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
          this.enemyArray[indexEnemy].img.src = "Images/explosion-transformed.png";
          setTimeout(() => {
            this.enemyArray.splice(indexEnemy, 1);
          }, 500);
          // count.innerText += 5
        }
      });
    })
  };

  checkCollisionProjectileEnemySpaceship = () => {
    this.enemyArray.forEach((enemy) => {
      enemy.projectileArray.forEach((projectile,indexProjec) => {
        if (
          projectile.x  - 5< this.spaceship.x + this.spaceship.w &&
          projectile.x  - 5 + this.spaceship.w > this.spaceship.x &&
          projectile.y  - 5 < this.spaceship.y + this.spaceship.h &&
          projectile.h + projectile.y  - 5> this.spaceship.y
        ) {
          enemy.projectileArray.splice(indexProjec, 1);
          // this.playerLifeCount.pop();
        }
      });
    })
  };

  checkCollisionEnemyAsteroid = () => {
    this.enemyArray.forEach((enemy) => {
      this.asteroidArray.forEach((asteroid) => {
        if (
          asteroid.x + 15 <= enemy.x + enemy.w &&
          asteroid.x + enemy.w > enemy.x + 15 &&
          asteroid.y + 15 <= enemy.y + enemy.h &&
          asteroid.h + asteroid.y >= enemy.y + 15 &&
          enemy.isMovingRight === true
        ) {
          enemy.isMovingRight = false;
        } else if (
          asteroid.x + 15 <= enemy.x + enemy.w &&
          asteroid.x + enemy.w >= enemy.x + 15 &&
          asteroid.y  + 15 <= enemy.y + enemy.h &&
          asteroid.h + asteroid.y >= enemy.y + 15 &&
          enemy.isMovingRight === false
        ){
          enemy.isMovingRight = true;
        }
      })
      
  })
}

  checkCollisionAsterpodSpaceship = () => {
    this.asteroidArray.forEach((asteroid, indexAsteroid) => {
      if (
        asteroid.x - 10 < this.spaceship.x + this.spaceship.w &&
        asteroid.x - 10 + this.spaceship.w > this.spaceship.x &&
        asteroid.y - 10 < this.spaceship.y + this.spaceship.h &&
        asteroid.h - 10 + asteroid.y > this.spaceship.y &&
        this.playerLifeCount.length > 0
      ) {

        // Todo animación
        // let explosion = new Image();
        // explosion.src = "Images/asteroid-explosion.png";
        // ctx.drawImage(explosion, asteroid.x, asteroid.y, asteroid.w, asteroid.h)
        
        setTimeout (()=>{
          
        }, 2000)
        this.asteroidArray.splice(indexAsteroid, 1);
        // this.playerLifeCount.pop();
        // count.innerHTML = `${count.innerText++}`;
      } else if (this.playerLifeCount.length === 0) {
        this.gameOver();
      }
    })
  };

  rotateAsteroid = () => {
    this.asteroidArray.forEach((asteroid) => {

      // let count = 0;
      
      // for (let i = 0; i < 7; i++) {
      //   count++
      //   if(count === 1) {
      //     asteroid.img.src = "Images/asteroid 1.1.png";
      //   } else if( count === 2) {
      //     asteroid.img.src = "Images/asteroid 1.2.png";
      //   } else if ( count === 3) {
      //     asteroid.img.src = "Images/asteroid 1.3.png";
      //   } else if (count === 4){
      //     asteroid.img.src = "Images/asteroid 1.4.png";
      //   } else if (count === 5) {
      //     asteroid.img.src = "Images/asteroid 1.5.png";
      //   } else if (count === 6) {
      //     count = 0;
      //     asteroid.img.src = "Images/asteroid.png";
      //   }
      // }  
    })
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
    setTimeout (()=>{
      this.rotateAsteroid();
    },1000)

    this.enemyArray.forEach((enemy) => {
      enemy.wallCollisions();
      enemy.movement();
      
    }); 

    this.asteroidArray.forEach((asteroid) => {
      asteroid.movement(true);
    });
    this.spaceship.projectileArray.forEach((projectile) => {
      projectile.movement(true);
    });

    this.enemyArray.forEach ((enemy)=>{
      enemy.shoot();
      enemy.projectileArray.forEach((projectile) => {
        projectile.movement(false);
        // console.log(projectileArray);

      });
    })  

    this.checkCollisionSpaceshipEnemy();
    this.checkCollisionProjectileEnemy();
    this.checkCollisionAsterpodSpaceship();
    this.checkCollisionEnemyAsteroid();
    this.checkCollisionProjectileEnemySpaceship();

    //TODO DRAW ELEMENTS

    this.bgDraw();
    this.lifeDraw();

    this.spaceship.projectileArray.forEach((projectile) => {
      projectile.draw();
    });

    this.enemyArray.forEach((enemy)=>{
      enemy.draw();
      enemy.projectileArray.forEach ((projectile)=>{
        projectile.draw();
      })
    })


    this.asteroidArray.forEach((asteroid) => {
      asteroid.draw();
    });

    this.spaceship.draw();

    //TODO RECURSION

    if (this.isGameOn === true) {
      requestAnimationFrame(this.gameLoop);
    }
  };
}

class Level1 {
  //PROPERTIES
  constructor() {

    // Background
    this.bg = new Image();
    this.bg.src = "Images/screenplay1.jpg";
    this.bgX = 0;
    this.bgY = -755;
    this.bgW = 720;
    this.bgH = 1280;

    //Player

    this.spaceship = new Spaceship1();
    this.playerLifeCount = [new Heart(1), new Heart(2), new Heart(3)];

    //Enemies
    this.enemyArray = [];
    this.explosionEnemyArray = [];


    //Asteroids
    this.asteroidArray = [];
    this.explosionAsteroidArray = [];

    //Boss 
    //Working on it
    this.boss = new Boss1();
    this.isBossActive = false;

    //General
    this.isGameOn = true;
    this.fps = 0;
  }

  //METHODS

  //Background
  bgDraw = () => {
    if (this.bgY >= 0) {
      this.bgY = -755;
    } else {
      this.bgY++;
    }

    ctx.drawImage(this.bg, 0, this.bgY, this.bgW, this.bgH);
  };


  //Player
  lifeDraw = () => {
    this.playerLifeCount.forEach((heart) => {
      ctx.drawImage(heart.img, heart.x, heart.y, heart.w, heart.h);
    });
  };

  //Enemies
  enemiesSpawn = () => {
    if (
      this.enemyArray.length === 0 ||
      this.enemyArray[0].y === canvas.height / 2
    ) {
      let randomNum = Math.random() * 3;

      if (randomNum < 1) {
        let newEnemy = new Enemy1();
        this.enemyArray.push(newEnemy);
      } else if (randomNum < 2) {
        let newEnemy = new Enemy2();
        this.enemyArray.push(newEnemy);
      } else {
        let newEnemy = new Enemy3();
        this.enemyArray.push(newEnemy);
      }
    } else if (this.enemyArray[0].y > canvas.height) {
      this.enemyArray.shift();
    }
  };

  //Asteroids 
  asteroidSpawn = () => {
    if (
      this.asteroidArray.length === 0 ||
      this.asteroidArray[this.asteroidArray.length - 1].y > canvas.height / 2
    ) {
      let newAsteroid = new Asteroid();
      this.asteroidArray.push(newAsteroid);
    } else if (this.asteroidArray[0].y > canvas.height) {
      this.asteroidArray.shift();
    }
  };

  //Boss
  bossSpawn = () => {
    if (this.fps > 1800){
      this.isBossActive = true;
      this.boss.draw();
    }
  }
  
  //Collisions

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
        this.playerLifeCount.pop();
        let newExplosion = new Explosion(enemy.x, enemy.y, enemy.w, enemy.h);
        this.explosionEnemyArray.push(newExplosion);
      } else if (this.playerLifeCount.length === 0) {
        this.gameOver();
      }
    });
  };

  checkCollisionProjectileEnemy = () => {
    this.spaceship.projectileArray.forEach((projec) => {
      this.enemyArray.forEach((enemy, indexEnemy) => {
        if (
          projec.x < enemy.x + enemy.w &&
          projec.x + enemy.w > enemy.x + 5 &&
          enemy.y < projec.y + projec.h &&
          enemy.h + enemy.y > projec.y
        ) {
          count.innerText = Number(count.innerText) + 5;
          this.enemyArray.splice(indexEnemy, 1);
          let newExplosion = new Explosion(enemy.x, enemy.y, enemy.w, enemy.h);
          this.explosionEnemyArray.push(newExplosion);
        }
      });
    });
  };

  checkCollisionProjectileEnemySpaceship = () => {
    this.enemyArray.forEach((enemy) => {
      enemy.projectileArray.forEach((projectile, indexProjec) => {
        if (
          projectile.x - 5 < this.spaceship.x + this.spaceship.w &&
          projectile.x - 5 + this.spaceship.w > this.spaceship.x &&
          projectile.y - 5 < this.spaceship.y + this.spaceship.h &&
          projectile.h + projectile.y - 5 > this.spaceship.y
        ) {
          enemy.projectileArray.splice(indexProjec, 1);
          this.playerLifeCount.pop();
        } else if (this.playerLifeCount.length === 0) {
          this.gameOver();
        }
      });
    });
  };

  checkCollisionProjectileSpaceshipAsteroid = () => {
    this.asteroidArray.forEach((asteroid, indexAsteroid) => {
      this.spaceship.projectileArray.forEach((projectile, indexProjec) => {
        if (
          projectile.x < asteroid.x + asteroid.w &&
          projectile.x + asteroid.w > asteroid.x &&
          projectile.y < asteroid.y + asteroid.h &&
          projectile.h + projectile.y > asteroid.y
        ) {
          let newExplosion = new ExplosionAsteroid(
            asteroid.x,
            asteroid.y,
            asteroid.w,
            asteroid.h
          );
          this.explosionAsteroidArray.push(newExplosion);

          this.spaceship.projectileArray.splice(indexProjec, 1);
          this.asteroidArray.splice(indexAsteroid, 1);
        }
      });
    });
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
          asteroid.y + 15 <= enemy.y + enemy.h &&
          asteroid.h + asteroid.y >= enemy.y + 15 &&
          enemy.isMovingRight === false
        ) {
          enemy.isMovingRight = true;
        }
      });
    });
  };

  checkCollisionAsterpodSpaceship = () => {
    this.asteroidArray.forEach((asteroid, indexAsteroid) => {
      if (
        asteroid.x - 10 < this.spaceship.x + this.spaceship.w &&
        asteroid.x - 10 + this.spaceship.w > this.spaceship.x &&
        asteroid.y - 10 < this.spaceship.y + this.spaceship.h &&
        asteroid.h - 10 + asteroid.y > this.spaceship.y &&
        this.playerLifeCount.length > 0
      ) {
        let newExplosion = new ExplosionAsteroid(
          asteroid.x,
          asteroid.y,
          asteroid.w,
          asteroid.h
        );
        this.explosionAsteroidArray.push(newExplosion);
        
        this.asteroidArray.splice(indexAsteroid, 1);
        this.playerLifeCount.pop();
      } else if (this.playerLifeCount.length === 0) {
        this.gameOver();
      }
    });
  };

  checkCollisionProjectileBossSpaceship = () => {
    this.boss.projectileArray.forEach((projectile, indexProjec) => {
      if (
        projectile.x - 5 < this.spaceship.x + this.spaceship.w &&
        projectile.x - 5 + this.spaceship.w > this.spaceship.x &&
        projectile.y - 5 < this.spaceship.y + this.spaceship.h &&
        projectile.h + projectile.y - 5 > this.spaceship.y
      ) {
        this.boss.projectileArray.splice(indexProjec, 1);
        this.playerLifeCount.pop();
      }
    });
   
  };

  checkCollisionProjectileBoss = () => {
    this.spaceship.projectileArray.forEach((projec, indexProjec) => {
      if (
        projec.x < this.boss.x + this.boss.w &&
        projec.x + this.boss.w > this.boss.x + 5 &&
        this.boss.y < projec.y + projec.h &&
        this.boss.h + this.boss.y > projec.y
      ) {
        this.boss.life--;
        this.spaceship.projectileArray.splice(indexProjec, 1);
      } 
    });

    if (this.boss.life === 0) {
      count.innerText = Number(count.innerText) + 100;
      let newExplosion = new Explosion(this.boss.x, this.boss.y, this.boss.w, this.boss.h);
      this.explosionEnemyArray.push(newExplosion);
      this.isBossActive = false;
      this.fps = 0;
    }
  };

  gameOver = () => {
    this.isGameOn = false;
    canvas.style.display = "none";
    gameOverScreen.style.display = "flex";
    highScoreDOM.style.display = "contents";

    checkHighScore(count.innerText);

    if (count.innerText < 20) {
      count.innerText = count.innerText + " points. You can do it better!";
    } else if (count.innerText < 100) {
      count.innerText = count.innerText + " points. Great job!";
    } else if (count.innerText > 100) {
      count.innerText =
        count.innerText +
        " points. You are a hero! Humanity needs more pilots like you!";
    }

    if (
      volumBtn.innerHTML !==
      `<i class="fa-solid fa-volume-xmark" style="color: #000000;"></i>`
    ) {
      song2.pause();
      song3.play();
    }
  };

  gameLoop = () => {
    //TODO CLEAN THE CANVAS
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //TODO ACTIONS

    this.fps++;

    //Player
    this.spaceship.movement2();
    this.spaceship.projectileArray.forEach((projectile) => {
      projectile.movement(true);
    });

    //Enemies

    if (this.fps < 1800){
      this.enemiesSpawn();
    }

    this.enemyArray.forEach((enemy) => {
      enemy.wallCollisions();
      enemy.movement();
    });

    this.enemyArray.forEach((enemy) => {
      enemy.shoot();
      enemy.projectileArray.forEach((projectile) => {
        projectile.movement(false);
      });
    });

    //Asteroids

    this.asteroidSpawn();
    this.asteroidArray.forEach((asteroid) => {
      asteroid.rotateAsteroid();
    });
    this.asteroidArray.forEach((asteroid) => {
      asteroid.movement(true);
    });

    // Boss

    if (this.isBossActive === true) {
      this.boss.movement();
      this.boss.shoot();
    }
    if (this.isBossActive === true) {
      this.boss.projectileArray.forEach((projectile, index)=>{
        projectile.movement();
        projectile.wallCollisions();
        if (projectile.x > canvas.height){
          this.boss.projectileArray.splice(index, 1);
        }
      })
    }

    //Collisions
    this.checkCollisionSpaceshipEnemy();
    this.checkCollisionProjectileEnemy();
    this.checkCollisionAsterpodSpaceship();
    this.checkCollisionEnemyAsteroid();
    this.checkCollisionProjectileEnemySpaceship();
    this.checkCollisionProjectileSpaceshipAsteroid();

    if (this.isBossActive === true) {
      this.checkCollisionProjectileBossSpaceship();
      this.boss.wallCollisions();
      this.checkCollisionProjectileBoss();
    }
    //TODO DRAW ELEMENTS

    this.bgDraw();

    //Player
    this.spaceship.draw();
    this.spaceship.projectileArray.forEach((projectile) => {
      projectile.draw();
    });
    this.lifeDraw();

    //Enemies
    this.enemyArray.forEach((enemy) => {
      enemy.draw();
      enemy.projectileArray.forEach((projectile) => {
        projectile.draw();
      });
    });
    this.explosionEnemyArray.forEach((explosion, indexExp) => {
      explosion.draw();
      explosion.y++;
      setTimeout(() => {
        this.explosionEnemyArray.splice(indexExp, 1);
      }, 1000);
    });

    //Asteroids
    this.explosionAsteroidArray.forEach((explosion, indexExp) => {
      explosion.draw();
      explosion.y++;
      setTimeout(() => {
        this.explosionAsteroidArray.splice(indexExp, 1);
      }, 1000);
    });
    this.asteroidArray.forEach((asteroid) => {
      asteroid.draw();
    });

    //Boss
    this.bossSpawn();
    if (this.isBossActive === true) {
      this.boss.projectileArray.forEach((projectile) => {
        projectile.draw();
      });
    }
    //TODO RECURSION

    if (this.isGameOn === true) {
      requestAnimationFrame(this.gameLoop);
    }
  };
}

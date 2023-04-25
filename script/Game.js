class Level1 {
  //PROPERTIES
  constructor() {
    this.bg = new Image();
    this.bg.src = "Images/screenplay1.jpg";
    this.bgY = 0;


    this.spaceship = new Spaceship1();

    this.enemyArray = [];
    this.asteroidArray = [];

    this.playerLifeCount = [new Heart(1), new Heart(2), new Heart(3)];

    this.isGameOn = true;
  }

  //METHODS

  bgDraw = () => {
    this.bgY--
    // Testing movement in bg
    //ctx.drawImage(this.bg, 0, this.bgY, canvas.width, canvas.height);
   
    // if (this.bgY === -200){
    //   this.bgY = 0;
    // }
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
      let randomNum = Math.random() * 3;

      if (randomNum < 1){
        let newEnemy = new Enemy1();
        this.enemyArray.push(newEnemy);
      } else if (randomNum < 2){
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
      
      } else if (this.playerLifeCount.length === 0) {
        this.gameOver();
      }
    });
  };


  checkCollisionProjectileEnemy = () => {
    this.spaceship.projectileArray.forEach((projec) => {
      this.enemyArray.forEach((enemy, indexEnemy) => {
        if (
          projec.x  < enemy.x + enemy.w &&
          projec.x + enemy.w > enemy.x + 5 &&
          enemy.y < projec.y + projec.h &&
          enemy.h + enemy.y  > projec.y 
        ) {
          // this.enemyArray[indexEnemy].img.src = "Images/explosion-transformed.png";
          count.innerText = Number(count.innerText) + 5;
          // setTimeout(() => {
          this.enemyArray.splice(indexEnemy, 1);
          // }, 500);
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
          this.playerLifeCount.pop();
        }
      });
    })
  };

  checkCollisionProjectileSpaceshipAsteroid = () => {
    this.asteroidArray.forEach((asteroid,indexAsteroid) => {
      this.spaceship.projectileArray.forEach((projectile,indexProjec) => {
        if (
          projectile.x < asteroid.x + asteroid.w &&
          projectile.x + asteroid.w > asteroid.x &&
          projectile.y < asteroid.y + asteroid.h &&
          projectile.h + projectile.y > asteroid.y
        ) {
          this.spaceship.projectileArray.splice(indexProjec, 1);
          this.asteroidArray.splice(indexAsteroid,1)
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
        this.asteroidArray.splice(indexAsteroid, 1);
        this.playerLifeCount.pop();
      } else if (this.playerLifeCount.length === 0) {
        this.gameOver();
      }
    })
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
      count.innerText = count.innerText + " points. You are a hero! Humanity needs more pilots like you!";
    }
    

    if ((volumBtn.innerHTML !== `<i class="fa-solid fa-volume-xmark" style="color: #000000;"></i>`)){
      song2.pause();
      song3.play();
    } 

  };

  gameLoop = () => {
    //TODO CLEAN THE CANVAS
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //TODO ACTIONS


    
    this.spaceship.movement2();

    this.enemiesSpawn();
    this.asteroidSpawn();
    this.asteroidArray.forEach((asteroid) =>{
      asteroid.rotateAsteroid();
    })
    

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
      });
    })  

    this.checkCollisionSpaceshipEnemy();
    this.checkCollisionProjectileEnemy();
    this.checkCollisionAsterpodSpaceship();
    this.checkCollisionEnemyAsteroid();
    this.checkCollisionProjectileEnemySpaceship();
    this.checkCollisionProjectileSpaceshipAsteroid();

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


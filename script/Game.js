class Level1 {

    //PROPERTIES
  constructor() {
    this.bg = new Image();
    this.bg.src = "Images/screenplay2.jpg";

    this.spaceship = new Spaceship1();

    // this.enemy = new Enemy1 ()

    this.enemyArray = [];
    this.enemySeparationY = canvas.height / 2;
    
    this.isGameOn = true;

    this.life = new Heart;

    this.playerLifeCount = [this.life, this.life, this.life];

  };

  //METHODS

  bgDraw = () =>{
    ctx.drawImage(this.bg, 0, 0, canvas.width, canvas.height);
    
  }

  lifeDraw = () => {
    this.playerLifeCount.forEach((heart) =>{
      heart.x + 30;
      ctx.drawImage(heart.img,heart.x,heart.y, heart.w, heart.h ); 
    })
    
  }

  enemiesSpawn = () =>{
    if ((this.enemyArray.length === 0) || (this.enemyArray[0].y === (canvas.height / 2))){
      let newEnemy = new Enemy1();
      this.enemyArray.push(newEnemy)
    } else if (this.enemyArray[0].y > canvas.height) {
      this.enemyArray.shift();
    }
  }

  checkCollision = () => {
    this.enemyArray.forEach((element)=>{
        if(
            element.x -10 <  this.spaceship.x +  this.spaceship.w &&
            element.x -10 +  this.spaceship.w >  this.spaceship.x &&
            element.y -10 <  this.spaceship.y +  this.spaceship.h &&
            element.h -10 + element.y >  this.spaceship.y
        ) {
            this.gameOver();
        } 
    })

    //TODO Intento de colisión enemigo proyectil
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

  }
  

  gameOver= () =>{
    this.isGameOn = false;
    canvas.style.display = "none";
    gameOverScreen.style.display = "flex";
  }
  gameLoop = () =>{
    //CLEAN THE CANVAS

    // ACTIONS
    this.enemiesSpawn();

    this.enemyArray.forEach((element) =>{
      element.wallCollisions();
      element.movement();
    })

    this.spaceship.projectileArray.forEach((element) =>{
      element.movement(true);
    })

    this.checkCollision();

    //DRAW ELEMENTS

    this.bgDraw();
    this.lifeDraw();

    this.spaceship.projectileArray.forEach ((element) =>{
      console.log(element)
      element.draw();
    })

    this.enemyArray.forEach((element) =>{
      element.draw();
    })

    this.spaceship.draw();

    //RECURSION

    if (this.isGameOn === true){
        requestAnimationFrame(this.gameLoop);
    }
  }
}

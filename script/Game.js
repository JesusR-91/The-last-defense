class Level1 {

    //PROPERTIES
  constructor() {
    this.bg = new Image();
    this.bg.src = "Images/screenplay2.jpg";

    this.spaceship = new Spaceship1();

    this.enemy = new Enemy1 ();
    
    this.isGameOn = true;

  };

  //METHODS

  bgDraw = () =>{
    ctx.drawImage(this.bg, 0, 0, canvas.width, canvas.height);
    
  }

  gameLoop = () =>{
    //CLEAN THE CANVAS

    // ACTIONS

    this.enemy.movement();

    //DRAW ELEMENTS

    this.bgDraw();

    this.spaceship.draw();
    this.enemy.draw();

    //RECURSION

    if (this.isGameOn === true){
        requestAnimationFrame(this.gameLoop);
    }
  }
  

}

class Level2 {
    
}

class Level3 {
    
}


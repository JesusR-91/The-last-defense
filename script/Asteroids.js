class Asteroid {
    constructor() {
      this.img = new Image();
      this.src = "Images/spaceship.png";
      this.x = Math.random() * canvas.width;
      this.y = -20;
      this.w = 60;
      this.h = 60;
  
      this.movY = 1;
    }
  
    movement = () => {
      this.y += this.movY;
    };
  
    draw = () => {
        //console.log( this.x, this.y)
        ctx.drawImage(this.img, this.x, this.y);
      
    };
  }
  
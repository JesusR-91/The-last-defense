class Asteroid {
    constructor() {
      this.img1 = new Image();
      this.img1.src = "Images/asteroid.png";

      this.img2 = new Image();
      this.img2.src = "Images/asteroid 1.1.png";

      this.img3 = new Image();
      this.img3.src = "Images/asteroid1.2.png";

      this.img4 = new Image();
      this.img4.src = "Images/asteroid1.3.png";

      this.img5 = new Image();
      this.img5.src = "Images/asteroid1.4.png";

      this.img6 = new Image();
      this.img6.src = "Images/asteroid1.5.png";

      this.img7 = new Image();
      this.img7.src = "Images/asteroid1.6.png";

      this.x = Math.random() * (canvas.width - 20);
      this.y = -20;
      this.w = 60;
      this.h = 60;
  
      this.movY = 3;
    }
  
    movement = () => {
      this.y += this.movY;
    };
  
    draw = () => {
        //console.log( this.x, this.y)
        ctx.drawImage(this.img1, this.x, this.y, this.w, this.h);
      
    };
  }
  
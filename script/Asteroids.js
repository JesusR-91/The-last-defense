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

    this.imgArray = [
      this.img1,
      this.img2,
      this.img3,
      this.img4,
      this.img5,
      this.img6,
      this.img7,
    ];

    this.x = Math.random() * (canvas.width - 20);
    this.y = -20;
    this.w = 60;
    this.h = 60;

    this.movY = 3;

    this.frames = 0;
  }

  movement = () => {
    this.y += this.movY;
  };

  draw = () => {
    ctx.drawImage(this.img1, this.x, this.y, this.w, this.h);
  };

  rotateAsteroid = () => {
    for (let i = 0; i < 7; i++) {
      this.frames++;
      if (this.frames === 60) {
        this.img1 = this.imgArray[1];
      } else if (this.frames === 120) {
        this.img1 = this.imgArray[2];
      } else if (this.frames === 180) {
        this.img1 = this.imgArray[3];
      } else if (this.frames === 240) {
        this.img1 = this.imgArray[4];
      } else if (this.frames === 300) {
        this.img1 = this.imgArray[5];
      } else if (this.frames === 360) {
        this.frames = 0;
        this.img1 = this.imgArray[6];
      }
    }
  };
}

class ExplosionAsteroid {
  constructor (x, y, w, h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.img = new Image();
    this.img.src = "Images/asteroid-explosion.png";
  }

  draw = () =>{
    ctx.drawImage (this.img, this.x, this.y, this.w, this.h);
  }
}
class Enemy1 {

    constructor () {
        this.img = new Image();
        this.img.src = "Images/enemy1.png";

        this.x = (Math.random() * canvas.width);
        this.y = -20;
        this.w = 70;
        this.h = 100;
        this.movX = 2;
        this.movY = 2;
    }


    draw = () => {
        ctx.drawImage(this.img, this.x, -20, this.w, this.h )
    }

    movement = () =>{
        if (this.x >= 0 ){
            this.x -= this.movX;
        } else if (this.x <= canvas.width){
            this.y += this.movX;
        }
    }

}
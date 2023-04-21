class Spaceship1 {
    constructor() {
        this.img = new Image();
        this.img.src = "Images/spaceship1.png"

        this.x = (canvas.width / 2) - 35;
        this.y = canvas.height - 120;
        this.w = 70;
        this.h = 100;

        this.mov = 30;

    }

    draw = () =>{
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    }

    movement = (event) => {
        if (event.code === "ArrowUp" && (this.y >= (canvas.height / 2))) {
            this.y -= this.mov;
        } else if (event.code === "ArrowDown" && (this.y <= (canvas.height - this.h))) {
            this.y += this.mov;
        } else if (event.code === "ArrowRight" && (this.x <= (canvas.width - this.w))) {
            this.x += this.mov;
        } else if (event.code === "ArrowLeft" && (this.x >= 0)) {
            this.x -= this.mov;
        }
    }
}



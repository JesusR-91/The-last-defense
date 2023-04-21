class Spaceship1 {
    constructor() {
        this.img = new Image();
        this.img.src = "Images/spaceship1.png"

        this.x = (canvas.width / 2) - 35;
        this.y = canvas.height - 120;
        this.w = 70;
        this.h = 100;

        this.mov = 30;

        this.projectileArray = [];

        this.isShooting = false;
       
       
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

    shoot = (event) =>{

        if (event.code === "Space" && this.isShooting === false) {
            let newProj = new Projectile(this.x +(this.w/2), this.y)
            this.projectileArray.push(newProj);
            console.log(this.projectileArray)
            this.isShooting = true;
        } else if (this.isShooting === true){
            setTimeout(()=>{
                this.isShooting = false;
            },750)

        }else if ( this.projectileArray[0].x < 0){
            this.projectileArray.shift();
        }

    }

}

class Heart {
    constructor(){
        this.img = new Image();
        this.img.src = "Images/heart.png";
        this.x = 30;
        this.y = 15;
        this.w = 20;
        this.h = 20;
    }
}





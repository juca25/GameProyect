class Platform {
    constructor(ctx){   
        this.ctx = ctx
        this.position = {
            x: 1000,
            y: 275
        }
        this.width = 200;
        this.height = 20;
        this.slideSpeed = 5;

        this.image2 = new Image();
        this.image2.src = '/src/img/pngwing.com.png'

    }
    
    draw(){
        this.ctx.drawImage(this.image2, this.position.x, this.position.y, this.width, this.height);
        // this.ctx.fillStyle = 'yellow'
        // this.ctx.fillRect(this.position.x, this.position.y, this.width,this.height)
    }

    slide(){
        this.position.x -= this.slideSpeed; /* desplazara el obstaculo hacia la izquierda */
    }
}

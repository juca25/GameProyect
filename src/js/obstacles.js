class Obstacle{
    constructor(ctx, width, height, speed){
        this.ctx = ctx
        // this.size = width + height
        this.width = width
        this.height = height
        this.x = 1000 - this.width
        this.y = 400- this.height
        // this.color = 'yellow'
        this.image = new Image()
        this.image.src = '/src/img/pincho.png'
        this.slideSpeed = speed           
    }

    draw(){
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    }

    slide(){
        this.x -= this.slideSpeed /* desplazara el obstaculo hacia la izquierda */
    }
}


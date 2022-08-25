class Char {
    constructor(ctx,x,y,size){

       this.ctx = ctx

       this.x=x
       this.y=y
       this.size=size
       this.image = new Image()
       this.image.src = '/src/img/geometry-dash-icon-download-3.jpg'
       //  Jump config
       this.velY = 0
       this.gravity = 0.4
    //    this.shouldJump = false
       this.jumpCounter = 0
       // SQ rotation & Spin
       // set initial value to be zero = no rotation
    //    this.spin = 0
       // square rotate 360 º in 32 frames
    //    this.spinIncrement = 360/32
        this.keys = {
            spacePressed: false,
            arrowPressed: false,
        }
   }

   
   draw(){
       this.ctx.drawImage(this.image, this.x, this.y, this.size, this.size) 
    }

    update(){
        this.draw()
        this.y += this.velY
        if(this.y + this.size + this.velY <= 400)
        this.velY += this.gravity
        else this.velY = 0
    }
}
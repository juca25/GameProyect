class Background {

    constructor(ctx) {
      this.ctx = ctx
      this.width = 1000;
      this.height = 400;
      this.image = new Image();
      this.image.src = "/src/img/_21_geometry-dash-backgrounds_Download-Geometry-Dash-Lite-on-PC-with-BlueStacks.jpg";
      this.posX = 0;
      this.posY = 0;
      this.velX = 4;
    }
  
    draw() {
        this.ctx.fillStyle = "#282828";
        this.ctx.fillRect(0, 400, 1000, 600);


      this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height);
      this.ctx.drawImage(this.image, this.posX + this.width, this.posY, this.width, this.height);
      this.move()
    }
  
    move() {
      if (this.posX <= -this.width) {
        this.posX = 0;
      }
      this.posX -= this.velX;
    }
  }




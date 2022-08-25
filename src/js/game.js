// 1-SET DIMENSIONS DESDE GAME
// 2- DRAW ALL / CREATE ALL, dos funciones diferenciadas para pintas y generar instancias

const Game = { 
    canvas: undefined,
    width: undefined,
    timer: undefined,
    height: undefined,
    ctx: undefined,
    FPS: 60,
    presetTime : 1000,
    enemySpeed : 5,
    score : 0,
    background : undefined,
    player : undefined,
    obstacles : [],
    platforms: [],
    scoreIncrement: 0, 
    canScore : true,
    animationId : undefined,
    delay: undefined,
    counter: 0,
    secs: 0,
    difficulty: 120,
    finalScreen: undefined,
    // card : document.getElementById("card"),
    // cardScore : document.getElementById("card-score"),
    
    
    init(){
        this.canvas = document.getElementById("canvas")
        this.timer = document.querySelector('span')
        this.ctx = this.canvas.getContext("2d")

        this.finalScreen = new Image()
        this.finalScreen.src = "src/img/gameOver.jpg"
        
        this.setDimensions()
        this.start()
    },

    setDimensions() {
        this.width = 1000
        this.height = 600
        this.canvas.width = this.width
        this.canvas.height = this.height
    },

    createAll() {
      this.player = new Char(this.ctx,150, 350, 50)
      this.background= new Background(this.ctx)
      this.timeout()
    },
    
    drawAll(){
        this.drawBackgroundLine()
        this.background.draw()
        this.player.draw()
        this.obstacles.forEach(obstacle =>  obstacle.draw())
        this.platforms.forEach(platform => {
            platform.draw()
            platform.slide()
        })
        this.drawScore()
    },

    clear() {
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
    },

    start (){

        this.createAll()
        this.setEventListener() 

        this.animationId = setInterval(() => {
           
        this.counter++
        
        this.clear()
        this.drawAll()  
        this.player.update()
        
        if(this.counter % this.difficulty === 0) this.generatePlatforms()

        this.deleteObstacles()
        this.deletePlatforms()
        
        this.collisionDetector()
        this.speedIncrease()
        }, 1000/this.FPS)

    },

    drawBackgroundLine() {
        this.ctx.beginPath()
        this.ctx.moveTo(0,400)
        this.ctx.lineTo(1000,400)
        this.ctx.lineWidth = 1.9
        this.ctx.strokeStyle = "black"
        this.ctx.stroke()
    },

    collisionDetector(){

        this.obstacles.forEach((obstacle)=> {

        obstacle.slide()

            if (this.playerCollision(this.player, obstacle)){
                // clearInterval(this.animationId)
            }
    
            if(this.isPastBlock(this.player, obstacle) && this.canScore){
                this.canScore = false
                this.score++  
            }
            // -
        })

        this.platforms.forEach(platform => {
            if (
              this.player.y + this.player.size <= platform.position.y &&
              this.player.x <= platform.width + platform.position.x &&
              this.player.x + this.player.size > platform.position.x 
              && this.player.y + this.player.size + this.player.velY > platform.position.y 
            ) {
              console.log("HAY PT")
             this.player.velY = 0
             this.player.canJump = true
            }
        })
    },

    deleteObstacles() {
        this.obstacles = this.obstacles.filter(obstacle => obstacle.x + obstacle.width >= 0)
    },

    deletePlatforms() {
        this.platforms = this.platforms.filter(platform => platform.position.x + platform.width >= 0)
    },


    speedIncrease(){
    if(this.scoreIncrement +10 === this.score){
        this.scoreIncrement = this.score
        this.enemySpeed++
        this.presetTime >= 100 ? this.presetTime -= 100 : this.presetTime = this.presetTime/1.5
        // incrementa la velocidad de los bloques
        this.obstacles.forEach(block => {
            block.slideSpeed = this.enemySpeed
        })
    }
    },

    generateObstacles (){
        this.delay = this.randomNumberInterval(this.presetTime)
        this.obstacles.push(new Obstacle(this.ctx, 50,50, this.enemySpeed))
        this.timeout(this.generateObstacles, this.delay) 
    },

    generatePlatforms(){
        this.platforms.push(new Platform(this.ctx))
    },

    drawScore () {
        this.timer.innerText = this.score
    },

    randomNumberInterval(timeInterval){
        let returnTime = timeInterval
        return (Math.random() - 0.5) ?  returnTime += this.getRandomNumber(this.presetTime/3, this.presetTime*1.5) 
        : returnTime -= this.getRandomNumber(this.presetTime/5, this.presetTime/2)
    },

    getRandomNumber(min, max){
        return Math.floor(Math.random()*(max-min+1))+min
    },

    playerCollision(player, obstacle){
    
        let s2 = Object.assign(Object.create(Object.getPrototypeOf(obstacle)), obstacle)
        
        if (player.x < s2.x + s2.width && 
            player.x + player.size > s2.x && player.y < s2.y + s2.height &&
            player.y + player.size > s2.y){
            clearInterval(this.animationId)
            this.clear()
            this.ctx.drawImage(this.finalScreen, 0, 0, this.width, this.height)
            
            console.log('juegoTerminado')
        }
    },
    
    isPastBlock(player, block){
    return(
        player.x + (player.size / 2) > block.x + ((block.width + block.height)/ 4) && 
        player.x + (player.size / 2) < block.x + ((block.width + block.height)/ 4) * 3
    )
    },

    timeout() {
        setTimeout(() => {
        this.generateObstacles()
        }, this.randomNumberInterval(this.presetTime))
    }, 
    
    setEventListener(){
        document.addEventListener('keydown', ({code}) => {
            switch (code) {
                case 'ArrowUp':
                    this.player.velY -= 10
                    this.player.arrowPressed = true
                    this.canScore = true
                    this.player.canJump = false
                    break
                case 'Space':
                    this.player.velY -= 10
                    this.player.spacePressed = true
                    this.canScore = true
                    this.player.canJump = false
                    console.log('espacio')
                    break
            }
        })
    }
    // moveUp(){
        
    // }
}



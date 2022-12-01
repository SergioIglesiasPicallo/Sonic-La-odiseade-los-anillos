const Game = {
    canvas: undefined,
    ctx: undefined,
    ScoreBoard: undefined,
    fps: 60, 
    Ringhit:undefined,
    keys: {
        TOP_KEY: 87,
        SPACE: 32
    },
    
    init: function() {
        this.canvas = document.getElementById('canvas')
        this.ctx = canvas.getContext('2d')
        
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight

        this.start()
        this.audio = new Audio('musica/musica1.mp3')
        this.audio.play()
    },

    start: function() {
        this.reset()
        this.ScoreBoard.init(this.ctx)
        // Bucle de renderizado
        this.interval = setInterval(() => {
            this.clear()
            this.score += 0.01

            // Mecanismo para generar acciones cada X frames
            this.frameCounter++;

            // Generar obstaculo cada 50 frames
            if(this.frameCounter % 120 === 0){
                this.generateRing()

            }
                
            if(this.frameCounter % 50 === 0)
                this.generateObstacle()
    
            this.isCollisionRing() 
            
            if(this.isCollision())     
                this.gameOver()

            this.gameWin()
            
            this.drawAll()
            this.moveAll()

            this.clearObjects()
        }, 1000 / this.fps)
    },
        
    reset: function() {
        this.background = new Background(this.canvas.width, this.canvas.height, this.ctx) 
        this.player = new Player(this.canvas.width, this.canvas.height, this.keys, this.ctx)
        this.ScoreBoard = ScoreBoard
        this.frameCounter = 0
        this.score = 0
        this.contadorMonedas = 0
        this.obstacles = []
        this.rings =[]
    },

    clear: function () {
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
    },

    moveAll: function() {
        this.background.move()
        this.player.move()
        this.rings.forEach(ring =>{
            ring.move()
        })

        this.obstacles.forEach(obstacle => {
            obstacle.move()
        })
    },

    drawAll: function () {
        this.background.draw()
        this.player.draw(this.frameCounter)
        
        this.obstacles.forEach(obstacle => {
            obstacle.draw()
        })
         
        this.rings.forEach(ring => {
            ring.draw(this.frameCounter)
        })
        this.ScoreBoard.update(this.contadorMonedas)
    },
    generateRing: function() {
        this.rings.push(new Ring(this.canvas.width, this.player.h ,this.player.y0, this.ctx))
    },
    
    generateObstacle: function() {
        this.obstacles.push(new Obstacle(this.canvas.width, this.player.h ,this.player.y0, this.ctx))
    },

    clearObjects: function () {
        this.obstacles = this.obstacles.filter((obstacle) => obstacle.x + obstacle.w >= 0)
        this.rings = this.rings.filter((ring) => ring.x + ring.w >= 0)
    },
    
    isCollision() {
        return this.obstacles.some((obstacle) => {
            return (
                this.player.x + this.player.w >= obstacle.x &&
                this.player.x <= obstacle.x + obstacle.w &&
                this.player.y + this.player.h -45 >= obstacle.y &&
                this.player.y <= obstacle.y + obstacle.h
                
            )
            
        })
      
    },
    
    isCollisionRing(){
        const hittedRing = this.rings.find((ring) => {
            const hit =  (
                this.player.x + this.player.w >= ring.x &&
                this.player.x <= ring.x + ring.w &&
                this.player.y + this.player.h -45 >= ring.y &&
                this.player.y <= ring.y + ring.h   
            )
                if (!hit ||this.Ringhit && this.Ringhit.x === ring.x && this.Ringhit.y === ring.y ){
                    return null
                }

                return ring 
        })
      if (hittedRing) {
        this.Ringhit = hittedRing
        this.contadorMonedas++
        this.rings = this.rings.filter(ring => ring.x !== this.Ringhit.x && ring.y !== 
            this.Ringhit.y) 
      }
    },

    stop() {
        clearInterval(this.interval)
    },
    //win sin terminar 
    gameWin(){
        console.log(this.contadorMonedas)
        if (this.contadorMonedas >=10) {
            this.stop()
            (confirm("Winner winner chicken dinner"))
            
        }
    },
    gameOver() {
        this.stop()
       
        if

        (confirm("Goofer goofer, poor loser")) {
            this.audio.pause()
            document.getElementById('canvas').style.display = 'none'
            document.getElementById('start').style.display = 'block'
        }
            
    },
    
}

const cargarSonido = function (musica) {
    const sonido = document.createElement("Musica1.mp3");
    sonido.src = musica;
    sonido.setAttribute("preload", "auto");
    sonido.setAttribute("controls", "none");
    sonido.style.display = "mp3"; // <-- oculto
    document.body.appendChild(sonido);
    return sonido;
};
//no se por que falla salto


const cargarsalto = function (musica) {
    const sonido = document.createElement("salto.mp3");
    sonido.src = musica;
    sonido.setAttribute("preload", "auto");
    sonido.setAttribute("controls", "none");
    sonido.style.display = "mp3"; // <-- oculto
    document.body.appendChild(sonido);
    return sonido;
};




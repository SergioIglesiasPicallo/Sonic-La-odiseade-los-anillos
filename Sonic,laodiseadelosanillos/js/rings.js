class Ring {
    constructor(canvasW, playerH, playerY0, ctx) {
        this.ctx = ctx

        this.img = new Image()
        this.img.src = "./img/anillo.png"

        this.img.frames = 10 
        this.img.frameIndex = 1

        this.w = 60
        this.h = 50

        this.x = canvasW + 225
        this.y = 320

        this.dx = 10
        this.vy = 1
    }

    draw(frameCounter) {
        console.log("Ring")
        
    
            this.ctx.drawImage(
                this.img, 

                this.img.frameIndex * Math.floor(this.img.width / this.img.frames), 
                0,
                Math.floor(this.img.width / this.img.frames), 
                this.img.height, 

                this.x, 
                this.y, 
                this.w,
                this.h
            );

            this.animateImg(frameCounter)
        
    }


    animateImg(frameCounter) {
        if(frameCounter % 6 === 0) {
            this.img.frameIndex++

            if (this.img.frameIndex > this.img.frames -1) 
                this.img.frameIndex = 0
        }
       
    }
    move() {
        this.x -= this.dx
    }
}
class Obstacle {
    constructor(canvasW, playerH, playerY0, ctx) {
        this.ctx = ctx

        this.img = new Image()
        this.img.src = "./img/obstaculos.png"

        this.w = 50
        this.h = 45

        this.x = canvasW - 30
        this.y = playerY0 + playerH - this.h

        this.dx = 10
    }

    draw() {
        this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
        
    }

    move() {
        this.x -= this.dx
    }
}
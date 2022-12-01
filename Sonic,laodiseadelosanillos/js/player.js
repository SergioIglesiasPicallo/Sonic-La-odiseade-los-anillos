class Player {
    constructor(canvasW, canvasH, keys, ctx) {
        this.ctx = ctx
        this.keys = keys

        this.img = new Image()
        this.img.src = "./img/sonic4.png"

        this.img.frames = 4
        this.img.frameIndex = 0

        this.w = 40;
        this.h = 75;

        this.x = canvasW * 0.08;

        this.y0 = canvasH * .7
        this.y = this.y0

        this.vy = 1

        this.setControls()        
    }

    setControls() {
        document.addEventListener('keydown', (e) => {
            // console.log(e.keyCode) // Obtener KeyCodes de tecla pulsada
            if(e.keyCode === this.keys.TOP_KEY && this.y0 === this.y) {
                this.y -= 5 // Por la condición de fin de salto (move())  
                this.vy += -10
            } else if (e.keyCode === this.keys.SPACE)
                console.log("DISPARA");
        }) // 
    }

    draw(frameCounter) {
        this.ctx.drawImage(
            this.img, 
                // Calcula x del fograma actual
                this.img.frameIndex * Math.floor(this.img.width / this.img.frames), 
                0, 
                // Ancho de un fotograma
                Math.floor(this.img.width / this.img.frames), 
                this.img.height, 
                this.x, 
                this.y, 
                this.w,
                this.h
        );

        this.animateImg(frameCounter)
    }

    // cambia el fotogramas del skin cada 6 frame
    animateImg(frameCounter) {
        if(frameCounter % 6 === 0) {
            this.img.frameIndex++

            if (this.img.frameIndex > this.img.frames - 1) 
                this.img.frameIndex = 0
        }
    }

    move() {
        let gravity = 0.2

        // Detecta el fin de salto
        if(this.y >= this.y0) {
            this.y = this.y0
            this.vy = 1
        } else {
            this.vy += gravity
            this.y += this.vy
        }
    }
}

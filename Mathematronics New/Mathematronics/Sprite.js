class Sprite {
    constructor({ position, imageSrc, frameRate = 1, frameBuffer = 4, scale = 1 }) {
        this.position = position
        this.scale = scale
        this.loaded = false
        this.image = new Image()
        this.image.onload = () => {
            this.width = (this.image.width / this.frameRate) * this.scale
            this.height = this.image.height * this.scale
            this.loaded = true
        }
        this.image.src = imageSrc
        this.frameRate = frameRate
        this.currentFrame = 0
        this.frameBuffer = frameBuffer
        this.elapsedFrames = 0
    }

    draw({ bottomAligned = false } = {}) {
    if (!this.loaded) return

    const frameWidth = this.image.width / this.frameRate
    const frameHeight = this.image.height

    const cropbox = {
        position: {
            x: this.currentFrame * frameWidth,
            y: 0,
        },
        width: frameWidth,
        height: frameHeight,
    }

    // Decide Y position
    const drawY = bottomAligned
        ? this.position.y - cropbox.height * this.scale // for player (feet at position.y)
        : this.position.y                              // for tiles/map (top at position.y)

    c.drawImage(
        this.image,
        cropbox.position.x,
        cropbox.position.y,
        cropbox.width,
        cropbox.height,
        this.position.x,
        drawY,
        cropbox.width * this.scale,
        cropbox.height * this.scale
    )
}



    update() {
        this.draw()
        this.updateFrames()
    }

    updateFrames(){
        this.elapsedFrames++

        if (this.elapsedFrames % this.frameBuffer === 0){
        if(this.currentFrame < this.frameRate - 1) this.currentFrame++
        else this.currentFrame = 0
        }
    }
}

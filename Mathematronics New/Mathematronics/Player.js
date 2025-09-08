class Player extends Sprite {
    constructor({ 
        position,
        collisionBlocks,
        platformCollisionBlocks,
        imageSrc, 
        frameRate,
        scale = 1, 
        animations }) {
        super({ imageSrc, frameRate, scale })
        this.gravity = gravity
        this.position = position
        this.velocity = {
            x: 0,
            y: 1,
        },
            this.collisionBlocks = collisionBlocks
             this.platformCollisionBlocks = platformCollisionBlocks

        this.hitbox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            width: 10,
            height: 10
        }

        this.animations = animations
        this.lastDirection = 'right'

        for(let key in this.animations){
            const image = new Image()
            image.src = this.animations[key].imageSrc

            this.animations[key].image = image
        }

        this.camerabox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            width: 150,
            height: 60,
        }

    }
    switchSprite(key){
        if(this.image === this.animations[key].image || !this.loaded ) return

        this.currentFrame = 0
        this.image = this.animations[key].image
        this.frameBuffer = this.animations[key].frameBuffer
        this.frameRate = this.animations[key].frameRate

    }

    updateCamerabox(){
        this.camerabox = {
            position: {
                x: this.position.x - 55,
                y: this.position.y + 20,
            },
            width: 150,
            height: 60,
        }
    }

    shouldPanCameraToTheLeft(canvas, camera){
        const cameraboxRightSide = this.camerabox.position.x + this.camerabox.width
        const scaledDownCanvasWidth = canvas.width /4

        if (cameraboxRightSide >= scaledDownCanvasWidth){
            camera.position.x -= this.velocity.x
        }
    }

    update() {
        this.updateFrames()
        this.updateHitbox()

        this.updateCamerabox()
         c.fillStyle = 'rgba(0, 0, 255, 0.2)'
        c.fillRect(
            this.camerabox.position.x,
             this.camerabox.position.y,
              this.camerabox.width,
               this.camerabox.height)

        // draws out the image
        // c.fillStyle = 'rgba(0, 255, 0, 0.2)'
        // c.fillRect(this.position.x, this.position.y, this.width, this.height)

        //  c.fillStyle = 'rgba(255, 0, 0, 0.2)'
        // c.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height)

        this.draw({ bottomAligned: true })

        this.position.x += this.velocity.x
         this.updateHitbox()
        this.checkForHorizontalCollisions()
        this.applyGravity()
         this.updateHitbox()
        this.checkForVerticalCollisions()

    }

    updateHitbox() {
    this.hitbox = {
        position: {
            x: this.position.x + 9,              
            y: this.position.y - 19,          
        },
        width: 15,
        height: 19,
    }
}


    checkForHorizontalCollisions() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i]

            if (
                collision({
                    object1: this.hitbox,
                    object2: collisionBlock,
                })
            ) {
                if (this.velocity.x > 0) {
                    this.velocity.x = 0

                    const offset =
                      this.hitbox.position.x - this.position.x + this.hitbox.width
                    
                    this.position.x = collisionBlock.position.x - offset - 0.01
                    break
                }
                if (this.velocity.x < 0) {
                    this.velocity.x = 0

                     const offset =
                      this.hitbox.position.x - this.position.x

                    this.position.x = collisionBlock.position.x + collisionBlock.width - offset + 0.01
                    break
                }
            }
        }
    }

    applyGravity() {
        this.velocity.y += this.gravity
    this.position.y += this.velocity.y
    }

    checkForVerticalCollisions() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i]

            if (
                collision({
                    object1: this.hitbox,
                    object2: collisionBlock,
                })
            ) {
                if (this.velocity.y > 0) {
                    this.velocity.y = 0

                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height

                    this.position.y = collisionBlock.position.y - offset - 0.01
                    break
                }
                if (this.velocity.y < 0) {
                    this.velocity.y = 0

                    const offset = 
                    this.hitbox.position .y - this.position.y

                    this.position.y = collisionBlock.position.y + collisionBlock.height - offset + 0.01
                    break
                }
            }
        }

        // platformCollision blocks
         for (let i = 0; i < this.platformCollisionBlocks.length; i++) {
            const platformCollisionBlock = this.platformCollisionBlocks[i]

            if (
                collision({
                    object1: this.hitbox,
                    object2: platformCollisionBlock,
                })
            ) {
                if (this.velocity.y > 0) {
                    this.velocity.y = 0

                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height

                    this.position.y = platformCollisionBlock.position.y - offset - 0.01
                    break
                }
                if (this.velocity.y < 0) {
                    this.velocity.y = 0

                    const offset = 
                    this.hitbox.position .y - this.position.y

                    this.position.y = platformCollisionBlock.position.y +
                     platformCollisionBlock.height - offset + 0.01
                    break
                }
            }
        }
    }
}
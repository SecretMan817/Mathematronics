const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576
canvas.style.imageRendering = "pixelated";
canvas.style.imageRendering = "crisp-edges"; // fallback for some browsers
c.imageSmoothingEnabled = false;

const scaledCanvas = {
    width: canvas.width / 3,
    height: canvas.height / 3,
}

const floorCollisions2D = []
for (let i = 0; i < floorCollisions.length; i += 40) {
    floorCollisions2D.push(floorCollisions.slice(i, i + 40))
}

const collisionBlocks = []
floorCollisions2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol === 125) {
            collisionBlocks.push(
                new CollisionBlock({
                    position: {
                        x: x * 16,
                        y: y * 16,
                    },
                })
            )
        }
    })
})

const platformCollisions2D = []
for (let i = 0; i < platformCollisions.length; i += 40) {
    platformCollisions2D.push(platformCollisions.slice(i, i + 40))
}

const platformCollisionBlocks = []
platformCollisions2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol === 126) {
            platformCollisionBlocks.push(
                new CollisionBlock({
                    position: {
                        x: x * 16,
                        y: y * 16.2,
                    },
                    height: 4
                })
            )
        }
    })
})

const gravity = 0.5

const player = new Player({
    position: {
        x: 5 * 16,
        y: 15 * 16,
    },
collisionBlocks,
platformCollisionBlocks,
gravity: 0.5,
imageSrc: './Img/Movement/Idle.png',
  frameRate: 5,
  animations: {
    Idle: {
        imageSrc: './Img/Movement/Idle.png',
        frameRate: 5,
        frameBuffer: 4,
    },
    Run: {
        imageSrc: './Img/Movement/Run.png',
        frameRate: 6,
        frameBuffer: 4,
    },
        Jump: {
        imageSrc: './Img/Movement/Jump.png',
        frameRate: 5,
        frameBuffer: 3,
    },
    Fall:{
        imageSrc: './Img/Movement/Fall.png',
        frameRate: 3,
        frameBuffer: 3,
    },
    FallLeft:{
        imageSrc: './Img/Movement/Fall_left.png',
        frameRate: 3,
        frameBuffer: 3,
    },
     RunLeft:{
        imageSrc: './Img/Movement/Run_left.png',
        frameRate: 6,
        frameBuffer: 4,
    },
    IdleLeft:{
        imageSrc: './Img/Movement/Idle_left.png',
        frameRate: 5,
        frameBuffer: 4,
    },
    JumpLeft:{
        imageSrc: './Img/Movement/Jump_left.png',
        frameRate: 5,
        frameBuffer: 3,
    },
  }
})

const keys = {
    d: {
        pressed: false,
    },
    a: {
        pressed: false,
    },
}

const background = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    imageSrc: './Img/Level2.png',
})

const camera = {
    position: {
        x: 0,
        y: 0,
    },
}

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height)

    // c.save()
    // c.scale(3, 3)
    // c.translate(camera.position.x, -background.image.height + scaledCanvas.height)
    background.update()
    collisionBlocks.forEach(CollisionBlock => {
        CollisionBlock.update()
    })

    platformCollisionBlocks.forEach(block => {
        block.update()
    })

    player.update()

    player.velocity.x = 0
    if (keys.d.pressed) {
        player.switchSprite('Run')
        player.velocity.x = 3
        player.lastDirection = 'right'
       // player.shouldPanCameraToTheLeft({canvas,camera})

    } else if (keys.a.pressed){
        player.switchSprite('RunLeft')
        player.velocity.x = -3
        player.lastDirection = 'left'
    }
    else if (player.velocity.y === 0){

        if (player.lastDirection === 'right') player.switchSprite('Idle')
        else player.switchSprite('IdleLeft')
    }

   if (player.velocity.y < 0) {
    if (player.lastDirection === 'right') player.switchSprite('Jump')
    else player.switchSprite('JumpLeft')
} else if (player.velocity.y > 0) {
    if (player.lastDirection === 'right') player.switchSprite('Fall')
    else player.switchSprite('FallLeft')
}

        

    c.restore()

   
}

animate()
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = true
            break;
        case 'a':
            keys.a.pressed = true
            break;
        case 'w':
            player.velocity.y = -6
            break;
    }
})


window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
            break;
        case 'a':
            keys.a.pressed = false
            break;
    }
})
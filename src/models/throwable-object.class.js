class ThrowableObject extends MovableObject {

    world;
    y;
    FLYING_BOTTLE = new Audio('src/sounds/flyingBottle.mp3');
    BROKEN_BOTTLE = new Audio('src/sounds/brokenGlass.mp3');

    BROKEN_SET = [
        'src/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'src/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'src/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'src/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'src/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'src/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    THROW_SET = [
        'src/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'src/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'src/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'src/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];


    constructor(x, y) {
        super().loadImage('src/img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.THROW_SET);
        this.loadImages(this.BROKEN_SET);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.throw();
        this.animate();
    }

    throw() {
        this.speedY = 23;
        this.applyGravity();
        setInterval(() => {
            if (world.character.otherDirection === true) {
                this.x -= 11;
            } else {
                this.x += 11;
            }
        }, 20);
    }

    animate() {
        let isAudioPlaying = false;
        setInterval(() => {
            if (world.throwableObject.length >= 0) {
                if (world.collidingStatus == true) {
                    if (!isAudioPlaying) {
                        this.BROKEN_BOTTLE.play();
                        isAudioPlaying = true;
                    }
                    this.playAnimation(this.BROKEN_SET);
                    setTimeout(() => {
                        world.collidingStatus = false;
                        isAudioPlaying = false;
                        world.throwableObject.splice(0, 1);
                    }, 500);
                } else {
                    this.playAnimation(this.THROW_SET);
                }
            }
        }, 150);
    }

}
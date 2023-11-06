class ThrowableObject extends MovableObject {
    y;
    x;
    offsetYU = 0;
    offsetYD = 0;
    offsetXR = 0;
    offsetXL = 0;
    speed = 0;
    speedY = 25;
    height;
    width;
    lastThrow;
    img;                   // image object
    imageCache = {};       // cache for multiple images
    world;
    FLYING_BOTTLE = new Audio('src/sounds/flyingBottle.mp3');
    BROKEN_BOTTLE = new Audio('src/sounds/brokenGlass.mp3');
    isAudioPlaying;

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
        this.isAudioPlaying = false;
        this.collidingStart = true;
        this.collidingStatus = false;
        this.collidingEnemyStatus = false;
        this.applyGravity();
        this.checkMoments();
    }

    checkMoments() {
        setInterval(() => {
            if (this.collidingStart) {
                this.checkCollisions();
            }
        }, 1000 / 50);

        setInterval(() => {
            if (this.isBottleReady()) {
                this.bottleOnGround();
                this.bottleBroke();
            }
        }, 100);
    }

    throw() {
        if (world.character.otherDirection === true) {
            this.throwLeft('on');
            this.throwRight('off');
        } else if (world.character.otherDirection === false) {
            this.throwRight('on');
            this.throwLeft('off');
        }
    }

    collisionDirection(objects, index) {
        let collisionResult = this.isColliding(objects);
        if (collisionResult == 'generalCollision' || collisionResult == 'fallingCollision') {
            this.collidingEnemyStatus = true;
            this.FLYING_BOTTLE.pause();
            this.FLYING_BOTTLE.currentTime = 0;
            this.bottleTouchEndboss(objects);
            this.bottleTouchSmallEnemy(objects, index);
        }
    }

    bottleTouchEndboss(objects) {
        if (objects == this.level.endboss[0] && !this.level.endboss[0].isHurt()) {
            world.endBoss.hit();
            this.level.statusBarEndboss[0].setMainHealth(this.level.endboss[0].endbossHealth);

        }
    }

    bottleTouchSmallEnemy(objects, index) {
        if (objects == this.level.chicken[index]) {
            this.level.chicken[index].hit();
        }
    }

    throwLeft(status) {
        setInterval(() => {
            if (!this.collidingEnemyStatus && !this.collidingStatus && status == 'on') {
                this.x -= 20;
            } else if (this.collidingEnemyStatus || this.collidingStatus) {
                this.speedY = 0;
            }
        }, 40);
    }

    throwRight(status) {
        setInterval(() => {
            if (!this.collidingEnemyStatus && !this.collidingStatus && status == 'on') {
                this.x += 20;
            } else if (this.collidingEnemyStatus || this.collidingStatus) {
                this.speedY = 0;
            }
        }, 40);
    }

    bottleOnGround() {
        if (!this.isNotOnGround()) {
            this.collidingStatus = true;
            this.FLYING_BOTTLE.pause();
            this.FLYING_BOTTLE.currentTime = 0;
            this.bottleBroke();
        }
    }

    bottleBroke() {
        if (this.collidingStatus == true || this.collidingEnemyStatus == true) {
            this.playBrokeSound();
            this.playAnimation(this.BROKEN_SET);
            this.height = 100;
            this.width = 100;
            this.deleteBottle();
        }
        if (this.collidingStatus == false && this.collidingEnemyStatus == false) {
            this.playAnimation(this.THROW_SET);
        }
    }

    deleteBottle() {
        setTimeout(() => {
            this.level.bottle.splice(0, 1);
            this.collidingStart = false;
            this.BROKEN_BOTTLE.pause();
            this.BROKEN_BOTTLE.currentTime = 0;
        }, 1000);
    }

    playBrokeSound() {
        if (this.isAudioPlaying == false) {
            this.isAudioPlaying = true;
            this.BROKEN_BOTTLE.play();
        }
    }

}
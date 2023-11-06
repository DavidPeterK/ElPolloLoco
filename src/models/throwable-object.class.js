class ThrowableObject extends MovableObject {
    y;
    x;
    offsetYU = 0;
    offsetYD = 0;
    offsetXR = 0;
    offsetXL = 0;
    speed = 0;
    speedY = 20;
    height;
    width;
    lastThrow;
    world;
    FLYING_BOTTLE = new Audio('src/sounds/flyingBottle.mp3');
    BROKEN_BOTTLE = new Audio('src/sounds/brokenGlass.mp3');
    isAudioPlaying;
    level = level1;

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
        this.collidingStatus = false;
        this.collidingEnemyStatus = false;
        this.applyGravity();
        this.checkMoments();
    }

    checkMoments() {
        setInterval(() => {
            if (this.isBottleReady()) {
                this.throw();
                this.bottleOnGround();
                this.checkCollisions();
            }
        }, 1000 / 60);
    }

    throw() {
        if (world.character.otherDirection === true) {
            this.throwLeft();
        } else if (world.character.otherDirection === false) {
            this.throwRight();
        }
    }

    collisionDirection(objects, index) {
        let collisionResult = this.isColliding(objects);
        if (collisionResult == 'generalCollision' || collisionResult == 'fallingCollision') {
            this.FLYING_BOTTLE.pause();
            this.FLYING_BOTTLE.currentTime = 0;
            this.collidingEnemyStatus = true;
            this.bottleTouchEndboss(objects);
            this.bottleTouchSmallEnemy(objects, index);
        }
    }
    bottleTouchEndboss(objects) {
        if (objects == this.level.endboss[0] && !this.level.endboss[0].isHurt()) {
            this.level.endboss[0].hit();
            this.level.endboss[0].statusBarEndboss[0].setMainHealth(this.level.endboss[0].endbossHealth);
            this.bottleBroke();

        }
    }

    bottleTouchSmallEnemy(objects, index) {
        if (objects == this.level.chicken[index]) {
            this.level.chicken[index].hit();
            this.bottleBroke();
        }
    }


    throwLeft() {
        if (this.collidingEnemyStatus === false && this.collidingStatus === false) {
            this.x -= 10;
        } else {
            this.speedY = 0;
        }
    }

    throwRight() {
        if (this.collidingEnemyStatus === false && this.collidingStatus === false) {
            this.x += 10;
        } else {
            this.speedY = 0;
        }
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
        } else {
            this.playAnimation(this.THROW_SET);
        }
    }

    deleteBottle() {
        setTimeout(() => {
            this.level.bottle.splice(0, 1);
            this.BROKEN_BOTTLE.pause();
            this.BROKEN_BOTTLE.currentTime = 0;
        }, 1300);
    }

    playBrokeSound() {
        if (this.isAudioPlaying == false) {
            this.isAudioPlaying = true;
            this.BROKEN_BOTTLE.play();
        }
    }


}
class ThrowableObject extends MovableObject {
    y;
    x;
    offsetYU = 0;
    offsetYD = 0;
    offsetXR = 0;
    offsetXL = 0;
    speed = 0;
    speedY = 20;
    height = 60;
    width = 50;
    lastThrow;
    previousY;
    world;
    FLYING_BOTTLE = new Audio('src/sounds/flyingBottle.mp3');
    BROKEN_BOTTLE = new Audio('src/sounds/brokenGlass.mp3');
    collidingStatus;
    collidingEnemyStatus;
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
        this.collidingStatus = false;
        this.collidingEnemyStatus = false;
        this.isAudioPlaying = false;
        this.applyGravity();
        this.checkMoments();
    }

    checkMoments() {
        setInterval(() => {
            this.bottleBroke();
        }, 150);

        setInterval(() => {
            this.throw();
        }, 20);

        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 1000 / 60);
    }

    throw() {
        if (this.isNotOnGround() && !this.collidingEnemyStatus) {
            if (world.character.otherDirection == true && !this.isThrowing()) {
                this.throwLeft();
            } else if (world.character.otherDirection == false && !this.isThrowing()) {
                this.throwRight();
            }
        }
    }

    checkThrowObjects() {
        if (this.isBottleReady()) {
            if (!this.isNotOnGround()) {
                this.bottleBrokeOnGround();
            }
        }
    }

    collisionDirection(objects, index) {
        if (this.isBottleReady()) {
            let collisionResult = this.isColliding(objects);
            if (collisionResult !== null) {
                this.FLYING_BOTTLE.pause();
                this.FLYING_BOTTLE.currentTime = 0;
                this.bottleTouchEndboss(objects);
                this.bottleTouchSmallEnemy(objects, index);
                if (objects == this.level.coin[index]) {
                    return
                }
                if (objects == this.level.salsaBottle[index]) {
                    return
                }
            }
        }
    }

    bottleTouchEndboss(enemies) {
        if (enemies == world.endBoss && !world.endBoss.isHurt()) {
            this.collidingEnemyStatus = true;
            world.endBoss.hit();
            world.level.statusBarEndboss[0].setMainHealth(world.endBoss.endbossHealth);
        }
    }

    bottleTouchSmallEnemy(enemies, index) {
        if (enemies == world.level.chicken[index - 1]) {
            world.level.chicken[index - 1].hit(index - 1);
        }
    }

    throwBottle() {
        this.FLYING_BOTTLE.play();
        let newBottle = new ThrowableObject(world.character.x + 30, world.character.y + 170);
        this.level.bottle.push(newBottle);
        this.lastThrow = new Date().getTime();
    }

    throwLeft() {
        if (this.collidingEnemyStatus == false && this.collidingStatus == false) {
            this.x -= 5;
        } else {
            this.speedY = 0;
        }
    }

    throwRight() {
        if (this.collidingEnemyStatus == false && this.collidingStatus == false) {
            this.x += 5;
        } else {
            this.speedY = 0;
        }
    }

    bottleBrokeOnGround() {
        this.collidingStatus = true;
        this.FLYING_BOTTLE.pause();
        this.FLYING_BOTTLE.currentTime = 0;
    }

    bottleBroke() {
        if (this.isBottleReady()) {
            if (this.collidingStatus == true || this.collidingEnemyStatus == true) {
                this.playBrokeSound();
                this.height = 100;
                this.width = 100;
                this.playAnimation(this.BROKEN_SET);
                //setTimeout
                this.deleteBottle();
            } else {
                this.playAnimation(this.THROW_SET);
            }
        }
    }

    deleteBottle() {
        setTimeout(() => {
            this.isAudioPlaying = false;
            this.collidingStatus = false;
            this.collidingEnemyStatus = false;
            this.level.bottle.splice(0, 1);
        }, 500);
    }

    playBrokeSound() {
        if (this.isAudioPlaying == false) {
            this.isAudioPlaying = true;
            this.BROKEN_BOTTLE.play();
        }
    }

}
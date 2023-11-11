class ThrowableBottle extends MovableObject {
    speed = 0;
    speedY = 25;
    world;
    FLYING_THROWOBJECT = new Audio('src/sounds/flyingBottle.mp3');
    BROKEN_THROWOBJECT = new Audio('src/sounds/brokenGlass.mp3');

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
        this.x = x; this.y = y;
        this.width = 50; this.height = 60;
        this.offsetXL = 0; this.offsetXR = 0;
        this.offsetYU = 0; this.offsetYD = 0;
        this.applyGravity();
        this.checkMoments();
    }

    checkMoments() {
        setInterval(() => {
            this.collisionWithNormalEnemy()
        }, 1000 / 60);
        setInterval(() => {
            this.collisionWithSmallEnemy();
        }, 1000 / 60);
        setInterval(() => {
            this.collisionWithEndboss();
        }, 1000 / 60);

        setInterval(() => {
            if (this.isThrowObjectReady()) {
                this.throwObjectOnGround();
                this.throwObjectBroke();
            }
        }, 100);
    }

    throw() {
        if (world.level.character[0].otherDirection === true) {
            this.throwLeft('on');
            this.throwRight('off');
        } else if (world.level.character[0].otherDirection === false) {
            this.throwRight('on');
            this.throwLeft('off');
        }
    }

    collisionDirection(objects, index) {
        let collisionResult = this.isColliding(objects);
        if (collisionResult !== null) {
            this.collidingEnemyStatus = true;
            this.flyingThrowObjectSoundPaused();
            this.throwObjectTouchEndboss(objects);
            this.throwObjectTouchSmallEnemy(objects, index);
            this.throwObjectTouchNormalEnemy(objects, index);
        }
    }

    throwObjectTouchEndboss(objects) {
        if (objects == world.level.endboss[0] && !world.level.endboss[0].isHurt()) {
            world.level.endboss[0].hit();
            world.level.statusBarEndboss[0].setStatusBar(world.level.endboss[0].endbossHealth);
        }
    }

    throwObjectTouchNormalEnemy(objects, index) {
        if (objects == world.level.normalEnemy[index]) {
            world.level.normalEnemy[index].hit();
        }
    }

    throwObjectTouchSmallEnemy(objects, index) {
        if (objects == world.level.smallEnemy[index]) {
            world.level.smallEnemy[index].hit();
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

    throwObjectOnGround() {
        if (!this.isNotOnGround()) {
            this.collidingStatus = true;
            this.flyingThrowObjectSoundPaused();
            this.throwObjectBroke();
        }
    }

    throwObjectBroke() {
        if (this.collidingStatus == true || this.collidingEnemyStatus == true) {
            this.playBrokeSound();
            this.playAnimation(this.BROKEN_SET);
            this.height = 100;
            this.width = 100;
            this.deleteThrowObject();
        }
        if (this.collidingStatus == false && this.collidingEnemyStatus == false) {
            this.playAnimation(this.THROW_SET);
        }
    }

    deleteThrowObject() {
        setTimeout(() => {
            if (!this.BROKEN_THROWOBJECT.paused) {
                this.BROKEN_THROWOBJECT.pause();
                this.BROKEN_THROWOBJECT.currentTime = 0;
            }
            this.collidingStatus = false;
            this.collidingEnemyStatus = false;
            this.y = 800;
            world.level.throwObject.splice(0, 1);
        }, 1000);
    }

    playBrokeSound() {
        if (this.isAudioPlaying == false) {
            this.isAudioPlaying = true;
            this.BROKEN_THROWOBJECT.play().catch(error => {
                console.warn('Das Abspielen wurde unterbrochen:', error);
            });
        }
    }

    flyingThrowObjectSoundPaused() {
        if (!this.FLYING_THROWOBJECT.paused) {
            this.FLYING_THROWOBJECT.pause();
            this.FLYING_THROWOBJECT.currentTime = 0;
        }
    }
}
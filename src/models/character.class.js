class CharacterPepe extends MovableObject {

    world;

    STILL_STANDING_SET = [
        'src/img/2_character_pepe/1_idle/idle/I-1.png',
        'src/img/2_character_pepe/1_idle/idle/I-2.png',
        'src/img/2_character_pepe/1_idle/idle/I-3.png',
        'src/img/2_character_pepe/1_idle/idle/I-4.png',
        'src/img/2_character_pepe/1_idle/idle/I-5.png',
        'src/img/2_character_pepe/1_idle/idle/I-6.png',
        'src/img/2_character_pepe/1_idle/idle/I-7.png',
        'src/img/2_character_pepe/1_idle/idle/I-8.png',
        'src/img/2_character_pepe/1_idle/idle/I-9.png',
        'src/img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    SLEEPING_SET = [
        'src/img/2_character_pepe/1_idle/long_idle/I-11.png',
        'src/img/2_character_pepe/1_idle/long_idle/I-12.png',
        'src/img/2_character_pepe/1_idle/long_idle/I-13.png',
        'src/img/2_character_pepe/1_idle/long_idle/I-14.png',
        'src/img/2_character_pepe/1_idle/long_idle/I-15.png',
        'src/img/2_character_pepe/1_idle/long_idle/I-16.png',
        'src/img/2_character_pepe/1_idle/long_idle/I-17.png',
        'src/img/2_character_pepe/1_idle/long_idle/I-18.png',
        'src/img/2_character_pepe/1_idle/long_idle/I-19.png',
        'src/img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];

    WALKING_SET = [
        'src/img/2_character_pepe/2_walk/W-21.png',
        'src/img/2_character_pepe/2_walk/W-22.png',
        'src/img/2_character_pepe/2_walk/W-23.png',
        'src/img/2_character_pepe/2_walk/W-24.png',
        'src/img/2_character_pepe/2_walk/W-25.png',
        'src/img/2_character_pepe/2_walk/W-26.png'
    ];

    JUMP_SET = [
        'src/img/2_character_pepe/3_jump/J-31.png',
        'src/img/2_character_pepe/3_jump/J-32.png',
        'src/img/2_character_pepe/3_jump/J-33.png',
        'src/img/2_character_pepe/3_jump/J-34.png',
        'src/img/2_character_pepe/3_jump/J-35.png',
        'src/img/2_character_pepe/3_jump/J-36.png',
        'src/img/2_character_pepe/3_jump/J-37.png',
        'src/img/2_character_pepe/3_jump/J-38.png',
        'src/img/2_character_pepe/3_jump/J-39.png'
    ];

    DEAD_SET = [
        'src/img/2_character_pepe/5_dead/D-51.png',
        'src/img/2_character_pepe/5_dead/D-52.png',
        'src/img/2_character_pepe/5_dead/D-53.png',
        'src/img/2_character_pepe/5_dead/D-54.png',
        'src/img/2_character_pepe/5_dead/D-55.png',
        'src/img/2_character_pepe/5_dead/D-56.png'
    ];


    HURT_SET = [
        'src/img/2_character_pepe/4_hurt/H-41.png',
        'src/img/2_character_pepe/4_hurt/H-41.png',
        'src/img/2_character_pepe/4_hurt/H-42.png',
        'src/img/2_character_pepe/4_hurt/H-42.png',
        'src/img/2_character_pepe/4_hurt/H-43.png',
        'src/img/2_character_pepe/4_hurt/H-43.png'
    ];

    constructor() {
        super().loadImage('src/img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.STILL_STANDING_SET);
        this.loadImages(this.WALKING_SET);
        this.loadImages(this.JUMP_SET);
        this.loadImages(this.DEAD_SET);
        this.loadImages(this.HURT_SET);
        this.loadImages(this.SLEEPING_SET);
        this.x = 120; this.y = 163;
        this.width = 110; this.height = 270; this.speed = 5;
        this.offsetXL = 25; this.offsetXR = 35;
        this.offsetYU = 120; this.offsetYD = 20;
        this.applyGravity();
        this.animate();
        this.characterStatus();
    }

    animate() {
        setInterval(() => {
            WALKING_SOUND.pause();
            this.walkRight();
            this.walkLeft();
            this.takeALeap();
            this.throwTheObject();
            this.gamePaused();
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {
            if (!gameStop) {
                this.collisionWithNormalEnemy()
            }
        }, 1000 / 60);

        setInterval(() => {
            if (!gameStop) {
                this.collisionWithSmallEnemy();
            }
        }, 1000 / 60);

        setInterval(() => {
            if (!gameStop) {
                this.collisionWithEndboss();
            }
        }, 1000 / 60);

        setInterval(() => {
            if (!gameStop) {
                this.collisionWithCoin();
            }
        }, 1000 / 60);

        setInterval(() => {
            if (!gameStop) {
                this.collisionWithCollectableThrowObeject();
            }
        }, 1000 / 60);
    }

    characterStatus() {
        let isEnd = false;
        setInterval(() => {
            if (this.isDead() && !gameStop) {
                if (!isEnd) {
                    this.playAnimation(this.DEAD_SET);
                } else {
                    this.loadImage('src/img/2_character_pepe/5_dead/D-56.png');
                }
                setTimeout(() => {
                    isEnd = true;
                    LOSE_SOUND.play();
                    this.gameOver();
                }, 800);
            }
        }, 160);

        setInterval(() => {
            if (this.isHurt() && !this.isDead() && !gameStop) {
                this.playAnimation(this.HURT_SET);
            }
        }, 200);

        setInterval(() => {
            if (this.isNotOnGround() && !gameStop) {
                this.playAnimation(this.JUMP_SET);
            }
        }, 120);

        setInterval(() => {
            if (this.isStillStanding() && this.isNotSleeping() && !gameStop && !this.isDead()) {
                this.playAnimation(this.STILL_STANDING_SET);
            }
        }, 250);

        setInterval(() => {
            if (this.isStillStanding() && !this.isNotSleeping() && !gameStop && !this.isDead()) {
                this.playAnimation(this.SLEEPING_SET);
            }
        }, 160);

        setInterval(() => {
            if (this.world.keyboard.RIGHT && !gameStop && !this.isNotOnGround() && !this.isDead() || this.world.keyboard.LEFT && !gameStop && !this.isNotOnGround() && !this.isDead()) {
                this.lastMove = new Date().getTime();
                this.playAnimation(this.WALKING_SET);
            }
        }, 100);
    }

    collisionDirection(objects, index) {
        let collisionResult = this.isColliding(objects);
        if (collisionResult == 'fallingCollision' && objects !== null) {
            this.onThisObject(objects, index);
        } else if (collisionResult == 'generalCollision' && !this.isHurt() && objects !== null) {
            this.withThisObject(objects, index);
        }
    }

    onThisObject(objects, index) {
        if (this.isItSmallEnemy(objects)) {
            this.smallEnemyGetsDamage(objects, index);
        } else if (this.isItNormalEnemy(objects)) {
            this.normalEnemyGetsDamage(objects, index);
        } else if (this.isItCoin(objects)) {
            this.collectCoin(objects, index);
        } else if (this.isItCollectableThrowObject(objects)) {
            this.collectAThrowObject(objects, index);
        }
    }

    withThisObject(objects, index) {
        if (this.isItNormalEnemy(objects) || this.isItSmallEnemy(objects) || this.isItEndboss(objects)) {
            this.characterGetsDamage(objects, index);
        } else if (this.isItCoin(objects)) {
            this.collectCoin(objects, index);
        } else if (this.isItCollectableThrowObject(objects)) {
            this.collectAThrowObject(objects, index);
        }
    }

    characterGetsDamage(objects, index) {
        if (this.isNormalEnemyAlive(objects, index) || this.isEndbossAlive(objects) || this.isItSmallEnemy(objects)) {
            DAMAGE_SOUND.play();
            this.hit();
            this.world.level.statusBarChar[0].setStatusBar(this.mainHealth);
        }
    }

    normalEnemyGetsDamage(objects, index) {
        if (this.isNormalEnemyAlive(objects, index)) {
            this.jump();
            ENEMYDAMAGE_SOUND.play();
            this.world.level.normalEnemy[index].hit();
        }
    }

    smallEnemyGetsDamage(objects, index) {
        if (this.isSmallEnemyAlive(objects, index)) {
            ENEMYDAMAGE_SOUND.play();
            this.jump();
            this.world.level.smallEnemy[index].hit();
        }
    }

    collectAThrowObject(objects, index) {
        if (objects == world.level.collectableThrowObjects[index]) {
            if (!COLLECTBOTTLE_SOUND.paused) {
                COLLECTBOTTLE_SOUND.pause();
                COLLECTBOTTLE_SOUND.currentTime = 0;
            }
            COLLECTBOTTLE_SOUND.play();
            throwObjectsStorage += 1;
            this.world.level.collectableThrowObjects[index] = null;
        }
    }

    collectCoin(objects, index) {
        if (objects == this.world.level.coin[index]) {
            if (!COLLECTCOIN_SOUND.paused) {
                COLLECTCOIN_SOUND.pause();
                COLLECTCOIN_SOUND.currentTime = 0;
            }
            COLLECTCOIN_SOUND.play();
            coinStorage += 1;
            this.world.level.coin[index] = null;
        }
    }

    throwTheObject() {
        if (this.world.keyboard.D && !this.isThrowing() && throwObjectsStorage > 0 && !gameStop) {
            this.lastThrow = new Date().getTime();
            this.createABottle();
            this.world.level.throwObject[0].throw();
        }
    }

    takeALeap() {
        if ((this.world.keyboard.SPACE && !this.isNotOnGround() || this.world.keyboard.UP) && !this.isNotOnGround() && !gameStop) {
            this.jump();
            JUMP_SOUND.play();
        }
    }

    walkLeft() {
        if (this.world.keyboard.LEFT && this.x > this.world.level.level_start_x && !gameStop && !this.isDead()) {
            this.otherDirection = true;
            this.moveLeft();
            WALKING_SOUND.play().catch(error => {
                console.warn('Das Abspielen wurde unterbrochen:', error);
            });
        }
    }

    walkRight() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && !gameStop && !this.isDead()) {
            this.otherDirection = false;
            this.moveRight();
            WALKING_SOUND.play().catch(error => {
                console.warn('Das Abspielen wurde unterbrochen:', error);
            });
        }
    }

    gamePaused() {
        if (this.world.keyboard.P && gameActiv) {
            if (!gameStop && !this.pauseControl()) {
                this.lastActiv = new Date().getTime();
                gameStop = true;
                showOverlay('pauseWindow');
                hideOverlay('control-container')
                hideOverlay('mutePauseContainer')
            } else if (gameStop && !this.pauseControl()) {
                this.lastActiv = new Date().getTime();
                gameStop = false;
                hideOverlay('pauseWindow');
                showMobileOverlay();
                showOverlay('mutePauseContainer');
            }
        }
    }

    isStillStanding() {
        return !this.isNotOnGround() && !this.world.keyboard.RIGHT && !this.world.keyboard.LEFT;
    }

    createABottle() {
        let newThrowObject = new ThrowableBottle(
            this.x + 30, this.y + 170);
        world.level.throwObject.push(newThrowObject);
        throwObjectsStorage -= 1;
        FLYING_THROWOBJECT.play().catch(error => {
            console.warn('Das Abspielen wurde unterbrochen:', error);
        });

    }

    gameOver() {
        setTimeout(() => {
            gameStop = true;
            hideOverlay('control-container');
            showOverlay('gameOverScreen');
        }, 1000);
    }

}
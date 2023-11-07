class Character extends MovableObject {

    mainHealth = 100;
    width = 100;
    height = 250;
    previousY = 200;
    y = 180;
    x = 120;
    speed = 5;
    world;
    WALKING_SOUND = new Audio('src/sounds/running.mp3');
    DAMAGE_SOUND = new Audio('src/sounds/characterDamage.mp3');
    offsetYU = 100;
    offsetYD = 5;
    offsetXL = 20;
    offsetXR = 30;
    speedY = 0;
    otherDirection;

    STILL_STANDING_SET = [
        'src/img/2_character_pepe/1_idle/idle/I-1.png',
        'src/img/2_character_pepe/1_idle/idle/I-1.png',
        'src/img/2_character_pepe/1_idle/idle/I-2.png',
        'src/img/2_character_pepe/1_idle/idle/I-2.png',
        'src/img/2_character_pepe/1_idle/idle/I-3.png',
        'src/img/2_character_pepe/1_idle/idle/I-4.png',
        'src/img/2_character_pepe/1_idle/idle/I-4.png',
        'src/img/2_character_pepe/1_idle/idle/I-5.png',
        'src/img/2_character_pepe/1_idle/idle/I-6.png',
        'src/img/2_character_pepe/1_idle/idle/I-6.png',
        'src/img/2_character_pepe/1_idle/idle/I-7.png',
        'src/img/2_character_pepe/1_idle/idle/I-7.png',
        'src/img/2_character_pepe/1_idle/idle/I-8.png',
        'src/img/2_character_pepe/1_idle/idle/I-8.png',
        'src/img/2_character_pepe/1_idle/idle/I-8.png',
        'src/img/2_character_pepe/1_idle/idle/I-9.png',
        'src/img/2_character_pepe/1_idle/idle/I-9.png',
        'src/img/2_character_pepe/1_idle/idle/I-9.png',
        'src/img/2_character_pepe/1_idle/idle/I-10.png',
        'src/img/2_character_pepe/1_idle/idle/I-10.png',
        'src/img/2_character_pepe/1_idle/idle/I-10.png'
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
        'src/img/2_character_pepe/3_jump/J-34.png',
        'src/img/2_character_pepe/3_jump/J-35.png',
        'src/img/2_character_pepe/3_jump/J-35.png',
        'src/img/2_character_pepe/3_jump/J-35.png',
        'src/img/2_character_pepe/3_jump/J-36.png',
        'src/img/2_character_pepe/3_jump/J-37.png',
        'src/img/2_character_pepe/3_jump/J-38.png',
        'src/img/2_character_pepe/3_jump/J-38.png',
        'src/img/2_character_pepe/3_jump/J-38.png',
        'src/img/2_character_pepe/3_jump/J-39.png'
    ];

    DEAD_SET = [
        'src/img/2_character_pepe/5_dead/D-51.png',
        'src/img/2_character_pepe/5_dead/D-52.png',
        'src/img/2_character_pepe/5_dead/D-53.png',
        'src/img/2_character_pepe/5_dead/D-54.png',
        'src/img/2_character_pepe/5_dead/D-55.png',
        'src/img/2_character_pepe/5_dead/D-56.png',
        'src/img/2_character_pepe/5_dead/D-57.png'
    ];

    HURT_SET = [
        'src/img/2_character_pepe/4_hurt/H-41.png',
        'src/img/2_character_pepe/4_hurt/H-41.png',
        'src/img/2_character_pepe/4_hurt/H-42.png',
        'src/img/2_character_pepe/4_hurt/H-42.png',
        'src/img/2_character_pepe/4_hurt/H-43.png',
        'src/img/2_character_pepe/4_hurt/H-43.png'
    ];

    constructor(y, x) {
        super().loadImage('src/img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.STILL_STANDING_SET);
        this.loadImages(this.WALKING_SET);
        this.loadImages(this.JUMP_SET);
        this.loadImages(this.DEAD_SET);
        this.loadImages(this.HURT_SET);
        this.y = y;
        this.x = x;
        this.otherDirection = false;
        this.applyGravity();
        this.animate();
        this.characterStatus();
    }

    animate() {
        setInterval(() => {
            if (!this.WALKING_SOUND.paused && !this.world, keyboard.LEFT && !this.world.keyboard.RIGHT) {
                this.WALKING_SOUND.pause();
            }
            this.walkRight();
            this.walkLeft();
            this.takeALeap();
            this.throwTheObject();
            this.checkCollisions();
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

    }

    characterStatus() {
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.DEAD_SET);
            } else if (this.isHurt()) {
                this.playAnimation(this.HURT_SET);
            } else if (this.isNotOnGround()) {
                this.playAnimation(this.JUMP_SET);
            } else if (this.isStillStanding()) {
                this.playAnimation(this.STILL_STANDING_SET);
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
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
            this.DAMAGE_SOUND.play().catch(error => {
                console.warn('Das Abspielen wurde unterbrochen:', error);
            });
            this.hit();
            this.level.statusBarChar[0].setStatusBar(this.mainHealth);
        }
    }

    normalEnemyGetsDamage(objects, index) {
        if (this.isNormalEnemyAlive(objects, index)) {
            this.jump();
            this.level.normalEnemy[index].hit(index);
        }
    }

    smallEnemyGetsDamage(objects, index) {
        if (this.isSmallEnemyAlive(objects, index)) {
            this.jump();
            this.level.smallEnemy[index].hit(index);
        }
    }

    collectAThrowObject(objects, index) {
        if (objects == this.level.throwObject[index]) {
            this.world.statusBar.throwObjectsStorage += 1;
            this.level.throwObject[index] = null;
        }
    }

    collectCoin(objects, index) {
        if (objects == this.level.coin[index]) {
            this.world.statusBar.coinStorage += 1;
            this.level.coin[index] = null;
        }
    }

    throwTheObject() {
        if (this.world.keyboard.D && !this.isThrowing()) {
            this.lastThrow = new Date().getTime();
            let newThrowObject = new ThrowableObject(this.x + 30, this.y + 170);
            this.level.throwObject.push(newThrowObject);
            this.level.throwObject[0].FLYING_THROWOBJECT.play().catch(error => {
                console.warn('Das Abspielen wurde unterbrochen:', error);
            });
            this.level.throwObject[0].throw();
        }
    }

    takeALeap() {
        if ((this.world.keyboard.SPACE && !this.isNotOnGround() || this.world.keyboard.UP) && !this.isNotOnGround()) {
            this.jump();
        }
    }

    walkLeft() {
        if (this.world.keyboard.LEFT && this.x > this.world.level.level_start_x) {
            this.otherDirection = true;
            this.moveLeft();
            this.WALKING_SOUND.play().catch(error => {
                console.warn('Das Abspielen wurde unterbrochen:', error);
            });
        }
    }

    walkRight() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.otherDirection = false;
            this.moveRight();
            this.WALKING_SOUND.play().catch(error => {
                console.warn('Das Abspielen wurde unterbrochen:', error);
            });
        }
    }

    isDead() {
        return this.mainHealth <= 0;
    }

    isStillStanding() {
        return !this.isNotOnGround() && !this.world.keyboard.RIGHT && !this.world.keyboard.LEFT;
    }

    /////////////////////////////////////////////////////
    isNormalEnemyAlive(objects, index) {
        return objects == this.level.normalEnemy[index] && !this.level.normalEnemy[index].isDead();
    }
    ////////////////////////////////////////////////////
    isSmallEnemyAlive(objects, index) {
        return objects == this.level.smallEnemy[index] && !this.level.smallEnemy[index].isDead();
    }
    ////////////////////////////////////////////////////

    isItCoin(objects) {
        return this.level.coin.includes(objects);
    }

    isItCollectableThrowObject(objects) {
        return this.level.throwObject.includes(objects);
    }

    isItEndboss(objects) {
        return objects == this.level.endboss[0];
    }

    isEndbossAlive(objects) {
        return objects == this.level.endboss[0] && !this.level.endboss[0].isDead();
    }

    //schaden
    hit() {
        this.mainHealth -= 20;
        if (this.mainHealth < 0) {
            this.mainHealth = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

}
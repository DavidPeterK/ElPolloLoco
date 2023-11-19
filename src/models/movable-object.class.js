const HURT_TIME = 2; // Sekunden
const THROW_TIME = 3; // Sekunden
const BLOCK_TIME = 0.5; // Sekunden
const SLEEP_TIME = 10; // Sekunden

class MovableObject extends DrawableObject {

    speed = 0.2; speedY = 0; acceleration = 2;
    lastHit = 0; lastThrow = 0; lastActiv = 0; lastMove = 0;

    mainHealth = 100; normalEnemyHealth = 100;
    smallEnemyHealth = 100; endbossHealth = 1000;
    thisLeftOffset; thisRightOffset;

    isAudioPlaying = false; nullStatus = false; isEnd = false;
    collidingStatus = false; collidingEnemyStatus = false; otherDirection = false;
    triggerAnimation = false; isTriggert = false;

    /**
    * Applies gravity to the object, affecting its vertical position.
    * This method is called at regular intervals to simulate the effect of gravity.
    */
    applyGravity() {
        setInterval(() => {
            if (this.isNotOnGround() && !gameStop || this.speedY > 0 && !gameStop) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 35);
    }

    /**
     * Checks if the object is not on the ground.
     * Different types of objects have different ground levels, and this method checks against those.
     */
    isNotOnGround() {
        if (this instanceof ThrowableBottle) {
            return this.y < 420 - this.height;
        }
        if (this instanceof SmallChicken) {
            return this.y < 430 - this.height;
        }
        if (this instanceof CharacterPepe) {
            return this.y < 163;
        }
    }

    /**
     * Handles the impact of a hit on the object.
     * It reduces the health of the object based on the type of object and updates the last hit time.
     */
    hit() {
        this.charHit();
        this.normalEnemyHit();
        this.smallEnemyHit();
        this.endbossHit();
    }

    charHit() {
        if (this instanceof CharacterPepe) {
            this.mainHealth -= 20;
            this.lastHit = new Date().getTime();
            if (this.mainHealth < 0) {
                this.mainHealth = 0;
            }
        }
    }

    normalEnemyHit() {
        if (this instanceof Chicken) {
            this.normalEnemyHealth -= 100;
            if (this.normalEnemyHealth < 0) {
                this.normalEnemyHealth = 0;
            }
        }
    }

    smallEnemyHit() {
        if (this instanceof SmallChicken) {
            this.smallEnemyHealth -= 100;
            if (this.smallEnemyHealth < 0) {
                this.smallEnemyHealth = 0;
            }
        }
    }

    endbossHit() {
        if (this instanceof EndbossChicken) {
            this.endbossHealth -= 200;
            this.lastHit = new Date().getTime();
            if (this.endbossHealth < 0) {
                this.endbossHealth = 0;
            }
        }
    }

    /**
     * Determines if the object is colliding with another object.
     * It checks for general and falling collisions and returns the type of collision if any.
     * @param {Object} object - The object to check for collision with.
     */
    isColliding(object) {
        if (object !== null) {
            this.whatIsMyDirection();
            if (this.generalCollision(object)) {
                return 'generalCollision';  // Allgemeine Kollision
            } else if (this.fallingCollision(object)) {
                return 'fallingCollision';  // Kollision von oben 
            } else {
                return null;  // Keine Kollision
            }
        }
    }

    generalCollision(object) {
        return this.x + this.thisLeftOffset < object.x + object.width - object.offsetXR &&
            this.x + this.width - this.thisRightOffset > object.x + object.offsetXL &&
            this.y + this.offsetYU < object.y + object.height - object.offsetYD &&
            this.y + this.height - this.offsetYD > object.y + object.offsetYU;
    }

    fallingCollision(object) {
        return this.x + this.thisLeftOffset < object.x + object.width - object.offsetXR &&
            this.x + this.width - this.thisRightOffset > object.x + object.offsetXL &&
            this.y + this.offsetYU < object.y + object.height - object.offsetYD &&
            this.y + this.height - this.offsetYD > object.y + object.offsetYU - 30;
    }

    whatIsMyDirection() {
        if (world.level.character[0].otherDirection) {
            this.thisLeftOffset = this.offsetXR;
            this.thisRightOffset = this.offsetXL;
        } else {
            this.thisLeftOffset = this.offsetXL;
            this.thisRightOffset = this.offsetXR;
        }
    }

    timeSince(eventTime) {
        return (new Date().getTime() - eventTime) / 1000;
    }

    isDead() {
        if (this instanceof CharacterPepe) {
            return this.mainHealth <= 0;
        }
        if (this instanceof EndbossChicken) {
            return this.endbossHealth <= 0;
        }
        if (this instanceof Chicken) {
            return this.normalEnemyHealth <= 0;
        }
        if (this instanceof SmallChicken) {
            return this.smallEnemyHealth <= 0;
        }
    }

    pauseControl() {
        return this.timeSince(this.lastActiv) < BLOCK_TIME;
    }

    isHurt() {
        return this.timeSince(this.lastHit) < HURT_TIME;
    }

    isNotSleeping() {
        return this.timeSince(this.lastMove) < SLEEP_TIME;
    }

    isThrowObjectReady() {
        return world.level.throwObject.length > 0;
    }

    isThrowing() {
        return this.timeSince(this.lastThrow) < THROW_TIME;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 25;
    }

    collisionWithNormalEnemy() {
        world.level.normalEnemy.forEach((normalEnemys, index) => {
            if (normalEnemys !== null) {
                this.collisionDirection(normalEnemys, index);
            }
        });
    }

    collisionWithSmallEnemy() {
        world.level.smallEnemy.forEach((smallEnemys, index) => {
            if (smallEnemys !== null) {
                this.collisionDirection(smallEnemys, index);
            }
        });
    }

    collisionWithEndboss() {
        world.level.endboss.forEach((endBoss, index) => {
            if (world.level.endboss[0] !== null && !world.level.endboss[0].isHurt()) {
                this.collisionDirection(endBoss, index);
            }
        });
    }

    collisionWithCoin() {
        world.level.coin.forEach((coins, index) => {
            if (coins !== null) {
                this.collisionDirection(coins, index);
            }
        });
    }

    collisionWithCollectableThrowObject() {
        world.level.collectableThrowObjects.forEach((collectThrowObject, index) => {
            if (collectThrowObject !== null) {
                this.collisionDirection(collectThrowObject, index);
            }
        });
    }

    collectAThrowObject(objects, index) {
        if (objects == world.level.collectableThrowObjects[index]) {
            if (!COLLECTBOTTLE_SOUND.paused) {
                COLLECTBOTTLE_SOUND.pause();
                COLLECTBOTTLE_SOUND.currentTime = 0;
            }
            COLLECTBOTTLE_SOUND.play();
            throwObjectsStorage += 2;
            world.level.collectableThrowObjects[index] = null;
        }
    }

    collectCoin(objects, index) {
        if (objects == world.level.coin[index]) {
            if (!COLLECTCOIN_SOUND.paused) {
                COLLECTCOIN_SOUND.pause();
                COLLECTCOIN_SOUND.currentTime = 0;
            }
            COLLECTCOIN_SOUND.play();
            coinStorage += 1;
            world.level.coin[index] = null;
        }
    }

    deleteNormalEnemy(index) {
        setTimeout((currentIndex) => {
            world.level.normalEnemy[currentIndex].y = 800;
        }, 1000, index);
    }

    deleteSmallEnemy(index) {
        setTimeout((currentIndex) => {
            world.level.smallEnemy[currentIndex].y = 800;
        }, 1000, index);
    }

    isItNormalEnemy(objects) {
        return world.level.normalEnemy.includes(objects);
    }

    isNormalEnemyAlive(objects, index) {
        return objects == world.level.normalEnemy[index] && !world.level.normalEnemy[index].isDead();
    }

    isItSmallEnemy(objects) {
        return world.level.smallEnemy.includes(objects);
    }

    isSmallEnemyAlive(objects, index) {
        return objects == world.level.smallEnemy[index] && !world.level.smallEnemy[index].isDead();
    }

    isItEndboss(objects) {
        return objects == world.level.endboss[0];
    }

    isEndbossAlive(objects) {
        return objects == world.level.endboss[0] && !world.level.endboss[0].isDead();
    }

    isItCoin(objects) {
        return world.level.coin.includes(objects);
    }

    isItCollectableThrowObject(objects) {
        return world.level.collectableThrowObjects.includes(objects);
    }

    isCharacterLeftFromBoss() {
        return world.level.character[0].x + world.level.character[0].width - world.level.character[0].offsetXR < this.x + this.offsetXL && !this.isDead() && !this.isHurt();
    }

    isCharacterRightFromBoss() {
        return world.level.character[0].x + world.level.character[0].offsetXL > this.x + this.width - this.offsetXL && !this.isDead() && !this.isHurt();
    }

    gameOver() {
        setTimeout(() => {
            gameStop = true;
            this.mainHealth = 100;
            hideOverlay('control-container');
            showOverlay('gameOverScreen');
        }, 1000);
    }

    gameWin() {
        setTimeout(() => {
            gameStop = true;
            hideOverlay('control-container');
            showOverlay('gameWinScreen');
        }, 1000);
    }
}
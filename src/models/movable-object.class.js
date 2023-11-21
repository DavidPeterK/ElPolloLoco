const HURT_TIME = 2;
const THROW_TIME = 3;
const BLOCK_TIME = 0.5;
const SLEEP_TIME = 10;
class MovableObject extends DrawableObject {

    speed = 0.2; speedY = 0; acceleration = 2;
    lastHit = 0; lastThrow = 0; lastActiv = 0; lastMove = 0;

    mainHealth = 100; normalEnemyHealth = 100;
    smallEnemyHealth = 100; endbossHealth = 1000;
    thisLeftOffset; thisRightOffset;
    previousY;
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
     * Periodically updates the previous vertical position (Y-coordinate) of the object.
     * This method sets an interval to update the 'previousY' attribute of the object,
     * which stores its last known vertical position. This can be useful for tracking movement or changes in position.
     */
    checkPreviousY() {
        setInterval(() => {
            this.previousY = this.y;
        }, 70);
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

    /**
     * Processes the event when the character, specifically CharacterPepe, receives a hit.
     * It reduces the character's health by a specified amount and updates the time of the last hit.
     * If the character's health falls below zero, it sets the health to zero to avoid negative values.
     */
    charHit() {
        if (this instanceof CharacterPepe) {
            this.mainHealth -= 20;
            this.lastHit = new Date().getTime();
            if (this.mainHealth < 0) {
                this.mainHealth = 0;
            }
        }
    }

    /**
     * Handles the event when a normal enemy (Chicken) receives a hit.
     * It reduces the enemy's health by a specified amount. If the health falls below zero,
     * it is set to zero to avoid negative values.
     */
    normalEnemyHit() {
        if (this instanceof Chicken) {
            this.normalEnemyHealth -= 100;
            if (this.normalEnemyHealth < 0) {
                this.normalEnemyHealth = 0;
            }
        }
    }

    /**
     * Processes the event when a small enemy (SmallChicken) receives a hit.
     * This method reduces the small enemy's health by a specific amount.
     * Similar to other hit methods, if the health drops below zero, it is reset to zero.
     */
    smallEnemyHit() {
        if (this instanceof SmallChicken) {
            this.smallEnemyHealth -= 100;
            if (this.smallEnemyHealth < 0) {
                this.smallEnemyHealth = 0;
            }
        }
    }

    /**
     * Manages the hit event for the endboss (EndbossChicken).
     * It significantly reduces the endboss's health upon a hit and updates the time of the last hit.
     * Ensures that the health does not drop below zero by resetting it to zero if it does.
     */
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

    /**
     * Checks for a general collision with another object.
     * This method determines if there is any overlap between the current object and another object, considering their positions and dimensions.
     * 
     * @param {Object} object - The object to check for a collision with.
     * @returns {boolean} - True if a general collision is detected, false otherwise.
     */
    generalCollision(object) {
        return this.x + this.thisLeftOffset < object.x + object.width - object.offsetXR &&
            this.x + this.width - this.thisRightOffset > object.x + object.offsetXL &&
            this.y + this.offsetYU < object.y + object.height - object.offsetYD &&
            this.y + this.height - this.offsetYD > object.y + object.offsetYU;
    }

    /**
     * Checks for a falling collision with another object.
     * This method is similar to generalCollision but also considers the vertical movement, specifically if the current object is falling onto another object.
     * 
     * @param {Object} object - The object to check for a falling collision with.
     * @returns {boolean} - True if a falling collision is detected, false otherwise.
     */
    fallingCollision(object) {
        return this.x + this.thisLeftOffset < object.x + object.width - object.offsetXR &&
            this.x + this.width - this.thisRightOffset > object.x + object.offsetXL &&
            this.y + this.offsetYU < object.y + object.height - object.offsetYD &&
            this.y + this.height - this.offsetYD > object.y + object.offsetYU - 30 && this.previousY < this.y;
    }

    /**
     * Determines the direction of the current object based on the direction of the character.
     * This method adjusts the object's left and right offsets depending on the character's orientation.
     */
    whatIsMyDirection() {
        if (world.level.character[0].otherDirection) {
            this.thisLeftOffset = this.offsetXR;
            this.thisRightOffset = this.offsetXL;
        } else {
            this.thisLeftOffset = this.offsetXL;
            this.thisRightOffset = this.offsetXR;
        }
    }

    /**
     * Calculates the time elapsed since a given event in seconds.
     * This method is useful for timing-based operations, such as cooldowns or animations.
     */
    timeSince(eventTime) {
        return (new Date().getTime() - eventTime) / 1000;
    }

    /**
     * Checks if the character or enemy is dead based on their health.
     * This method checks the health of different types of characters and enemies (CharacterPepe, EndbossChicken, Chicken, SmallChicken)
     * and returns true if their health is zero or less, indicating they are dead.
     *
     * @returns {boolean} - True if the character or enemy is dead, false otherwise.
     */
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

    /**
     * Checks if the pause control is active.
     * This method determines if the time since the last activity is less than the defined block time.
     * 
     * @returns {boolean} - True if the block time has not been exceeded, false otherwise.
     */
    pauseControl() {
        return this.timeSince(this.lastActiv) < BLOCK_TIME;
    }

    /**
     * Determines if the character is currently hurt.
     * It checks if the time elapsed since the last hit is less than the defined hurt time.
     * 
     * @returns {boolean} - True if the character is hurt, false otherwise.
     */
    isHurt() {
        return this.timeSince(this.lastHit) < HURT_TIME;
    }

    /**
     * Checks if the character is not sleeping.
     * It determines if the time since the last movement is less than the defined sleep time.
     * 
     * @returns {boolean} - True if the character is not sleeping, false otherwise.
     */
    isNotSleeping() {
        return this.timeSince(this.lastMove) < SLEEP_TIME;
    }

    /**
     * Checks if there is at least one throwable object available.
     * 
     * @returns {boolean} - True if there is at least one throwable object, false otherwise.
     */
    isThrowObjectReady() {
        return world.level.throwObject.length > 0;
    }

    /**
     * Determines if the character is currently throwing an object.
     * This method checks if the time since the last throw is less than the defined throw time.
     * 
     * @returns {boolean} - True if the character is in the process of throwing, false otherwise.
     */
    isThrowing() {
        return this.timeSince(this.lastThrow) < THROW_TIME;
    }

    /**
     * Moves the character to the right by increasing its horizontal position.
     * The amount of movement is determined by the character's speed.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the character to the left by decreasing its horizontal position.
     * The amount of movement is determined by the character's speed.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Initiates a jump for the character.
     * Sets the vertical speed to a defined value to simulate a jump.
     */
    jump() {
        this.speedY = 25;
    }

    /**
     * Checks and handles collisions with normal enemies.
     * It iterates through all normal enemies in the level and checks for collisions with each.
     * If a collision is detected, it processes the collision accordingly.
     */
    collisionWithNormalEnemy() {
        world.level.normalEnemy.forEach((normalEnemys, index) => {
            if (normalEnemys !== null) {
                this.collisionDirection(normalEnemys, index);
            }
        });
    }

    /**
     * Checks and handles collisions with small enemies.
     * This function loops through all small enemies in the level and checks for collisions.
     * It then processes any detected collisions using the collisionDirection method.
     */
    collisionWithSmallEnemy() {
        world.level.smallEnemy.forEach((smallEnemys, index) => {
            if (smallEnemys !== null) {
                this.collisionDirection(smallEnemys, index);
            }
        });
    }

    /**
     * Checks and handles collisions with the endboss.
     * It iterates through the endboss array (if present) and processes collisions with the endboss,
     * provided the endboss is not currently hurt.
     */
    collisionWithEndboss() {
        world.level.endboss.forEach((endBoss, index) => {
            if (world.level.endboss[0] !== null && !world.level.endboss[0].isHurt()) {
                this.collisionDirection(endBoss, index);
            }
        });
    }

    /**
     * Checks and handles collisions with coins.
     * It iterates through all coins in the level and checks for collisions with each.
     * Detected collisions are processed to potentially collect the coin.
     */
    collisionWithCoin() {
        world.level.coin.forEach((coins, index) => {
            if (coins !== null) {
                this.collisionDirection(coins, index);
            }
        });
    }

    /**
     * Checks and handles collisions with collectable throw objects.
     * It loops through all collectable throw objects in the level and checks for collisions,
     * processing any detected collisions to potentially collect the throw object.
     */
    collisionWithCollectableThrowObject() {
        world.level.collectableThrowObjects.forEach((collectThrowObject, index) => {
            if (collectThrowObject !== null) {
                this.collisionDirection(collectThrowObject, index);
            }
        });
    }

    /**
     * Collects a throwable object, increasing the throw object storage and playing a sound effect.
     * 
     * @param {Object} objects - The array of collectable throw objects.
     * @param {number} index - The index of the object being collected.
     */
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

    /**
     * Collects a coin, increasing the coin storage and playing a sound effect.
     * 
     * @param {Object} objects - The array of coins.
     * @param {number} index - The index of the coin being collected.
     */
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

    /**
     * Removes a normal enemy from the game after a delay.
     * 
     * @param {number} index - The index of the normal enemy to be removed.
     */
    deleteNormalEnemy(index) {
        setTimeout((currentIndex) => {
            world.level.normalEnemy[currentIndex].y = 800;
        }, 1000, index);
    }

    /**
     * Removes a small enemy from the game after a delay.
     * 
     * @param {number} index - The index of the small enemy to be removed.
     */
    deleteSmallEnemy(index) {
        setTimeout((currentIndex) => {
            world.level.smallEnemy[currentIndex].y = 800;
        }, 1000, index);
    }

    /**
     * Checks if the given object is a normal enemy.
     * 
     * @param {Object} objects - The object to check.
     * @returns {boolean} - True if the object is a normal enemy, otherwise false.
     */
    isItNormalEnemy(objects) {
        return world.level.normalEnemy.includes(objects);
    }

    /**
     * Checks if a specific normal enemy is alive.
     * 
     * @param {Object} objects - The array of normal enemies.
     * @param {number} index - The index of the normal enemy to check.
     * @returns {boolean} - True if the normal enemy is alive, otherwise false.
     */
    isNormalEnemyAlive(objects, index) {
        return objects == world.level.normalEnemy[index] && !world.level.normalEnemy[index].isDead();
    }

    /**
     * Checks if the given object is a small enemy.
     * 
     * @param {Object} objects - The object to check.
     * @returns {boolean} - True if the object is a small enemy, otherwise false.
     */
    isItSmallEnemy(objects) {
        return world.level.smallEnemy.includes(objects);
    }

    /**
     * Checks if a specific small enemy is alive.
     * 
     * @param {Object} objects - The array of small enemies.
     * @param {number} index - The index of the small enemy to check.
     * @returns {boolean} - True if the small enemy is alive, otherwise false.
     */
    isSmallEnemyAlive(objects, index) {
        return objects == world.level.smallEnemy[index] && !world.level.smallEnemy[index].isDead();
    }

    /**
     * Checks if the given object is the endboss.
     * 
     * @param {Object} objects - The object to check.
     * @returns {boolean} - True if the object is the endboss, otherwise false.
     */
    isItEndboss(objects) {
        return objects == world.level.endboss[0];
    }

    /**
     * Checks if the endboss is alive.
     * 
     * @param {Object} objects - The endboss to check.
     * @returns {boolean} - True if the endboss is alive, otherwise false.
     */
    isEndbossAlive(objects) {
        return objects == world.level.endboss[0] && !world.level.endboss[0].isDead();
    }

    /**
     * Checks if the given object is a coin.
     * 
     * @param {Object} objects - The object to check.
     * @returns {boolean} - True if the object is a coin, otherwise false.
     */
    isItCoin(objects) {
        return world.level.coin.includes(objects);
    }

    /**
     * Checks if the given object is a collectable throw object.
     * 
     * @param {Object} objects - The object to check.
     * @returns {boolean} - True if the object is a collectable throw object, otherwise false.
     */
    isItCollectableThrowObject(objects) {
        return world.level.collectableThrowObjects.includes(objects);
    }

    /**
     * Checks if the character is positioned to the left of the boss.
     * 
     * @returns {boolean} - True if the character is to the left of the boss, otherwise false.
     */
    isCharacterLeftFromBoss() {
        return world.level.character[0].x + world.level.character[0].width - world.level.character[0].offsetXR < this.x + this.offsetXL && !this.isDead() && !this.isHurt();
    }

    /**
     * Checks if the character is positioned to the right of the boss.
     * 
     * @returns {boolean} - True if the character is to the right of the boss, otherwise false.
     */
    isCharacterRightFromBoss() {
        return world.level.character[0].x + world.level.character[0].offsetXL > this.x + this.width - this.offsetXL && !this.isDead() && !this.isHurt();
    }

    /**
     * Triggers the game over sequence.
     * It stops the game, resets the character's health, and displays the game over screen.
     */
    gameOver() {
        setTimeout(() => {
            gameStop = true;
            this.mainHealth = 100;
            hideOverlay('control-container');
            showOverlay('gameOverScreen');
        }, 1000);
    }

    /**
     * Triggers the game win sequence.
     * It stops the game and displays the game win screen.
     */
    gameWin() {
        setTimeout(() => {
            gameStop = true;
            hideOverlay('control-container');
            showOverlay('gameWinScreen');
        }, 1000);
    }
}
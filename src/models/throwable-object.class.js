class ThrowableBottle extends MovableObject {
    world;

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
        this.width = 70; this.height = 60;
        this.speed = 0; this.speedY = 25;
        this.offsetXL = 10; this.offsetXR = 10;
        this.offsetYU = 0; this.offsetYD = 0;
        this.applyGravity(); this.worldCollisions(); this.checkPreviousY();
    }

    /**
     * Handles world collisions by regularly checking for collisions with various types of enemies.
     * This method sets intervals to check for collisions with normal enemies, small enemies, the endboss,
     * and also manages interactions with throwable objects.
     */
    worldCollisions() {
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

    /**
     * Manages the action of throwing an object.
     * Depending on the direction the character is facing, it triggers the throw action either to the left or to the right.
     */
    throw() {
        if (world.level.character[0].otherDirection === true) {
            this.throwLeft('on');
            this.throwRight('off');
        } else if (world.level.character[0].otherDirection === false) {
            this.throwRight('on');
            this.throwLeft('off');
        }
    }

    /**
     * Determines the direction of collision with objects and takes appropriate actions based on the type of collision.
     * Actions include setting collision status, playing sounds, and managing interactions with different types of enemies.
     * 
     * @param {Object} objects - The object to check for collision with.
     * @param {number} index - The index of the object if applicable.
     */
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

    /**
     * Manages the interaction when a throwable object hits the endboss.
     * It processes the hit on the endboss and updates the endboss's status bar.
     * 
     * @param {Object} objects - The endboss object.
     */
    throwObjectTouchEndboss(objects) {
        if (objects == world.level.endboss[0] && !world.level.endboss[0].isHurt()) {
            world.level.endboss[0].hit();
            world.level.statusBarEndboss[0].setStatusBar(world.level.endboss[0].endbossHealth);
        }
    }

    /**
     * Handles the interaction when a throwable object hits a normal enemy.
     * It processes the hit on the normal enemy and removes the enemy from the game.
     * 
     * @param {Object} objects - The normal enemy object.
     * @param {number} index - The index of the normal enemy in the array.
     */
    throwObjectTouchNormalEnemy(objects, index) {
        if (this.isNormalEnemyAlive(objects, index)) {
            world.level.normalEnemy[index].hit();
            this.deleteNormalEnemy(index);
        }
    }

    /**
     * Manages the interaction when a throwable object hits a small enemy.
     * It processes the hit on the small enemy and removes the enemy from the game.
     * 
     * @param {Object} objects - The small enemy object.
     * @param {number} index - The index of the small enemy in the array.
     */
    throwObjectTouchSmallEnemy(objects, index) {
        if (this.isSmallEnemyAlive(objects, index)) {
            world.level.smallEnemy[index].hit();
            this.deleteSmallEnemy(index);
        }
    }

    /**
     * Controls the leftward throw of an object.
     * This method sets an interval to move the object to the left unless it has collided.
     * 
     * @param {string} status - The status indicating whether to perform the throw action.
     */
    throwLeft(status) {
        setInterval(() => {
            if (!this.collidingEnemyStatus && !this.collidingStatus && status == 'on') {
                this.x -= 20;
            } else if (this.collidingEnemyStatus || this.collidingStatus) {
                this.speedY = 0;
            }
        }, 40);
    }

    /**
     * Controls the rightward throw of an object.
     * Similar to throwLeft, this method sets an interval to move the object to the right unless it has collided.
     * 
     * @param {string} status - The status indicating whether to perform the throw action.
     */
    throwRight(status) {
        setInterval(() => {
            if (!this.collidingEnemyStatus && !this.collidingStatus && status == 'on') {
                this.x += 20;
            } else if (this.collidingEnemyStatus || this.collidingStatus) {
                this.speedY = 0;
            }
        }, 40);
    }

    /**
     * Checks if the throwable object is on the ground and updates its status accordingly.
     * If the object is on the ground, it sets the collision status to true.
     */
    throwObjectOnGround() {
        if (!this.isNotOnGround()) {
            this.collidingStatus = true;
            this.flyingThrowObjectSoundPaused();
            this.throwObjectBroke();
        }
    }

    /**
     * Manages the state of a throwable object when it breaks.
     * This method plays the breaking sound, changes the animation to the broken state, and schedules the removal of the object.
     */
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

    /**
     * Schedules the removal of a broken throwable object from the game.
     * It resets various properties and removes the object from the game after a delay.
     */
    deleteThrowObject() {
        setTimeout(() => {
            if (!BROKEN_THROWOBJECT.paused) {
                BROKEN_THROWOBJECT.pause();
                BROKEN_THROWOBJECT.currentTime = 0;
            }
            this.collidingStatus = false;
            this.collidingEnemyStatus = false;
            this.y = 800;
            world.level.throwObject.splice(0, 1);
        }, 1000);
    }

    /**
     * Plays the sound associated with a throwable object breaking.
     * It ensures that the sound is played only once by checking if it's already playing.
     */
    playBrokeSound() {
        if (this.isAudioPlaying == false) {
            this.isAudioPlaying = true;
            BROKEN_THROWOBJECT.play().catch(error => {
                console.warn('Das Abspielen wurde unterbrochen:', error);
            });
        }
    }

    /**
     * Pauses the sound of a flying throwable object.
     * This method is used to stop the flying sound effect when the object has collided or is no longer in motion.
     */
    flyingThrowObjectSoundPaused() {
        if (!FLYING_THROWOBJECT.paused) {
            FLYING_THROWOBJECT.pause();
            FLYING_THROWOBJECT.currentTime = 0;
        }
    }
}
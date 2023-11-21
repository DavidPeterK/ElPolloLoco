class CharacterPepe extends MovableObject {

    STILL_STANDING_SET = [
        'src/img/2_character_pepe/1_idle/idle/I-1.png', 'src/img/2_character_pepe/1_idle/idle/I-2.png',
        'src/img/2_character_pepe/1_idle/idle/I-3.png', 'src/img/2_character_pepe/1_idle/idle/I-4.png',
        'src/img/2_character_pepe/1_idle/idle/I-5.png', 'src/img/2_character_pepe/1_idle/idle/I-6.png',
        'src/img/2_character_pepe/1_idle/idle/I-7.png', 'src/img/2_character_pepe/1_idle/idle/I-8.png',
        'src/img/2_character_pepe/1_idle/idle/I-9.png', 'src/img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    SLEEPING_SET = [
        'src/img/2_character_pepe/1_idle/long_idle/I-11.png', 'src/img/2_character_pepe/1_idle/long_idle/I-12.png',
        'src/img/2_character_pepe/1_idle/long_idle/I-13.png', 'src/img/2_character_pepe/1_idle/long_idle/I-14.png',
        'src/img/2_character_pepe/1_idle/long_idle/I-15.png', 'src/img/2_character_pepe/1_idle/long_idle/I-16.png',
        'src/img/2_character_pepe/1_idle/long_idle/I-17.png', 'src/img/2_character_pepe/1_idle/long_idle/I-18.png',
        'src/img/2_character_pepe/1_idle/long_idle/I-19.png', 'src/img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];

    WALKING_SET = [
        'src/img/2_character_pepe/2_walk/W-21.png', 'src/img/2_character_pepe/2_walk/W-22.png',
        'src/img/2_character_pepe/2_walk/W-23.png', 'src/img/2_character_pepe/2_walk/W-24.png',
        'src/img/2_character_pepe/2_walk/W-25.png', 'src/img/2_character_pepe/2_walk/W-26.png'
    ];

    JUMP_SET = [
        'src/img/2_character_pepe/3_jump/J-31.png', 'src/img/2_character_pepe/3_jump/J-32.png',
        'src/img/2_character_pepe/3_jump/J-33.png', 'src/img/2_character_pepe/3_jump/J-34.png',
        'src/img/2_character_pepe/3_jump/J-35.png', 'src/img/2_character_pepe/3_jump/J-36.png',
        'src/img/2_character_pepe/3_jump/J-37.png', 'src/img/2_character_pepe/3_jump/J-38.png',
        'src/img/2_character_pepe/3_jump/J-39.png'
    ];

    DEAD_SET = [
        'src/img/2_character_pepe/5_dead/D-51.png', 'src/img/2_character_pepe/5_dead/D-52.png',
        'src/img/2_character_pepe/5_dead/D-53.png', 'src/img/2_character_pepe/5_dead/D-54.png',
        'src/img/2_character_pepe/5_dead/D-55.png', 'src/img/2_character_pepe/5_dead/D-56.png'
    ];


    HURT_SET = [
        'src/img/2_character_pepe/4_hurt/H-41.png', 'src/img/2_character_pepe/4_hurt/H-41.png',
        'src/img/2_character_pepe/4_hurt/H-42.png', 'src/img/2_character_pepe/4_hurt/H-42.png',
        'src/img/2_character_pepe/4_hurt/H-43.png', 'src/img/2_character_pepe/4_hurt/H-43.png'
    ];

    constructor() {
        super().loadImage('src/img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.STILL_STANDING_SET); this.loadImages(this.WALKING_SET);
        this.loadImages(this.JUMP_SET); this.loadImages(this.DEAD_SET);
        this.loadImages(this.HURT_SET); this.loadImages(this.SLEEPING_SET);
        this.setupCharacterDefaults();
        this.applyGravity(); this.animate(); this.checkPreviousY();
        this.characterStatus(); this.worldCollisions();
    }

    /**
     * Sets up default values for the character.
     */
    setupCharacterDefaults() {
        this.x = 120; this.y = 163;
        this.width = 110; this.height = 270; this.speed = 5;
        this.offsetXL = 25; this.offsetXR = 35;
        this.offsetYU = 120; this.offsetYD = 30;
        this.mainHealth = 100; this.isEnd = false;
    }

    /**
     * Handles the character's animations based on different game states.
     */
    animate() {
        setInterval(() => {
            if (!gameStop) {
                WALKING_SOUND.pause();
                this.walkRight();
                this.walkLeft();
                this.takeALeap();
                this.throwTheObject();
                this.gamePaused();
                world.camera_x = -this.x + 100;
            }
        }, 1000 / 60);
    }

    /**
     * Handles the world collisions in the game.
     * This function initiates a series of collision checks between the player and different game entities
     * such as normal enemies, small enemies, the endboss, coins, and collectable throw objects.
     * It uses requestAnimationFrame to continuously check for collisions as long as the game is not stopped.
     */
    worldCollisions() {
        const checkCollisions = () => {
            if (!gameStop) {
                this.collisionWithNormalEnemy(); // Check collision with normal enemy
                this.collisionWithSmallEnemy(); // Check collision with small enemy
                this.collisionWithEndboss(); // Check collision with the endboss
                this.collisionWithCoin(); // Check collision with coins
                this.collisionWithCollectableThrowObject(); // Check collision with collectable throw objects
            }
            requestAnimationFrame(checkCollisions); // Recursively calls itself
        };

        requestAnimationFrame(checkCollisions); // Initial call to start the collision checking process
    }

    /**
     * Manages the animation states of a character.
     * This function is responsible for initiating various animations based on the character's status,
     */
    characterStatus() {
        this.deadAnimation();
        this.damageAnimation();
        this.jumpAnimation();
        this.noMoveAnimation();
        this.sleepingAnimation();
        this.walkingAnimation();
    }

    /**
     * Determines the direction of collision with objects and executes appropriate actions.
     * This function checks for two types of collisions: 'fallingCollision' and 'generalCollision'.
     * Based on the type of collision, different actions are taken.
     * @param {Array} objects - The array of objects to check for collisions with.
     * @param {number} index - The index of the current object in the array.
     */
    collisionDirection(objects, index) {
        let collisionResult = this.isColliding(objects);
        if (collisionResult == 'fallingCollision' && objects !== null) {
            this.onThisObject(objects, index);
        } else if (collisionResult == 'generalCollision' && !this.isHurt() && objects !== null) {
            this.withThisObject(objects, index);
        }
    }

    /**
     * Defines actions when the character is on top of an object.
     */
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

    /**
     * Defines actions when the character interacts with an object in a general manner.
     * taking damage from enemies (normal, small, or endboss), collecting coins,
     * and picking up collectable throw objects.
     */
    withThisObject(objects, index) {
        if (this.isItNormalEnemy(objects) || this.isItSmallEnemy(objects) || this.isItEndboss(objects)) {
            this.characterGetsDamage(objects, index);
        } else if (this.isItCoin(objects)) {
            this.collectCoin(objects, index);
        } else if (this.isItCollectableThrowObject(objects)) {
            this.collectAThrowObject(objects, index);
        }
    }

    /**
     * Handles the character receiving damage from various sources.
     * executes the hit animation, and updates the character's health status bar.
     */
    characterGetsDamage(objects, index) {
        if (this.isNormalEnemyAlive(objects, index) || this.isEndbossAlive(objects) || this.isSmallEnemyAlive(objects, index)) {
            DAMAGE_SOUND.play();
            this.hit();
            world.level.statusBarChar[0].setStatusBar(this.mainHealth);
        }
    }

    /**
     * Applies damage to a normal enemy when the character interacts with it.
     * This includes playing a sound, executing a jump animation, and updating the enemy's status.
     */
    normalEnemyGetsDamage(objects, index) {
        if (this.isNormalEnemyAlive(objects, index)) {
            this.jump();
            ENEMYDAMAGE_SOUND.play();
            world.level.normalEnemy[index].hit();
            this.deleteNormalEnemy(index);
        }
    }

    /**
     * Applies damage to a small enemy when the character interacts with it.
     * This involves playing a sound, executing a jump animation, and updating the enemy's status.
     */
    smallEnemyGetsDamage(objects, index) {
        if (this.isSmallEnemyAlive(objects, index)) {
            ENEMYDAMAGE_SOUND.play();
            this.jump();
            world.level.smallEnemy[index].hit();
            this.deleteSmallEnemy(index);
        }
    }

    /**
     * Handles the character throwing an object.
     * This function checks if certain conditions are met (like having throw objects available)
     * and then creates and throws a new object.
     */
    throwTheObject() {
        if (world.keyboard.D && !this.isThrowing() && throwObjectsStorage > 0 && !gameStop) {
            this.lastThrow = new Date().getTime();
            this.createABottle();
            world.level.throwObject[0].throw();
        }
    }

    /**
     * Manages the character's jumping action.
     * The character will jump if the appropriate key is pressed and certain conditions are met.
     */
    takeALeap() {
        if ((world.keyboard.SPACE && !this.isNotOnGround() || world.keyboard.UP) && !this.isNotOnGround() && !gameStop) {
            this.jump();
            JUMP_SOUND.play();
        }
    }

    /**
     * Controls the character's movement to the left.
     * The character moves left if the left key is pressed and certain conditions are met.
     */
    walkLeft() {
        if (world.keyboard.LEFT && this.x > world.level.level_start_x && !gameStop && !this.isDead()) {
            this.otherDirection = true;
            this.moveLeft();
            WALKING_SOUND.play().catch(error => {
                console.warn('Das Abspielen wurde unterbrochen:', error);
            });
        }
    }

    /**
     * Controls the character's movement to the right.
     * The character moves right if the right key is pressed and certain conditions are met.
     */
    walkRight() {
        if (world.keyboard.RIGHT && this.x < world.level.level_end_x && !gameStop && !this.isDead()) {
            this.otherDirection = false;
            this.moveRight();
            WALKING_SOUND.play().catch(error => {
                console.warn('Das Abspielen wurde unterbrochen:', error);
            });
        }
    }

    /**
     * Toggles the pause state of the game.
     * It checks if the pause key is pressed and changes the game state accordingly.
     */
    gamePaused() {
        if (world.keyboard.P && gameActiv) {
            this.togglePause();
        }
    }

    /**
     * Determines if the character is standing still.
     * It returns true if the character is on the ground and not moving or hurt.
     */
    isStillStanding() {
        return !this.isNotOnGround() && !world.keyboard.RIGHT && !world.keyboard.LEFT && !this.isHurt();
    }

    /**
     * Creates a throwable object (bottle) and updates the inventory.
     * The new object is added to the game world at the character's current position.
     */
    createABottle() {
        let newThrowObject = new ThrowableBottle(
            this.x + 30, this.y + 170);
        world.level.throwObject.push(newThrowObject);
        throwObjectsStorage -= 1;
        FLYING_THROWOBJECT.play().catch(error => {
            console.warn('Das Abspielen wurde unterbrochen:', error);
        });
    }

    /**
     * Handles the character's lose animation.
     * It plays the lose animation sequence and triggers the game over sequence after a delay.
     */
    loseAnimation() {
        if (!this.isEnd) {
            this.playAnimation(this.DEAD_SET);
        } else {
            this.loadImage('src/img/2_character_pepe/5_dead/D-56.png');
        }
        setTimeout(() => {
            this.isEnd = true;
            LOSE_SOUND.play();
            this.gameOver();
        }, 800);
    }

    /**
     * Toggles the game's pause state and manages overlay visibility.
     * It shows or hides different overlays based on the game's pause state.
     */
    togglePause() {
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

    /**
     * Manages the walking animation of the character.
     * The animation is updated at regular intervals if the character is walking.
     */
    walkingAnimation() {
        setInterval(() => {
            if (world.keyboard.RIGHT && !gameStop && !this.isNotOnGround() && !this.isDead() && !this.isHurt() || world.keyboard.LEFT && !gameStop && !this.isNotOnGround() && !this.isDead() && !this.isHurt()) {
                this.lastMove = new Date().getTime();
                this.playAnimation(this.WALKING_SET);
            }
        }, 100);
    }

    /**
     * Manages the sleeping animation of the character.
     * The animation is updated at regular intervals if the character is standing still and not sleeping.
     */
    sleepingAnimation() {
        setInterval(() => {
            if (this.isStillStanding() && !this.isNotSleeping() && !gameStop && !this.isDead()) {
                this.playAnimation(this.SLEEPING_SET);
            }
        }, 160);
    }

    /**
     * Manages the idle (no move) animation of the character.
     * The animation is updated at regular intervals if the character is standing still and not moving.
     */
    noMoveAnimation() {
        setInterval(() => {
            if (this.isStillStanding() && this.isNotSleeping() && !gameStop && !this.isDead()) {
                this.playAnimation(this.STILL_STANDING_SET);
            }
        }, 250);
    }

    /**
     * Manages the jumping animation of the character.
     * The animation is updated at regular intervals if the character is in the air.
     */
    jumpAnimation() {
        setInterval(() => {
            if (this.isNotOnGround() && !gameStop && !this.isHurt()) {
                this.lastMove = new Date().getTime();
                this.playAnimation(this.JUMP_SET);
            }
        }, 120);
    }

    /**
     * Manages the damage animation of the character.
     * The animation is updated at regular intervals if the character is hurt.
     */
    damageAnimation() {
        setInterval(() => {
            if (this.isHurt() && !this.isDead() && !gameStop) {
                this.lastMove = new Date().getTime();
                this.playAnimation(this.HURT_SET);
            }
        }, 450);
    }

    /**
     * Manages the death animation of the character.
     * The animation is updated at regular intervals if the character is dead.
     */
    deadAnimation() {
        setInterval(() => {
            if (this.isDead() && !gameStop) {
                this.loseAnimation();
            }
        }, 160);
    }
}
class EndbossChicken extends MovableObject {
    endbossMusic = false;

    WALKING_SET = [
        'src/img/4_enemie_boss_chicken/1_walk/G1.png',
        'src/img/4_enemie_boss_chicken/1_walk/G2.png',
        'src/img/4_enemie_boss_chicken/1_walk/G3.png',
        'src/img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    ALERT_SET = [
        'src/img/4_enemie_boss_chicken/2_alert/G5.png',
        'src/img/4_enemie_boss_chicken/2_alert/G6.png',
        'src/img/4_enemie_boss_chicken/2_alert/G7.png',
        'src/img/4_enemie_boss_chicken/2_alert/G8.png',
        'src/img/4_enemie_boss_chicken/2_alert/G9.png',
        'src/img/4_enemie_boss_chicken/2_alert/G10.png',
        'src/img/4_enemie_boss_chicken/2_alert/G11.png',
        'src/img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    ATTACK_SET = [
        'src/img/4_enemie_boss_chicken/3_attack/G13.png',
        'src/img/4_enemie_boss_chicken/3_attack/G14.png',
        'src/img/4_enemie_boss_chicken/3_attack/G15.png',
        'src/img/4_enemie_boss_chicken/3_attack/G16.png',
        'src/img/4_enemie_boss_chicken/3_attack/G17.png',
        'src/img/4_enemie_boss_chicken/3_attack/G18.png',
        'src/img/4_enemie_boss_chicken/3_attack/G19.png',
        'src/img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    ATTACK_CHAR_SET = [
        'src/img/4_enemie_boss_chicken/3_attack/G17.png',
        'src/img/4_enemie_boss_chicken/3_attack/G18.png',
        'src/img/4_enemie_boss_chicken/3_attack/G19.png',
        'src/img/4_enemie_boss_chicken/3_attack/G20.png'
    ]

    HURT_SET = [
        'src/img/4_enemie_boss_chicken/4_hurt/G21.png',
        'src/img/4_enemie_boss_chicken/4_hurt/G22.png',
        'src/img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    DEAD_SET = [
        'src/img/4_enemie_boss_chicken/5_dead/G24.png',
        'src/img/4_enemie_boss_chicken/5_dead/G25.png',
        'src/img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    constructor() {
        super().loadImage('src/img/4_enemie_boss_chicken/1_walk/G1.png');
        this.loadImages(this.WALKING_SET);
        this.loadImages(this.ALERT_SET);
        this.loadImages(this.ATTACK_SET);
        this.loadImages(this.ATTACK_CHAR_SET);
        this.loadImages(this.HURT_SET);
        this.loadImages(this.DEAD_SET);
        this.x = 2776; this.y = 60;
        this.width = 250; this.height = 400;
        this.offsetXL = 55; this.offsetXR = 50;
        this.offsetYU = 75; this.offsetYD = 30;
        this.speed = 3.5;
        this.waitOfCharacter();
    }

    /**
     * Sets up a periodic check to trigger a specific animation and music when certain conditions are met.
     * The function checks at intervals if the character has reached a specific position and if the game is not stopped.
     * When the conditions are satisfied, it sets the level start and end positions, triggers an animation clip, and starts playing music.
     */
    waitOfCharacter() {
        setInterval(() => {
            if (this.triggerAnimation == false) {
                if (this.characterTriggerPosition() && !gameStop) {
                    world.level.level_start_x = 2415;
                    world.level.level_end_x = 2420;
                    this.triggerAnimationClip();
                    this.musicOn();
                }
            }
        }, 1000 / 10);
    }

    /**
     * Regularly checks if the introductory sequence is over and if so, triggers the attack animation.
     * After a set delay, it calls a method to end the intro sequence unless it has already been triggered.
     */
    triggertEnds() {
        setInterval(() => {
            if (this.isIntroOver() && !gameStop) {
                this.playAnimation(this.ATTACK_SET);
                setTimeout(() => {
                    if (!this.isTriggert) {
                        this.introEnds();
                    }
                }, 2500);
            }
        }, 800);
    }

    /**
     * Manages the skills of the boss character.
     * The function continuously checks if the boss is triggered and the game is not stopped.
     * If true, it moves the boss towards the character based on the character's position relative to the boss.
     */
    bossSkills() {
        this.endbossStatus();
        setInterval(() => {
            if (this.isTriggert === true && !gameStop) {
                if (this.isCharacterLeftFromBoss() && !gameStop) {
                    this.otherDirection = false;
                    this.moveLeft()
                }
                if (this.isCharacterRightFromBoss() && !gameStop) {
                    this.otherDirection = true;
                    this.moveRight();
                }
            }
        }, 20);
    }

    /**
     * Manages the animation states of the endboss.
     * This method controls various animations of the endboss such as dead, damaged, walking, and attacking animations.
     */
    endbossStatus() {
        this.deadAnimation();
        this.damageAnimation();
        this.walkingAnimation();
        this.attackAnimation();
    }

    /**
     * Determines if the endboss is close to the character.
     * This method calculates the distance between the endboss and the character and returns true if they are within a certain range.
     * 
     * @returns {boolean} - True if the endboss is close to the character, false otherwise.
     */
    closeToCharacter() {
        return (world.level.character[0].x + world.level.character[0].width - world.level.character[0].offsetXR) - (this.x + this.offsetXL) < 50 &&
            (world.level.character[0].x + world.level.character[0].width - world.level.character[0].offsetXR) - (this.x + this.offsetXL) > -150
            || (this.x + this.width - this.offsetXR) - (world.level.character[0].x + world.level.character[0].offsetXL) < 50 &&
            (this.x + this.width - this.offsetXR) - (world.level.character[0].x + world.level.character[0].offsetXL) > -150
    }

    /**
     * Checks if the character is in a specific position to trigger an event.
     * This is typically used to start a certain sequence or animation when the character reaches a particular point.
     * 
     * @returns {boolean} - True if the character is in the triggering position, false otherwise.
     */
    characterTriggerPosition() {
        return this.x > 2770 && world.level.character[0].x > 2415 && this.triggerAnimation == false;
    }

    /**
     * Determines if the introductory sequence is over.
     * This method checks if certain conditions have been met to conclude that the introduction sequence has ended.
     * 
     * @returns {boolean} - True if the introduction is over, false otherwise.
     */
    isIntroOver() {
        return this.triggerAnimation == true && this.isTriggert == false;
    }

    /**
     * Triggers a specific animation clip and sets up the end of the introduction sequence.
     * This method plays an alert animation and after a delay, changes the state to indicate that the intro sequence is over.
     */
    triggerAnimationClip() {
        this.playAnimation(this.ALERT_SET);
        setTimeout(() => {
            this.triggerAnimation = true;
            INTROCHICKEN_END.play();
            this.triggertEnds();
        }, 2500);
    }

    /**
     * Handles the conclusion of the introduction sequence.
     * It sets the endboss to be active, creates enemy characters, and adjusts the level boundaries.
     * Also, it initiates the boss's skills and actions post-introduction.
     */
    introEnds() {
        this.isTriggert = true;
        this.createEnemys();
        this.createEnemys();
        world.level.level_start_x = 0;
        world.level.level_end_x = 2776;
        this.bossSkills();
    }

    /**
     * Creates new enemy characters (normal and small chickens) at the current position of the invoking object.
     * The newly created enemies are added to their respective arrays in the game level for further interaction.
     */
    createEnemys() {
        let chickenNormal = new Chicken(this.x);
        let chickenSmall = new SmallChicken(this.x);
        world.level.normalEnemy.push(chickenNormal);
        world.level.smallEnemy.push(chickenSmall);
    }

    /**
     * Sets an interval to trigger the attack animation when certain conditions are met.
     * This method checks if the character is close to the enemy, the game is not stopped, and the enemy is not dead.
     * The attack animation is played repeatedly within the set interval.
     */
    attackAnimation() {
        setInterval(() => {
            if (this.closeToCharacter() && !gameStop && !this.isDead()) {
                this.playAnimation(this.ATTACK_CHAR_SET);
            }
        }, 230);
    }

    /**
     * Periodically triggers the walking animation based on the character's relative position to the boss.
     * The animation is played if the character is to the left or right of the boss and not too close.
     */
    walkingAnimation() {
        setInterval(() => {
            if (this.isCharacterLeftFromBoss() && !this.closeToCharacter() && !gameStop || this.isCharacterRightFromBoss() && !this.closeToCharacter() && !gameStop) {
                this.playAnimation(this.WALKING_SET);
            }
        }, 230);
    }

    /**
     * Regularly triggers the damage animation if the character is hurt, alive, and the game is not stopped.
     * This creates a visual effect of the character being damaged.
     */
    damageAnimation() {
        setInterval(() => {
            if (this.isHurt() && !this.isDead() && !gameStop) {
                this.playAnimation(this.HURT_SET);
            }
        }, 300);
    }

    /**
     * Sets an interval to execute the death animation sequence when the character is dead.
     * This method also ensures that the game is not stopped when triggering the dead animation.
     */
    deadAnimation() {
        setInterval(() => {
            if (this.isDead() && !gameStop) {
                this.endAnimation();
            }
        }, 600);
    }

    /**
     * Plays the introductory music for the endboss if it hasn't been played already.
     * It ensures that the music starts only once when the endboss is encountered.
     */
    musicOn() {
        if (!this.endbossMusic) {
            this.endbossMusic = true;
            INTROCHICKEN_SOUND.play();
            playEndbossMusic();
        }
    }

    /**
     * Manages the animation sequence for when the character or enemy dies.
     * It plays the death animation and, after a delay, triggers the game win sequence and plays the win sound.
     */
    endAnimation() {
        if (!this.isEnd) {
            this.playAnimation(this.DEAD_SET);
        } else {
            this.loadImage('src/img/4_enemie_boss_chicken/5_dead/G26.png');
        }
        setTimeout(() => {
            this.isEnd = true;
            INTROCHICKEN_MUSIC.pause();
            WIN_SOUND.play();
            this.gameWin();
        }, 1800);
    }
}
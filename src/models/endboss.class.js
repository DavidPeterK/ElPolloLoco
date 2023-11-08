class Endboss extends MovableObject {
    endbossHealth = 1000;
    height = 400;
    width = 250;
    this;
    y = 60;
    x = 2776;
    offsetYU = 75;
    offsetYD = 30;
    offsetXR = 50;
    offsetXL = 55;
    lastHit = 0;
    speed = 0.3;
    triggerAnimation;
    isTriggert;

    WALKING_SET = [
        'src/img/4_enemie_boss_chicken/1_walk/G1.png',
        'src/img/4_enemie_boss_chicken/1_walk/G1.png',
        'src/img/4_enemie_boss_chicken/1_walk/G1.png',
        'src/img/4_enemie_boss_chicken/1_walk/G1.png',
        'src/img/4_enemie_boss_chicken/1_walk/G2.png',
        'src/img/4_enemie_boss_chicken/1_walk/G2.png',
        'src/img/4_enemie_boss_chicken/1_walk/G2.png',
        'src/img/4_enemie_boss_chicken/1_walk/G2.png',
        'src/img/4_enemie_boss_chicken/1_walk/G3.png',
        'src/img/4_enemie_boss_chicken/1_walk/G3.png',
        'src/img/4_enemie_boss_chicken/1_walk/G3.png',
        'src/img/4_enemie_boss_chicken/1_walk/G3.png',
        'src/img/4_enemie_boss_chicken/1_walk/G4.png',
        'src/img/4_enemie_boss_chicken/1_walk/G4.png',
        'src/img/4_enemie_boss_chicken/1_walk/G4.png',
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
        this.loadImages(this.HURT_SET);
        this.loadImages(this.DEAD_SET);
        this.otherDirection = false;
        this.triggerAnimation = false;
        this.isTriggert = false;
        this.waitOfCharacter();
    }

    waitOfCharacter() {
        setInterval(() => {
            if (this.triggerAnimation === false) {
                this.wasTriggert();
            }
        }, 1000 / 5);
    }

    wasTriggert() {
        if (this.characterTriggerPosition()) {
            //character frozen clip
            this.level.level_start_x = 2415;
            this.level.level_end_x = 2425;
            setInterval(() => {
                if (this.triggerAnimation === false) {
                    this.triggerAnimationClip();
                }
            }, 800);
        }
    }

    triggertEnds() {
        setInterval(() => {
            if (this.isIntroNotOver()) {
                this.playAnimation(this.ATTACK_SET);
                setTimeout(() => {
                    this.introEnds();
                }, 2500);
            }
        }, 800);
    }

    bossSkills() {
        this.endbossStatus();
        setInterval(() => {
            if (this.isTriggert === true) {
                if (this.isCharacterLeftFromBoss()) {
                    this.otherDirection = false;
                    this.moveLeft()
                }
                if (this.isCharacterRightFromBoss()) {
                    this.otherDirection = true;
                    this.moveRight();
                }
            }
        }, 100);
    }

    endbossStatus() {
        setInterval(() => {

            if (this.isDead()) {
                this.playAnimation(this.DEAD_SET);
            }
            else if (this.isHurt()) {
                this.playAnimation(this.HURT_SET);
            }
            else if (this.isCharacterLeftFromBoss() || this.isCharacterRightFromBoss()) {
                this.playAnimation(this.WALKING_SET);
            }
        }, 200);
    }

    isHurt() {
        return this.timeSince(this.lastHit) < HURT_TIME;
    }

    isDead() {
        return this.endbossHealth == 0;
    }

    characterTriggerPosition() {
        return this.x > 2770 && this.level.character[0].x > 2415 && this.triggerAnimation === false;
    }

    isIntroNotOver() {
        return this.triggerAnimation === true && this.isTriggert === false;
    }

    isCharacterLeftFromBoss() {
        return ((this.level.character[0].x + this.level.character[0].width) - this.level.character[0].offsetXR) < this.x + this.offsetXL && !this.isDead() && !this.isHurt();
    }

    isCharacterRightFromBoss() {
        return this.level.character[0].x + this.level.character[0].offsetXL > ((this.x + this.width) - this.offsetXL) && !this.isDead() && !this.isHurt();
    }

    triggerAnimationClip() {
        this.playAnimation(this.ALERT_SET);
        setTimeout(() => {
            this.triggerAnimation = true;
            this.triggertEnds();
        }, 2500);
    }

    introEnds() {
        this.isTriggert = true;
        this.level.level_start_x = 0;
        this.level.level_end_x = 2776;
        this.bossSkills();
    }
}
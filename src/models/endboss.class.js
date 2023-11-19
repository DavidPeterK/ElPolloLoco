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

    endbossStatus() {
        this.deadAnimation();
        this.damageAnimation();
        this.walkingAnimation();
        this.attackAnimation();
    }

    closeToCharacter() {
        return (world.level.character[0].x + world.level.character[0].width - world.level.character[0].offsetXR) - (this.x + this.offsetXL) < 50 &&
            (world.level.character[0].x + world.level.character[0].width - world.level.character[0].offsetXR) - (this.x + this.offsetXL) > -150
            || (this.x + this.width - this.offsetXR) - (world.level.character[0].x + world.level.character[0].offsetXL) < 50 &&
            (this.x + this.width - this.offsetXR) - (world.level.character[0].x + world.level.character[0].offsetXL) > -150
    }

    characterTriggerPosition() {
        return this.x > 2770 && world.level.character[0].x > 2415 && this.triggerAnimation == false;
    }

    isIntroOver() {
        return this.triggerAnimation == true && this.isTriggert == false;
    }

    triggerAnimationClip() {
        this.playAnimation(this.ALERT_SET);
        setTimeout(() => {
            this.triggerAnimation = true;
            this.triggertEnds();
        }, 2500);
    }

    introEnds() {
        let chickenNormal = new Chicken(2670);
        let chickenSmall = new SmallChicken(2670, 300);
        this.isTriggert = true;
        world.level.normalEnemy.push(chickenNormal);
        world.level.smallEnemy.push(chickenSmall);
        world.level.level_start_x = 0;
        world.level.level_end_x = 2776;
        this.bossSkills();
    }

    attackAnimation() {
        setInterval(() => {
            if (this.closeToCharacter() && !gameStop && !this.isDead()) {
                this.playAnimation(this.ATTACK_CHAR_SET);
            }
        }, 230);
    }

    walkingAnimation() {
        setInterval(() => {
            if (this.isCharacterLeftFromBoss() && !this.closeToCharacter() && !gameStop || this.isCharacterRightFromBoss() && !this.closeToCharacter() && !gameStop) {
                this.playAnimation(this.WALKING_SET);
            }
        }, 230);
    }

    damageAnimation() {
        setInterval(() => {
            if (this.isHurt() && !this.isDead() && !gameStop) {
                this.playAnimation(this.HURT_SET);
            }
        }, 300);
    }

    deadAnimation() {
        setInterval(() => {
            if (this.isDead() && !gameStop) {
                this.endAnimation();
            }
        }, 600);
    }

    musicOn() {
        if (!this.endbossMusic) {
            this.endbossMusic = true;
            INTROCHICKEN_SOUND.play();
            playEndbossMusic();
        }
    }

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
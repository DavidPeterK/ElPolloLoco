class Endboss extends MovableObject {
    endbossHealth = 1000;
    height = 400;
    width = 250;
    world;
    y = 60;
    x = 400;
    offsetYU = 75;
    offsetYD = 30;
    offsetXR = 50;
    offsetXL = 55;
    lastHit = 0;

    WALKING_SET = [
        'src/img/4_enemie_boss_chicken/1_walk/G1.png',
        'src/img/4_enemie_boss_chicken/1_walk/G2.png',
        'src/img/4_enemie_boss_chicken/1_walk/G3.png',
        'src/img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    constructor() {
        super().loadImage('src/img/4_enemie_boss_chicken/1_walk/G1.png');
        this.loadImages(this.WALKING_SET);
        this.animate();
    }

    animate() {
        this.moveLeft();
        setInterval(() => {
            this.playAnimation(this.WALKING_SET);
        }, 100);
    }

    hit() {
        this.endbossHealth -= 200;
        if (this.endbossHealth < 0) {
            this.endbossHealth = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    endbossStatus() {
        setInterval(() => {

            if (this.isDead()) {
                this.playAnimation(this.DEAD_SET);
            }
            else if (this.isHurt()) {
                this.playAnimation(this.HURT_SET);
            }
            else if (this.isNotOnGround()) {
                this.playAnimation(this.JUMP_SET);
            }
            else if (!this.isNotOnGround() && !this.world.keyboard.RIGHT && !this.world.keyboard.LEFT) {
                this.playAnimation(this.STILL_STANDING_SET);
            }
            else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.WALKING_SET);
            }
        }, 100);
    }
    isDead() {
        return this.endbossHealth == 0;
    }

}
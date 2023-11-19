class SmallChicken extends MovableObject {

    WALKING_SET = [
        'src/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'src/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'src/img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    DEAD_SET = [
        'src/img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    constructor(x) {
        super().loadImage('src/img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.WALKING_SET);
        this.loadImages(this.DEAD_SET);
        this.x = x + Math.random() * 500;
        this.y = 375;
        this.width = 70; this.height = 55;
        this.offsetXL = 10; this.offsetXR = 10;
        this.offsetYU = 20; this.offsetYD = 0;
        this.speed = 0.5 + Math.random() * 1.5;
        this.smallEnemyHealth = 100;
        this.smallChickenMove();
        this.animate();
        this.applyGravity();
    }

    smallChickenMove() {
        setInterval(() => {
            if (!this.isDead() && !gameStop) {
                this.moveLeft();
                this.intervalJump();
            }
        }, 1000 / 60);
    }

    animate() {
        setInterval(() => {
            if (!this.isDead() && !gameStop) {
                this.playAnimation(this.WALKING_SET);
            } else if (this.isDead()) {
                this.playAnimation(this.DEAD_SET)
            }
        }, 100);
    }

    intervalJump() {
        let JUMP_TIME = 1 + Math.random() * 0.8
        if (!this.isNotOnGround() && !this.isJumped(JUMP_TIME)) {
            this.lastJump = new Date().getTime();
            this.speedY += 23;
        }
    }

    isJumped(JUMP_TIME) {
        return this.timeSince(this.lastJump) < JUMP_TIME;
    }


}
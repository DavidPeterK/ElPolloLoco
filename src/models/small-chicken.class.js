class SmallChicken extends MovableObject {
    height = 55;
    width = 70;
    speed = 0.3;
    level;

    WALKING_SET = [
        'src/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'src/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'src/img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    DEAD_SET = [
        'src/img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    constructor(x, y) {
        super().loadImage('src/img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.WALKING_SET);
        this.loadImages(this.DEAD_SET);
        this.x = x + Math.random() * 500;
        this.y = y;
        this.width = 70; this.height = 55;
        this.offsetXL = 0; this.offsetXR = 0;
        this.offsetYU = 0; this.offsetYD = 0;



        this.speed = 0.15 + Math.random() * 0.5;
        this.smallEnemyHealth = 100;
        this.animate();
        this.applyGravity();
    }
    animate() {
        setInterval(() => {
            if (!this.isDead()) {
                this.moveLeft();
                this.intervalJump();
            }
        }, 1000 / 60);

        setInterval(() => {
            if (!this.isDead()) {
                this.playAnimation(this.WALKING_SET);
            } else if (this.isDead()) {
                this.playAnimation(this.DEAD_SET)
            }
        }, 100);
    }

    intervalJump() {
        if (!this.isNotOnGround()) {
            this.speedY += 16
        }
    }


}
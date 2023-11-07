class SmallChicken extends MovableObject {
    height = 55;
    width = 70;
    speed;
    level;
    chickenHealth;

    WALKING_SET = [
        'src/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'src/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'src/img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    DEAD_SET = [
        'src/img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];
    constructor(x) {
        super();
        this.loadImages(this.WALKING_SET);
        this.loadImages(this.DEAD_SET);
        this.x = x + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.5;
        this.chickenHealth = 100;
        this.level = level1;
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
            this.speedY += 20
        }
    }

    hit() {
        this.chickenHealth -= 100;
    }

    isDead() {
        return this.chickenHealth <= 0;
    }

}
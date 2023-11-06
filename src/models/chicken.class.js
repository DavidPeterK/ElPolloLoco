class Chicken extends MovableObject {
    x;
    y = 365;
    height = 55;
    width = 70;
    speed;
    level;
    chickenHealth;

    WALKING_SET = [
        'src/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'src/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'src/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    constructor(x) {
        super().loadImage('src/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.WALKING_SET);
        this.x = x + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.5;
        this.chickenHealth = 100;
        this.level = level1;
        this.animate();
    }


    animate() {
        setInterval(() => {
            if (!this.isDead()) {
                this.moveLeft();
            }
        }, 1000 / 60);

        setInterval(() => {
            if (!this.isDead()) {
                this.playAnimation(this.WALKING_SET);
            } else if (this.isDead()) {
                this.loadImage('src/img/3_enemies_chicken/chicken_normal/2_dead/dead.png')
            }
        }, 100);
    }

    hit() {
        this.chickenHealth -= 100;
    }

    isDead() {
        return this.chickenHealth <= 0;
    }

}
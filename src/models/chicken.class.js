class Chicken extends MovableObject {

    y = 365;
    height = 55;
    width = 70;
    offsetYU = 0;
    offsetYD = 0;
    offsetXR = 0;
    offsetXL = 0;
    chickenHealth = 100;

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

    hit(index) {
        this.chickenHealth -= 100;
        if (this.chickenHealth < 0) {
            this.chickenHealth = 0;
            setTimeout(() => {
                world.level.chicken[index - 1] = null;
            }, 1800);
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isDead() {
        return this.chickenHealth == 0;
    }

}
class Chicken extends MovableObject {

    WALKING_SET = [
        'src/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'src/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'src/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    constructor(x) {
        super().loadImage('src/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.WALKING_SET);
        this.x = x + Math.random() * 600;
        this.speed = 0.3 + Math.random() * 1.5;
        this.y = 345;
        this.width = 90; this.height = 75;
        this.offsetXL = 15; this.offsetXR = 15;
        this.offsetYU = 15; this.offsetYD = 0;
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (!this.isDead() && !gameStop) {
                this.moveLeft();
            }
        }, 1000 / 60);

        setInterval(() => {
            if (!this.isDead() && !gameStop) {
                this.playAnimation(this.WALKING_SET);
            } else if (this.isDead()) {
                this.loadImage('src/img/3_enemies_chicken/chicken_normal/2_dead/dead.png')
            }
        }, 100);
    }

}
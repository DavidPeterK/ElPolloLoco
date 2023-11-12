class Chicken extends MovableObject {

    WALKING_SET = [
        'src/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'src/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'src/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    constructor(x, y) {
        super().loadImage('src/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.WALKING_SET);
        this.x = x + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.5;
        this.y = y;
        this.width = 70; this.height = 55;
        this.offsetXL = 0; this.offsetXR = 0;
        this.offsetYU = 0; this.offsetYD = 0;

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
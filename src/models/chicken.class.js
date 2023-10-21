class Chicken extends MovableObject {

    y = 365;
    height = 55;
    width = 70

    WALKING_SET = [
        'src/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'src/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'src/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    constructor() {
        super().loadImage('src/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.WALKING_SET);
        this.x = 200 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
    }


    animate() {
        this.moveLeft();
        setInterval(() => {
            let i = this.currentImage % this.WALKING_SET.length;
            let path = this.WALKING_SET[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 100);
    }

}
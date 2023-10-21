class Cloud extends MovableObject {
    y = 20;
    width = 500;
    height = 250;
    speed = 0.2;
    constructor() {
        super().loadImage('src/img/5_background/layers/4_clouds/1.png');
        this.x = 200 + Math.random() * 500;
        this.animate();
    }

    animate() {
        this.moveLeft();
    }
}
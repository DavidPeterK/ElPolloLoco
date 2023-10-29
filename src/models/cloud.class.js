class Cloud extends MovableObject {
    y = 20;
    x;
    width = 500;
    height = 250;
    speed = 0.2;
    constructor(image, x) {
        super().loadImage(image);
        this.x = x;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
            if (this.x <= -320) {
                this.x = 3200;
            }
        }, 1000 / 60);
    }
}
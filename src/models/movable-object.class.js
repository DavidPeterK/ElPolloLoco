class MovableObject {
    x = 120;
    y = 280;
    height = 150;
    width = 100;
    img;
    imageCache = {};
    currentImage = 0;
    speed = 0.2;
    speedY = 0;
    otherDirection = false;
    acceleration = 2;

    applyGravity() {
        setInterval(() => {
            if (this.isNotOnGround()) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isNotOnGround() {
        return this.y < 180;
    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(set) {
        set.forEach((path) => {
            let img = new Image();
            img.src = path;
            img.style = 'transform: scaleX(-1)';
            this.imageCache[path] = img;
        });

    }

    playAnimation(images) {
        let i = this.currentImage % this.WALKING_SET.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {

    }

    moveLeft() {
        setInterval(() => {
            this.x -= 0.2;
        }, 1000 / 60);
    }
}
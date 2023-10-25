class MovableObject extends DrawableObject {
    speed = 0.2;
    speedY = 0;
    otherDirection = false;
    acceleration = 2;
    energy = 100;
    lastHit = 0;

    applyGravity() {
        setInterval(() => {
            if (this.isNotOnGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isNotOnGround() {
        return this.y < 180;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    //update function
    //isColliding(obj) {
    //    return (this.x + this.width) >= obj.x && this.x <= (obj.x + obj.width) &&
    //        (this.y + this.offsetY + this.height) >= obj.y &&
    //        (this.y + this.offsetY) <= (obj.y + obj.height) &&
    //        obj.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
    //}

    isColliding(obj) {
        return (this.x + this.width) >= obj.x &&
            (this.y + this.height) >= obj.y &&
            this.x <= (obj.x + obj.width) &&
            this.y <= (obj.y + obj.height)
    }

    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    isDead() {
        return this.energy == 0;
    }

    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 25;
    }
}
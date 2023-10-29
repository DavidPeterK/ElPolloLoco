class MovableObject extends DrawableObject {
    speed = 0.2;
    speedY = 0;
    otherDirection = false;
    acceleration = 2;
    mainHealth = 100;
    lastHit = 0;
    lastThrow = 0;

    applyGravity() {
        setInterval(() => {
            if (this.isNotOnGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 35);
    }

    isNotOnGround() {
        if (this instanceof ThrowableObject) {
            return this.y <= 419 - this.height;
        } else {
            return this.y < 180;
        }
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    //update function
    //isColliding(obj) {
    //    return (this.x + this.width) >= obj.x && 
    //         this.x <= (obj.x + obj.width) &&
    //        (this.y + this.offsetY + this.height) >= obj.y &&
    //        (this.y + this.offsetY) <= (obj.y + obj.height) &&
    //        obj.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
    //}

    isColliding(obj) {
        if (!this.otherDirection) {
            return ((this.x + this.width) - this.offsetXR) >= (obj.x + obj.offsetXL) &&
                (((this.y + this.offsetYU) + this.height) - this.offsetYD) >= (obj.y + obj.offsetYU) &&
                (this.x + this.offsetXL) <= ((obj.x + obj.width) - obj.offsetXR) &&
                (this.y + this.offsetYU) <= (((obj.y + obj.offsetYU) + obj.height) - obj.offsetYD);
        } else {
            return ((this.x - this.width) + this.offsetXL) >= (obj.x + obj.offsetXL) &&
                (((this.y + this.offsetYU) + this.height) - this.offsetYD) >= (obj.y + obj.offsetYU) &&
                (this.x - this.offsetXR) <= ((obj.x + obj.width) - obj.offsetXR) &&
                (this.y + this.offsetYU) <= (((obj.y + obj.offsetYU) + obj.height) - obj.offsetYD);
        }
    }

    //schaden
    hit() {
        this.mainHealth -= 20;
        if (this.mainHealth < 0) {
            this.mainHealth = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    //abklinkzeit für nächsten schaden
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 3.5;
    }

    isThrowing() {
        let timepassed = new Date().getTime() - this.lastThrow;
        timepassed = timepassed / 1000;
        return timepassed < 2;
    }

    isDead() {
        return this.mainHealth == 0;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 25;
    }

}
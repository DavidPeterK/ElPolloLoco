const HURT_TIME = 1.5; // Sekunden
const THROW_TIME = 2; // Sekunden

class MovableObject extends DrawableObject {
    speed = 0.2;
    speedY = 0;
    otherDirection = false;
    acceleration = 2;
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


    isColliding(object) {
        let thisLeftOffset, thisRightOffset;

        if (this.otherDirection) {
            thisLeftOffset = this.offsetXR;
            thisRightOffset = this.offsetXL;
        } else {
            thisLeftOffset = this.offsetXL;
            thisRightOffset = this.offsetXR;
        }

        return !(this.x + thisLeftOffset > object.x + object.width - object.offsetXR ||
            this.x + this.width - thisRightOffset < object.x + object.offsetXL ||
            this.y + this.offsetYU > object.y + object.height - object.offsetYD ||
            this.y + this.height - this.offsetYD < object.y + object.offsetYU);
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

    timeSince(eventTime) {
        return (new Date().getTime() - eventTime) / 1000;
    }

    isHurt() {
        return this.timeSince(this.lastHit) < HURT_TIME;
    }

    isThrowing() {
        return this.timeSince(this.lastThrow) < THROW_TIME;
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
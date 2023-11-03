const HURT_TIME = 1.5; // Sekunden
const THROW_TIME = 3; // Sekunden

class MovableObject extends DrawableObject {
    speed = 0.2;
    speedY = 0;
    acceleration = 2;
    lastHit = 0;
    lastThrow = 0;
    y;
    x;

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
        if (object === null) {
            return null;  // Keine Kollision
        }

        let thisLeftOffset, thisRightOffset;
        if (this.otherDirection) {
            thisLeftOffset = this.offsetXR;
            thisRightOffset = this.offsetXL;
        } else {
            thisLeftOffset = this.offsetXL;
            thisRightOffset = this.offsetXR;
        }



        if (this.x + thisLeftOffset < object.x + object.width - object.offsetXR &&
            this.x + this.width - thisRightOffset > object.x + object.offsetXL &&
            this.y + this.offsetYU < ((object.y + object.height) - object.offsetYD) &&
            ((this.y + this.height) - this.offsetYD) < object.y + object.offsetYU) {
            return 'generalCollision';  // Allgemeine Kollision
        }
        if (this.x + thisLeftOffset < object.x + object.width - object.offsetXR &&
            this.x + this.width - thisRightOffset > object.x + object.offsetXL &&
            this.y + this.offsetYU < ((object.y + object.height) - object.offsetYD) &&
            ((this.y + this.height) - this.offsetYD) < object.y + object.offsetYU - 50) {
            return 'fallingCollision';  // Kollision von oben 
        }

        return null;  // Keine Kollision

    }


    timeSince(eventTime) {
        return (new Date().getTime() - eventTime) / 1000;
    }

    isHurt() {
        return this.timeSince(this.lastHit) < HURT_TIME;
    }

    isBottleReady() {
        return world.level.bottle.length - 1 >= 0;
    }

    isThrowing() {
        return this.timeSince(this.lastThrow) < THROW_TIME;
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
const HURT_TIME = 1.5; // Sekunden
const THROW_TIME = 4; // Sekunden

class MovableObject extends DrawableObject {
    speed = 0.2;
    speedY = 0;
    acceleration = 2;
    lastHit;
    lastThrow = 0;
    offsetYU = 0;
    offsetYD = 0;
    offsetXR = 0;
    offsetXL = 0;
    height;
    width;
    thisLeftOffset;
    thisRightOffset;
    level = level1;
    collidingStart;

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
            return this.y < 420 - this.height;
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
        if (object !== null) {
            this.whatIsMyDirection();
            if (this.generalCollision(object)) {
                return 'generalCollision';  // Allgemeine Kollision
            } else if (this.fallingCollision(object)) {
                return 'fallingCollision';  // Kollision von oben 
            } else {
                return null;  // Keine Kollision
            }
        } else { return null }
    }

    generalCollision(object) {
        return this.x + this.thisLeftOffset < object.x + object.width - object.offsetXR &&
            this.x + this.width - this.thisRightOffset > object.x + object.offsetXL &&
            this.y + this.offsetYU < object.y + object.height - object.offsetYD &&
            this.y + this.height - this.offsetYD > object.y + object.offsetYU;
    }

    fallingCollision(object) {
        return this.x + this.thisLeftOffset < object.x + object.width - object.offsetXR &&
            this.x + this.width - this.thisRightOffset > object.x + object.offsetXL &&
            this.y + this.offsetYU < object.y + object.height - object.offsetYD &&
            this.y + this.height - this.offsetYD > object.y + object.offsetYU - 15;
    }

    whatIsMyDirection() {
        if (this.level.character[0].otherDirection) {
            this.thisLeftOffset = this.offsetXR;
            this.thisRightOffset = this.offsetXL;
        } else {
            this.thisLeftOffset = this.offsetXL;
            this.thisRightOffset = this.offsetXR;
        }
    }

    timeSince(eventTime) {
        return (new Date().getTime() - eventTime) / 1000;
    }

    isHurt() {
        return this.timeSince(this.lastHit) < HURT_TIME;
    }

    isBottleReady() {
        return this.level.bottle.length > 0;
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

    isItChicken(objects) {
        return this.level.chicken.includes(objects);
    }

    checkCollisions() {
        this.level = level1;

        this.collisionWithChicken()
        this.collisionWithEndboss()
        if (this instanceof Character) {
            this.collisionWithCoin()
            this.collisionWithSalsaBottle()
        }
    }

    collisionWithChicken() {
        this.level.chicken.forEach((chickens, index) => {
            if (chickens !== null) {
                if (chickens.isDead()) {
                    this.deleteChicken(index);
                } else if (!chickens.isDead()) {
                    this.collisionDirection(chickens, index);
                }
            }
        });
    }

    collisionWithEndboss() {
        this.level.endboss.forEach((endBoss, index) => {
            if (endBoss !== null) {
                this.collisionDirection(endBoss, index);
            }
        });
    }

    collisionWithCoin() {
        this.level.coin.forEach((coins, index) => {
            if (coins !== null) {
                this.collisionDirection(coins, index);
            }
        });
    }

    collisionWithSalsaBottle() {
        this.level.salsaBottle.forEach((salsaBottles, index) => {
            if (salsaBottles !== null) {
                this.collisionDirection(salsaBottles, index);
            }
        });
    }

    deleteChicken(index) {
        setTimeout((currentIndex) => {
            this.level.chicken[currentIndex] = null;
        }, 1400, index);
    }
}
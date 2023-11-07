const HURT_TIME = 1.5; // Sekunden
const THROW_TIME = 3; // Sekunden

class MovableObject extends DrawableObject {
    speed = 0.2;
    speedY = 0;
    acceleration = 2;
    lastHit = 0;
    lastThrow = 0;
    thisLeftOffset;
    thisRightOffset;
    level = level1;
    collidingStart;
    collidingStatus;
    collidingEnemyStatus;


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
        }
        if (this instanceof SmallChicken) {
            return this.y < 420 - this.height;
        }
        if (this instanceof Character) {
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

    isThrowObjectReady() {
        return this.level.throwObject.length > 0;
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

    isItNormalEnemy(objects) {
        return this.level.normalEnemy.includes(objects);
    }
    isItSmallEnemy(objects) {
        return this.level.smallEnemy.includes(objects);
    }

    checkCollisions() {
        this.level = level1;

        this.collisionWithNormalEnemy()
        this.collisionWithEndboss()
        if (this instanceof Character) {
            this.collisionWithCoin()
            this.collisionWithcollectableThrowObeject()
        }
    }

    collisionWithNormalEnemy() {
        this.level.normalEnemy.forEach((normalEnemys, index) => {
            if (normalEnemys !== null) {
                if (normalEnemys.isDead()) {
                    this.deleteNormalEnemy(index);
                } else if (!normalEnemys.isDead()) {
                    this.collisionDirection(normalEnemys, index);
                }
            }
        });
    }

    collisionWithSmallEnemy() {
        this.level.smallEnemy.forEach((smallEnemys, index) => {
            if (smallEnemys !== null) {
                if (smallEnemys.isDead()) {
                    this.deleteSmallEnemy(index);
                } else if (!smallEnemys.isDead()) {
                    this.collisionDirection(smallEnemys, index);
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

    collisionWithcollectableThrowObeject() {
        this.level.collectableThrowObjects.forEach((collectThrowObjects, index) => {
            if (collectThrowObjects !== null) {
                this.collisionDirection(collectThrowObjects, index);
            }
        });
    }

    deleteNormalEnemy(index) {
        setTimeout((currentIndex) => {
            this.level.normalEnemy[currentIndex] = null;
        }, 1400, index);
    }

    deleteSmallEnemy(index) {
        setTimeout((currentIndex) => {
            this.level.smallEnemy[currentIndex] = null;
        }, 1400, index);
    }
}
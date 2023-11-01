class World {
    canvas = document.getElementById('canvas');;
    ctx = canvas.getContext('2d');
    keyboard;
    character;
    statusBar;
    throwableObjects;
    drawableObjects;
    level;
    endBoss;
    collidingStatus = false;
    collidingEnemyStatus = false;
    x;              // default x-coordinate
    y;              // default y-coordinate
    height;         // default height
    width;          // default width
    img;                   // image object
    imageCache = {};       // cache for multiple images
    currentImage = 0;      // current image index for animations
    offsetYU = 0;          // offset for hitbox from top
    offsetYD = 0;          // offset for hitbox from bottom
    offsetXR = 0;          // offset for hitbox from right
    offsetXL = 0;          // offset for hitbox from left
    camera_x = 0;

    constructor(start) {
        if (start === 'start') {
            this.level = level1;
            this.endBoss = new Endboss();
            this.keyboard = new Keyboard();
            this.character = new Character();
            this.statusBar = new StatusBar();
            this.throwableObjects = new ThrowableObject();
            this.drawableObjects = new DrawableObject(start);
        }
    }

    /**
 * Draw the object on the canvas.
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
 */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Load an image for the object.
     * @param {string} path - Path to the image resource.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Load multiple images for the object (e.g., for animations).
     * @param {Array<string>} set - An array of image paths.
     */
    loadImages(set) {
        set.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    drawHitBox(ctx) {
        if (this instanceof Character || this instanceof Endboss || this instanceof ThrowableObject || this instanceof Chicken) {
            ctx.beginPath();
            ctx.rect(
                this.x + this.offsetXL,
                this.y + this.offsetYU,
                this.width - this.offsetXL - this.offsetXR,
                this.height - this.offsetYU - this.offsetYD
            );
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'red';
            ctx.stroke();
        }
    }


    setWorld() {
        this.character.world = this;
        this.throwableObjects.world = this;
        this.statusBar.world = this;
        this.endBoss.world = this;
    }

    checkMoments() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 1000 / 60);
    }

    checkCollisions() {
        let allEnemys = [this.endBoss, ...this.level.chicken];

        allEnemys.forEach((enemies) => {
            this.charTouchEnemy(enemies);
            if (this.isBottleReady()) {
                this.bottleTouchEnemy(enemies);
            }
        });
    }

    //mit d flaschen werfen
    checkThrowObjects() {
        if (this.keyboard.D && !this.throwableObjects.isThrowing()) {
            this.throwBottle();
        }
        if (this.isBottleReady()) {
            if (!this.level.bottle[0].isNotOnGround()) {
                this.bottleBrokeOnGround();
            }
        }
    }

    charTouchEnemy(enemies) {
        let collisionResult = this.character.isColliding(enemies);
        if (collisionResult === 'fallingCollision') {
            character.jump();
            setTimeout(() => {

            }, 200);
        } else if (collisionResult === 'generalCollision' && !this.character.isHurt()) {
            this.character.DAMAGE_SOUND.play();
            this.character.hit();
            this.level.statusBarChar[0].setMainHealth(this.character.mainHealth);
        }
    }
    isBottleReady() {
        return this.level.bottle.length - 1 >= 0;
    }

    bottleTouchEnemy(enemies) {
        let collisionResult = this.level.bottle[0].isColliding(enemies);
        if (collisionResult === 'fallingCollision' || collisionResult === 'generalCollision') {
            this.collidingEnemyStatus = true;
            this.throwableObjects.FLYING_BOTTLE.pause();
            this.throwableObjects.FLYING_BOTTLE.currentTime = 0;
            this.bottleTouchEndboss(enemies);
        }
    }
    bottleTouchEndboss(enemies) {
        if (enemies = Endboss && !this.endBoss.isHurt()) {
            this.endBoss.hit();
            this.level.statusBarEndboss[0].setMainHealth(this.endBoss.endbossHealth);
        }
    }

    bottleBrokeOnGround() {
        this.collidingStatus = true;
        this.throwableObjects.FLYING_BOTTLE.pause();
        this.throwableObjects.FLYING_BOTTLE.currentTime = 0;
    }

    throwBottle() {
        this.throwableObjects.FLYING_BOTTLE.play();
        let newBottle = new ThrowableObject(this.character.x + 80, this.character.y + 100);
        this.level.bottle.push(newBottle);
        this.throwableObjects.lastThrow = new Date().getTime();
    }

}
class World {
    level = level1;
    character = new Character();
    statusBar = new StatusBar();
    throwableObjects = new ThrowableObject();
    endBoss = this.level.endboss[0];
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    collidingStatus = false;
    collidingEnemyStatus = false;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkMoments();
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
<<<<<<< HEAD
        let allEnemys = [this.endBoss, ...this.level.chicken];

        allEnemys.forEach((enemies) => {
            this.charTouchEnemy(enemies);
=======
        let allEnemies = this.level.slice(0, 2);
        allEnemies.forEach((enemies) => {
            if (this.charTouchWithoutHurt(enemies)) {
                this.characterTouchEnemy();
            }
>>>>>>> 4e41568116d674402932789132d832f5b9b52502
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
            this.character.speedY += 25;
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

    draw() {
        //alle bilder im canvas löschen
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        //bilder aus classen rendern (zeichnen) ebene für ebene
        this.addObjects(this.level.backgroundObjects);

        this.addObjects(this.level.clouds);
        this.addObjects(this.level.chicken);
        this.addToMap(this.endBoss);
        this.addObjects(this.level.bottle);
        this.addToMap(this.character);


        //------Fixed-Object---------//
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.level.statusBarChar[0]);
        this.addToMap(this.level.statusBarEndboss[0]);
        this.ctx.translate(this.camera_x, 0);



        this.ctx.translate(-this.camera_x, 0);


        //funktionen so oft und schnell wiederholen wie die grafikkarte es aushält 
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjects(object) {
        object.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(object) {
        if (object.otherDirection) {
            this.flipImage(object);
        }

        object.draw(this.ctx);
        object.drawHitBox(this.ctx);


        if (object.otherDirection) {
            this.flipImageBack(object);
        }
    }

    flipImage(draw) {
        //save speichert alle ctx werte und mit restore() können wir mit diesen speicher fortfahren
        this.ctx.save();
        //bei bewegungung nach links wird die breite des bildes auf der stelle festgehalten
        this.ctx.translate(draw.width, 0);
        //spiegelt das bild (links bewegung)
        this.ctx.scale(-1, 1);
        //bei spiegelung wird die x koordinate mit gespiegelt und damit setzt man dies zurück
        draw.x = draw.x * -1;
    }

    flipImageBack(draw) {
        draw.x = draw.x * -1;
        this.ctx.restore();
    }
}
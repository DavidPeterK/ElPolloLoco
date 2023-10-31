class World {
    character = new Character();
    statusBar = new StatusBar();
    throwableObjects = new ThrowableObject();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    collidingStatus = false;
    collidingEnemyStatus = false;
    allEnemys = [this.level.endboss, this.level.chicken];
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
        this.level.endboss.world = this;
    }

    checkMoments() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 1000 / 60);
    }

    checkCollisions() {
        this.allEnemys.forEach((enemies) => {
            if (this.charTouchWithoutHurt) {
                this.characterTouchEnemy();
            }
            if (this.isBottleReady()) {
                if (this.level.bottle[0].isColliding(enemies)) {
                    this.bottleTouchEnemy();
                    if (enemies = Endboss && !this.endboss.isHurt()) {
                        this.endboss.hit();
                        this.statusBar[1].setMainHealth(this.endboss.endbossHealth);
                    }
                }
            }
        });
    }

    //mit d flaschen werfen
    checkThrowObjects() {
        if (this.keyboard.D && !this.throwableObjects.isThrowing()) {
            this.throwBottle();
        }
        if (this.isBottleReady()) {
            if (!this.level.bottle[this.level.bottle.length - 1].isNotOnGround()) {
                this.bottleBrokeOnGround();
            }
        }
    }

    charTouchWithoutHurt() {
        return this.character.isColliding(enemies) && !this.character.isHurt()
    }

    characterTouchEnemy() {
        this.character.DAMAGE_SOUND.play();
        this.character.hit();
        this.level.statusBarChar.setMainHealth(this.character.mainHealth);
    }

    isBottleReady() {
        return this.level.bottle.length - 1 >= 0;
    }

    bottleTouchEnemy() {
        this.collidingEnemyStatus = true;
        this.throwableObjects.FLYING_BOTTLE.pause();
        this.throwableObjects.FLYING_BOTTLE.currentTime = 0;
    }

    bottleBrokeOnGround() {
        this.collidingStatus = true;
        this.throwableObjects.FLYING_BOTTLE.pause();
        this.throwableObjects.FLYING_BOTTLE.currentTime = 0;
    }

    throwBottle() {
        this.throwableObjects.FLYING_BOTTLE.play();
        let bottle = new ThrowableObject(this.character.x + 80, this.character.y + 100);
        this.level.bottle.push(bottle);
        this.throwableObjects.lastThrow = new Date().getTime();
    }

    draw() {
        //alle bilder im canvas löschen
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        //bilder aus classen rendern (zeichnen) ebene für ebene
        this.addObjects(this.level.backgroundObjects);

        this.addObjects(this.level.clouds);
        this.addObjects(this.level.enemies);
        this.addObjects(this.throwableObject);
        this.addToMap(this.character);


        //------Fixed-Object---------//
        this.ctx.translate(-this.camera_x, 0);
        this.addObjects(this.statusBar);
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

    addToMap(draw) {
        if (draw.otherDirection) {
            this.flipImage(draw);
        }

        draw.draw(this.ctx);
        draw.drawHitBox(this.ctx);


        if (draw.otherDirection) {
            this.flipImageBack(draw);
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
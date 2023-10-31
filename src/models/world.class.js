class World {
    character = new Character();
    statusBar = new StatusBar();
    throwableObjects = new ThrowableObject();
    endBoss = new Endboss();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    collidingStatus = false;
    collidingEnemyStatus = false;

    allEnemys =
        [
            this.level.endboss, this.level.chicken
        ];

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
        this.allEnemys.forEach((enemies) => {
            if (this.charTouchWithoutHurt(enemies)) {
                this.characterTouchEnemy();
            }
            if (this.isBottleReady()) {
                if (this.level.bottle[0].isColliding(enemies)) {
                    this.bottleTouchEnemy();
                    if (enemies = Endboss && !this.level.endboss[0].isHurt()) {
                        this.level.endboss[0].hit();
                        this.level.statusBarEndboss[0].setMainHealth(this.endBoss.endbossHealth);
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

    charTouchWithoutHurt(enemies) {
        if (this.character.isColliding(enemies) && !this.character.isHurt()) {
            return
        }
    }

    characterTouchEnemy() {
        this.character.DAMAGE_SOUND.play();
        this.character.hit();
        this.statusBarChar[0].setMainHealth(this.character.mainHealth);
    }

    isBottleReady() {
        this.level.bottle.length - 1 >= 0;
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
        this.addObjects(this.level.endboss);
        this.addObjects(this.level.bottle);
        this.addToMap(this.character);


        //------Fixed-Object---------//
        this.ctx.translate(-this.camera_x, 0);
        this.addObjects(this.level.statusBarChar);
        this.addObjects(this.level.statusBarEndboss);
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
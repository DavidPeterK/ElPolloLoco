class World {
    ctx;
    canvas;
    keyboard;
    level = level1;
    statusBar = new StatusBar();
    camera_x = 0;


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    setWorld() {
        this.level.character[0].world = this;
        this.level.throwObject.forEach(obj => obj.world = this);
        this.statusBar.world = this;
        this.level.endboss[0].world = this;
    }

    draw() {
        //alle bilder im canvas löschen
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        //bilder aus classen rendern (zeichnen) ebene für ebene
        this.backGroundObjects();
        this.gameObjects();
        this.fixedObjects();
        this.ctx.translate(-this.camera_x, 0);
        //funktionen so oft und schnell wiederholen wie die grafikkarte es aushält 
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjects(object) {
        if (object === null) {
            return null;
        }
        object.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(object) {
        if (object !== null) {
            if (object.otherDirection) {
                this.flipImage(object);
            }
            object.draw(this.ctx);
            object.drawHitBox(this.ctx);
            if (object.otherDirection) {
                this.flipImageBack(object);
            }
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

    backGroundObjects() {
        this.addObjects(this.level.backgroundObjects);
        this.addObjects(this.level.clouds);
    }

    fixedObjects() {
        this.ctx.translate(-this.camera_x, 0);
        this.addObjects(this.level.statusBarChar);
        this.addObjects(this.level.statusBarEndboss);
        this.addObjects(this.level.statusBarCoin);
        this.addObjects(this.level.statusBarThrowObject);
        this.ctx.translate(this.camera_x, 0);
    }

    gameObjects() {
        this.addObjects(this.level.throwObject);
        this.addObjects(this.level.coin);
        this.addObjects(this.level.normalEnemy);
        this.addObjects(this.level.endboss);
        this.addObjects(this.level.throwObject);
        this.addObjects(this.level.character);
    }
}
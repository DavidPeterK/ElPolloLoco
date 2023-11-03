class World {
    ctx;
    canvas;
    keyboard;
    level = level1;
    character = new Character();
    statusBar = new StatusBar();
    throwableObjects = new ThrowableObject();
    endBoss = this.level.endboss[0];
    camera_x = 0;


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    setWorld() {
        this.character.world = this;
        this.throwableObjects.world = this;
        this.statusBar.world = this;
        this.endBoss.world = this;
    }



    draw() {
        //alle bilder im canvas löschen
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        //bilder aus classen rendern (zeichnen) ebene für ebene
        this.addObjects(this.level.backgroundObjects);

        this.addObjects(this.level.clouds);
        this.addObjects(this.level.salsaBottle);
        this.addObjects(this.level.coin);
        this.addObjects(this.level.chicken);
        this.addToMap(this.endBoss);
        this.addObjects(this.level.bottle);
        this.addToMap(this.character);


        //------Fixed-Object---------//
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.level.statusBarChar[0]);
        this.addToMap(this.level.statusBarEndboss[0]);
        this.addToMap(this.level.statusBarCoin[0]);
        this.addToMap(this.level.statusBarSalsaBottle[0]);
        this.ctx.translate(this.camera_x, 0);



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
        if (object === null) {
            return null;
        }
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
class DrawableObject extends World {
    x = 120;               // default x-coordinate
    y = 280;               // default y-coordinate
    height = 150;          // default height
    width = 100;           // default width
    img;                   // image object
    character;
    statusBar;
    throwableObjects;
    endBoss;
    collidingStatus = false;
    collidingEnemyStatus = false;

    constructor(start) {
        super();
        if (start === 'start') {

            this.draw()
        }
    }


    draw() {
        //alle bilder im canvas löschen
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        //bilder aus classen rendern (zeichnen) ebene für ebene
        this.addObjects(Level.backgroundObjects);

        this.addObjects(Level.clouds);
        this.addObjects(Level.chicken);
        this.addToMap(this.endBoss);
        this.addObjects(Level.bottle);
        this.addToMap(this.character);

        //------Fixed-Object---------//
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(Level.statusBarChar[0]);
        this.addToMap(Level.statusBarEndboss[0]);
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
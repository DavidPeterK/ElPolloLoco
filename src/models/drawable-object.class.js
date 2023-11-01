class DrawableObject extends World {
    x = 120;               // default x-coordinate
    y = 280;               // default y-coordinate
    height = 150;          // default height
    width = 100;           // default width
    img;                   // image object
    imageCache = {};       // cache for multiple images
    currentImage = 0;      // current image index for animations
    offsetYU = 0;          // offset for hitbox from top
    offsetYD = 0;          // offset for hitbox from bottom
    offsetXR = 0;          // offset for hitbox from right
    offsetXL = 0;          // offset for hitbox from left
    camera_x = 0;

    constructor() {
        super();
        this.draw();
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
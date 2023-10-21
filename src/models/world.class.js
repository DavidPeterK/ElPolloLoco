class World {

    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ];
    clouds = [
        new Cloud()
    ];
    backgroundObjects = [
        new BackgroundObject('src/img/5_background/layers/air.png', 0),
        new BackgroundObject('src/img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('src/img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('src/img/5_background/layers/1_first_layer/1.png', 0),
    ];
    canvas;
    ctx;
    keyboard;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    setWorld() {
        this.character.world = this;
    }

    draw() {
        //alle bilder im canvas löschen
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        //bilder aus classen rendern (zeichnen) ebene für ebene
        this.addObjects(this.backgroundObjects);
        this.addToMap(this.character);
        this.addObjects(this.clouds);
        this.addObjects(this.enemies);

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
            this.ctx.save();
            //bei bewegungung nach links wird die breite des bildes auf der stelle festgehalten
            this.ctx.translate(draw.width, 0);
            //spiegelt das bild (links bewegung)
            this.ctx.scale(-1, 1);
            //bei spiegelung wird die x koordinate mit gespiegelt und damit setzt man dies zurück
            draw.x = draw.x * -1;
        }

        this.ctx.drawImage(draw.img, draw.x, draw.y, draw.width, draw.height);

        if (draw.otherDirection) {
            draw.x = draw.x * -1;
            this.ctx.restore();
        }
    }
}
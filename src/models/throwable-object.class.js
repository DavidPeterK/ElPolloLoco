class ThrowableObject extends MovableObject {

    world;
    y;
    FLYING_BOTTLE = new Audio('src/sounds/flyingBottle.mp3');
    BROKEN_BOTTLE = new Audio('src/sounds/brokenGlass.mp3');

    constructor(x, y) {
        super().loadImage('src/img/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.throw();
    }

    throw() {
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.x += 11;
        }, 25);
    }

}
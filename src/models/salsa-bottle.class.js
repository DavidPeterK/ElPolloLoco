class SalsaBottle extends MovableObject {

    ACTIV_SET = [
        'src/img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'src/img/6_salsa_bottle/salsa_bottle.png',
        'src/img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
        'src/img/6_salsa_bottle/salsa_bottle.png',
    ];

    constructor(x, image) {
        super().loadImage(image);
        this.loadImages(this.ACTIV_SET)
        this.x = x;
        this.y = 335;
        this.width = 100;
        this.height = 100;
        this.offsetXL = 30;
        this.offsetXR = 30;
        this.offsetYU = 20;
        this.offsetYD = 0;

        this.animation();
    }

    animation() {
        setInterval(() => {
            if (this.y > 300 && !gameStop) {
                this.playAnimation(this.ACTIV_SET)
            }
        }, 400);
    }
}
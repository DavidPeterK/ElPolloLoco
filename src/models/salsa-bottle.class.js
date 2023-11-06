class SalsaBottle extends MovableObject {
    x;
    y;
    height = 120;
    width = 120;
    offsetYU = 20;
    offsetYD = 0;
    offsetXR = 30;
    offsetXL = 30;

    ACTIV_SET = [
        'src/img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'src/img/6_salsa_bottle/salsa_bottle.png',
        'src/img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
        'src/img/6_salsa_bottle/salsa_bottle.png',
    ];

    constructor(x, y, img) {
        super().loadImage(img);
        this.loadImages(this.ACTIV_SET)
        this.x = x;
        this.y = y;
        this.animation();
    }

    animation() {
        setInterval(() => {
            if (this.y > 300) {
                this.playAnimation(this.ACTIV_SET)
            }
        }, 400);
    }
}
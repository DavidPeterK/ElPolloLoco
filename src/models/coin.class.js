class Coin extends MovableObject {
    x;
    y;
    height = 150;
    width = 150;
    offsetYU = 0;
    offsetYD = 0;
    offsetXR = 0;
    offsetXL = 0;

    ACTIV_SET = [
        'src/img/8_coin/coin_1.png',
        'src/img/8_coin/coin_2.png',
    ];

    constructor(x, y) {
        super().loadImage('src/img/8_coin/coin_1.png');
        this.loadImages(this.ACTIV_SET);
        this.x = x;
        this.y = y;
        this.animate();
    }


    animate() {
        setInterval(() => {
            this.playAnimation(this.ACTIV_SET);
        }, 800);
    }

}
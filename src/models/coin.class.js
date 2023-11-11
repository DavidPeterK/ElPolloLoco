class Coin extends MovableObject {

    height = 150; width = 150;
    offsetYU = 40; offsetXR = 40;
    offsetYD = 40; offsetXL = 40;


    ACTIV_SET = [
        'src/img/8_coin/coin_1.png',
        'src/img/8_coin/coin_2.png',
    ];

    constructor(x, y, width, height) {
        super().loadImage('src/img/8_coin/coin_1.png');
        this.loadImages(this.ACTIV_SET);
        this.x = x;
        this.y = y;
        this.width = 150;
        this.height = 150;
        this.offsetXL = 40;
        this.offsetXR = 40;
        this.offsetYU = 40;
        this.offsetYD = 40;
        this.animate();
    }


    animate() {
        setInterval(() => {
            this.playAnimation(this.ACTIV_SET);
        }, 650);
    }

}
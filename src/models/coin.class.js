class Coin extends MovableObject {

    ACTIV_SET = [
        'src/img/8_coin/coin_1.png',
        'src/img/8_coin/coin_2.png',
    ];

    constructor(x, y) {
        super().loadImage('src/img/8_coin/coin_1.png');
        this.loadImages(this.ACTIV_SET);
        this.x = x;
        this.y = y;
        this.width = 140;
        this.height = 140;
        this.offsetXL = 50;
        this.offsetXR = 50;
        this.offsetYU = 50;
        this.offsetYD = 50;
        this.animate();
    }


    animate() {
        setInterval(() => {
            this.playAnimation(this.ACTIV_SET);
        }, 650);
    }

}
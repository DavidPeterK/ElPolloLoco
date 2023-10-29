class Endboss extends MovableObject {
    mainHealth = 100;
    height = 400;
    width = 250;
    y = 60;
    x = 400;
    offsetYU = 75;
    offsetYD = 30;
    offsetXR = 50;
    offsetXL = 55;

    WALKING_SET = [
        'src/img/4_enemie_boss_chicken/1_walk/G1.png',
        'src/img/4_enemie_boss_chicken/1_walk/G2.png',
        'src/img/4_enemie_boss_chicken/1_walk/G3.png',
        'src/img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    constructor() {
        super().loadImage('src/img/4_enemie_boss_chicken/1_walk/G1.png');
        this.loadImages(this.WALKING_SET);
        this.animate();
    }

    animate() {
        this.moveLeft();
        setInterval(() => {
            this.playAnimation(this.WALKING_SET);
        }, 100);
    }
}
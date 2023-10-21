class Endboss extends MovableObject {

    height = 400;
    width = 250;
    y = 60;
    WALKING_SET = [
        'src/img/4_enemie_boss_chicken/1_walk/G1.png',
        'src/img/4_enemie_boss_chicken/1_walk/G2.png',
        'src/img/4_enemie_boss_chicken/1_walk/G3.png',
        'src/img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    constructor() {
        super().loadImage('src/img/4_enemie_boss_chicken/1_walk/G1.png');
        this.loadImages(this.WALKING_SET);
        this.x = 600;
        this.animate();
    }

    animate() {
        this.moveLeft();
        setInterval(() => {
            playAnimation(this.WALKING_SET);
        }, 100);
    }


}
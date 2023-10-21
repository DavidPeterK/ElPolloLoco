class Character extends MovableObject {


    height = 250;
    y = 180;
    WALKING_SET = [
        'src/img/2_character_pepe/2_walk/W-21.png',
        'src/img/2_character_pepe/2_walk/W-22.png',
        'src/img/2_character_pepe/2_walk/W-23.png',
        'src/img/2_character_pepe/2_walk/W-24.png',
        'src/img/2_character_pepe/2_walk/W-25.png',
        'src/img/2_character_pepe/2_walk/W-26.png'
    ];

    constructor() {
        super().loadImage('src/img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.WALKING_SET);

        this.animate();
    }

    animate() {
        setInterval(() => {
            let i = this.currentImage % this.WALKING_SET.length;
            let path = this.WALKING_SET[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 100);
    }


    jump() { }

}
class Character extends MovableObject {

    height = 250;
    y = 180;
    speed = 5;
    world;
    WALKING_SOUND = new Audio('src/sounds/running.mp3');

    WALKING_SET = [
        'src/img/2_character_pepe/2_walk/W-21.png',
        'src/img/2_character_pepe/2_walk/W-22.png',
        'src/img/2_character_pepe/2_walk/W-23.png',
        'src/img/2_character_pepe/2_walk/W-24.png',
        'src/img/2_character_pepe/2_walk/W-25.png',
        'src/img/2_character_pepe/2_walk/W-26.png'
    ];

    JUMP_SET = [
        'src/img/2_character_pepe/3_jump/J-31.png',
        'src/img/2_character_pepe/3_jump/J-32.png',
        'src/img/2_character_pepe/3_jump/J-33.png',
        'src/img/2_character_pepe/3_jump/J-34.png',
        'src/img/2_character_pepe/3_jump/J-35.png',
        'src/img/2_character_pepe/3_jump/J-36.png',
        'src/img/2_character_pepe/3_jump/J-37.png',
        'src/img/2_character_pepe/3_jump/J-38.png',
        'src/img/2_character_pepe/3_jump/J-39.png',
    ];
    constructor() {
        super().loadImage('src/img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.WALKING_SET);
        this.loadImages(this.JUMP_SET);
        this.applyGravity();
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.WALKING_SOUND.pause();

            //taste rechts um bild x achse zu erhöhen
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.WALKING_SOUND.play();
            }

            //taste links um bild x achse zu verringern
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
                this.WALKING_SOUND.play();
            }

            if (this.world.keyboard.SPACE && !this.isNotOnGround()) {
                this.jump();
            }
            //läuft der character in eine richtung verschiebt sich der hintergrund in die entgegengesetzte richtung
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);


        setInterval(() => {
            if (this.isNotOnGround()) {
                this.playAnimation(this.JUMP_SET);
            } else {

                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    //lauf animation
                    this.playAnimation(this.WALKING_SET);
                }
            }
        }, 50);
    }
}
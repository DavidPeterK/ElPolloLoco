class Character extends MovableObject {

    mainHealth = 100;
    width = 100;
    height = 250;
    previousY = 200;
    y = 180;
    x = 120;
    speed = 5;
    world;
    WALKING_SOUND = new Audio('src/sounds/running.mp3');
    DAMAGE_SOUND = new Audio('src/sounds/characterDamage.mp3');
    offsetYU = 100;
    offsetYD = 5;
    offsetXL = 20;
    offsetXR = 30;
    speedY = 0;
    STILL_STANDING_SET = [
        'src/img/2_character_pepe/1_idle/idle/I-1.png',
        'src/img/2_character_pepe/1_idle/idle/I-1.png',
        'src/img/2_character_pepe/1_idle/idle/I-2.png',
        'src/img/2_character_pepe/1_idle/idle/I-2.png',
        'src/img/2_character_pepe/1_idle/idle/I-3.png',
        'src/img/2_character_pepe/1_idle/idle/I-4.png',
        'src/img/2_character_pepe/1_idle/idle/I-4.png',
        'src/img/2_character_pepe/1_idle/idle/I-5.png',
        'src/img/2_character_pepe/1_idle/idle/I-6.png',
        'src/img/2_character_pepe/1_idle/idle/I-6.png',
        'src/img/2_character_pepe/1_idle/idle/I-7.png',
        'src/img/2_character_pepe/1_idle/idle/I-7.png',
        'src/img/2_character_pepe/1_idle/idle/I-8.png',
        'src/img/2_character_pepe/1_idle/idle/I-8.png',
        'src/img/2_character_pepe/1_idle/idle/I-8.png',
        'src/img/2_character_pepe/1_idle/idle/I-9.png',
        'src/img/2_character_pepe/1_idle/idle/I-9.png',
        'src/img/2_character_pepe/1_idle/idle/I-9.png',
        'src/img/2_character_pepe/1_idle/idle/I-10.png',
        'src/img/2_character_pepe/1_idle/idle/I-10.png',
        'src/img/2_character_pepe/1_idle/idle/I-10.png'
    ];

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
        'src/img/2_character_pepe/3_jump/J-34.png',
        'src/img/2_character_pepe/3_jump/J-35.png',
        'src/img/2_character_pepe/3_jump/J-35.png',
        'src/img/2_character_pepe/3_jump/J-35.png',
        'src/img/2_character_pepe/3_jump/J-36.png',
        'src/img/2_character_pepe/3_jump/J-37.png',
        'src/img/2_character_pepe/3_jump/J-38.png',
        'src/img/2_character_pepe/3_jump/J-38.png',
        'src/img/2_character_pepe/3_jump/J-38.png',
        'src/img/2_character_pepe/3_jump/J-39.png'
    ];

    DEAD_SET = [
        'src/img/2_character_pepe/5_dead/D-51.png',
        'src/img/2_character_pepe/5_dead/D-52.png',
        'src/img/2_character_pepe/5_dead/D-53.png',
        'src/img/2_character_pepe/5_dead/D-54.png',
        'src/img/2_character_pepe/5_dead/D-55.png',
        'src/img/2_character_pepe/5_dead/D-56.png',
        'src/img/2_character_pepe/5_dead/D-57.png'
    ];

    HURT_SET = [
        'src/img/2_character_pepe/4_hurt/H-41.png',
        'src/img/2_character_pepe/4_hurt/H-41.png',
        'src/img/2_character_pepe/4_hurt/H-42.png',
        'src/img/2_character_pepe/4_hurt/H-42.png',
        'src/img/2_character_pepe/4_hurt/H-43.png',
        'src/img/2_character_pepe/4_hurt/H-43.png'
    ];

    constructor() {
        super().loadImage('src/img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.STILL_STANDING_SET);
        this.loadImages(this.WALKING_SET);
        this.loadImages(this.JUMP_SET);
        this.loadImages(this.DEAD_SET);
        this.loadImages(this.HURT_SET);
        this.applyGravity();
        this.animate();
        this.characterStatus();
    }

    animate() {
        setInterval(() => {
            this.WALKING_SOUND.pause();

            //taste rechts um bild x achse zu erhöhen
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
                this.WALKING_SOUND.play();
            }

            //taste links um bild x achse zu verringern
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
                this.WALKING_SOUND.play();
            }

            if ((this.world.keyboard.SPACE || this.world.keyboard.UP) && !this.isNotOnGround()) {
                this.jump();
            }

            //läuft der character in eine richtung verschiebt sich der hintergrund in die entgegengesetzte richtung
            this.world.camera_x = -this.x + 100;
        }, 1000 / 55);

    }

    characterStatus() {
        setInterval(() => {

            if (this.isDead()) {
                this.playAnimation(this.DEAD_SET);
            }
            else if (this.isHurt()) {
                this.playAnimation(this.HURT_SET);
            }
            else if (this.isNotOnGround()) {
                this.playAnimation(this.JUMP_SET);
            }
            else if (!this.isNotOnGround() && !this.world.keyboard.RIGHT && !this.world.keyboard.LEFT) {
                this.playAnimation(this.STILL_STANDING_SET);
            }
            else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.WALKING_SET);
            }
        }, 100);
    }
}
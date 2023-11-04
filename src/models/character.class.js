class Character extends MovableObject {

    mainHealth = 100;
    width = 100;
    height = 250;
    previousY = 200;
    y = 180;
    x = 120;
    speed = 5;
    world;
    level = level1;
    WALKING_SOUND = new Audio('src/sounds/running.mp3');
    DAMAGE_SOUND = new Audio('src/sounds/characterDamage.mp3');
    offsetYU = 100;
    offsetYD = 5;
    offsetXL = 20;
    offsetXR = 30;
    speedY = 0;
    otherDirection;
    collidingStatus = false;
    collidingEnemyStatus = false;

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
        this.otherDirection = false;
        this.toRemove = {
            chickens: [],
            coins: [],
            salsaBottles: []
        };

        this.applyGravity();
        this.animate();
        this.characterStatus();
    }

    animate() {
        setInterval(() => {
            this.WALKING_SOUND.pause();

            //taste rechts um bild x achse zu erhöhen
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.otherDirection = false;
                this.moveRight();
                this.WALKING_SOUND.play();
            }

            //taste links um bild x achse zu verringern
            if (this.world.keyboard.LEFT && this.x > this.world.level.level_start_x) {
                this.otherDirection = true;
                this.moveLeft();
                this.WALKING_SOUND.play();
            }

            if ((this.world.keyboard.SPACE && !this.isNotOnGround() || this.world.keyboard.UP) && !this.isNotOnGround()) {
                this.jump();
            }

            if (this.world.keyboard.D && !this.world.throwableObjects.isThrowing()) {
                this.world.throwableObjects.throwBottle();
            }


            //läuft der character in eine richtung verschiebt sich der hintergrund in die entgegengesetzte richtung
            this.world.camera_x = -this.x + 100;
            this.checkCollisions();
            this.removeObjects();
        }, 1000 / 60);

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

    removeObjects() {
        this.toRemove.chickens.reverse().forEach(index => {
            if (this.world.level.chicken[index] !== null) {

                if (this.world.level.chicken[index].isReadyToDeath) {
                    setTimeout((currentIndex) => {
                        if (this.world.level.chicken[currentIndex] && this.world.level.chicken[currentIndex].isReadyToDeath) {
                            this.world.level.chicken[currentIndex] = null;
                        }
                    }, 500, index); // Dauer der Todesanimation    
                }
            }
        });

        this.toRemove.coins.reverse().forEach(index => {
            this.world.level.coin[index] = null;
        });
        this.toRemove.salsaBottles.reverse().forEach(index => {
            this.world.level.salsaBottle[index] = null;
        });
        this.toRemove.chickens = [];
    }

    checkCollisions() {
        this.world.allObjects.forEach((object) => {
            if (object !== null) { // Überspringe, wenn das Objekt bereits null ist
                this.collisionDirection(object);
            }
        });
    }

    collisionDirection(objects) {
        let collisionResult = this.isColliding(objects);
        if (collisionResult == 'fallingCollision' && objects !== null) {
            if (this.isItChicken(objects)) {
                this.chickenGetsDamage(objects);
            }

            if (this.isItCoin(objects)) {
                this.collectCoin(objects);
            }

            if (this.isItSalsaBottle(objects)) {
                this.collectSalsaBottle(objects);
            }

        } else if (collisionResult == 'generalCollision' && !this.isHurt() && objects !== null) {
            if (this.isItChicken(objects) || this.isItEndboss(objects)) {
                this.characterGetsDamage(objects);
            }

            if (this.isItCoin(objects)) {
                this.collectCoin(objects);
            }

            if (this.isItSalsaBottle(objects)) {
                this.collectSalsaBottle(objects);
            }
        }
    }

    characterGetsDamage(objects) {
        let chickenIndex = this.world.level.chicken.indexOf(objects)
        if (this.isChickenAlive(objects, chickenIndex) || this.isEndbossAlive(objects)) {
            this.DAMAGE_SOUND.play();
            this.hit();
            this.world.level.statusBarChar[0].setMainHealth(this.mainHealth);
        }
    }

    chickenGetsDamage(objects) {
        let chickenIndex = this.world.level.chicken.indexOf(objects)
        if (this.isChickenAlive(objects, chickenIndex)) {
            this.world.level.chicken[chickenIndex].hit();
            this.jump();
            this.toRemove.chickens.push(chickenIndex);
        }
    }

    collectSalsaBottle(objects) {
        let salsaBottleIndex = this.world.level.salsaBottle.indexOf(objects);
        if (objects == this.world.level.salsaBottle[salsaBottleIndex]) {
            this.world.statusBar.salsaBottleStorage += 1;
            this.toRemove.salsaBottles.push(salsaBottleIndex); // Statt direkt zu löschen, speichern wir den Index
        }
    }

    collectCoin(objects) {
        let coinIndex = this.world.level.coin.indexOf(objects);
        if (objects == this.world.level.coin[coinIndex]) {
            this.world.statusBar.coinStorage += 1;
            this.toRemove.coins.push(coinIndex);
        }
    }

    isDead() {
        return this.mainHealth <= 0;
    }

    isItChicken(objects) {
        return this.world.level.chicken.includes(objects);
    }

    isChickenAlive(objects, chickenIndex) {
        return objects == this.world.level.chicken[chickenIndex] && !this.world.level.chicken[chickenIndex].isDead();
    }

    isItCoin(objects) {
        return this.world.level.coin.includes(objects);
    }

    isItSalsaBottle(objects) {
        return this.world.level.salsaBottle.includes(objects);
    }

    isItEndboss(objects) {
        return objects == this.world.endBoss;
    }

    isEndbossAlive(objects) {
        return objects == this.world.endBoss && !this.world.endBoss.isDead();
    }


    //schaden
    hit() {
        this.mainHealth -= 20;
        if (this.mainHealth < 0) {
            this.mainHealth = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }
}
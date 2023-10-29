class StatusBar extends DrawableObject {
    height;
    width;
    x;
    y;
    mainHealth = 100;
    coinCounter = 0;
    bottleCounter = 0;
    world;

    STATUS_COIN = [
        'src/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        'src/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        'src/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        'src/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        'src/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        'src/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png'
    ];

    STATUS_HEALTH = [
        'src/img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'src/img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
        'src/img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'src/img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'src/img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'src/img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];

    STATUS_BOSS = [
        'src/img/7_statusbars/2_statusbar_endboss/orange.png',
        'src/img/7_statusbars/2_statusbar_endboss/orange.png',
        'src/img/7_statusbars/2_statusbar_endboss/green.png',
        'src/img/7_statusbars/2_statusbar_endboss/green.png',
        'src/img/7_statusbars/2_statusbar_endboss/blue.png',
        'src/img/7_statusbars/2_statusbar_endboss/blue.png'
    ];

    STATUS_BOTTLE = [
        'src/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'src/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'src/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'src/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'src/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'src/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ];


    constructor() {
        super();
        this.loadImages(this.STATUS_HEALTH);
        this.loadImages(this.STATUS_COIN);
        this.loadImages(this.STATUS_BOTTLE);
        this.x = 40;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setMainHealth(100);
    }

    mainHealthIndex() {
        return Math.min(Math.floor(this.mainHealth / 20), 5);
    }

    setMainHealth(mainHealth) {
        this.mainHealth = mainHealth;
        let path = this.STATUS_HEALTH[this.mainHealthIndex()];
        this.img = this.imageCache[path];
    }

}
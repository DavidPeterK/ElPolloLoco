class StatusBar extends DrawableObject {
    height;
    width;
    x;
    y;
    mainHealth = 100;
    endbossHealth;
    chickenHealth;
    coinCounter = 0;
    bottleCounter = 0;
    world;
    type;
    coinStorage;
    salsaBottleStorage;


    STATUS_COIN = [
        'src/img/7_statusbars/3_icons/icon_coin.png'
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
        'src/img/7_statusbars/3_icons/icon_salsa_bottle.png'
    ];


    constructor(x, y, width, height, health, type) {
        super();
        this.loadImages(this.STATUS_HEALTH);
        this.loadImages(this.STATUS_COIN);
        this.loadImages(this.STATUS_BOTTLE);
        this.loadImages(this.STATUS_BOSS);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.type = type;
        this.setStatusBar(health);
    }

    healthIndex(object) {
        if (object == 'character') {
            return Math.min(Math.floor(this.mainHealth / 20), 5);
        } else if (object == 'endboss') {
            return Math.min(Math.floor(this.endbossHealth / 200), 5);
        }
    }

    setStatusBar(health) {
        if (this.type == 'character') {
            this.mainHealth = health;
            let path = this.STATUS_HEALTH[this.healthIndex(this.type)];
            this.img = this.imageCache[path];
        } else if (this.type == 'endboss') {
            this.endbossHealth = health;
            let path = this.STATUS_BOSS[this.healthIndex(this.type)];
            this.img = this.imageCache[path];
        } else if (this.type == 'coin') {
            this.coinStorage = health;
            let path = this.STATUS_COIN[0];
            this.img = this.imageCache[path];
        } else if (this.type == 'salsaBottle') {
            this.salsaBottleStorage = health;
            let path = this.STATUS_BOTTLE[0];
            this.img = this.imageCache[path];
        }
    }
}
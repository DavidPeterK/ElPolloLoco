class StatusBar extends DrawableObject {
    height = '';
    width = '';
    x = '';
    y = '';

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
        'src/img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'src/img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'src/img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'src/img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'src/img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
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
        this.loadImages(this.STATUS_HEALTH);
        this.loadImages(this.STATUS_COIN);
        this.loadImages(this.STATUS_BOTTLE);
    }
}
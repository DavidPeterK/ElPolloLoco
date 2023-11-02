class Level {
    endboss;
    chicken;
    backgroundObjects;
    clouds;
    bottle;
    statusBarChar;
    statusBarEndboss;
    coin;
    salsaBottle;
    //level_end_x = 2776;
    level_start_x = 0;
    level_end_x = 2420;

    constructor(endboss, chicken, backgroundObjects, clouds, bottle, statusBarChar, statusBarEndboss, coin, salsaBottle) {
        this.endboss = endboss;
        this.chicken = chicken;
        this.clouds = clouds;
        this.bottle = bottle;
        this.backgroundObjects = backgroundObjects;
        this.statusBarChar = statusBarChar;
        this.statusBarEndboss = statusBarEndboss;
        this.coin = coin;
        this.salsaBottle = salsaBottle;
    }
}
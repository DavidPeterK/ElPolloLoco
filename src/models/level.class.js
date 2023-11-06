class Level {
    character;
    endboss;
    chicken;
    backgroundObjects;
    clouds;
    bottle;
    statusBarChar;
    statusBarCoin;
    statusBarSalsaBottle;
    statusBarEndboss;
    coin;
    salsaBottle;
    //level_end_x = 2776;
    level_start_x = 0;
    level_end_x = 2420;

    constructor(character, endboss, chicken, backgroundObjects, clouds, bottle, statusBarChar, statusBarEndboss, statusBarCoin, statusBarSalsaBottle, coin, salsaBottle) {
        this.character = character;
        this.endboss = endboss;
        this.chicken = chicken;
        this.clouds = clouds;
        this.bottle = bottle;
        this.backgroundObjects = backgroundObjects;
        this.statusBarChar = statusBarChar;
        this.statusBarEndboss = statusBarEndboss;
        this.statusBarCoin = statusBarCoin;
        this.statusBarSalsaBottle = statusBarSalsaBottle;
        this.coin = coin;
        this.salsaBottle = salsaBottle;
    }
}
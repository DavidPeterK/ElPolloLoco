class Level {
    character;
    endboss;
    normalEnemy;
    smallEnemy;
    backgroundObjects;
    clouds;
    throwObject;
    statusBarChar;
    statusBarCoin;
    statusBarThrowObject;
    statusBarEndboss;
    coin;
    collectableThrowObjects;
    //level_end_x = 2776;
    level_start_x = 0;
    level_end_x = 2420;

    constructor(character, endboss, normalEnemy, smallEnemy, backgroundObjects, clouds, throwObject, statusBarChar, statusBarEndboss, statusBarCoin, statusBarThrowObject, coin, collectableThrowObjects) {
        this.character = character;
        this.endboss = endboss;
        this.normalEnemy = normalEnemy;
        this.smallEnemy = smallEnemy;
        this.clouds = clouds;
        this.throwObject = throwObject;
        this.backgroundObjects = backgroundObjects;
        this.statusBarChar = statusBarChar;
        this.statusBarEndboss = statusBarEndboss;
        this.statusBarCoin = statusBarCoin;
        this.statusBarThrowObject = statusBarThrowObject;
        this.coin = coin;
        this.collectableThrowObjects = collectableThrowObjects;
    }
}
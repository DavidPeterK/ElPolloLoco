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
    level_start_x = 0;
    level_end_x = 2420;

    /**
     * Constructs a new game level with specified game objects and status bars.
     * This constructor initializes the level with characters, enemies, background elements, and various status bars.
     *
     * @param {Character} character - The main character of the game.
     * @param {Endboss} endboss - The endboss character of the level.
     * @param {Array} normalEnemy - An array of normal enemies in the level.
     * @param {Array} smallEnemy - An array of small enemies in the level.
     * @param {Array} backgroundObjects - An array of background objects for the level.
     * @param {Array} clouds - An array of cloud objects for the level.
     * @param {Array} throwObject - An array of throwable objects in the level.
     * @param {StatusBar} statusBarChar - The status bar for the main character.
     * @param {StatusBar} statusBarEndboss - The status bar for the endboss.
     * @param {StatusBar} statusBarCoin - The status bar for coins.
     * @param {StatusBar} statusBarThrowObject - The status bar for throwable objects.
     * @param {Array} coin - An array of coin objects in the level.
     * @param {Array} collectableThrowObjects - An array of collectable throw objects in the level.
     */
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
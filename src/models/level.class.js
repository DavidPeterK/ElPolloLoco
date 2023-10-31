class Level {
    endboss;
    chicken;
    backgroundObjects;
    clouds;
    bottle;
    statusBarChar;
    statusBarEndboss;
    level_end_x = 2776;

    constructor(endboss, chicken, backgroundObjects, clouds, bottle, statusBarChar, statusBarEndboss) {
        this.endboss = endboss;
        this.chicken = chicken;
        this.clouds = clouds;
        this.bottle = bottle;
        this.backgroundObjects = backgroundObjects;
        this.statusBarChar = statusBarChar;
        this.statusBarEndboss = statusBarEndboss;
    }
}
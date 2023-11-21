const CLOUD_PATH = 'src/img/5_background/layers/4_clouds/';
const LAYER_PATH = 'src/img/5_background/layers/';

function startLevelEPL1() {
    levelEPL1 = new Level(
        createCharacter(),
        createEndboss(),
        createChickens(),
        createSmallChickens(),
        createBackgrounds(),
        createClouds(),
        createBottles(),
        createStatusBarCharacter(),
        createStatusBarEndboss(),
        createStatusBarCoins(),
        createStatusBarThrowObjects(),
        createCoins(),
        createCollectableThrowObjects(),
    );

    function createCharacter() {
        return [
            new CharacterPepe(),
        ]
    }

    function createEndboss() {
        return [
            new EndbossChicken(),
        ]
    }

    function createChickens() {
        return [
            new Chicken(550), new Chicken(750),
            new Chicken(950), new Chicken(1350),
            new Chicken(1750), new Chicken(2100),
            new Chicken(2700)
        ]
    }

    function createSmallChickens() {
        return [
            new SmallChicken(500), new SmallChicken(900),
            new SmallChicken(1100), new SmallChicken(1400),
            new SmallChicken(1800), new SmallChicken(2400),
            new SmallChicken(2700),
        ]
    }

    function createBackgrounds() {
        return [
            new BackgroundObject(LAYER_PATH + 'air.png', -719), new BackgroundObject(LAYER_PATH + '3_third_layer/2.png', -719),
            new BackgroundObject(LAYER_PATH + '2_second_layer/2.png', -719), new BackgroundObject(LAYER_PATH + '1_first_layer/2.png', -719),

            new BackgroundObject(LAYER_PATH + 'air.png', 0), new BackgroundObject(LAYER_PATH + '3_third_layer/1.png', 0),
            new BackgroundObject(LAYER_PATH + '2_second_layer/1.png', 0), new BackgroundObject(LAYER_PATH + '1_first_layer/1.png', 0),

            new BackgroundObject(LAYER_PATH + 'air.png', 719), new BackgroundObject(LAYER_PATH + '3_third_layer/2.png', 719),
            new BackgroundObject(LAYER_PATH + '2_second_layer/2.png', 719), new BackgroundObject(LAYER_PATH + '1_first_layer/2.png', 719),

            new BackgroundObject(LAYER_PATH + 'air.png', 719 * 2), new BackgroundObject(LAYER_PATH + '3_third_layer/1.png', 719 * 2),
            new BackgroundObject(LAYER_PATH + '2_second_layer/1.png', 719 * 2), new BackgroundObject(LAYER_PATH + '1_first_layer/1.png', 719 * 2),

            new BackgroundObject(LAYER_PATH + 'air.png', 719 * 3), new BackgroundObject(LAYER_PATH + '3_third_layer/2.png', 719 * 3),
            new BackgroundObject(LAYER_PATH + '2_second_layer/2.png', 719 * 3), new BackgroundObject(LAYER_PATH + '1_first_layer/2.png', 719 * 3),

            new BackgroundObject(LAYER_PATH + 'air.png', 719 * 4), new BackgroundObject(LAYER_PATH + '3_third_layer/1.png', 719 * 4),
            new BackgroundObject(LAYER_PATH + '2_second_layer/1.png', 719 * 4), new BackgroundObject(LAYER_PATH + '1_first_layer/1.png', 719 * 4),
        ]
    }

    function createClouds() {
        return [
            new Cloud(CLOUD_PATH + '1.png', 200), new Cloud(CLOUD_PATH + '2.png', 700), new Cloud(CLOUD_PATH + '1.png', 1200), new Cloud(CLOUD_PATH + '2.png', 1700),
            new Cloud(CLOUD_PATH + '1.png', 2200), new Cloud(CLOUD_PATH + '2.png', 2700), new Cloud(CLOUD_PATH + '1.png', 3200), new Cloud(CLOUD_PATH + '2.png', 3700),
            new Cloud(CLOUD_PATH + '1.png', 4200), new Cloud(CLOUD_PATH + '2.png', 4700), new Cloud(CLOUD_PATH + '1.png', 5200),
        ]
    }

    function createBottles() {
        return []
    }

    function createStatusBarCharacter() {
        return [
            new StatusBar(40, 0, 200, 60, 100, 'character'),
        ]
    }

    function createStatusBarEndboss() {
        return [
            new StatusBar(480, 0, 200, 60, 1000, 'endboss'),
        ]
    }

    function createStatusBarCoins() {
        return [
            new StatusBar(40, 55, 60, 60, 0, 'coin'),
        ]
    }

    function createStatusBarThrowObjects() {
        return [
            new StatusBar(35, 115, 70, 60, 0, 'salsaBottle'),
        ]
    }

    function createCoins() {
        return [
            new Coin(420, 280), new Coin(520, 180), new Coin(620, 80), new Coin(720, 180),
            new Coin(820, 280), new Coin(900, 280), new Coin(1000, 280), new Coin(1100, 280),
            new Coin(1200, 280), new Coin(1300, 280), new Coin(1420, 280), new Coin(1520, 180),
            new Coin(1620, 80), new Coin(1720, 180), new Coin(1820, 280),
        ]
    }

    function createCollectableThrowObjects() {
        return [
            new SalsaBottle(320, 'src/img/6_salsa_bottle/1_salsa_bottle_on_ground.png'), new SalsaBottle(620, 'src/img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
            new SalsaBottle(920, 'src/img/6_salsa_bottle/1_salsa_bottle_on_ground.png'), new SalsaBottle(1220, 'src/img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
            new SalsaBottle(1520, 'src/img/6_salsa_bottle/1_salsa_bottle_on_ground.png'), new SalsaBottle(2120, 'src/img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
        ]
    }

}
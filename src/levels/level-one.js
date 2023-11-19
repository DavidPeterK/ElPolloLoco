let level;

const CLOUD_PATH = 'src/img/5_background/layers/4_clouds/';
const LAYER_PATH = 'src/img/5_background/layers/';


function startLevelEPL1() {
    levelEPL1 = new Level(
        [
            new CharacterPepe(),
        ],

        [
            new EndbossChicken(),
        ],

        [
            new Chicken(450, 365),
            new Chicken(450, 365),
            new Chicken(450, 365)
        ],

        [
            new SmallChicken(400, 300),
        ],

        [
            new BackgroundObject(LAYER_PATH + 'air.png', -719),
            new BackgroundObject(LAYER_PATH + '3_third_layer/2.png', -719),
            new BackgroundObject(LAYER_PATH + '2_second_layer/2.png', -719),
            new BackgroundObject(LAYER_PATH + '1_first_layer/2.png', -719),

            new BackgroundObject(LAYER_PATH + 'air.png', 0),
            new BackgroundObject(LAYER_PATH + '3_third_layer/1.png', 0),
            new BackgroundObject(LAYER_PATH + '2_second_layer/1.png', 0),
            new BackgroundObject(LAYER_PATH + '1_first_layer/1.png', 0),

            new BackgroundObject(LAYER_PATH + 'air.png', 719),
            new BackgroundObject(LAYER_PATH + '3_third_layer/2.png', 719),
            new BackgroundObject(LAYER_PATH + '2_second_layer/2.png', 719),
            new BackgroundObject(LAYER_PATH + '1_first_layer/2.png', 719),

            new BackgroundObject(LAYER_PATH + 'air.png', 719 * 2),
            new BackgroundObject(LAYER_PATH + '3_third_layer/1.png', 719 * 2),
            new BackgroundObject(LAYER_PATH + '2_second_layer/1.png', 719 * 2),
            new BackgroundObject(LAYER_PATH + '1_first_layer/1.png', 719 * 2),

            new BackgroundObject(LAYER_PATH + 'air.png', 719 * 3),
            new BackgroundObject(LAYER_PATH + '3_third_layer/2.png', 719 * 3),
            new BackgroundObject(LAYER_PATH + '2_second_layer/2.png', 719 * 3),
            new BackgroundObject(LAYER_PATH + '1_first_layer/2.png', 719 * 3),

            new BackgroundObject(LAYER_PATH + 'air.png', 719 * 4),
            new BackgroundObject(LAYER_PATH + '3_third_layer/1.png', 719 * 4),
            new BackgroundObject(LAYER_PATH + '2_second_layer/1.png', 719 * 4),
            new BackgroundObject(LAYER_PATH + '1_first_layer/1.png', 719 * 4),
        ],

        [
            new Cloud(CLOUD_PATH + '1.png', 200),
            new Cloud(CLOUD_PATH + '2.png', 700),
            new Cloud(CLOUD_PATH + '1.png', 1200),
            new Cloud(CLOUD_PATH + '2.png', 1700),
            new Cloud(CLOUD_PATH + '1.png', 2200),
            new Cloud(CLOUD_PATH + '2.png', 2700),
            new Cloud(CLOUD_PATH + '1.png', 3200),
            new Cloud(CLOUD_PATH + '2.png', 3700),
            new Cloud(CLOUD_PATH + '1.png', 4200),
            new Cloud(CLOUD_PATH + '2.png', 4700),
            new Cloud(CLOUD_PATH + '1.png', 5200),
        ],

        [

        ],

        [
            new StatusBar(40, 0, 200, 60, 100, 'character'),
        ],

        [
            new StatusBar(480, 0, 200, 60, 1000, 'endboss'),
        ],

        [
            new StatusBar(40, 55, 60, 60, 0, 'coin'),
        ],

        [
            new StatusBar(35, 115, 70, 60, 0, 'salsaBottle'),
        ],

        [
            new Coin(420, 280),
            new Coin(520, 180),
            new Coin(620, 80),
            new Coin(720, 180),
            new Coin(820, 280),
            new Coin(900, 280),
            new Coin(1000, 280),
            new Coin(1100, 280),
            new Coin(1200, 280),
            new Coin(1300, 280),
            new Coin(1420, 280),
            new Coin(1520, 180),
            new Coin(1620, 80),
            new Coin(1720, 180),
            new Coin(1820, 280),
        ],

        [
            new SalsaBottle(320, 'src/img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
            new SalsaBottle(620, 'src/img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
            new SalsaBottle(920, 'src/img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
            new SalsaBottle(1220, 'src/img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
            new SalsaBottle(1520, 'src/img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
            new SalsaBottle(2120, 'src/img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
        ],
    );
    level = '';
    level.push(levelEPL1);
    startGame();
    playGameMusic();
    setTimeout(() => {
        hideOverlay('loadScreen');
        showMobileOverlay();
        showOverlay('mutePauseContainer')
        gameStop = false;
        gameActiv = true;
        coinStorage = 0;
        throwObjectsStorage = 0;
    }, 3500);
}
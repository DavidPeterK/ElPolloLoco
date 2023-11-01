// Define the assets paths
const CLOUD_PATH = 'src/img/5_background/layers/4_clouds/';
const LAYER_PATH = 'src/img/5_background/layers/';
let level1;
function initLevel1() {
    level1 = new Level(
        [
            new Endboss(),
        ],

        [
            new Chicken(),
            new Chicken(),
            new Chicken(),
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
        ],

        [

        ],

        [
            new StatusBar(40, 0, 100, 'character'),
        ],

        [
            new StatusBar(480, 0, 1000, 'endboss'),
        ],
    );
}

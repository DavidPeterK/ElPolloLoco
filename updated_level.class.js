
class Level {
    // ... (other properties and methods of the Level class)

    constructor(character, endboss, normalEnemy, smallEnemy, backgroundObjects, clouds, throwObject, statusBarChar, statusBarEndboss, statusBarCoin, statusBarThrowObject, coin, collectableThrowObjects) {
        this.character = character;
        this.endboss = endboss;
        this.normalEnemy = normalEnemy;
        this.smallEnemy = smallEnemy;
        this.backgroundObjects = backgroundObjects;
        this.clouds = clouds;
        this.throwObject = throwObject;
        this.statusBarChar = statusBarChar;
        this.statusBarEndboss = statusBarEndboss;
        this.statusBarCoin = statusBarCoin;
        this.statusBarThrowObject = statusBarThrowObject;
        this.coin = coin;
        this.collectableThrowObjects = collectableThrowObjects;
    }
}

// Objekte für die Figuren und andere Elemente definieren
let characterObj = {
  x: 120,
  y: 180,
  width: 100,
  height: 250,
  offsetXLeft: 20,
  offsetXRight: 30,
  offsetYUp: 100,
  offsetYDown: 5
};

let endBossObj = {
  x: 2776,
  y: 60,
  width: 250,
  height: 400,
  offsetXLeft: 55,
  offsetXRight: 50,
  offsetYUp: 75,
  offsetYDown: 30
};

let chickenObj = { // als normalEnemy
  x: 450,
  y: 365,
  width: 70,
  height: 55,
  offsetXLeft: 0,
  offsetXRight: 0,
  offsetYUp: 0,
  offsetYDown: 0
};

let smallChickenObj = { // als smallEnemy
  x: 400,
  y: 180,
  width: 70,
  height: 55,
  offsetXLeft: 0,
  offsetXRight: 0,
  offsetYUp: 0,
  offsetYDown: 0
};

let bottleObj = { // als throwObject
  // Die X- und Y-Positionen müssen zur Laufzeit basierend auf der character-Position berechnet werden
  x: characterObj.x + 30,
  y: characterObj.y + 170,
  width: 50,
  height: 60,
  offsetXLeft: 0,
  offsetXRight: 0,
  offsetYUp: 0,
  offsetYDown: 0
};

// Füllen Sie die folgenden Platzhalter mit Ihren tatsächlichen Daten
let backgroundObjectsArray = []; // TODO: Hinzufügen der Hintergrundobjekte
let cloudsArray = []; // TODO: Hinzufügen der Wolkenobjekte
let statusBarCharObj = {}; // TODO: Hinzufügen des Statusbalken-Objekts für den Charakter
let statusBarEndbossObj = {}; // TODO: Hinzufügen des Statusbalken-Objekts für den Endboss
let statusBarCoinObj = {}; // TODO: Hinzufügen des Statusbalken-Objekts für die Münzen
let statusBarThrowObjectObj = {}; // TODO: Hinzufügen des Statusbalken-Objekts für Wurfobjekte
let coinArray = []; // TODO: Hinzufügen der Münzen
let collectableThrowObjectsArray = []; // TODO: Hinzufügen der sammelbaren Wurfobjekte

// Instanz der Level-Klasse erstellen
let level = new Level(
  characterObj,
  endBossObj,
  chickenObj,
  smallChickenObj,
  backgroundObjectsArray,
  cloudsArray,
  bottleObj,
  statusBarCharObj,
  statusBarEndbossObj,
  statusBarCoinObj,
  statusBarThrowObjectObj,
  coinArray,
  collectableThrowObjectsArray
);

// Stellen Sie sicher, dass alle Variablen korrekt definiert sind, bevor Sie dieses Skript ausführen.

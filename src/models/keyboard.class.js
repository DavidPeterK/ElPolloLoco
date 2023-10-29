class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    D = false;

    constructor() {
        document.addEventListener('keydown', this.onKeyDown.bind(this));
        document.addEventListener('keyup', this.onKeyUp.bind(this));
    }

    onKeyDown(event) {
        switch (event.keyCode) {
            case 37:
                this.LEFT = true;
                break;
            case 39:
                this.RIGHT = true;
                break;
            case 38:
                this.UP = true;
                break;
            case 40:
                this.DOWN = true;
                break;
            case 32:
                this.SPACE = true;
                break;
            case 68:
                this.D = true;
                break;
        }
    }

    onKeyUp(event) {
        switch (event.keyCode) {
            case 37:
                this.LEFT = false;
                break;
            case 39:
                this.RIGHT = false;
                break;
            case 38:
                this.UP = false;
                break;
            case 40:
                this.DOWN = false;
                break;
            case 32:
                this.SPACE = false;
                break;
            case 68:
                this.D = false;
                break;
        }
    }
}
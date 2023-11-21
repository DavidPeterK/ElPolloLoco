class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    D = false;
    P = false;

    constructor() {
        document.addEventListener('keydown', this.onKeyDown.bind(this));
        document.addEventListener('keyup', this.onKeyUp.bind(this));
    }

    /**
     * Handles the 'keydown' event for the game.
     * This method sets the corresponding boolean flags to true based on the key pressed.
     * It's used for controlling the character or game actions based on keyboard input.
     *
     * @param {KeyboardEvent} event - The keyboard event object containing information about the key pressed.
     */
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
            case 80:
                this.P = true;
                break;
        }
    }

    /**
     * Handles the 'keyup' event for the game.
     * This method sets the corresponding boolean flags to false when a key is released.
     * It's used to stop certain actions or movements that are controlled by keyboard input.
     *
     * @param {KeyboardEvent} event - The keyboard event object containing information about the key released.
     */
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
            case 80:
                this.P = false;
                break;
        }
    }
}
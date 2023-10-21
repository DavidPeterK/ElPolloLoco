class MovableObject {
    x = 120;
    y = 280;
    height = 150;
    width = 100;
    img;
    imageCache = [];
    currentImage = 0;
    speed = 0.2;


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(set) {
        set.array.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });

    }

    moveRight() {

    }

    moveLeft() {
        setInterval(() => {
            this.x -= 0.2;
        }, 1000 / 60);
    }
}
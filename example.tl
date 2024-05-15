/**
 * Class declaration
 */
class Point {
    func constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    func calc() {
        return this.x + this.y;
    }
}

/**
 * Child class
 */
class Circle extends Point {
    func constructor(x, y, radius) {
        super(x, y);
        this.radius = radius;
    }

    func calc() {
        return super() + this.radius;
    }
}

/**
 * Instance
 */
let c = new Circle(0, 0, 10);

c.area();
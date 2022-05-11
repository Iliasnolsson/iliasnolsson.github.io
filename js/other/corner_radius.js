
class CornerRadius {

    constructor({topLeft, topRight, bottomLeft, bottomRight}) {
        this.topLeft = topLeft
        this.topRight = topRight
        this.bottomLeft = bottomLeft
        this.bottomRight = bottomRight
    }

    static all(all) {
        return new CornerRadius({topLeft: all, topRight: all, bottomLeft: all, bottomRight: all})
    }

    static get zero() {
        return CornerRadius.all(0);
    }

    isZero() {
        return this.topLeft == 0 && this.topRight == 0 && this.bottomLeft == 0 && this.bottomRight == 0
    }

}
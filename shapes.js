/**
 * ---------- TETRIS SHAPES ----------
 */


class ShapeI{
    constructor(){
        this.positions = [{x: 3, y: 1}, {x: 4, y: 1}, {x: 5, y: 1}, {x: 6, y: 1}];
        this.color = colors.Blue;
        this.axis = 1;
    }
}

class ShapeT{
    constructor(){
        this.positions = [{x: 3, y: 1}, {x: 4, y: 1}, {x: 5, y: 1}, {x: 4, y: 0}];
        this.color = colors.Purple;
        this.axis = 1;
    }
}

class ShapeL{
    constructor(){
        this.positions = [{x: 3, y: 1}, {x: 4, y: 1}, {x: 5, y: 1}, {x: 5, y: 0}];
        this.color = colors.Orange;
        this.axis = 1;
    }
}

class ShapeJ{
    constructor(){
        this.positions = [{x: 3, y: 1}, {x: 4, y: 1}, {x: 5, y: 1}, {x: 3, y: 0}];
        this.color = colors.Navy;
        this.axis = 1;
    }
}

class ShapeO{
    constructor(){
        this.positions = [{x: 4, y: 0}, {x: 4, y: 1}, {x: 5, y: 0}, {x: 5, y: 1}];
        this.color = colors.Yellow;
        this.axis = null;
    }
}

class ShapeS{
    constructor(){
        this.positions = [{x: 3, y: 1}, {x: 4, y: 1}, {x: 4, y: 0}, {x: 5, y: 0}];
        this.color = colors.Green;
        this.axis = 1;
    }
}

class ShapeZ{
    constructor(){
        this.positions = [{x: 3, y: 0}, {x: 4, y: 0}, {x: 4, y: 1}, {x: 5, y: 1}];
        this.color = colors.Red;
        this.axis = 2;
    }
}


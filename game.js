/**
 * ---------- KEYBOARD EVENTS ----------
 */
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


/**
 * ---------- CANVAS AND IT'S CONTEXT ----------
 */
var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");


/**
 * ---------- CONSTANTS ----------
 */

const shapeWidth = 30;
const cols = canvas.width / shapeWidth;
const rows = canvas.height / shapeWidth;

const colors = {
    Blue: "#A5EAEE",
    Purple: "#9261C3",
    Orange: "#F59E42",
    Navy: "#1B35FA",
    Yellow: "#F6FA1B",
    Green: "#0AF535",
    Red: "#F50A0A",
    Black: "#000000",
    Gray: "#9A9DA1",
}

const directions = {
    Up: {dx: 0, dy: -1},
    Down: {dx: 0, dy: 1},
    Left: {dx: -1, dy: 0},
    Right: {dx: 1, dy: 0},
}

const shapeTypes = {
    1: "I",
    2: "T",
    3: "L",
    4: "J",
    5: "O",
    6: "S",
    7: "Z",
}

/**
 * ---------- VARIABLES ----------
 */

var baseSpeed = 1000;
var speed = 1000;

var score = 0;
var level = 1;

var intervalCanvas = setInterval(gameEngine, 1000/120);
var intervalMovement = setInterval(moveNewShape, speed);

var fields = [];
for(let i = 0; i < rows + 1; i++){
    fields[i] = [];
    for(let j = 0; j < cols; j++){
        if(i == rows) {fields[i][j] = 1;}
        else {fields[i][j] = 0;}
    }
}

var shape = null;


/**
 * ---------- GAME CALLBACKS ----------
 */

function fillFields(){
    for(const part of shape.positions){
        fields[part.y][part.x] = shape.color;
    }
    tetris();
}


function tetris(){
    let tetris = false;
    let rowsBroken = 0;
    

    let r = rows - 1;

    while(r >= 0){
        let c = 0;
        
        while(c < cols){
            if(fields[r][c] == 0){break;}
            c++;
        }

        if(c == cols){
            tetris = true;
            rowsBroken++;
        }else if(c != cols && tetris){
            break;
        }
        
        r--;
    }


    for(let i = r; i >= 0; i--){
        for(let j = 0; j < cols; j++){
            fields[i + rowsBroken][j] = fields[i][j];
            fields[i][j] = 0;
        }
    }
    
}


function moveShapeHorizontally(dir){

    let isOnMargin = false;

    for(const part of shape.positions){
        if(fields[part.y][part.x + dir.dx] != 0){
            isOnMargin = true;
            break;
        }
    }

    if(!isOnMargin){
        for(let part of shape.positions){
            part.x = part.x + dir.dx;
        }
    }

}

function getRandomShape(){
    const max = Math.floor(Object.keys(shapeTypes).length);
    const min = Math.ceil(1);

    const randomShape = Math.floor(Math.random() * (max + 1 - min + 1) + min);
    
    switch(randomShape){
        case 1:
            shape = new ShapeI();
            break;
        case 2:
            shape = new ShapeT();
            break;
        case 3:
            shape = new ShapeL();
            break;
        case 4:
            shape = new ShapeJ();
            break;
        case 5:
            shape = new ShapeO();
            break;
        case 6:
            shape = new ShapeS();
            break;
        case 7:
            shape = new ShapeZ();
            break;
    }
}


function tetris(){
    let tetris = false;
    let rowsBroken = 0;
    

    let r = rows - 1;

    while(r >= 0){
        let c = 0;
        
        while(c < cols){
            if(fields[r][c] == 0){break;}
            c++;
        }

        if(c == cols){
            tetris = true;
            rowsBroken++;
        }else if(c != cols && tetris){
            break;
        }
        
        r--;
    }


    for(let i = r; i >= 0; i--){
        for(let j = 0; j < cols; j++){
            fields[i + rowsBroken][j] = fields[i][j];
            fields[i][j] = 0;
        }
    }
    
}

function drawFields(){
    for(let i = 0; i < rows; i ++){
        for(let j = 0; j < cols; j++){
            ctx.beginPath();
            ctx.rect(j * shapeWidth, i * shapeWidth, shapeWidth, shapeWidth);
            if(fields[i][j] != 0){

                ctx.fillStyle = fields[i][j];
                ctx.fill();

            }
            ctx.lineWidth = 2;
            ctx.strokeStyle = colors.Black;
            ctx.stroke();
            ctx.closePath();
        }
    }
}

function moveShapeHorizontally(dir){

    let isOnMargin = false;

    for(const part of shape.positions){
        if(fields[part.y][part.x + dir.dx] != 0){
            isOnMargin = true;
            break;
        }
    }

    if(!isOnMargin){
        for(let part of shape.positions){
            part.x = part.x + dir.dx;
        }
    }

}

function drawNewShape(){
   
    if(shape == null){getRandomShape();}

    ctx.beginPath();
    
    for(const part of shape.positions){
        ctx.rect(part.x * shapeWidth, part.y * shapeWidth, shapeWidth, shapeWidth);
        ctx.fillStyle = shape.color;
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "black";
        ctx.stroke();
    }

    ctx.closePath();
}


function moveNewShape(){
    
    if(shape == null){return;}
    let stop = false;

    for(const part of shape.positions){
        if(fields[part.y + 1][part.x] != 0){
            stop = true;
            fillFields();
            shape = null;
            break;
        }
    }

    if(!stop){
        for(let part of shape.positions){
            part.y = part.y + directions.Down.dy;
        }
    }
    
}

function fillFields(){
    for(const part of shape.positions){
        fields[part.y][part.x] = shape.color;
    }
    tetris();
}

function addScore(rowsBroken){
    score = score + (rowsBroken * 100);
    document.getElementById("score").innerHTML = score;
    adjustDifficulty();
}

function adjustDifficulty(){
    let auxLevel = Math.floor(score / 1000) + 1;

    
    if(auxLevel > level){
        level = auxLevel;
        if(level <= 9) {
            console.log("chanve level");
            baseSpeed = baseSpeed - 100;
            
            clearInterval(intervalMovement);
            intervalMovement = setInterval(moveNewShape, baseSpeed);
        };

        document.getElementById("level").innerHTML = level;
    }

}

function tetris(){
    let rowsBroken = 0;
    

    let r = rows - 1;

    while(r >= 0){
        let c = 0;
        
        while(c < cols){
            if(fields[r][c] == 0){break;}
            c++;
        }

        if(c == cols){
            for(let i = r; i > 0; i--){
                for(let j = 0; j < cols; j++){
                    fields[i][j] = fields[i - 1][j];
                }
            }
            rowsBroken++;
        }else{
            addScore(rowsBroken);
            rowsBroken = 0;
            r--;
        }
        
        
    }


    for(let i = r; i >= 0; i--){
        for(let j = 0; j < cols; j++){
            fields[i + rowsBroken][j] = fields[i][j];
            fields[i][j] = 0;
        }
    }
    
}


function moveShapeHorizontally(dir){

    if(shape == null) return;

    let collision = false;

    for(const part of shape.positions){
        if(fields[part.y][part.x + dir.dx] != 0){
            collision = true;
            break;
        }
    }

    if(!collision){
        for(let part of shape.positions){
            part.x = part.x + dir.dx;
        }
    }

}

function rotateShape(){

    if(shape.axis == null || shape == null) return;
    const q = shape.positions[shape.axis];
    const auxPositions = structuredClone(shape.positions);
    const t = {x: -q.x, y: -q.y};
    
    for(let part of shape.positions){

        part.x = part.x + t.x;
        part.y = part.y + t.y;

        const aux = part.x;
        part.x = -part.y;
        part.y = aux;

        part.x = (part.x - t.x);
        part.y = (part.y - t.y);
        
        if(fields[part.y][part.x] != 0){
            shape.positions = auxPositions;
            break;
        }
        
    }
}

function accelerate(){
    if(speed == baseSpeed){
        speed = 50
        clearInterval(intervalMovement);
        intervalMovement = setInterval(moveNewShape, speed);
    }
}

function deaccelerate(){
    speed = baseSpeed;
    clearInterval(intervalMovement);
    intervalMovement = setInterval(moveNewShape, speed);
}

function cleanCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function gameEngine(){
    cleanCanvas();

    drawNewShape();
    
    drawFields();
}


function keyDownHandler(e) {
    switch(e.key){
        case "ArrowRight":
            moveShapeHorizontally(directions.Right);
            break;
        case "ArrowLeft":
            moveShapeHorizontally(directions.Left);
            break;
        case "ArrowUp":
            rotateShape();
            break;
        case "ArrowDown":
            accelerate();
            break;

    }


}

function keyUpHandler(e){
    switch(e.key){
        case "ArrowDown":
            deaccelerate();
            break;
    }
}



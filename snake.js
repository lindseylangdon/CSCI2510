class SnakePart{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

let speed = 7;

let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLength = 2;

let appleX = 5;
let appleY = 5;

let velocityX = 0;
let velocityY = 0;

let score  = 0;

function update() {
    if (scene == 0) {
        if (keysDown[" "]) {
            scene = 1;
        }
    }
    else if (scene == 1) {

        //Model of MVC

        //Change Snake position
        headX = headX + velocityX;
        headY = headY + velocityY;


        //Adds to snake
        snakeParts.push(new SnakePart(headX, headY))            //Push a NEW part onto the snake where the X/Y position of the head was (not where head currently is)
        if(snakeParts.length > tailLength){
            snakeParts.shift();                                 //The last item in the list is the one next to the head (Last tail piece is oldest piece in the head)
        } 

        //Checks to see if game is over
        //If game hasn't started (the snake doesn't have any velocity)
        // if (velocityX === 0 && velocityY === 0){
        //     scene = 0
        // }

        //Check to see if Snake hits borders
        //Left border
        if (headX < 0){
            scene = 2
        }
        //Right Border
        else if (headX === tileCount){
            scene = 2
        }
        //Top border
        else if (headY < 0){
            scene = 2
        }
        //Bottom border
        else if (headY === tileCount){
            scene = 2
        }

        //Check for collision
        //If position of the apple is the same as the position of the snake head redraw apple somewhere else and increase tail length
        if(appleX == headX && appleY == headY){
            appleX = Math.floor(Math.random() * tileCount);
            appleY = Math.floor(Math.random() * tileCount);
            speed = speed + 0.5;
            tailLength++;
            score++;
        }
    }
    else {
        //Scene 2
        if (keysDown[" "]) {
            scene = 0;
        }
    }
}

function draw() {
    if (scene == 0) {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = "white";
        ctx.font = "20px Verdana"
        ctx.fillText("PRESS SPACE TO START", canvas.width / 5.5, canvas.height / 2);
        document.getElementById("page").style.backgroundColor = "#68B88D"
    }
    else if (scene == 1) {
        //View part of MVC

        //Clear Screen
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        //Draws Snake
        //Body color of snake is green
        ctx.fillStyle = "green";
        for(let i = 0; i < snakeParts.length; i++){             //Iterates through snake parts array
            let part = snakeParts[i];
            ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize)
        }

        //Head color of snake is magenta
        ctx.fillStyle = "magenta";
        ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);

        //Draw Apple
        ctx.fillStyle = "red";
        ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize)
        
        //Draw Score
        ctx.fillStyle = "white";
        ctx.font = "10px Verdana";
        ctx.fillText("Score: " + score, canvas.width-50, 10)
    }
    else {
        //Gets rid of snake, makes Canvas black, changes backgrounds
        ctx.fillStyle = "black";
        ctx.fillRect(0,0, canvas.width, canvas.height);
        ctx.fillStyle = "white";  
        ctx.font = "50px Verdana";
        ctx.fillText("GAME OVER", canvas.width / 8, canvas.height / 2);
        ctx.fillStyle = "white";
        ctx.font = "15px Verdana";
        ctx.fillText("Score: " + score, canvas.width / 6.5, canvas.height / 6.5);
        document.getElementById("page").style.backgroundColor = "red";
    }
}
const canvas = document.getElementById("canv")
const ctx = canvas.getContext("2d");

let keysDown = []
let mouseX;
let mouseY

//Not the strings has to be all lowercase, e.g. keydown not keyDown or KeyDown
document.addEventListener("keydown", keyDown)
document.addEventListener("keyup", keyUp)

document.addEventListener("mousedown", mouseDown);
document.addEventListener("mouseup", mouseUp);
document.addEventListener("mousemove", mouseMove);

//0 is start scene, 1 main scene, 2 is dead scene
let scene = 0;

let pause = false

function mouseDown(e) {
    //console.log("mouseDown: " + e.clientX + " " + e.clientY)
}
function mouseUp(e) {
    //console.log("mouseUp: " + e.clientX + " " + e.clientY)
}
function mouseMove(e) {
    //console.log("mouseMove: " + e.clientX + " " + e.clientY)
}

function keyUp(e) {
    keysDown[e.key] = false
    //console.log(e)
    if (e.key == "ArrowLeft") {
        console.log("Up Left")
    }
    if (e.key == "ArrowRight") {
        console.log("Up Right")
    }
    if (e.key == "p") {
        pause = !pause
    }

}

function keyDown(e) {
    keysDown[e.key] = true
    //console.log(e)
    if (e.keyCode == 37) {
        console.log("Down Left")
        if(velocityX == 1)
            return;
        velocityY = 0;
        velocityX = -1;
    }
    if (e.keyCode == 39) {
        console.log("Down Right")
        if(velocityX == -1)
            return;
    velocityY = 0;
    velocityX = 1;
    }
    if (e.keyCode == 40) {
        console.log("Down Down")
        if(velocityY == -1)
            return;
        velocityY = 1;
        velocityX = 0;
    }
    if (e.keyCode == 38) {
        if(velocityY == 1)              //Since you are pressing up, if you are moving down, it is not allowed (exit function)
            return;
        velocityY = -1;
        velocityX = 0;
        console.log("Down Up")
    }
    //To prevent scrolling (if needed)
    //This has to be in keyDown, not keyup
    if (e.key == " ") {
        e.preventDefault()
    }
}

function engineUpdate() {
    if (pause) return
    update()
}

function engineDraw() { 
    draw()
}

function start(title){
    document.title = title
    function gameLoop() {
        engineUpdate()
        
        engineDraw()
        
    }

    setInterval(gameLoop, 1000 / speed)  

}
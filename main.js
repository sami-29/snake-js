const container = document.querySelector('#container')

let ELEMENTS = null
const makedivs = (n) => {
    for (let i = 0; i < n; i++){
        let div = document.createElement('div')
        container.appendChild(div)
    }

    ELEMENTS = n
}

makedivs(225)

const fillGridsList = (n) => {
    let array = []
    for (let i = 1; i < n+1; i++){
        array.push(container.childNodes[i])
    }
    return array
}

const Array = fillGridsList(ELEMENTS)

const RandomPos = (n) => Math.floor(Math.random() * n)

// Actual game code
let snake = [1,[]] // snake[size, position array]
let food = null
let direction = 0 //left, right, up, down
let speed = 10 //fps
let state = true

function draw() {
    Array.forEach(item => item.style.cssText = 'background-color: rgb(235, 209, 209);border: 1px solid black;')
    snake[1].forEach(pos => Array[pos].style.background = "blue")
    Array[food].style.background = "red"
    Array[food].style.borderRadius = '50%'
}

function move() {
    for (let i = snake[1].length - 1; i >0; i--) {
        snake[1][i] = snake[1][i-1]
    }
    if (direction === 'down') {
        snake[1][0] = adjustPos(snake[1][0] + 15)
    }
    if (direction === 'up') {
        snake[1][0] = adjustPos(snake[1][0] - 15)
    }
    if (direction === 'left') {
        let col = Math.floor(snake[1][0] / 15)
        snake[1][0] = adjustToCol(snake[1][0] - 1,col)

    }
    if (direction === 'right') {
        let col = Math.floor(snake[1][0]/15)
        snake[1][0] = adjustToCol(snake[1][0] + 1,col)
    }
    document.addEventListener('touchstart', handleTouchStart, false);        
	document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;                                                        
var yDown = null;

function getTouches(evt) {
  return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
}                                                     

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
};                                                

	function handleTouchMove(evt) {
    	if ( ! xDown || ! yDown ) {
        	return;
    	}

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
        	snake[1].push(adjustToCol(snake[1][0] + 1 * snake[0]))
            /* left swipe */ 
        } else {
        	snake[1].push(adjustToCol(snake[1][0] - 1 * snake[0]))
            /* right swipe */
        }                       
    } else {
        if ( yDiff > 0 ) {
            /* up swipe */ 
            snake[1].push(adjustPos(snake[1][0] + 15 * snake[0]))
        } else { 
            /* down swipe */
            snake[1].push(adjustPos(snake[1][0] + 15 * snake[0]))
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
};
    
}

function logic() {
    if (food === snake[1][0]) {
        if (direction === 'down') { snake[1].push(adjustPos(snake[1][snake[1].length-1] - 15)) }
        if (direction === 'up') { snake[1].push(adjustPos(snake[1][snake[1].length-1] + 15))  }
        if (direction === 'right') { snake[1].push(adjustToCol(snake[1][snake[1].length-1] - 1))}
        if (direction === 'left') { snake[1].push(adjustToCol(snake[1][snake[1].length-1] + 1))}
        snake[0]++
        createfood()
    }
    let snakeBody = snake[1].slice(1)
    if (snakeBody.includes(snake[1][0])) {
        state = false
    }
    
    
}

const Start = () => {
    pos = RandomPos(224)
    snake[1].push(pos)

    createfood()
}
Start()
let running = true

function adjustPos(x) {
    if (x > 224) { return x - 225 }
    if (x < 0) { return x + 225 }
    return x
}

function adjustToCol(x, col) {
    testCol = Math.floor(x / 15)
    
    if (testCol < col) { return x + 15 }
    if (testCol > col) { return x - 15 }
    return x
}


function createfood() {
    pos = RandomPos(224)
    while (snake[1].includes(pos)) {
        pos = RandomPos(224)
    }
    food = pos
}

var down = false;  
document.addEventListener('keydown', (event) => {
    if (down) return;
    down = true;
    var code = event.code;
    if (code == "ArrowDown" & direction != 'up') {
        direction = 'down'
    }
    if (code == "ArrowLeft" & direction != 'right') {
        direction = 'left'
    }
    if (code == "ArrowRight" & direction != 'left') {
        direction = 'right'
    }
    if (code == "ArrowUp" & direction != 'down') {
        direction = 'up'
    }
  
}, false);

document.addEventListener('keyup', function () {
    down = false;
}, false);

function gameover() {
    
}

var stop = false;
var frameCount = 0;
var fps, fpsInterval, startTime, now, then, elapsed;


// initialize the timer variables and start the animation

function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    gameloop();
}

requestAnimationFrame(gameloop)

function gameloop(timestamp) {
    // request another frame

    requestAnimationFrame(gameloop);

    // calc elapsed time since last loop

    now = Date.now();
    elapsed = now - then;

    // if enough time has elapsed, draw the next frame

    if (elapsed > fpsInterval) {

        // Get ready for next frame by setting then=now, but also adjust for your
        // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
        then = now - (elapsed % fpsInterval);

        // Put your drawing code here
        draw()
        if (state == false) {
            return
        }
        move()
        logic()
    }

    }

    
startAnimating(10)
console.log(Array)
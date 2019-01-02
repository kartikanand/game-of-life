/*
 * Get alive neighbours for a particular cell.
 * Be sure to look for crossing array bounds
 *
 * @param {bool[][]} world
 * @param {x: x, y: y} curr_pos current cell position object
 * @return {int} count of alive neighbours
 */
function getAliveNeighbourCount (world, curr_pos) {
    const height = world.length;
    const width = world[0].length;

    const {x, y} = curr_pos;

    // up, down, left, right
    const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1], [0, 1],
        [1, -1], [1, 0], [1, 1]
    ];

    let nCount = 0;
    for (let direction of directions) {
        const [dx, dy] = direction;

        const newX = x + dx;
        const newY = y + dy;

        if (newX >= 0
            && newX < height
            && newY >= 0
            && newY < width) {

            if (world[newX][newY])
                nCount++;
        }
    }

    return nCount;
}

/*
 * @param {bool} current state of cell
 * @param {int} no. of neighbours alive
 * @return {bool} whether the current cell survives or not
 */
function getNextGeneration (currCell, nCount) {
    // if alive
    if (currCell) {
        if (nCount >= 4 || nCount <= 1) {
            return false;
        }

        return true;
    } else {
        if (nCount == 3) {
            return true;
        }

        return false;
    }
}

/*
 * Main function responsible for computing
 * the next state of world from current state
 *
 * @param {bool[][]} world Current world represented as a 2D array
 * @return {bool[][]} world Next state of world
 */
function getNextState (world) {
    const height = world.length;
    const width = world[0].length;

    // we'll update a new array instead of doing in-place
    const nextState = [];

    for (let i = 0; i < height; ++i) {
        const row = [];
        for (let j = 0; j < width; ++j) {
            const nCount = getAliveNeighbourCount(world, {x: i, y: j});
            const currCell = world[i][j];
            const nextGen = getNextGeneration(currCell, nCount);

            row.push(nextGen);
        }

        nextState.push(row);
    }

    return nextState;
}

/*
 * get a random h*w initial board
 * we use Math.random to
 *
 * @param {int} h height
 * @param {int} w width
 * @return {bool[][]} h*w board
 */
function getRandomBoard (h, w) {
    const board = [];

    for (let i=0; i<h; i++) {
        const row = [];
        for (let j=0; j<w; j++) {
            const isAlive = Math.random() >= 0.5;
            row.push(isAlive);
        }

        board.push(row);
    }

    return board;
}

/*
 * get a random integer between 0 and max-1 (inclusive)
 *
 * @param {int} max
 * @return {int} random no. between [0, max)
 */
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getRandomColor() {
    const colors = [
        '#f1c40f',
        '#3498db',
        '#1abc9c',
        '#8e44ad',
        '#2c3e50',
        '#fd79a8',
        '#fab1a0',
        '#e84393',
        '#a29bfe',
        '#fdcb6e'
    ];

    const randomIdx = getRandomInt(colors.length);
    return colors[3];
}

class Board {
    constructor (canvasId) {
        this.height = 400;
        this.width = 400;

        this.board = getRandomBoard(this.height/10, this.width/10);
        this.canvas = document.getElementById(canvasId);

        // bind functions
        this.startSimulation = this.startSimulation.bind(this);
        this.stopSimulation = this.stopSimulation.bind(this);
        this.displayBoard = this.displayBoard.bind(this);
        this.addEventListeners = this.addEventListeners.bind(this);
        this.init = this.init.bind(this);
    }

    displayBoard () {
        const ctx = this.canvas.getContext('2d');
        const board = this.board;

        const h = board.length;
        const w = board[0].length;

        for (let i=0; i < h; i++) {
            for (let j=0; j < w; j++) {
                if (board[i][j])
                    ctx.fillStyle = getRandomColor();
                else
                    ctx.fillStyle = 'black';

                ctx.fillRect(j*10, i*10, 10, 10);
            }
        }
    }

    stopSimulation () {
        clearInterval(this.timerID);
    }

    startSimulation () {
        this.timerID = setInterval(
            () => {
                this.board = getNextState(this.board);
                this.displayBoard();
            },
            10
        );
    }

    addEventListeners () {
        const startBtn = document.getElementById('js-start');
        const stopBtn = document.getElementById('js-stop');

        startBtn.addEventListener('click', this.startSimulation);
        stopBtn.addEventListener('click', this.stopSimulation);
    }

    init () {
        const ctx = this.canvas.getContext('2d');

        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, this.height, this.width);

        this.displayBoard();
        this.addEventListeners();
    }
}

import React from 'react';

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

export default class Board extends React.Component {
    constructor (props) {
        super(props);

        const board = getRandomBoard(30, 30);

        this.state = {
            board: board
        };

        this.canvas = React.createRef();
        this.height = 300;
        this.width = 300;
    }

    updateCells () {
        const ctx = this.canvas.current.getContext('2d');
        const board = this.state.board;

        const h = board.length;
        const w = board[0].length;

        for (let i=0; i < h; i++) {
            for (let j=0; j < w; j++) {
                if (board[i][j])
                    ctx.fillStyle = 'red';
                else
                    ctx.fillStyle = 'blue';

                ctx.fillRect(j*10, i*10, 10, 10);
            }
        }
    }

    componentDidMount () {
        const ctx = this.canvas.current.getContext('2d');

        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, this.height, this.width);

        this.updateCells();

        this.timerID = setInterval(
            () => {
                this.setState((prevState, props) => {
                    const nextBoard = getNextState(prevState.board);
                    return {board: nextBoard};
                });
            },
            100
        );
    }

    componentDidUpdate() {
        this.updateCells();
    }

    render () {
        return (
            <canvas ref={this.canvas} width={this.width} height={this.height} />
        );
    }
}

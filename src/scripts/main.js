import { createGrid, randomize, step } from './life.js';
import { draw } from './renderer.js';

const CELL = 10;
const canvas = document.querySelector('#canvas');
const speed = document.querySelector('#speed');
const ctx = canvas.getContext('2d');

const rows = canvas.height / CELL;
const cols = canvas.width / CELL;
let current = createGrid(rows, cols);
let next = createGrid(rows, cols);
let timer = null;

randomize(current);
draw(ctx, current, CELL);

const tick = () => {
  step(current, next);
  [current, next] = [next, current];
  draw(ctx, current, CELL);
};

const stop = () => {
  clearInterval(timer);
  timer = null;
};

const start = () => {
  stop();
  timer = setInterval(tick, Number(speed.value));
};

document.querySelector('#start').addEventListener('click', start);
document.querySelector('#stop').addEventListener('click', stop);
speed.addEventListener('input', () => timer !== null && start());

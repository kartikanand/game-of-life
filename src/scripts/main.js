import { createGrid, clear, randomize, population, setCell, stamp, step } from './life.js';
import { setupCanvas, draw } from './renderer.js';
import { patterns } from './patterns.js';

const CELL = 12;
const ROWS = 40;
const COLS = 60;

const $ = (sel) => document.querySelector(sel);
const canvas = $('#canvas');
const playBtn = $('#play');
const speed = $('#speed');
const wrap = $('#wrap');

const ctx = setupCanvas(canvas, COLS, ROWS, CELL);
let current = createGrid(ROWS, COLS);
let next = createGrid(ROWS, COLS);
let generation = 0;
let running = false;
let last = 0;
let acc = 0;

const render = () => {
  draw(ctx, current, CELL);
  $('#generation').value = generation;
  $('#population').value = population(current);
};

const advance = () => {
  step(current, next, wrap.checked);
  [current, next] = [next, current];
  generation++;
};

const frame = (now) => {
  if (!running) return;
  const interval = 1000 / Number(speed.value);
  acc += Math.min(now - last, 250); // avoid a burst after tab was hidden
  last = now;
  let advanced = false;
  while (acc >= interval) { advance(); acc -= interval; advanced = true; }
  if (advanced) render();
  requestAnimationFrame(frame);
};

const setRunning = (value) => {
  running = value;
  playBtn.textContent = running ? 'Pause' : 'Play';
  if (running) {
    last = performance.now();
    acc = 0;
    requestAnimationFrame(frame);
  }
};

const reset = (fn) => {
  fn();
  generation = 0;
  render();
};

const actions = {
  toggle: () => setRunning(!running),
  step: () => { setRunning(false); advance(); render(); },
  random: () => reset(() => randomize(current)),
  clear: () => { setRunning(false); reset(() => clear(current)); },
};

playBtn.addEventListener('click', actions.toggle);
$('#step').addEventListener('click', actions.step);
$('#random').addEventListener('click', actions.random);
$('#clear').addEventListener('click', actions.clear);

speed.addEventListener('input', () => { $('#speed-out').value = `${speed.value} gen/s`; });

$('#pattern').addEventListener('change', (e) => {
  const pattern = patterns[e.target.value];
  if (pattern) {
    reset(() => {
      clear(current);
      const r = Math.floor((ROWS - pattern.length) / 2);
      const c = Math.floor((COLS - pattern[0].length) / 2);
      stamp(current, pattern, r, c);
    });
  }
  e.target.value = '';
});

// Draw with pointer events: first cell touched decides paint vs erase for the stroke.
let paint = null;
const cellAt = (e) => {
  const rect = canvas.getBoundingClientRect();
  return [
    Math.floor(((e.clientY - rect.top) / rect.height) * ROWS),
    Math.floor(((e.clientX - rect.left) / rect.width) * COLS),
  ];
};
const paintAt = (e) => {
  const [r, c] = cellAt(e);
  if (r < 0 || r >= ROWS || c < 0 || c >= COLS) return;
  paint ??= current.cells[r * COLS + c] ? 0 : 1;
  setCell(current, r, c, paint);
  render();
};
canvas.addEventListener('pointerdown', (e) => {
  canvas.setPointerCapture(e.pointerId);
  paint = null;
  paintAt(e);
});
canvas.addEventListener('pointermove', (e) => { if (canvas.hasPointerCapture(e.pointerId)) paintAt(e); });
canvas.addEventListener('pointerup', () => { paint = null; });

document.addEventListener('keydown', (e) => {
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  if (e.target.closest('input, select, textarea')) return;
  const key = { ' ': 'toggle', n: 'step', r: 'random', c: 'clear' }[e.key.toLowerCase()];
  if (!key) return;
  // Space on a focused button would also click it; prevent double activation.
  e.preventDefault();
  actions[key]();
});

// Redraw when the colour scheme changes.
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', render);

randomize(current);
render();

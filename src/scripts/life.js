/** Pure Game of Life logic. No DOM access. */

export const createGrid = (rows, cols) => ({
  rows,
  cols,
  cells: new Uint8Array(rows * cols),
});

export const randomize = ({ cells }, density = 0.5) => {
  for (let i = 0; i < cells.length; i++) cells[i] = Math.random() < density ? 1 : 0;
};

/** Count live neighbours; cells outside the grid count as dead. */
const countNeighbours = ({ rows, cols, cells }, r, c) => {
  let n = 0;
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;
      const rr = r + dr;
      const cc = c + dc;
      if (rr >= 0 && rr < rows && cc >= 0 && cc < cols) n += cells[rr * cols + cc];
    }
  }
  return n;
};

/** Compute the next generation of `current` into `next` (same dimensions). */
export const step = (current, next) => {
  const { rows, cols, cells } = current;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const n = countNeighbours(current, r, c);
      const alive = cells[r * cols + c] === 1;
      next.cells[r * cols + c] = n === 3 || (alive && n === 2) ? 1 : 0;
    }
  }
};

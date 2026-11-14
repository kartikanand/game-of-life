/** Pure Game of Life logic. No DOM access. */

export const createGrid = (rows, cols) => ({
  rows,
  cols,
  cells: new Uint8Array(rows * cols),
});

export const clear = ({ cells }) => cells.fill(0);

export const randomize = ({ cells }, density = 0.3) => {
  for (let i = 0; i < cells.length; i++) cells[i] = Math.random() < density ? 1 : 0;
};

export const population = ({ cells }) => cells.reduce((sum, v) => sum + v, 0);

export const setCell = ({ rows, cols, cells }, r, c, value) => {
  if (r >= 0 && r < rows && c >= 0 && c < cols) cells[r * cols + c] = value;
};

/** Stamp a pattern (array of strings, 'O' = alive) with its top-left at (r, c). */
export const stamp = (grid, pattern, r, c) => {
  pattern.forEach((line, dr) => {
    [...line].forEach((ch, dc) => setCell(grid, r + dr, c + dc, ch === 'O' ? 1 : 0));
  });
};

const countNeighbours = ({ rows, cols, cells }, r, c, wrap) => {
  let n = 0;
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;
      let rr = r + dr;
      let cc = c + dc;
      if (wrap) {
        rr = (rr + rows) % rows;
        cc = (cc + cols) % cols;
      } else if (rr < 0 || rr >= rows || cc < 0 || cc >= cols) {
        continue;
      }
      n += cells[rr * cols + cc];
    }
  }
  return n;
};

/** Compute the next generation of `current` into `next` (same dimensions). */
export const step = (current, next, wrap = false) => {
  const { rows, cols, cells } = current;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const n = countNeighbours(current, r, c, wrap);
      const alive = cells[r * cols + c] === 1;
      next.cells[r * cols + c] = n === 3 || (alive && n === 2) ? 1 : 0;
    }
  }
};

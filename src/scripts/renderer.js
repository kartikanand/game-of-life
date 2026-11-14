const ALIVE = '#8e44ad';
const DEAD = '#000';

export const draw = (ctx, { rows, cols, cells }, cellSize) => {
  ctx.fillStyle = DEAD;
  ctx.fillRect(0, 0, cols * cellSize, rows * cellSize);
  ctx.fillStyle = ALIVE;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (cells[r * cols + c]) ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
    }
  }
};

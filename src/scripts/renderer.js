const css = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

/** Size the backing store for the display's pixel ratio. Returns a drawing context in CSS-pixel units. */
export const setupCanvas = (canvas, cols, rows, cellSize) => {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = cols * cellSize * dpr;
  canvas.height = rows * cellSize * dpr;
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return ctx;
};

export const draw = (ctx, { rows, cols, cells }, cellSize) => {
  ctx.fillStyle = css('--board-bg');
  ctx.fillRect(0, 0, cols * cellSize, rows * cellSize);

  ctx.strokeStyle = css('--board-grid');
  ctx.lineWidth = 1 / (window.devicePixelRatio || 1);
  ctx.beginPath();
  for (let c = 1; c < cols; c++) { ctx.moveTo(c * cellSize, 0); ctx.lineTo(c * cellSize, rows * cellSize); }
  for (let r = 1; r < rows; r++) { ctx.moveTo(0, r * cellSize); ctx.lineTo(cols * cellSize, r * cellSize); }
  ctx.stroke();

  ctx.fillStyle = css('--board-alive');
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (cells[r * cols + c]) ctx.fillRect(c * cellSize + 1, r * cellSize + 1, cellSize - 1, cellSize - 1);
    }
  }
};

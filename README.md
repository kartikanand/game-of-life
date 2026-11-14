# Game of Life

[Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) in plain HTML, CSS and JavaScript (ES modules). No frameworks, no build step, no dependencies.

**Demo:** https://kartikanand.github.io/game-of-life/

## Run locally

ES modules need to be served over HTTP, so use any static server:

    python3 -m http.server

then open http://localhost:8000.

## Features

- Play/pause, single step, randomize, clear
- Click or drag on the board to draw (touch supported)
- Speed in generations per second, optional wrap-around edges
- Presets: glider, pulsar, Gosper glider gun
- Generation and population counters
- Keyboard: `Space` play/pause, `N` step, `R` randomize, `C` clear
- Light/dark theme follows your system

## Layout

- `src/scripts/life.js` – pure game logic (no DOM)
- `src/scripts/patterns.js` – preset patterns
- `src/scripts/renderer.js` – canvas drawing
- `src/scripts/main.js` – wiring and controls
- `src/styles/main.css` – styles (cascade layers, nesting, `light-dark()`)

## Contributing

Issues and pull requests are welcome. See [SECURITY.md](SECURITY.md) for reporting vulnerabilities.

## License

MIT

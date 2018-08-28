# Game of Life (What the hell is this ?)
This app is an implementation of Conway's Game of Life created using JavaScript while using React to render cells. You can read more about Conway's Game of Life and the rules that cells must follow for living or dying [here](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life).

# Demo
You can view a demo of this app here - http://www.kartikanand.com/game-of-life/

# Build
This app uses webpack to bundle everything into a single js file for scripts and styles. You can find the generated js file in the `dist` folder.
The source for these scripts and styles can be found in the aptly named `src` folder.

To build use the following command:

    npx webpack

# Usage
You can then use local server to serve the `index.html` file which correctly uses the `dist` path. One way for doing it is:

    python3 -m "http.server"

You'll find two buttons on the page. The `Start` button will the start the simulation with a random distribution of cells, while the `Stop` button will only pause it, not reset it.

To reset simply reload the page.

# How it works
The app relies on React references to latch onto the html canvas element. The rest of it is just timers to update the next state of each cell. You can find the meat of the code at `src/scripts/board.js`

# Contributing
Please feel free to send pull requests or open a bug or feature request
using the Issues tab.

# To Do
* Add a pause button and make `Stop` do what it is supposed to do
* Add a button to make random distributions
* Allow users to create their own distributions using mouse clicks
* Allow users to change the speed of simulation

# License
MIT License.

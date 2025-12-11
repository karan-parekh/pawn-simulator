# Pawn Simulator

This repository is the submission for a coding challenge for Curve Tomorrow and WeGuide. It is a small application that renders a chess board and allows the user to place and move a pawn using text commands. You can try the application here -> https://pawnsim.vercel.app/

## Requirements

- The user should be able to place and move a pawn using `PLACE` and `MOVE` commands
- The user must place the pawn before moving it using the following command formats.
  - `PLACE X,Y,F,C` where X and Y are the coordinates for the pawn, F is face direction in terms of NORTH, EAST, WEST, and SOUTH and C is the color of the pawn (WHITE or BLACK)
  - `MOVE X` where x is the number of steps. The pawn can move 2 steps for the first time and one step from there on
- The user can also use `LEFT` and `RIGHT` commands to change the orientation of the pawn and `REPORT` to show the current position of the pawn

## Approach

- The approach for any application at the begining must be to make it functional and deliver it before optimization. And to make it functional, the simplest core logic is often enough.
- The framework of choice here is React/TypeScript because it is a single page application (SPA) that can carry out all the logic in the frontend. No need for a backend server or API calls.
- The chessboard is rendered using the `grid` class from tailwind CSS and rendering each square within the grid using a nested loop for rows and columns.
- A simple input box below the board for user command.
- The output is displayed using the alert dialogue box for error handling and reporting the pawn position.
- Images for the pawns are pulled from Green Chess, an online chess platform. Green Chess allows the use of images for commercial purposes in exchange for an appropriate attribute.

## Installation

- Clone this github repository and follow the steps
  - Install packages using `npm install`
  - Run the server using `npx run dev`
  - Go to `http://localhost:5173/` to test the game

## Testing

- Testing is done using the Playwright framework
- To test the app, simply navigate to the repo in the terminal and run `npx playwright test` for headless mode or add the `--ui` flag at the end of the command to open the playwright UI.
- All the tests can be found in the `/test` directory
- Only the core functionality of Placing and Moving the pawn has been tested given the limited time. More tests can be and must be written for production application. For e.g. tests for `LEFT, RIGHT, REPORT` commands, tests for checking if the components render correctly, etc.

## Possible Improvements

### Chessboard rendering

- The board is rendered using nested loops, one for the rows and one for the columns. This is O(n^2) time complexity and is NOT considered very efficient. However, rendering 64 squares every time is not a huge overhead and there is no noticeable lag in using the application.
- Currently each square of the board re-renders every time there is a state change. Although, this does not make a difference in performance just like the previous point, the app is still rendering 63 additional squares when it should only re-render 1 square that has the pawn.
- **Solution:** A better approach would be maintian the state of the entire board with a 2D matrix. This approach will resolve both of the above problems.
  - We can directly render the board from the matrix without computation.
  - Updating the state becomes much easier and less error prone

### State Management

- The `useState` hook is the native state management api in React, which is best used when the state needs to be local to the component.
- More often than not, states need to passed around different components. This is when libraries like Redux or Zustand (personal perference) improve the performance and readability of the application code.

### QOL improvements

- The X and Y coordinates can be displayed on at least the left and bottom side of the board to easily identify the position of the pawn.
- Currently the user needs to type and enter commands to move the pawn. This can be replaced with simple keydown events like `WASD` keys for moving the pawn and arrow keys for changing the orientation of the pawn. This will reduce the friction from the UX perspective.
- The output of any error is through the alert dialogue box and the user needs to click 'OK' to dismiss. This can be replaced with a simple alert elements under the input box in red font indicating something is wrong.
- There are no instructions on how to use the app. A simple `div` with an unordered list explaining the game can be added at the bottom.

## References

Pawn piece images were sourced from (Green Chess)[https://greenchess.net/info.php?item=downloads]

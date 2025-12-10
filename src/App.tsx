
import { useState } from 'react';
import ChessBoard, { type PawnPosition } from './components/ChessBoard';
import InputBox, { type Command } from './components/InputBox';
import type { Color, Direction } from './components/Square';


function App() {
  const [firstMove, setFirstMove] = useState<boolean>(true);
  const [pawnPosition, setPawnPosition] = useState<PawnPosition>({
    x: undefined,
    y: undefined,
    direction: undefined,
    color: undefined
  });

  const handlePlaceCommand = (command: Command) => {
    if (command.x === undefined || command.y === undefined || command.direction === undefined || command.color === undefined) {
      alert("Invalid PLACE command. Make sure to provide X,Y,DIRECTION,COLOR. Try again.");
      return;
    }

    if (command.x < 0 || command.x > 7 || command.y < 0 || command.y > 7) {
      alert("Invalid PLACE command. Coordinates out of bounds! X and Y must be between 0 and 7. Try again.");
      return;
    }

    setPawnPosition({
      x: command.x,
      y: command.y,
      direction: command.direction,
      color: command.color?.toUpperCase() as Color | undefined
    });
    setFirstMove(true);
  }

  const handleMoveCommand = (command: Command) => {
    if (pawnPosition.x === undefined || pawnPosition.y === undefined) {
      alert("Pawn not placed on the board. Use PLACE command first.");
      return;
    }
    let x = pawnPosition.x;
    let y = pawnPosition.y;
    const steps = command.x || 1;

    if (firstMove && steps > 2) {
      alert("Invalid MOVE Command. Pawn can move a maximum of 2 steps for the first time. Try again.");
      return;
    }

    if (!firstMove && steps > 1) {
      alert("Invalid MOVE Command. Pawn can move a maximum of 1 step at a time. Try again.");
      return;
    }

    if (steps < 1) {
      alert("Invalid MOVE Command. Number of steps must be at least 1. Try again.");
      return;
    }

    switch(pawnPosition.direction) {
      case 'NORTH':
        y += steps;
        break;
      case 'SOUTH':
        y -= steps;
        break;
      case 'EAST':
        x += steps;
        break;
      case 'WEST':
        x -= steps;
        break;
    }

    // Ensure the pawn stays within bounds 0-7
    if (x < 0 || x > 7 || y < 0 || y > 7) {
      alert("Move out of bounds! Try a different move.");
      return;
    }

    setPawnPosition({ ...pawnPosition, x, y });
    setFirstMove(false);
  }

  const handleLeftRightCommand = (command: Command) => {
    if (pawnPosition.direction === undefined) {
      alert("Pawn not placed on the board. Use PLACE command first.");
      return;
    }
    const directions = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
    let idx = directions.indexOf(pawnPosition.direction);
    if (command.keyword === 'LEFT') {
      idx = (idx + 3) % 4; // Turn left
    } else {
      idx = (idx + 1) % 4; // Turn right
    }
    setPawnPosition({...pawnPosition, direction: directions[idx] as Direction});
    return;
  }

  const handleReportCommand = () => {
    if (pawnPosition.x === undefined || pawnPosition.y === undefined) {
      alert("Pawn not placed on the board. Use PLACE command first.");
      return;
    }
    alert(`Output: ${pawnPosition.x},${pawnPosition.y},${pawnPosition.direction},${pawnPosition.color}`);
    return;
  }

  const parseCommand = (command: Command) => {
    switch (command.keyword) {
      case 'REPORT':
        handleReportCommand();
        break;
      case 'LEFT':
      case 'RIGHT':
        handleLeftRightCommand(command);
        break;
      case 'MOVE':
        handleMoveCommand(command);
        break;
      case 'PLACE':
        handlePlaceCommand(command);
        break;
      default:
        alert("Unknown keyword. Valid keywords are PLACE, MOVE, LEFT, RIGHT, REPORT. Try again.");
    }
  }

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="flex flex-col items-center text-2xl m-2s">Pawn Simulator</h1>
      <ChessBoard {...pawnPosition}/>
      <InputBox parseCommand={parseCommand} />
    </div>
  )
}

export default App

import type React from "react"
import Square from "./Square";

const ChessBoard: React.FC = () => {
    const renderSquares = () => {
        const squares = [];
        // A chessboard typically uses numbers 1 to 8 for rows and letters a to h for columns
        // But since the requirement is to use a coordianate system, we will use 0-7 for both rows and columns
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const isDark = (row + col) % 2 === 1;
                squares.push(
                    <Square key={`${row}-${col}`} isDark={isDark} />
                );
            }
        }
        return squares;
    }

    return (
        <div className="grid grid-cols-8 grid-rows-8 gap-0 shadow-2xl border-4 border-gray-800">
            {renderSquares()}
        </div>
    )
}
export default ChessBoard
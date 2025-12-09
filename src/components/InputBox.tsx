import { useState } from "react";

// All the string literals can be declared as constants/types for brevity, but they are used directly for now.
export type commandType = {
    keyword: 'PLACE' | 'MOVE' | 'LEFT' | 'RIGHT' | 'REPORT';
    x?: number;
    y?: number;
    direction?: 'NORTH' | 'SOUTH' | 'EAST' | 'WEST';
    color?: 'WHITE' | 'BLACK';
}

interface InputBoxProps {
    parseCommand: (command: commandType) => void;
}

const InputBox: React.FC<InputBoxProps> = ({parseCommand}) => {
    const [inputCmd, setInputCmd] = useState<string>("");
    const validKeywords = ['PLACE', 'MOVE', 'LEFT', 'RIGHT', 'REPORT'];
    const nonArgCommands = ['LEFT', 'RIGHT', 'REPORT'];

    const validateInputString = (cmd: string) => {
        cmd = cmd.trim().toUpperCase(); // Sanitize input
        const keyword = cmd.split(' ')[0];

        if (!validKeywords.includes(keyword)) {
            alert("Invalid keyword!. Valid keywords are PLACE, MOVE, LEFT, RIGHT, REPORT. Try again.");
            return;
        }

        if (nonArgCommands.includes(keyword)) {
            parseCommand(
                { keyword: keyword as 'LEFT' | 'RIGHT' | 'REPORT' }
            );
            return;
        }

        // For MOVE command, validate X
        if (keyword === 'MOVE') {
            const args = cmd.split(' ').slice(1);
            if (args.length !== 1 || isNaN(Number(args[0]))) {
                alert("Invalid MOVE command format. Use: MOVE <number_of_steps>. Try again.");
                return;
            }
            parseCommand(
                { keyword: 'MOVE', x: Number(args[0]) }
            );
            return;
        }
        
        // For PLACE command, validate X,Y,F,C
        const args = cmd.split(' ')[1] ?.split(',') || [];
        console.log('arg len:', args.length);
        if (args.length != 4) {
            alert("Invalid PLACE command format. Use: PLACE X,Y,[DIRECTION],[COLOR]. Try again.");
            return;
        }
        const position = args.slice(0, 2).map(Number);
        const direction = args[2];
        const color = args[3];

        if (position.length !== 2 || position.some(isNaN)) { // Check if position has exactly two numbers
            alert("Invalid position format. Position should be two numbers separated by a comma. Try again.");
            return;
        }

        if (direction && !['NORTH', 'SOUTH', 'EAST', 'WEST'].includes(direction)) { // Check direction validity
            alert("Invalid direction. Valid directions are NORTH, SOUTH, EAST, WEST. Try again.");
            return;
        }

        if (color && !['WHITE', 'BLACK'].includes(color)) { // Check color validity
            alert("Invalid color. Valid colors are WHITE, BLACK. Try again.");
            return;
        }

        parseCommand(
            { 
                keyword: 'PLACE', 
                x: position[0], 
                y: position[1], 
                direction: direction as 'NORTH' | 'SOUTH' | 'EAST' | 'WEST', 
                color: color as 'WHITE' | 'BLACK'
            }
        )
    }

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <label htmlFor="coords">Enter Command</label>
            <input type="text" id="coords" value={inputCmd}
                className="border-2 border-gray-300 rounded p-2 mt-2 w-64"
                onChange={(e) => setInputCmd(e.target.value)}
                placeholder="e.g. PLACE 0,1,NORTH,WHITE"    
            />
            <button 
                onClick={() => validateInputString(inputCmd)}
                className="bg-gray-500 text-white px-4 py-2 mt-2 rounded hover:bg-gray-600"
            >Submit</button>
        </div>
    )
}

export default InputBox
import pawnBlack from "../assets/pawn-b.svg"
import pawnWhite from "../assets/pawn-w.svg"

export type Color = 'WHITE' | 'BLACK' | null;
export type Direction = 'NORTH' | 'SOUTH' | 'EAST' | 'WEST';
interface SquareProps {
    isDark: boolean;
    pawnColor?: Color;
    direction?: Direction;
    dataTestId?: string;
    children?: React.ReactNode;
}

const Square: React.FC<SquareProps> = ({ isDark, pawnColor, direction='NORTH', dataTestId }) => {
    const rotationMap = {
        'NORTH': 'rotate-0',
        'EAST': 'rotate-90',
        'SOUTH': '-rotate-180',
        'WEST': '-rotate-90'
    }
    const rotation = rotationMap[direction];
    const bgColor = isDark ? 'bg-gray-700' : 'bg-gray-200';
    return (
        <div data-testid={dataTestId} className={`w-16 h-16 flex items-center justify-center ${bgColor}`}>
            {
                pawnColor === 'WHITE' ? 
                <img src={pawnWhite} alt="white-pawn" className={`w-8 h-8 ${rotation}`}/>
                : pawnColor === 'BLACK' ? 
                <img src={pawnBlack} alt="black-pawn" className={`w-8 h-8 ${rotation}`}/>
                : null
            }
        </div>
    );
}

export default Square
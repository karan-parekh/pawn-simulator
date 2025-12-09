import pawnBlack from "../assets/pawn-b.svg"
import pawnWhite from "../assets/pawn-w.svg"
interface SquareProps {
    isDark: boolean;
    pawn?: 'white' | 'black' | null;
    direction?: 'NORTH' | 'SOUTH' | 'EAST' | 'WEST';
    children?: React.ReactNode;
}

const Square: React.FC<SquareProps> = ({ isDark, pawn=null, direction='SOUTH' }) => {
    const rotationMap = {
        'NORTH': 'rotate-0',
        'EAST': 'rotate-90',
        'SOUTH': '-rotate-180',
        'WEST': '-rotate-90'
    }
    const rotation = rotationMap[direction];
    const bgColor = isDark ? 'bg-gray-700' : 'bg-gray-200';
    return (
        <div className={`w-16 h-16 flex items-center justify-center ${bgColor}`}>
            {
                pawn === 'white' ? 
                <img src={pawnWhite} alt="white-pawn" className={`w-8 h-8 ${rotation}`}/>
                : pawn === 'black' ? 
                <img src={pawnBlack} alt="black-pawn" className={`w-8 h-8 ${rotation}`}/>
                : null
            }
        </div>
    );
}

export default Square
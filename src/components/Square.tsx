
interface SquareProps {
    isDark: boolean;
    chidlren?: React.ReactNode;
}

const Square: React.FC<SquareProps> = ({ isDark, chidlren }) => {
    const bgColor = isDark ? 'bg-gray-700' : 'bg-white';
    return (
        <div className={`w-16 h-16 flex items-center justify-center ${bgColor}`}>
            {chidlren}
        </div>
    );
}

export default Square
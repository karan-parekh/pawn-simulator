
import ChessBoard from './components/ChessBoard';
import InputBox from './components/InputBox';

function App() {

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="flex flex-col items-center text-2xl m-2s">Pawn Simulator</h1>
      <ChessBoard />
      <InputBox handleCommand={(cmd: string) => console.log(cmd)} />
    </div>
  )
}

export default App


import ChessBoard from './components/ChessBoard';
import InputBox, { type commandType } from './components/InputBox';


function App() {

  const parseCommand = (command: commandType) => {
    console.log("Command received in App.tsx:", command);


  }

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="flex flex-col items-center text-2xl m-2s">Pawn Simulator</h1>
      <ChessBoard />
      <InputBox parseCommand={parseCommand} />
    </div>
  )
}

export default App

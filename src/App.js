import './App.css';
import Game1 from './components/Game1';

function App() {
  return (
    <div className="App p-5">
      <Game1 m={5} n={6} color={'pink'}></Game1>
    </div>
  );
}

export default App;

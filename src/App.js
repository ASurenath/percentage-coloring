import { Button, Container, Form } from 'react-bootstrap';
import './App.css';
import Game1 from './components/Game1';
import Grid from './components/Grid';
import Game2 from './components/Game2';
import CustomAlert from './components/CustomAlert';
import { useState } from 'react';



function App() {
  const [frame, setFrame] = useState("menu");
  const [color, setColor] = useState("#d779a7");
  const [totalRounds, setTotalRounds] = useState(10);
  const [scorePerRound, setScorePerRound] = useState(10);
  const [nScorePerRound, setNScorePerRound] = useState(0);
  console.log(color);

  return (
    <div className="App p-md-5">
      {frame == "menu" &&
        <>
          <div className='menu d-flex flex-column align-items-center justify-content-evenly'>
            <h1 className='text-center'>Percentage Coloring</h1>

            <Button onClick={() => { setFrame("learning"); }} className="fs-3 text-bold">Learn</Button>
            <Button onClick={() => { setFrame("game1"); }} className="fs-3 text-bold">Play</Button>
            <Button onClick={() => { setFrame("settings"); }} className="fs-1 text-bold"><h1><i className="fa-solid fa-gear" /></h1></Button>
          </div>
        </>}
      {frame == "learning" && <Game1 setFrame={setFrame} color={color} ></Game1>}
      {frame == "game1" && <Game2 setFrame={setFrame} color={color} totalRounds={totalRounds} scorePerRound={scorePerRound} nScorePerRound={nScorePerRound}></Game2>}
      {frame == "settings" && <>
        <div className='menu d-flex flex-column align-items-center justify-content-evenly'>
          <h1 className='text-center'>Settings</h1>

          <div className='settings-grid'>
            <label htmlFor='color' className='fs-5'>Paint color:</label>
            <div className='d-flex align-items-center'><Form.Control type="color" onChange={(e) => { setColor(e.target.value) }} value={color} id='color' />
            <Button variant='primary' onClick={() => { setColor("#d779a7") }} className='m-0 ms-2 fs-6' title='default'> <i className="fa-solid fa-arrow-rotate-left"></i>Default</Button>
            </div>

            <label htmlFor='rounds' className='fs-5' >Rounds:</label> <Form.Control type="number" min={5} max={50} onChange={(e) => { e.target.value > 50 ? setTotalRounds(50) : e.target.value < 5 ? setTotalRounds(5) : setTotalRounds(e.target.value) }} value={totalRounds} id='rounds' />
            <label htmlFor='score' className='fs-5'>Score per question:</label><Form.Control type="number" min={1} max={50} onChange={(e) => { e.target.value > 50 ? setScorePerRound(50) : e.target.value < 1 ? setScorePerRound(1) : setScorePerRound(e.target.value) }} value={scorePerRound} id='score' />
            <label htmlFor='nSccore' className='fs-5'>Negative score per question:</label> <Form.Control type="number" min={0} max={10} onChange={(e) => { e.target.value > 10 ? setNScorePerRound(10) : e.target.value < 0 ? setNScorePerRound(0) : setNScorePerRound(e.target.value) }} value={nScorePerRound} id='nSccore' />
          </div>
          <Button onClick={() => { setFrame("menu"); }} className="fs-1 text-bold">Back</Button>
        </div>
      </>
      }
    </div>
  );
}

export default App;

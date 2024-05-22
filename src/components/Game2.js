import React, { useEffect, useState } from "react";
import Grid from "./Grid";
import { Button } from "react-bootstrap";
import CustomAlert from "./CustomAlert";
import EndMessage from "./EndMessage";

function Game2({setFrame,color,totalRounds,scorePerRound,nScorePerRound}) {
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState(0);
  const [dim, setDim] = useState({ n: 2, m: 1 });
  const [percent, setPercent] = useState(0);
const [showEndMessage, setShowEndMessage] = useState(false);
  //   for alert
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [message, setMessage] = useState("");
  const [longMessage, setLongMessage] = useState("");
  const [endLongMessage, setEndLongMessage]=useState("");
  const successMessages = [
    "Great job!",
    "You're amazing!",
    "Keep it up!",
    "Well done!",
    "You're awesome!",
    "Fantastic!",
    "Superb!",
    "You rock!",
    "Bravo!",
    "Way to go!",
    "You're a star!",
    "Terrific!",
    "You're incredible!",
    "Outstanding!",
    "You're shining!",
    "Thumbs up!",
    "You're brilliant!",
    "Excellent!",
    "Keep shining!",
    "You're a champion!",
  ];
  const encoragingMessages = [
    "Keep trying, you're close!",
    "Don't worry, you've got this!",
    "Keep going, you'll get there!",
    "Don't worry, try again!",
    "Don't give up, you'll succeed!",
    "Keep trying, you're making progress!",
    "You're almost there, keep going!",
    "Keep pushing, you're on the right track!",
    "Stay positive, try once more!",
    "Don't stop, try one more time!",
    "You'll get it next time!",
    "Don't give up yet, you're improving!",
    "Don't give up, you're doing great!",
    "Don't worry, keep trying, champ!",
  ];

  useEffect(() => {
    let tempDim = dims[(Math.random() * dims.length) | 0];
    setDim(tempDim);
    let p =
      (100 / (tempDim.n * tempDim.m)) *
      Math.floor(Math.random() * (tempDim.n * tempDim.m + 1));
    setPercent(p);
    console.log(tempDim, p);
  }, [round]);
  const dims = [
    { n: 2, m: 1 },
    { n: 1, m: 2 },
    { n: 1, m: 5 },
    { n: 5, m: 1 },
    { n: 2, m: 5 },
    { n: 5, m: 2 },
    { n: 4, m: 5 },
    { n: 5, m: 4 },
    { n: 5, m: 5 },
    { n: 10, m: 5 },
    { n: 5, m: 10 },
    { n: 10, m: 10 },
  ];
//   parameters
//   const totalRounds = 10;
//   const scorePerRound = 10;
//   const nScorePerRound = 0;
  const handleSubmit = () => {
   
    if (answer === percent) {
      console.log("correct");
      let lMessage = successMessages[(Math.random() * successMessages.length) | 0];
      showMessage("Correct", 1500, "success",lMessage);
      setScore(score + scorePerRound);
    } else {
      console.log("wrong");
      let lMessage = encoragingMessages[(Math.random() * encoragingMessages.length) | 0];
      showMessage("Wrong", 1500, "warning",lMessage);
      setScore(score + nScorePerRound);
    }
    if (round == totalRounds) {
        if(score==totalRounds*scorePerRound){
          setLongMessage( "All correct! Great Job");
        }
        else if(score>=totalRounds*scorePerRound*0.4){
          setLongMessage("Good Job!");
        }
        else{
          setLongMessage("Don't give up.Try Again!")
        }
        setTimeout(() => {
            setShowEndMessage(true);
        }, 1000);
      } else {
        setRound(round + 1);
      }
  };
  //   for alert
  const showMessage = (message, time, type,lMessage) => {
    setAlertType(type);
    setMessage(message);
    setLongMessage(lMessage);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, time);
  };
const resetGame = () => {
  setRound(0);
  setScore(0);
  setAnswer(0);
  setDim({ n: 2, m: 1 });
  setPercent(0);
}
  return (
    <>
    <div className="d-flex justify-content-start align-items-center">
      <Button onClick={() => setFrame("menu")}className="fs-3 text-bold"> Back to menu</Button>
    </div>
    <div className="text-center m-1" ><span className="rounded-5 bg-dark p-1 text-white fs-1 "> {round}/{totalRounds}</span></div>
      <h2 className="text-center">Color {percent}% of the grid</h2>
      <div>
        <Grid n={dim.n} m={dim.m} color={color} setAnswer={setAnswer} round={round}></Grid>
      </div>
      <div className="d-flex justify-content-center align-items-center p-3">
        <Button onClick={handleSubmit} className="fs-3 text-bold">Submit</Button>
      </div>
      {showAlert && <CustomAlert message={message} type={alertType} longMessage={longMessage} />}
      {showEndMessage && <EndMessage score={score} totalScore={totalRounds*scorePerRound} longMessage={longMessage} resetGame={resetGame} setFrame={setFrame} setShowEndMessage={setShowEndMessage}/>}
    </>
  );
}

export default Game2;

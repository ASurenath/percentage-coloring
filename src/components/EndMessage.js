import React from 'react'

function EndMessage({score,totalScore,longMessage,resetGame,setFrame,setShowEndMessage}) {
  return (
    <div className={`alert-container`}>
    <div className="alert-box bg-dark rounded p-2 p-sm-5 text-center mx-auto">
      <div className="message-box  rounded p-3 "><h1 className="text-white">Your Score: {score}/{totalScore} </h1>
      <p className="text-white">{longMessage}</p>
      </div>
      <div className='d-flex justify-content-center'>
        <button onClick={()=>{resetGame();setShowEndMessage(false)}} className="btn btn-primary fs-4 text-bold">Play Again</button>
        <button onClick={() => {setFrame("menu");setShowEndMessage(false)}} className="btn btn-primary ms-2 fs-4 text-bold">Back to Menu</button>
        </div>

    </div>
  </div>
  )
}

export default EndMessage
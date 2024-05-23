import React, { useEffect, useState } from 'react'

function Answer({n,m,p,next,color}) {
    const [boxes, setBoxes] = useState({});

  useEffect(() => {
    let temp = {};
    let colored = Math.round(n*m*p/100)
    for (let i = 0; i < n * m; i++) {
      temp[i] = { color: i<colored }
    }
    setBoxes(temp);
  }, [n,m])
  const style1 = {
    display: "grid",
    gridTemplateColumns: `repeat(${m}, 1fr)`,
    gridRowHeight: "1fr",
    touchEvents: "none",
    outline:'3px solid white',
  };
  return (
    <div className={`alert-container `}>
    <div className="alert-box bg-dark rounded p-2 p-sm-5 text-center mx-auto answer">
      <div className="message-box  rounded p-3 ">
      <h1 className="text-white">Answer</h1>
      <p className="text-white">There are total {n*m} boxes.<br/>
In order to color {p}% of the grid,<br/> you need to color  {n*m}x({p}/100)= {Math.round(n*m*p/100)} box{Math.round(n*m*p/100)!=1&&'es'}.
<br/>
eg:-
      </p>
        <div
        style={style1}
        className="border border-5 border-dark grid-container"
      >
        {Object.keys(boxes).map((index) => (
          <div
            key={index}
            className="border border-dark grid-item"
            style={{ backgroundColor: boxes[index].color ? color : "white" }}
          ></div>
        ))}
      </div>
      </div>
      <div className='d-flex justify-content-center'>
        <button onClick={next} className="btn btn-primary ms-2 fs-4 text-bold">Next</button>
        </div>

    </div>
  </div>
  )
}

export default Answer
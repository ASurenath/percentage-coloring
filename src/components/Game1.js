import React, { useEffect, useRef, useState } from 'react'

function Game1({n,m,color}) {
    const [cursorX, setCursorX] = useState(0);
  const [cursorY, setCursorY] = useState(0);
  const [deviceType, setDeviceType] = useState('');
  const [tool, setTool] = useState('brush');
  const [boxes, setBoxes] = useState({});

  const container = useRef(null);

  useEffect(() => {
    let temp = {};
    for (let i = 0; i < n*m; i++) {
      temp[i] = { color: false };
    }
    setBoxes(temp);
    // return () => {
    //   container.current.removeEventListener('mousemove', move);
    //   container.current.removeEventListener('touchmove', move);
    // };
  }, [])
  
 console.log(boxes);
  // check if it is a touch device
  const isTouchDevice = () => {
    try {
      document.createEvent('TouchEvent');
      setDeviceType('touch');
      return true;
    } catch (e) {
      setDeviceType('mouse');
      return false;
    }
  };
  
 
  const move = (e) => {
    const touchEvent = e.touches ? e.touches[0] : null;
    const x = !isTouchDevice() ? e.clientX : touchEvent?.clientX || 0;
    const y = !isTouchDevice() ? e.clientY : touchEvent?.clientY || 0;
 
    setCursorX(x);
    setCursorY(y);
  }
    // Set the cursor border's position directly
//     const cursorBorder = document.getElementById('cursor-border');
//     if (cursorBorder) {
//       cursorBorder.style.left = `${x}px`;
//       cursorBorder.style.top = `${y}px`;
//     }
//   };
 
//   const handleMouseDown = () => {
//     setIsClicking(true);
//   };
 
//   const handleMouseUp = () => {
//     setIsClicking(false);
//   };
 
//   const handleButtonHover = (hovered) => {
//     setButtonHovered(hovered);
//   };
 


    const setColor = (index) => () => {
        let temp = {...boxes};
        if(tool==='brush'){temp[index].color = true}
        else{temp[index].color = false}
        setBoxes(temp);
    }


    const style1 = {
        display: 'grid',
        gridTemplateColumns: `repeat(${n}, 1fr)`,
        gridRowHeight: '1fr',
        height: '50vh',
      };

  return (
    <div className='main cursor-none' ref={container} onMouseMove={move} onTouchMove={move} onDrag={move} onMouseDown={() => setIsClicking(true)} >
        <img src={tool==='brush'?'brush.png':'eraser.png'}
        id="cursor"
        className='position-absolute'
        height={50}
        width={50}
        style={{ left: `${cursorX}px`, top: `${cursorY-50}px` }}
      ></img>
      <div className="d-flex justify-content-center align-items-center">
          <button
            className="btn btn-primary"
            onClick={() => setTool('brush')}
            style={{ marginRight: '10px' }}
          >
            <img src="brush.png" height={20} width={20} />
          </button>
          <button
            className="btn btn-primary"
            onClick={() => setTool('eraser')}
            style={{ marginRight: '10px' }}
          >
            <img src="eraser.png" height={20} width={20} />
          </button>
        </div>
      <div style={style1}>
          {Object.keys(boxes).map((index) => (
            <div
              key={index}
              className="border border-dark grid-item"
              style={boxes[index].color?{ backgroundColor:color }:{}}
              onClick={setColor(index)}
              onMouseCapture={setColor(index)}
              draggable="false"
            >
                
            </div>
          ))}
          </div>

        
    </div>
  )
}

export default Game1
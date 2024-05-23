import React, { useEffect, useRef, useState } from "react";
import { Button, CloseButton, Col, Dropdown, Form } from "react-bootstrap";

function Game1({ color,setFrame }) {
  const [cursorX, setCursorX] = useState(0);
  const [cursorY, setCursorY] = useState(0);
  const [deviceType, setDeviceType] = useState("");
  const [coloring, setColoring] = useState(false);
  const [tool, setTool] = useState("brush");
  const [boxes, setBoxes] = useState({});
  const [colored, setColored] = useState(0);
  const container = useRef(null);
  const [n, setN] = useState(5);
  const [m, setM] = useState(5);
  const nMax = 10;
  const mMax = 10;
  const [selectGrid, setSelectGrid] = useState({});
  const [hoveredBox,setHoveredBox]=useState([-1,-1])
  const [isSelectGridHovered,setIsSelectGridHovered]=useState(false)
const [showCustomMenu, setShowCustomMenu] = useState(false);
useEffect(() => {
  let temp1 = {};
  for (let i = 0; i < n * m; i++) {
    temp1[i] = { color: false };
  }
  setBoxes(temp1);
  let temp2 = {};
  for (let i = 0; i < mMax; i++) {
    for(let j = 0; j < nMax; j++){
      temp2[j * mMax + i] = {n: j+1, m: i+1,selected:j<n && i<m};
    }
  }
  setSelectGrid(temp2);
}, [n,m])

  useEffect(() => {
    // add event listeners
    document.addEventListener("mousedown", () => {
      setColoring(true);
    });
    document.addEventListener("mouseup", () => {
      setColoring(false);
    });
    return () => {
      document.removeEventListener("mousedown", () => {
        setColoring(true);
      });
      document.removeEventListener("mouseup", () => {
        setColoring(false);
      });
    };
  }, []);
  useEffect(() => {
    let count = 0;
    for (let i = 0; i < n * m; i++) {
      if (boxes[i]?.color) {
        count++;
      }
    }
    setColored(count);
  }, [boxes]);

  // check if it is a touch device
  const isTouchDevice = () => {
    try {
      document.createEvent("TouchEvent");
      setDeviceType("touch");
      return true;
    } catch (e) {
      setDeviceType("mouse");
      return false;
    }
  };
  const renderCustomMenu = ()=>
{
      return (
        <div
        className="custom-menu bg-white p-3  border border-3 border-info"
        >
          <div className="d-flex justify-content-between align-items-center">
            <p>Grid dimention</p>
            <p>{isSelectGridHovered?`${hoveredBox[0]} x ${hoveredBox[1]}`:`${m} x ${n}`}</p>
            <CloseButton onClick={() => setShowCustomMenu(false)} className="pt-0 mt-0"></CloseButton>
          </div>
          <div
            style={{zIndex:1002,display: "grid",
            gridTemplateColumns: `repeat(${nMax}, 1fr)`,
            gridRowHeight: "1fr",}}
            onMouseEnter={()=>{setIsSelectGridHovered(true)}}
            onMouseLeave={()=>{setIsSelectGridHovered(false)}}

          >
            
            {Object.values(selectGrid).map((item, index) => (
              <Button
                key={index}
                style={{width:"100%",height:"100%"}}
                className="m-1 rounded-0 border-1 border-dark p-0 p-sm-2"
                variant={isSelectGridHovered?(item.n<=hoveredBox[0] && item.m<=hoveredBox[1]?"info":"light"):(item.selected ? "info" : "light")}
                
                onClick={() => {
                  console.log("clicked");
                  setN(item.n);
                  setM(item.m);
                }}
                onMouseEnter={() => {
                  setHoveredBox([item.n,item.m]);
                }}
  >          </Button>
            ))}
          </div>
        </div>
       
      );
    }
  const move = (e) => {
    const touchEvent = e.touches ? e.touches[0] : null;
    const x = !isTouchDevice() ? e.clientX : touchEvent?.clientX || 0;
    const y = !isTouchDevice() ? e.clientY : touchEvent?.clientY || 0;
    const offsetX = window.scrollX || window.pageXOffset || document.documentElement.scrollLeft;
    const offsetY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
    
    setCursorX(x+offsetX);
    setCursorY(y+offsetY);
  };
  const handleTouchMove = (event) => {
    // Check if touch position is within the element's boundaries
    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();
    const touchX = event.touches[0].clientX;
    const touchY = event.touches[0].clientY;
    let col = Math.floor((touchX - rect.left) / (rect.width / n));
    let row = Math.floor((touchY - rect.top) / (rect.height / m));
    let index = row * n + col;
    if (index >= 0 && index < n * m) {
      setColor(index);
    }
  };

  const setColor = (index, e) => {
    let temp = { ...boxes };
    if (tool === "brush") {
      temp[index].color = true;
    } else {
      temp[index].color = false;
    }
    setBoxes(temp);
  };

  const style1 = {
    display: "grid",
    gridTemplateColumns: `repeat(${m}, 1fr)`,
    gridRowHeight: "1fr",
    touchEvents: "none",
  };

  return (
    <>
    <div className="d-flex justify-content-start align-items-center">
      <Button onClick={() => setFrame("menu")} className="fs-3 text-bold"> Back to menu</Button>
    </div>
      <div
        className="main cursor-none"
        ref={container}
        onMouseMove={move}
        onClick={move}
        onTouchMove={move}
        onTouchStart={move}
        onDrag={move}
      >
        
        <img
          src={tool === "brush" ? "brush.png" : "eraser.png"}
          draggable="false"
          id="cursor"
          className="position-absolute"
          height={50}
          width={50}
          style={{ left: `${cursorX}px`, top: `${cursorY - 50}px`, zIndex: 1001 }}
        ></img>
        <div className="d-flex justify-content-center align-items-center pb-3">
          <Button
            className="border border-1 border-dark"
            variant={tool === "brush" ? "info" : "light"}
            onClick={() => setTool("brush")}
            style={{ marginRight: "10px" }}
            title="Brush"
          >
            <img src="brush.png" height={30} width={30} />
          </Button>
          <Button
            className="border border-1 border-dark"
            variant={tool === "eraser" ? "info" : "light"}
            onClick={() => setTool("eraser")}
            style={{ marginRight: "10px" }}
            title="Eraser"
          >
            <img src="eraser.png" height={30} width={30} />
          </Button>
          <Button
            className="border border-1 border-dark"
            variant={showCustomMenu ? "info" : "light"}
            style={{ marginRight: "10px" }}
            onClick={() => setShowCustomMenu(!showCustomMenu)}
            title="Grid dimention"
          >
            <svg height={30} width={30} xmlns="http://www.w3.org/2000/svg">
              <line x1="0" x2="30" y1="1" y2="1" stroke="black" strokeWidth="1" />
              <line
                x1="0"
                x2="30"
                y1="15"
                y2="15"
                stroke="black"
                strokeWidth="1"
              />
              <line
                x1="0"
                x2="30"
                y1="29"
                y2="29"
                stroke="black"
                strokeWidth="1"
              />
              <line
                x1="15"
                x2="15"
                y1="0"
                y2="30"
                stroke="black"
                strokeWidth="1"
              />
              <line x1="1" x2="1" y1="0" y2="30" stroke="black" strokeWidth="1" />
              <line
                x1="29"
                x2="29"
                y1="0"
                y2="30"
                stroke="black"
                strokeWidth="1"
              />
            </svg>
          </Button>
  
          {showCustomMenu && (
            renderCustomMenu()
          )}
  
        </div>
        <div
          style={style1}
          className="border border-5 border-dark grid-container"
          onTouchMove={handleTouchMove}
        >
          {Object.keys(boxes).map((index) => (
            <div
              key={index}
              className="border border-dark grid-item"
              style={ { backgroundColor:boxes[index].color ? color:'white' }}
              onClick={(e) => setColor(index, e)}
              onMouseEnter={coloring ? (e) => setColor(index, e) : null}
              onMouseDown={(e) => setColor(index, e)}
              onTouchStart={(e) => setColor(index, e)}
              draggable="false"
            ></div>
          ))}
        </div>
        <p className="text-center">
        Out of  &nbsp;<span className="fs-3">{(n * m)}</span>&nbsp;box{n * m == 1 ? "" : "es"}, &nbsp;
           <span className="fs-3">{colored}</span> {colored==1?"box is":"boxes are"} colored. <br/>
          Which is &nbsp;<span className="fs-3">{colored}/{n * m}</span>&nbsp; part of the grid. <br/>
          So, <span className="fs-3">({colored}/{n * m}) X 100{" "}</span>
          {((colored / (n * m)) * 100).toFixed(2) == (colored / (n * m)) * 100
            ? "="
            : "≈"}&nbsp;
          <span className="fs-1">
            {Math.round((colored / (n * m)) * 100)}% 
          </span>&nbsp;
          of the grid is colored
        </p>
      </div>
    </>
  );
}

export default Game1;

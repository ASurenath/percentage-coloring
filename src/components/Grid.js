import React, { useEffect, useRef, useState } from "react";
import { Button, CloseButton, Col, Dropdown, Form } from "react-bootstrap";

function Grid({ n, m, color, setAnswer, round }) {
  const [cursorX, setCursorX] = useState(0);
  const [cursorY, setCursorY] = useState(0);
  const [deviceType, setDeviceType] = useState("");
  const [coloring, setColoring] = useState(false);
  const [tool, setTool] = useState("brush");
  const [boxes, setBoxes] = useState({});
  const [colored, setColored] = useState(0);
  const container = useRef(null);

  useEffect(() => {
    let temp1 = {};
    for (let i = 0; i < n * m; i++) {
      temp1[i] = { color: false };
    }
    setBoxes(temp1);

  }, [n,m,round])

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
    setAnswer(count*100/(n*m));
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
    let col = Math.floor((touchX - rect.left) / (rect.width / m));
    let row = Math.floor((touchY - rect.top) / (rect.height / n));
    let index = row * m + col;
    // console.log(row,col,index);
    if(col<m && row<n && col>=0 && row>=0){
      try{setColor(index);}catch{console.log("err",col,row,index);}
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
            style={{ backgroundColor: boxes[index].color ? color : "white" }}
            onClick={(e) => setColor(index, e)}
            onMouseEnter={coloring ? (e) => setColor(index, e) : null}
            onMouseDown={(e) => setColor(index, e)}
            onTouchStart={(e) => setColor(index, e)}
            draggable="false"
          ></div>
        ))}
      </div>

      {/* <p className="text-center">
        ({colored}/{n * m}) X 100{" "}
        {((colored / (n * m)) * 100).toFixed(2) == (colored / (n * m)) * 100
          ? "="
          : "≈"}{" "}
        <span className="fs-1">
          {Math.round((colored / (n * m)) * 100)}% colored
        </span>
      </p> */}
    </div>
  );
}

export default Grid;

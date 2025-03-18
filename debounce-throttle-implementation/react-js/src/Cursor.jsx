import React, { useEffect, useState, useRef } from "react";

import classes from "./Cursor.module.css";

function Cursor() {
  const [cursorX, setCursorX] = useState(0);
  const [cursorY, setCursorY] = useState(0);

  const throttlingState = useRef(true);
  const timeOutId = useRef(null);

  const cursorPoints = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const updateCursorPosition = function (e) {
      cursorPoints.current = { x: e.clientX, y: e.clientY };

      // console.log(cursorPoints.current);

      if (throttlingState.current === false) return;

      throttlingState.current = false;

      timeOutId.current = setTimeout(() => {
        throttlingState.current = true;
        setCursorX(cursorPoints.current.x);
        setCursorY(cursorPoints.current.y);
        
      }, 150);
    };

    window.addEventListener("mousemove", updateCursorPosition);

    return () => {
      window.removeEventListener("mousemove", updateCursorPosition);
      if (timeOutId.current) clearTimeout(timeOutId.current);
    };
  }, []);

  // console.log(cursorX, cursorY);

  return (
    <>
      <div
        className={classes["custom-cursor"]}
        style={{ left: cursorX, top: cursorY }}
      />
      <div
        className={classes["custom-cursor--dot"]}
        style={{ left: cursorX, top: cursorY }}
      />
    </>
  );
}

export default Cursor;


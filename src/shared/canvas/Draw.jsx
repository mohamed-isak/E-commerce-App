/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import React, { useState, useEffect, useRef } from "react";
import { Stage, Layer, Line, Text } from "react-konva";

const Draw = ({ line, index }) => {
  console.log("line", line);
  const [color, setColor] = useState(line.color);
  const prevColor = useRef(line.color);
  useEffect(() => {
    if (line.tool === "pen") {
      console.log("eraaa");
      setColor(prevColor.current);
      prevColor.current = line.color;
    }
  }, [line]);

  return (
    <>
      <Line
        key={index}
        points={line.points}
        stroke={color}
        strokeWidth={5}
        tension={0.5}
        lineCap="round"
        draggable
        globalCompositeOperation={
          line.tool == "eraser" ? "destination-out" : "source-over"
        }
        onMouseMove={(e) => {
          console.log("compl");
        }}
      />
    </>
  );
};

export default Draw;

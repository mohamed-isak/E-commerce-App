/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { Text, Transformer } from "react-konva";
const MIN_WIDTH = 20;
export default function TextField({
  text,
  setTextPosition,
  shapeProps,
  isSelected,
  onSelect,
  onChange,
  notifySelect,
  removeItem,
  setTextScale,
}) {
  const shapeRef = useRef();
  const trRef = useRef();
  const [posX, setPosX] = useState(200);
  const [posY, setPosY] = useState(100);
  useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      console.log(trRef.current);
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
      notifySelect(true);
    }
  }, [isSelected]);

  useEffect(() => {
    if (removeItem) shapeRef.current.destroy();
  }, [removeItem]);

  useEffect(() => {
    setTextPosition(posX, posY, text.id);
    setTextScale(
      { x: shapeRef.current.scaleX(), y: shapeRef.current.scaleY() },
      text.id
    );
  }, []);

  useEffect(() => {
    // const node = shapeRef.current;
    //  node.fontSize = 25 * node.scaleX()
    if (text.x) setPosX(text.x);
    if (text.y) setPosY(text.y);
  }, [text]);

  return (
    <>
      <Text
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        text={text.text}
        fontFamily={text.font}
        fontStyle={text.fontStyle.name}
        lineHeight={text.lineHeight}
        fill={text.color}
        rotation={text.rotation}
        draggable={true}
        stroke={text.outLineColor}
        strokeWidth={text.outLineWidth}
        fillAfterStrokeEnabled
        fontSize={text.fontSize}
        scale={text.scale}
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
          setTextPosition(e.target.x(), e.target.y(), text.id);
        }}
        x={posX}
        y={posY}
        onTransformEnd={(e) => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          setTextScale({ x: scaleX, y: scaleY }, text.id);
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            // set minimal value
            // width: Math.max(5, node.width() * scaleX),
            // height: Math.max(node.height() * scaleY),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          keepRatio
          anchorStroke="#FFFFFF"
          anchorFill="#2152CB"
          anchorSize={5}
          borderStroke="#0677FF"
          borderDash={[3, 3]}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
}

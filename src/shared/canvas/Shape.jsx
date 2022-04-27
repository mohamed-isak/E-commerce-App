/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useRef, useEffect, useState } from "react";
import {
  Transformer,
  Path,
  Circle,
  Ring,
  Rect,
  Star,
  RegularPolygon,
  Ellipse,
  Arrow,
} from "react-konva";
//import useImage from 'use-image';
import { Border } from "../utils/canvasFilters";
import Konva from "konva";

function Shape({
  shape,
  isSelected,
  shapeProps,
  onSelect,
  onChange,
  setShapeScale,
  setShapePosition,
}) {
  //  const [image] = useImage(img)
  const shapeRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      console.log(trRef.current);
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
      //  notifySelect(true)
    }
  }, [isSelected]);

  useEffect(() => {
    setShapePosition(shapeRef.current.x(), shapeRef.current.y(), shape.id);
    setShapeScale(
      { x: shapeRef.current.scaleX(), y: shapeRef.current.scaleY() },
      shape.id
    );
  }, []);

  return (
    <>
      {console.log("shape---", shape)}
      {shape.path ? (
        <Path
          onClick={onSelect}
          onTap={onSelect}
          ref={shapeRef}
          stroke={shape.outLineColor.color}
          strokeWidth={shape.outline}
          fill={shape.color.color}
          draggable={true}
          scale={shape.scale}
          data={shape.path}
          onTransformEnd={(e) => {
            const node = shapeRef.current;
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();
            setShapeScale({ x: scaleX, y: scaleY }, shape.id);
            onChange({
              ...shapeProps,
              x: node.x(),
              y: node.y(),
            });
          }}
          onDragEnd={(e) => {
            const node = shapeRef.current;
            console.log("drag end");
            setShapePosition(node.x(), node.y(), shape.id);
          }}
          x={shape.x || 200}
          y={shape.y || 100}
        />
      ) : shape.name === "ring" ? (
        <Ring
          onClick={onSelect}
          onTap={onSelect}
          ref={shapeRef}
          x={shape.x || 200}
          y={shape.y || 100}
          innerRadius={15}
          outerRadius={30}
          draggable={true}
          fill={shape.color.color}
          strokeWidth={shape.outline}
          stroke={shape.outLineColor.color}
          rotation={shape.shapeRotation}
          scale={shape.scale}
          onTransformEnd={(e) => {
            const node = shapeRef.current;
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();
            setShapeScale({ x: scaleX, y: scaleY }, shape.id);
            onChange({
              ...shapeProps,
              x: node.x(),
              y: node.y(),
            });
          }}
          onDragEnd={(e) => {
            const node = shapeRef.current;
            console.log("drag end");
            setShapePosition(node.x(), node.y(), shape.id);
          }}
        />
      ) : shape.name === "circle" ? (
        <Circle
          onClick={onSelect}
          onTap={onSelect}
          ref={shapeRef}
          radius={30}
          x={shape.x || 200}
          y={shape.y || 100}
          draggable={true}
          fill={shape.color.color}
          strokeWidth={shape.outline}
          stroke={shape.outLineColor.color}
          rotation={shape.shapeRotation}
          scale={shape.scale}
          onTransformEnd={(e) => {
            const node = shapeRef.current;
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();
            setShapeScale({ x: scaleX, y: scaleY }, shape.id);
            onChange({
              ...shapeProps,
              x: node.x(),
              y: node.y(),
            });
          }}
          onDragEnd={(e) => {
            const node = shapeRef.current;
            setShapePosition(node.x(), node.y(), shape.id);
          }}
        />
      ) : shape.name === "square" ? (
        <Rect
          onClick={onSelect}
          onTap={onSelect}
          ref={shapeRef}
          x={shape.x || 200}
          y={shape.y || 100}
          width={40}
          height={40}
          draggable={true}
          fill={shape.color.color}
          strokeWidth={shape.outline}
          stroke={shape.outLineColor.color}
          rotation={shape.shapeRotation}
          scale={shape.scale}
          onTransformEnd={(e) => {
            const node = shapeRef.current;
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();
            setShapeScale({ x: scaleX, y: scaleY }, shape.id);
            onChange({
              ...shapeProps,
              x: node.x(),
              y: node.y(),
            });
          }}
          onDragEnd={(e) => {
            const node = shapeRef.current;
            setShapePosition(node.x(), node.y(), shape.id);
          }}
        />
      ) : shape.name === "star" ? (
        <Star
          onClick={onSelect}
          onTap={onSelect}
          ref={shapeRef}
          x={shape.x || 200}
          y={shape.y || 100}
          numPoints={6}
          innerRadius={20}
          outerRadius={30}
          draggable={true}
          fill={shape.color.color}
          strokeWidth={shape.outline}
          stroke={shape.outLineColor.color}
          rotation={shape.shapeRotation}
          scale={shape.scale}
          onTransformEnd={(e) => {
            const node = shapeRef.current;
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();
            setShapeScale({ x: scaleX, y: scaleY }, shape.id);
            console.log("tran", shape.id);
            onChange({
              ...shapeProps,
              x: node.x(),
              y: node.y(),
            });
          }}
          onDragEnd={(e) => {
            const node = shapeRef.current;
            setShapePosition(node.x(), node.y(), shape.id);
          }}
        />
      ) : shape.name === "polygon" ? (
        <RegularPolygon
          onClick={onSelect}
          onTap={onSelect}
          ref={shapeRef}
          x={shape.x || 200}
          y={shape.y || 100}
          sides={6}
          radius={40}
          draggable={true}
          fill={shape.color.color}
          strokeWidth={shape.outline}
          stroke={shape.outLineColor.color}
          rotation={shape.shapeRotation}
          scale={shape.scale}
          onTransformEnd={(e) => {
            const node = shapeRef.current;
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();
            setShapeScale({ x: scaleX, y: scaleY }, shape.id);
            onChange({
              ...shapeProps,
              x: node.x(),
              y: node.y(),
            });
          }}
          onDragEnd={(e) => {
            const node = shapeRef.current;
            setShapePosition(node.x(), node.y(), shape.id);
          }}
        />
      ) : shape.name === "ellipse" ? (
        <Ellipse
          onClick={onSelect}
          onTap={onSelect}
          ref={shapeRef}
          x={shape.x || 200}
          y={shape.y || 100}
          radiusX={50}
          radiusY={30}
          draggable={true}
          fill={shape.color.color}
          strokeWidth={shape.outline}
          stroke={shape.outLineColor.color}
          rotation={shape.shapeRotation}
          scale={shape.scale}
          onTransformEnd={(e) => {
            const node = shapeRef.current;
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();
            setShapeScale({ x: scaleX, y: scaleY }, shape.id);
            onChange({
              ...shapeProps,
              x: node.x(),
              y: node.y(),
            });
          }}
          onDragEnd={(e) => {
            const node = shapeRef.current;
            setShapePosition(node.x(), node.y(), shape.id);
          }}
        />
      ) : shape.name === "arrow" ? (
        <Arrow
          onClick={onSelect}
          onTap={onSelect}
          ref={shapeRef}
          x={shape.x || 200}
          y={shape.y || 100}
          points={[50, 50, 100, 100]}
          pointerLength={20}
          pointerWidth={20}
          draggable={true}
          fill={shape.color.color}
          strokeWidth={shape.outline > 4 ? shape.outline : 4}
          stroke={shape.outLineColor.color}
          rotation={shape.shapeRotation}
          scale={shape.scale}
          onTransformEnd={(e) => {
            const node = shapeRef.current;
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();
            setShapeScale({ x: scaleX, y: scaleY }, shape.id);
            onChange({
              ...shapeProps,
              x: node.x(),
              y: node.y(),
            });
          }}
          onDragEnd={(e) => {
            const node = shapeRef.current;
            setShapePosition(node.x(), node.y(), shape.id);
          }}
        />
      ) : (
        ""
      )}

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

export default Shape;

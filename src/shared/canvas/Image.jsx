/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useRef, useEffect, useState } from "react";
import { Image, Transformer } from "react-konva";

export default function UploadImage({
  img,
  setImagePosition,
  setImageScale,
  onChange,
  onSelect,
  isSelected,
  shapeProps,
}) {
  const imageRef = useRef();
  const trRef = useRef();
  const [posX, setPosX] = useState(200);
  const [posY, setPosY] = useState(100);
  const [uploadImge, setUploadImage] = useState();
  useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      console.log(trRef.current);
      trRef.current.nodes([imageRef.current]);
      trRef.current.getLayer().batchDraw();
      //  notifySelect(true)
    }
  }, [isSelected]);

  useEffect(() => {
    let image = new window.Image();
    image.src = img.src.objectURL;
    setUploadImage(image);
  }, [img]);

  useEffect(() => {
    setImagePosition(posX, posY, img.id);
    setImageScale(
      { x: imageRef.current.scaleX(), y: imageRef.current.scaleY() },
      img.id
    );
  }, []);

  return (
    <>
      <Image
        onClick={onSelect}
        onTap={onSelect}
        image={uploadImge}
        ref={imageRef}
        draggable
        scale={img.scale}
        rotation={img.imageRotation}
        stroke={img.outLineColor ? img.outLineColor.color : ""}
        strokeWidth={img.outline}
        onTransformEnd={(e) => {
          const node = imageRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          setImageScale({ x: scaleX, y: scaleY }, img.id);
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
          });
        }}
        onDragEnd={(e) => {
          const node = imageRef.current;
          console.log("drag end");
          setImagePosition(node.x(), node.y(), img.id);
        }}
        x={img.x || 200}
        y={img.y || 100}
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

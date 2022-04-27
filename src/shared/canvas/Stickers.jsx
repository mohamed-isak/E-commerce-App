import React, {useEffect, useRef} from 'react'
import { Image, Transformer } from 'react-konva';
import useImage from 'use-image';

export default function Stickers({img, shapeProps, onChange,
   onSelect, isSelected, setStickerScale, setStickerPosition}) {
    const imageRef = useRef();
    const trRef = useRef();
    const [image] = useImage(img.icn);
 
    useEffect(() => {
        if (isSelected) {
          // we need to attach transformer manually
          console.log(trRef.current)
          trRef.current.nodes([imageRef.current]);
          trRef.current.getLayer().batchDraw();
        //  notifySelect(true)
        }
      }, [isSelected])
    return (
        <>
           <Image 
           onClick={onSelect}
           onTap={onSelect}
           image={image}
           ref={imageRef}
           draggable
           scale={img.scale}
           rotation={img.imageRotation} 
           stroke={img.outLineColor ? img.outLineColor.color : ''} 
           strokeWidth={img.outline}
           onTransformEnd={(e) => {
               const node = imageRef.current;
               const scaleX = node.scaleX();
               const scaleY = node.scaleY();
              setStickerScale({x:scaleX, y: scaleY}, img.id)      
               onChange({ 
                   ...shapeProps,                                
                   x: node.x(),
                   y: node.y(),
               });
               }}
               onDragEnd={(e) => {
                 const node = imageRef.current
                 console.log('drag end')
                setStickerPosition(node.x(), node.y(), img.id)
               }} 
               x={img.x || 200}
               y={img.y || 100}
         /> 
                    {isSelected && (
      <Transformer
       ref={trRef}
       keepRatio
       anchorStroke= '#FFFFFF'
       anchorFill= '#2152CB'
       anchorSize={5}
       borderStroke='#0677FF'
       borderDash= {[3, 3]}
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
    )
}

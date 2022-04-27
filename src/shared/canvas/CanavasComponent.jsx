/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { Stage, Layer, Image, Rect, Text, Transformer } from "react-konva";
import Konva from "konva";
import { v4 as uuidv4 } from "uuid";
import useImage from "use-image";
import { connect } from "react-redux";
import Draw from "./Draw";
import Shape from "./Shape";
import TextField from "./TextField";
import UploadImage from "./Image";
import actionTypes from "../../redux/design/actionTypes";
import Stickers from "./Stickers";
import { tookeImage } from "../../redux/design/designActions";
import { hexToRgb } from "../utils/converter";

const initialTextProps = [
  {
    x: 200,
    y: 100,
    fontSize: 32,
  },
];
const initialShapeProps = [
  {
    x: 200,
    y: 100,
    fontSize: 32,
  },
];
const getTool = () => "pen";

function CanavasComponent(props) {
  const {
    stageType,
    textsForDesign,
    selectedText,
    notifySelect,
    removeItem,
    makeSelectedShape,
    drawConfigData,
    texts,
    shapes,
    setShapeScale,
    setShapePosition,
    setTextScale,
    setTextPosition,
    drawConfig,
    addLines,
    drawLines,
    images,
    setImagePosition,
    setImageScale,
    setSelectedId,
    stickers,
    load3D,
    takeImage,
    tookeImageUri,
    goNextStep,
    setStickerScale,
    setStickerPosition,
    productColor,
  } = props;
  // const [texts, setTexts] = useState(textsForDesign)
  const [textProps, setTextProps] = useState(initialTextProps);
  const [shapeProps, setShapeProps] = useState(initialShapeProps);
  const [selectedId, selectShape] = useState(null);

  const imageRef = useRef(null);

  const stageRef = useRef(null);

  const [lines, setLines] = useState([]);
  const isDrawing = useRef(false);
  const [tool, setTool] = useState("pen");
  // const uploadImgs = useRef()
  console.log("yool", tool);

  const { image } = props;
  console.log("selectedShapes", drawConfigData);
  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty =
      e.target === e.target.getStage() || e.target.attrs.image;
    if (clickedOnEmpty) {
      selectShape(null);
      notifySelect(false);
    }
  };

  useEffect(() => {
    if (takeImage) {
      const uri = stageRef.current.toDataURL();
      console.log("uri", uri);
      tookeImageUri(uri);
      goNextStep();
    } else if (load3D) {
      const uri = stageRef.current.toDataURL();
      console.log("uri", uri);
      tookeImageUri(uri);
    }
  }, [takeImage, load3D]);

  React.useEffect(() => {
    if (image && imageRef) {
      // you many need to reapply cache on some props changes like shadow, stroke, etc.
      imageRef.current.cache();
      //  imageRef.current.filters=[Konva.Filters.RGB];
      // imageRef.current.red=255
      // imageRef.current.green=0
      // imageRef.current.blue=0
    }
  }, [image]);

  //Free drawing

  const handleMouseDown = (e) => {
    console.log("dra", drawConfig);
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([
      ...lines,
      { tool, color: drawConfigData.color, points: [pos.x, pos.y] },
    ]);
  };

  const handleMouseMove = (e) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);
    //  lastLine.config = drawConfig

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
    if (lines.length > 0) {
      addLines(lines);
    }
  };

  useEffect(() => {
    setSelectedId(selectedId);
  }, [selectedId]);

  useEffect(() => {
    setLines(drawLines);
  }, [drawLines]);

  useEffect(() => {
    console.log("yool", drawConfigData.tool);
    setTool(drawConfigData.tool);
  }, [drawConfigData]);

  const { r, g, b } = hexToRgb(productColor);
  return (
    <>
      <Stage
        width={400}
        height={400}
        onMouseDown={stageType === "draw" ? handleMouseDown : checkDeselect}
        onTouchStart={stageType === "draw" ? handleMouseDown : checkDeselect}
        ref={stageRef}
        onTouchMove={stageType === "draw" && handleMouseMove}
        onMousemove={stageType === "draw" && handleMouseMove}
        onMouseup={stageType === "draw" && handleMouseUp}
      >
        <Layer>
          <Image
            width={400}
            height={400}
            image={image}
            ref={imageRef}
            filters={[Konva.Filters.RGB]}
            red={r}
            green={g}
            blue={b}
          />
          {texts.map((text, i) => {
            return (
              <TextField
                key={i}
                shapeProps={textProps[i]}
                isSelected={text.id === selectedId}
                text={text}
                notifySelect={notifySelect}
                removeItem={removeItem}
                setTextScale={setTextScale}
                setTextPosition={setTextPosition}
                onSelect={() => {
                  selectShape(text.id);
                  selectedText(text.id);
                }}
                onChange={(newAttrs) => {
                  const txts = textProps.slice();
                  txts[i] = newAttrs;
                  setTextProps(txts);
                }}
              />
            );
          })}
          {shapes.map((shape, i) => {
            console.log("shape", shape);
            return (
              <Shape
                key={shape.id}
                isSelected={shape.id === selectedId}
                shapeProps={shapeProps[i]}
                shape={shape}
                setShapeScale={setShapeScale}
                setShapePosition={setShapePosition}
                onSelect={() => {
                  selectShape(shape.id);
                  makeSelectedShape(shape.id);
                }}
                onChange={(newAttrs) => {
                  const txts = shapeProps.slice();
                  txts[i] = newAttrs;
                  setShapeProps(txts);
                }}
              />
            );
          })}

          {isDrawing.current
            ? lines.map((line, i) => <Draw key={i} line={line} index={i} />)
            : drawLines.map((line, i) => <Draw key={i} line={line} />)}

          {images.map((img, i) => {
            console.log("img", img);
            console.log("id sele", selectedId);
            return (
              <UploadImage
                img={img}
                key={img.id}
                draggable
                isSelected={img.id == selectedId}
                setImageScale={setImageScale}
                setImagePosition={setImagePosition}
                onSelect={() => {
                  console.log("sle", img.id);
                  selectShape(img.id);
                }}
                onChange={(newAttrs) => {
                  //  const txts = textProps.slice();
                  //  txts[i] = newAttrs;
                  //  setTextProps(txts);
                }}
              />
            );
          })}

          {stickers.map((img, i) => {
            console.log("img", img);
            console.log("id sele", selectedId);
            return (
              <Stickers
                img={img}
                key={img.id}
                draggable
                isSelected={img.id == selectedId}
                setStickerScale={setStickerScale}
                setStickerPosition={setStickerPosition}
                onSelect={() => {
                  console.log("sle---", img.id);
                  selectShape(img.id);
                }}
                onChange={(newAttrs) => {
                  //  const txts = textProps.slice();
                  //  txts[i] = newAttrs;
                  //  setTextProps(txts);
                }}
              />
            );
          })}
        </Layer>
      </Stage>
    </>
  );
}
function mapStateToProps(state) {
  console.log("mapstates p", state);
  return {
    texts: state.canvas.present.designConfig.texts,
    stageType: state.design.designStage,
    shapes: state.canvas.present.designConfig.shapes,
    drawConfigData: state.canvas.present.designConfig.nextDrawingConfig,
    drawLines: state.canvas.present.designConfig.drawings,
    images: state.canvas.present.designConfig.images,
    stickers: state.canvas.present.designConfig.stickers,
    takeImage: state.design.takeImage,
    load3D: state.design.load3D,
    productColor: state.design.selectedProduct.color,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setShapeScale: (scale, id) => {
      dispatch({
        type: actionTypes.SET_SHAPE_SCALE,
        shapeId: id,
        value: scale,
      });
    },
    setShapePosition: (x, y, id) => {
      dispatch({ type: actionTypes.SET_SHAPE_POSITION, shapeId: id, x, y });
    },
    setTextScale: (scale, id) => {
      dispatch({ type: actionTypes.SET_TEXT_SCALE, textId: id, value: scale });
    },
    setTextPosition: (x, y, id) => {
      dispatch({ type: actionTypes.SET_TEXT_POSITION, textId: id, x, y });
    },
    addLines: (lines) => {
      dispatch({ type: actionTypes.ADD_LINES, payload: lines });
    },
    setImagePosition: (x, y, id) => {
      dispatch({ type: actionTypes.SET_IMG_POSITION, imgId: id, x, y });
    },
    setImageScale: (scale, id) => {
      dispatch({ type: actionTypes.SET_IMG_SCALE, imgId: id, value: scale });
    },
    setSelectedId: (id) => {
      dispatch({ type: actionTypes.SET_SELECTED_ID, id });
    },
    tookeImageUri: (uri) => {
      dispatch({ type: actionTypes.TOOKE_DESIGNED_IMG, payload: uri });
    },
    goNextStep: () => {
      dispatch({ type: actionTypes.GO_TO_NEXT });
    },
    setStickerPosition: (x, y, id) => {
      dispatch({
        type: actionTypes.SET_STICKER_POSISTION,
        stickerId: id,
        x,
        y,
      });
    },
    setStickerScale: (scale, id) => {
      dispatch({
        type: actionTypes.SET_STICKER_SCALE,
        stickerId: id,
        value: scale,
      });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CanavasComponent);

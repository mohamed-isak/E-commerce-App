/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect, useRef } from "react";
import { Row, Col } from "react-bootstrap";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Slider } from "primereact/slider";
import useImage from "use-image";
import testImage from "../../../images/test.PNG";
import { v4 as uuidv4 } from "uuid";
import { OverlayPanel } from "primereact/overlaypanel";
import { BsX } from "react-icons/bs";
import { ActionCreators } from "redux-undo";
import { connect } from "react-redux";
import CanavasComponent from "../../../shared/canvas/CanavasComponent";
import ShapeComponent from "./ShapeComponent";
import actionTypes from "../../../redux/design/actionTypes";
import { Tooltip } from "primereact/tooltip";
//import SvgColor from 'react-svg-color'
import { classNames } from "primereact/utils";
import { Dialog } from "primereact/dialog";

import addTextIcon from "../../../assets/images/design/step3/add text icon.svg";
import addShapesIcon from "../../../assets/images/design/step3/add shapes icon.svg";
import drawIcon from "../../../assets/images/design/step3/draw icon.svg";
import designIdeas from "../../../assets/images/design/step3/design ideas icon.svg";
import uploadDesignIcon from "../../../assets/images/design/step3/upload design icon.svg";
import stickersIcon from "../../../assets/images/design/step3/stickers icon.svg";

import roundNeckBlackx from "../../../assets/images/design/step3/product/black-t.jpg";
import backArrow from "../../../assets/images/arrow-go-back-line.svg";
import backUp from "../../../assets/images/arrow-go-up-line.svg";
import deleteIcn from "../../../assets/images/design/step3/delete-bin.svg";
import { COLORS } from "../../../shared/utils/constants";
import DrawingComponent from "./DrawingComponent";
import UploadComponent from "./UploadComponent";
import ImageStickerComponent from "./ImageStickerComponent";

import Scene from "./3D/Scene";

const fonts = [
  { id: 1, name: "Arial" },
  { id: 2, name: "Verdana" },
  { id: 3, name: "Helvetica" },
  { id: 4, name: "Tahoma" },
  { id: 5, name: "Trebuchet MS" },
  { id: 6, name: "Times New Roman" },
  { id: 7, name: "Georgia" },
];
const fontStyles = [
  { id: 1, name: "normal" },
  { id: 2, name: "bold" },
  { id: 3, name: "italic" },
  { id: 4, name: "italic bold" },
];

function DesignStepThreeComponent({
  stage,
  makeStage,
  texts,
  addTextForDesign,
  updateText,
  undo,
  redo,
  selectedId,
  remove,
  product,
}) {
  const [selectedFont, setSelectedFont] = useState({ id: 1, name: "Arial" });
  const [selectedFontStyle, setSelectedFontStyle] = useState({
    id: 1,
    name: "normal",
  });
  const [textSize, setTextSize] = useState(22);
  const [lineHeight, setLineHeight] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [outLine, setOutline] = useState(0);
  const [inputText, setInputText] = useState("");
  //  const [texts, setTexts] = useState([])
  const [selectedTextId, setSelectedTextId] = useState(null);
  const [selectedTextColor, setSelectedColor] = useState({
    id: 1,
    name: "white",
    color: "#FFFFFF",
  });
  const [selectedOutLineTextColor, setSelectedOutLineColor] = useState({
    id: 1,
    name: "white",
    color: "#FFFFFF",
  });
  const [selectedImage] = useImage(product.img, "Anonymous");
  const [selectStatus, setSelectStatus] = useState(false);
  const [removeItem, setRemoveItem] = useState(false);
  const [selectedShapes, setSelectedShapes] = useState([]); // for shape
  const [pickedShapeId, setPickedShapeId] = useState(undefined);
  const [drawConfig, setDrawConfig] = useState({});
  const [dimensionActive, setDimensionActive] = useState("2d");
  const [display3d, setDisplay3d] = useState(false);

  const op = useRef(null);
  const op1 = useRef(null);
  const shapeComponentRef = useRef();
  console.log(shapeComponentRef);

  //  const baseImage = () => (<SvgColor
  //     svg={product.img}
  //     width={200}
  //     colors={[product.color, product.color,product.color,product.color,product.color,product.color,product.color,product.color,product.color]}
  //  />)

  useEffect(() => {
    window.addEventListener("beforeunload", alertUser);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
  }, []);
  const alertUser = (e) => {
    e.preventDefault();
    e.returnValue = "";
    //  alert('unsaved changes')
  };

  const onFontChange = (e) => {
    setSelectedFont(e.target.value);
    updateKey(e.target.value, "fontFamily");
  };
  const onFontStyleChange = (e) => {
    setSelectedFontStyle(e.target.value);
    updateKey(e.target.value, "fontStyle");
  };
  const changeTextSize = (e) => {
    setTextSize(e.value);
    updateKey(e.value, "fontSize");
  };
  const changeLineHeight = (e) => {
    setLineHeight(e.value);
    updateKey(e.value, "lineHeight");
  };
  const changeRotation = (e) => {
    setRotation(e.value);
    updateKey(e.value, "rotation");
  };
  const chooseColor = (color) => {
    setSelectedColor((prev) => color);
    updateKey(color.color, "color");
  };
  const chooseOutLineColor = (color) => {
    setSelectedOutLineColor((prev) => color);
    updateKey(color.color, "outLineColor");
  };
  const changeOutLine = (e) => {
    setOutline((prev) => e.value);
    updateKey(e.value, "outLineWidth");
  };

  const updateKey = (value, key) => {
    if (selectedTextId) {
      let index = texts.findIndex((text) => text.id === selectedTextId);
      texts[index][key] = value;
      updateText(index, key, value);
    } else if (texts.length) {
      texts[texts.length - 1][key] = value;
      updateText(texts.length - 1, key, value);
    }
  };

  const addNewText = () => {
    addTextForDesign({
      id: uuidv4(),
      text: inputText,
      fontFamily: selectedFont.name,
      fontStyle: selectedFontStyle,
      fontSize: textSize,
      lineHeight: lineHeight,
      rotation,
      color: selectedTextColor.color,
      outLineColor: selectedOutLineTextColor.color,
      outLineWidth: outLine,
    });
  };
  const makeSelectedText = (id) => {
    setSelectedTextId(id);
  };
  const notifySelect = (status) => {
    setSelectStatus(status);
  };

  //image shape

  const makeSetShapes = (shapes) => {
    setSelectedShapes(shapes);
  };

  // for getting selected shape (transformed)
  const makeSelectedShape = (id) => {
    setPickedShapeId(id);
  };

  // free draw

  const getDrawConfig = (config) => {
    console.log("config", config);
    setDrawConfig(config);
  };

  const make2Dactive = () => {
    setDimensionActive("2d");
  };
  const make3Dactive = () => {
    setDimensionActive("3d");
    setDisplay3d(true);
  };

  return (
    <>
      <Row className="step3-row">
        <Col className="mt-4 mt-lg-0  order-last order-lg-first" xs={12} lg={3}>
          <div className="step3-left box h-100">
            {stage === "initial" && (
              <Row>
                <Col xs={6} className="tool-item">
                  <div onClick={() => makeStage("addText")} className="icn-box">
                    <img src={addTextIcon} />
                    <strong>Add Text</strong>
                    <p>Add your text here</p>
                  </div>
                </Col>
                <Col
                  xs={6}
                  onClick={() => makeStage("addShapes")}
                  className="tool-item"
                >
                  <div className="icn-box">
                    <img src={addShapesIcon} />
                    <strong>Add Shapes</strong>
                    <p>Circle, triangle, etc.</p>
                  </div>
                </Col>
                <Col
                  xs={6}
                  className="tool-item"
                  onClick={() => makeStage("draw")}
                >
                  <div className="icn-box">
                    <img src={drawIcon} />
                    <strong>Draw</strong>
                    <p>Bring your creativity</p>
                  </div>
                </Col>
                <Col
                  xs={6}
                  className="tool-item"
                  onClick={() => makeStage("uploadDesign")}
                >
                  <div className="icn-box">
                    <img src={uploadDesignIcon} />
                    <strong>Upload Design</strong>
                    <p>Browse or import</p>
                  </div>
                </Col>
                <Col
                  xs={6}
                  className="tool-item"
                  onClick={() => makeStage("designIdeas")}
                >
                  <div className="icn-box">
                    <img src={designIdeas} />
                    <strong>Design Ideas</strong>
                    <p>Ready to use templates</p>
                  </div>
                </Col>
                <Col
                  xs={6}
                  className="tool-item"
                  onClick={() => makeStage("stickers")}
                >
                  <div className="icn-box">
                    <img src={stickersIcon} />
                    <strong>Stickers</strong>
                    <p>Browse stickers</p>
                  </div>
                </Col>
              </Row>
            )}
            {stage === "addText" && (
              <Row style={{ padding: ".6em" }}>
                <Col className="text-head">
                  <Col xs={2} className="fl">
                    <div
                      onTap={() => makeStage("initial")}
                      onClick={() => makeStage("initial")}
                      className="back-arrow sm-box"
                    ></div>
                  </Col>
                  <Col xs={8} className="fl txt-cnt">
                    <strong>Add Text</strong>
                  </Col>
                  <Col xs={1}>
                    <div className="letter-icn">
                      <img src={addTextIcon} />{" "}
                    </div>
                  </Col>
                </Col>

                <Col xs={12} className="text-input">
                  <div className="p-col-12 p-md-4">
                    <div className="p-inputgroup">
                      <InputText
                        className="input-filed"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Keyword"
                      />
                      <Button
                        label="Add"
                        onClick={addNewText}
                        className="add-txt-btn"
                      />
                    </div>
                  </div>
                </Col>
                <Col xs={12} className="input-row">
                  <Col xs={6} className="inputs">
                    <label>Font</label>
                    <Dropdown
                      className="input-filed"
                      value={selectedFont}
                      options={fonts}
                      onChange={onFontChange}
                      optionLabel="name"
                      placeholder="Select a Font"
                    />
                  </Col>
                  <Col xs={6} className="inputs second">
                    <label>Text Style </label>
                    <Dropdown
                      className="input-filed second-field"
                      value={selectedFontStyle}
                      options={fontStyles}
                      onChange={onFontStyleChange}
                      optionLabel="name"
                      placeholder="Text Weight"
                    />
                  </Col>
                </Col>
                <Col xs={12} className="input-row">
                  <label>Text Size</label>{" "}
                  <span className="text-value">{textSize}</span>
                  <Slider value={textSize} onChange={changeTextSize} />
                </Col>
                <Col xs={12} className="input-row">
                  <label>Line Height</label>{" "}
                  <span className="text-value">{lineHeight}</span>
                  <Slider
                    value={lineHeight}
                    min={1}
                    onChange={changeLineHeight}
                  />
                </Col>
                <Col xs={12} className="input-row">
                  <label>Rotation</label>
                  <span className="text-value">{rotation}</span>
                  <Slider
                    value={rotation}
                    min={-360}
                    max={360}
                    onChange={changeRotation}
                  />
                </Col>
                <Col xs={12} className="input-row">
                  <label>Outline</label>
                  <span className="text-value">{outLine}</span>
                  <Slider value={outLine} onChange={changeOutLine} />
                </Col>

                <Row className="input-row color-row">
                  <Col xs={5.5}>
                    <div>
                      <label>Text Color</label>
                    </div>
                    <div>
                      <label style={{ width: "6em" }}>
                        {selectedTextColor.name}
                      </label>{" "}
                      <div
                        className="xsm-box color-box"
                        onClick={(e) => op.current.toggle(e)}
                        style={{
                          width: "20pt",
                          backgroundColor: selectedTextColor.color,
                        }}
                      ></div>
                    </div>
                    <OverlayPanel
                      ref={op}
                      id="overlay_panel"
                      style={{ width: "120pt" }}
                      className="overlaypanel-demo"
                    >
                      {COLORS.map((color) => {
                        return (
                          <Row key={color.id}>
                            <Col xs={8} className="colr-label">
                              {color.name}
                            </Col>
                            <Col xs={4}>
                              {" "}
                              <div
                                className={"color-box " + color.name}
                                onClick={() => chooseColor(color)}
                              >
                                {" "}
                              </div>
                            </Col>{" "}
                          </Row>
                        );
                      })}
                    </OverlayPanel>
                  </Col>
                  <Col xs={5.5}>
                    <div>
                      <label>Outline Color</label>
                    </div>
                    <div>
                      <label style={{ width: "6em" }}>
                        {selectedOutLineTextColor.name}
                      </label>{" "}
                      <div
                        className="xsm-box color-box"
                        onClick={(e) => op1.current.toggle(e)}
                        style={{
                          width: "20pt",
                          backgroundColor: selectedOutLineTextColor.color,
                        }}
                      ></div>
                    </div>
                    <OverlayPanel
                      ref={op1}
                      id="overlay_panel"
                      style={{ width: "120pt" }}
                      className="overlaypanel-demo"
                    >
                      {COLORS.map((color) => {
                        return (
                          <Row key={color.id}>
                            <Col xs={8} className="colr-label">
                              {color.name}
                            </Col>
                            <Col xs={4}>
                              {" "}
                              <div
                                className={"color-box " + color.name}
                                onClick={() => chooseOutLineColor(color)}
                              >
                                {" "}
                              </div>
                            </Col>{" "}
                          </Row>
                        );
                      })}
                    </OverlayPanel>
                  </Col>
                  {/* {selectStatus &&<Col xs={1}  className="delete-icon xsm-box mr-rght-3"
                        onClick={() => {
                            setRemoveItem(true)
                            setTimeout(() => {
                                setRemoveItem(false) 
                            }, 10);
                        }}
                        >
                             <BsX />
                         </Col>} */}
                </Row>
              </Row>
            )}
            {stage === "addShapes" && (
              <Row className="shapes-conatiner">
                <Col className="text-head" xs={12}>
                  <Col xs={2} className="fl">
                    <div
                      onTap={() => makeStage("initial")}
                      onClick={() => makeStage("initial")}
                      className="back-arrow sm-box"
                    ></div>
                  </Col>
                  <Col xs={8} className="fl txt-cnt">
                    <strong>Add Shapes</strong>
                  </Col>
                  <Col xs={1}>
                    <div className="letter-icn">
                      <img src={addShapesIcon} />{" "}
                    </div>
                  </Col>
                </Col>
                <ShapeComponent
                  setShapes={makeSetShapes}
                  pickedShapeId={pickedShapeId}
                  shapesChoosen={selectedShapes}
                />
              </Row>
            )}

            {stage === "draw" && (
              <Row className="draw-conatiner">
                <Col className="text-head" xs={12}>
                  <Col xs={2} className="fl">
                    <div
                      onTap={() => makeStage("initial")}
                      onClick={() => makeStage("initial")}
                      className="back-arrow sm-box"
                    ></div>
                  </Col>
                  <Col xs={8} className="fl txt-cnt">
                    <strong>Draw</strong>
                  </Col>
                  <Col xs={1}>
                    <div className="letter-icn">
                      <img src={drawIcon} />{" "}
                    </div>
                  </Col>
                </Col>
                <DrawingComponent makeConfig={getDrawConfig} />
              </Row>
            )}
            {stage === "uploadDesign" && (
              <Row className="draw-conatiner">
                <Col className="text-head" xs={12}>
                  <Col xs={2} className="fl">
                    <div
                      onTap={() => makeStage("initial")}
                      onClick={() => makeStage("initial")}
                      className="back-arrow sm-box"
                    ></div>
                  </Col>
                  <Col xs={8} className="fl txt-cnt">
                    <strong>Upload Design</strong>
                  </Col>
                  <Col xs={1}>
                    <div className="letter-icn">
                      <img src={uploadDesignIcon} />{" "}
                    </div>
                  </Col>
                </Col>
                <UploadComponent />
              </Row>
            )}
            {stage === "designIdeas" && (
              <Row className="draw-conatiner">
                <Col className="text-head" xs={12}>
                  <Col xs={2} className="fl">
                    <div
                      onClick={() => makeStage("initial")}
                      className="back-arrow sm-box"
                    ></div>
                  </Col>
                  <Col xs={8} className="fl txt-cnt">
                    <strong>Design Ideas</strong>
                  </Col>
                  <Col xs={1}>
                    <div className="letter-icn">
                      <img src={designIdeas} />{" "}
                    </div>
                  </Col>
                </Col>
                <ImageStickerComponent stage={stage} />
              </Row>
            )}
            {stage === "stickers" && (
              <Row className="draw-conatiner">
                <Col className="text-head" xs={12}>
                  <Col xs={2} className="fl">
                    <div
                      onTap={() => makeStage("initial")}
                      onClick={() => makeStage("initial")}
                      className="back-arrow sm-box"
                    ></div>
                  </Col>
                  <Col xs={8} className="fl txt-cnt">
                    <strong>Stickers</strong>
                  </Col>
                  <Col xs={1}>
                    <div className="letter-icn">
                      <img src={designIdeas} />{" "}
                    </div>
                  </Col>
                </Col>
                <ImageStickerComponent stage={stage} />
              </Row>
            )}
          </div>
        </Col>
        <Col className="" xs={12} lg={9}>
          <div className="step3-right box h-100">
            <Row className="img-container">
              <CanavasComponent
                image={selectedImage}
                selectedText={makeSelectedText}
                notifySelect={notifySelect}
                removeItem={removeItem}
                selectedShapes={selectedShapes}
                makeSelectedShape={makeSelectedShape}
                drawConfigData={drawConfig}
              />
              {/* <img src={roundNeckBlackx} width='180pt' /> */}
            </Row>
            <Row className="carosel-conatiner justify-space-between align-items-center">
              <Tooltip target=".arrow-icn" mouseTrack mouseTrackLeft={10} />
              <Col className="">
                <div
                  className="arrow-icn"
                  onClick={undo}
                  data-pr-tooltip="Undo"
                  data-pr-position="top"
                >
                  <img src={backArrow} />
                </div>
                <div
                  className="arrow-icn"
                  onClick={redo}
                  data-pr-tooltip="Redo"
                  data-pr-position="top"
                >
                  <img src={backUp} />
                </div>
                {selectedId && (
                  <div
                    className="arrow-icn delete-icn"
                    style={{ marginLeft: ".5em" }}
                    onClick={() => remove(selectedId)}
                    data-pr-tooltip="Remove"
                    data-pr-position="top"
                  >
                    <img src={deleteIcn} />
                  </div>
                )}
              </Col>
              {/* <div><img src={roundNeckBlackx} /></div> 
                  <div><img src={roundNeckBlackx} /></div>
                  <div><img src={roundNeckBlackx} /></div>
                  <div><img src={roundNeckBlackx} /></div> */}
              {/* <Col xs={6} className="img-wrpr">
                  </Col> */}
              <div className="pr-2">
                <div>100</div>
              </div>
            </Row>
            {/* <div className="dimension-btns">
              {" "}
              <div
                className={classNames({
                  active: dimensionActive == "2d",
                  btn: true,
                })}
                onClick={make2Dactive}
              >
                2D
              </div>
              <div
                className={classNames({
                  active: dimensionActive == "3d",
                  btn: true,
                })}
                onClick={make3Dactive}
              >
                3D
              </div>
            </div> */}
          </div>
        </Col>
      </Row>
      <Dialog
        header="3D View"
        visible={display3d}
        style={{ width: "98vw", height: "80vh" }}
        modal
        onHide={() => setDisplay3d(false)}
      >
        <Scene gltfModelPath="scene.gltf" imagePath={testImage} />
      </Dialog>
    </>
  );
}

function mapStateToProps(state) {
  console.log("mapStateToprops", state);
  return {
    stage: state.design.designStage,
    texts: state.canvas.present.designConfig.texts,
    selectedId: state.canvas.present.designConfig.selectedId,
    product: state.design.selectedProduct,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    makeStage: (stage) => {
      dispatch({ type: actionTypes.GO_TO_DESIGN_STAGE, payload: stage });
    },
    addTextForDesign: (text) => {
      dispatch({ type: actionTypes.ADD_TEXT, payload: text });
    },
    updateText: (index, key, value) => {
      dispatch({ type: actionTypes.UPDATE_TEXT, value, index, key });
    },
    undo: () => {
      dispatch(ActionCreators.undo());
    },
    redo: () => {
      dispatch(ActionCreators.redo());
    },
    remove: (id) => {
      dispatch({ type: actionTypes.REMOVE_ITEM, id });
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DesignStepThreeComponent);

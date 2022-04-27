/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { Toast } from "primereact/toast";
import { Slider } from "primereact/slider";
import { OverlayPanel } from "primereact/overlaypanel";
import { ProgressBar } from "primereact/progressbar";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { COLORS } from "../../../shared/utils/constants";
import actionTypes from "../../../redux/design/actionTypes";

function UploadComponent({
  addImage,
  selectedId,
  uploadedImages,
  updateImage,
}) {
  const toast = useRef(null);
  const [uploadStart, setUploadStart] = useState(false);
  const [totalSize, setTotalSize] = useState(0);
  const [progressValue, setProgressValue] = useState(0);
  const [file, setFile] = useState("");
  const [uploadComplete, setUploadComplete] = useState(false);
  const interval = useRef(null);
  const fileUploadRef = useRef(null);
  const op1 = useRef(null);
  const [imageSize, setImageSize] = useState(0.5);
  const [imageRotation, setImageRotation] = useState();
  const [imageOutLineColor, setImageOutLineColor] = useState({
    id: 1,
    name: "white",
    color: "#FFFFFF",
  });
  const [imageOutline, setImageOutline] = useState(0);
  const onUpload = () => {
    console.log("upload complete");
    toast.current.show({
      severity: "info",
      summary: "Success",
      detail: "File Uploaded",
    });
  };

  useEffect(() => {
    if (totalSize > 0) {
      let val = totalSize / 10000;
      setProgressValue(totalSize / 10000);
      interval.current = setInterval(() => {
        val += Math.floor(Math.random() * 10) + 1;
        if (val >= 100) {
          val = 100;
          clearInterval(interval.current);
          setUploadComplete(true);
        }

        setProgressValue(val);
      }, 50);
    }
    return () => {
      if (interval.current) {
        clearInterval(interval.current);
        interval.current = null;
      }
    };
  }, [totalSize]);

  const headerTemplate = (options) => {
    const { className, chooseButton } = options;
    return (
      <Row className="upload-bx">
        {/* <Col xs={1}>
                 <div className="upload-icn"></div>
              </Col> */}
        <Col xs={11}>
          <strong className="upload-label">Drag & Drop file or</strong>
          {chooseButton}
        </Col>
      </Row>
    );
  };

  const changeShapeSize = (e) => {
    setImageSize(e.value);
    //  setShapeScale({x:scaleX, y: scaleY}, shape.id)
    updateKeyForImage({ x: e.value, y: e.value }, "scale");
  };
  const changeShapeRotation = (e) => {
    setImageRotation(e.value);
    updateKeyForImage(e.value, "imageRotation");
  };

  const chooseImageOutLineColor = (color) => {
    setImageOutLineColor(color);
    updateKeyForImage(color, "outLineColor");
  };

  const chooseImageOutLine = (e) => {
    setImageOutline(e.value);
    updateKeyForImage(e.value, "outline");
  };
  const updateKeyForImage = (value, key) => {
    console.log(uploadedImages);
    if (selectedId) {
      let index = uploadedImages.findIndex((shape) => shape.id === selectedId);
      uploadedImages[index][key] = value;
      updateImage(index, key, value);
    } else if (uploadedImages.length) {
      uploadedImages[uploadedImages.length - 1][key] = value;
      updateImage(uploadedImages.length - 1, key, value);
    }

    console.log(uploadedImages);
    // updateShape(uploadedImages)
    //  setuploadedImages(prevTexts => [...uploadedImages])
    //  setShapes(prevTexts => [...uploadedImages])
    // if(pickedShapeId)
    //setSelectedShapeForEdit(uploadedImages.filter(shape => shape.id === pickedShapeId)[0])
  };

  const removeFile = () => {
    console.log("remove");
    setUploadStart(false);
  };

  const onProgress = (e) => {
    console.log("progress");
  };

  const chooseOptions = {
    icon: "",
    label: "Browse",
    className: "p-button-rounded brws-btn p-button-outlined tee-btn-outlined",
    style: { display: uploadStart ? "none" : "inlineBlock" },
  };
  // const cancelOptions = {style:{display: 'none'}};
  // const uploadOptions = {style:{display: 'none'}};

  const fileHandler = (e) => {
    console.log(e);
    setUploadStart(true);
    let _totalSize = totalSize;
    e.files.forEach((file) => {
      _totalSize += file.size;
    });

    setTotalSize(_totalSize);
    setFile(e.files[0]);
    addImage({ src: e.files[0], id: uuidv4() });
  };

  return (
    <>
      {!uploadStart && (
        <Col xs={12} className="input-row">
          <div>
            <label>Choose a file to upload</label>
          </div>

          <FileUpload
            name="demo[]"
            // onSelect={onFileSelect}
            onRemove={removeFile}
            onUpload={onUpload}
            multiple={false}
            customUpload
            auto
            accept="image/*"
            maxFileSize={1000000}
            headerTemplate={""}
            onProgress={onProgress}
            chooseOptions={chooseOptions}
            emptyTemplate={headerTemplate}
            uploadHandler={fileHandler}
            ref={fileUploadRef}
          />
          <Col xs={12}>
            <div>
              {" "}
              <label>Max file upload size 5 MB</label>
            </div>
            <div>
              <label>We support</label>{" "}
              <span className="sprt-format">.JPEG</span>
              <span className="sprt-format">.PNG</span>
              <span className="sprt-format">.SVG</span>
            </div>
          </Col>
        </Col>
      )}

      {uploadStart && !uploadComplete && (
        <Col xs={12} className="progress-container">
          <Row>
            <div className="upload-icn"> </div>
          </Row>
          <Row className="progress-row">
            <ProgressBar
              value={progressValue}
              showValue={false}
              color="#FF6740"
              style={{ height: "2pt", width: "70%", margin: "auto" }}
            />
          </Row>
        </Col>
      )}
      {uploadComplete && (
        <Col xs={12}>
          <Row xs={12} className="img-preview-container">
            {console.log(file)}
            <img src={file.objectURL} />
          </Row>
          <Col xs={12} className="input-row">
            <label>Scale image</label>
            <span className="text-value">{imageSize}</span>
            <Slider
              value={imageSize}
              min={0}
              step={0.01}
              max={5}
              onChange={changeShapeSize}
            />
          </Col>
          <Col xs={12} className="input-row">
            <label>Rotation</label>
            <span className="text-value">{imageRotation}</span>
            <Slider
              min={0}
              value={imageRotation}
              onChange={changeShapeRotation}
            />
          </Col>
          <Col xs={12} className="input-row">
            <label>Outline</label>
            <span className="text-value">{imageOutline}</span>
            <Slider
              min={0}
              value={imageOutline}
              onChange={chooseImageOutLine}
            />
          </Col>
          <Col xs={5.5} className="input-row" style={{ padding: "1em" }}>
            <div>
              <label>Outline Color</label>
            </div>
            <div>
              <label style={{ width: "6em" }}>{imageOutLineColor.name}</label>{" "}
              <div
                className="xsm-box color-box"
                onClick={(e) => op1.current.toggle(e)}
                style={{
                  width: "20pt",
                  backgroundColor: imageOutLineColor.color,
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
                        onClick={() => chooseImageOutLineColor(color)}
                      >
                        {" "}
                      </div>
                    </Col>{" "}
                  </Row>
                );
              })}
            </OverlayPanel>
          </Col>
        </Col>
      )}
    </>
  );
}

function mapStateToProps(state) {
  return {
    uploadedImages: state.canvas.present.designConfig.images,
    selectedId: state.canvas.present.designConfig.selectedId,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    addImage: (img) => {
      dispatch({ type: actionTypes.ADD_IMAGE, payload: img });
    },
    updateImage: (index, key, value) => {
      dispatch({ type: actionTypes.UPDATE_IMAGE, value, index, key });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UploadComponent);

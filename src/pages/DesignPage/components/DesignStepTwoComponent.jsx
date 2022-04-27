import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { RadioButton } from "primereact/radiobutton";
import SvgColor from "react-svg-color";
import { useDispatch, useSelector } from "react-redux";

import { selectProductColorToDesign } from "../../../redux/design/designActions";
import white from "../../../assets/images/design/colors/white.svg";
import yellow from "../../../assets/images/design/colors/Yellow.svg";
import black from "../../../assets/images/design/colors/black.svg";
import grey from "../../../assets/images/design/colors/Grey.svg";
import red from "../../../assets/images/design/colors/Red.svg";
import green from "../../../assets/images/design/colors/Green.svg";
import blue from "../../../assets/images/design/colors/Blue.svg";
import pink from "../../../assets/images/design/colors/Pink.svg";

const colors = [
  { id: 1, label: "White", img: white, value: "#D9D9D9" },
  { id: 2, label: "Black", img: black, value: "#000000" },
  { id: 3, label: "Grey", img: grey, value: "#9B9B9B" },
  { id: 4, label: "Blue", img: blue, value: "#0074D9" },
  { id: 5, label: "Red", img: red, value: "#FF2B4D" },
  { id: 6, label: "Green", img: green, value: "#00AB85" },
  { id: 7, label: "Yellow", img: yellow, value: "#FFC100" },
  { id: 8, label: "Pink", img: pink, value: "#FD5D85" },
];

export default function DesignStepTwoComponent(props) {
  const [filterValue, setFilterValue] = useState(0);
  const [productColor, setProductColor] = useState([]);
  const { product } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    setProductColor([
      product.color,
      product.color,
      product.color,
      product.color,
      product.color,
      product.color,
      product.color,
    ]);
  }, [product]);

  const selectColor = (color) => {
    dispatch(selectProductColorToDesign(color));
  };
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

  return (
    <>
      <Col xs={2} className="filter d-none d-xl-block">
        {/* <h5>Filter</h5>
                <div className="p-field-radiobutton">
                    <RadioButton inputId="city1" name="filterValue" value="Men" onChange={(e) => setFilterValue(e.value)} checked={filterValue === 'Men'} />
                    <label htmlFor="city1">Men</label>
                </div>
                <div className="p-field-radiobutton">
                    <RadioButton inputId="city2" name="filterValue" value="Women" onChange={(e) => setFilterValue(e.value)} checked={filterValue === 'Women'} />
                    <label htmlFor="city2">Women</label>
                </div>
                <div className="p-field-radiobutton">
                    <RadioButton inputId="city3" name="filterValue" value="Boys" onChange={(e) => setFilterValue(e.value)} checked={filterValue === 'Boys'} />
                    <label htmlFor="city3">Boys</label>
                 </div>
                 <div className="p-field-radiobutton">
                    <RadioButton inputId="city4" name="filterValue" value="Girls" onChange={(e) => setFilterValue(e.value)} checked={filterValue === 'Girls'} />
                    <label htmlFor="city4">Girls</label>
                  </div> */}
      </Col>
      <Col xs={12} md={6} xl={4}>
        <div
          className="produxt-img-wrap"
          style={{ backgroundColor: "#F5F5F5" }}
        >
          <SvgColor svg={product.img} width={200} colors={productColor} />
        </div>
        <div className="product-info">
          <strong>{product.name}</strong>
          <p>AED {product.price}</p>
        </div>
      </Col>
      <Col xs={12} md={6}>
        <Row className="color-wrap">
          {colors.map((color) => (
            <Col xs={3} key={color.id}>
              <div
                className={
                  "clr-bx " + (color.value == product.color ? "selected" : "")
                }
                onClick={() => selectColor(color.value)}
              >
                <img src={color.img} alt="" />
              </div>{" "}
              <p>{color.label}</p>{" "}
            </Col>
          ))}
        </Row>
      </Col>
    </>
  );
}

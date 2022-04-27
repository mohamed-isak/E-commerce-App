/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";

import { addSizeNumber } from "../../../redux/design/designActions";

const products = [
  { qty: 50, uPrice: "AED 15.00", tPrice: "AED 750.00", save: "AED 150.00" },
  { qty: 100, uPrice: "AED 13.00", tPrice: "AED 1300.00", save: "AED 500.00" },
  { qty: 500, uPrice: "AED 05.00", tPrice: "AED 2500.00", save: "AED 1500.00" },
];

const sizes = [
  { size: "S", chest: 38.0, length: 27.0, shoulder: 17.0 },
  { size: "M", chest: 40.0, length: 28.0, shoulder: 18.0 },
  { size: "L", chest: 42.5, length: 29.0, shoulder: 19.0 },
  { size: "XL", chest: 45.0, length: 30.0, shoulder: 20.0 },
  { size: "XLL", chest: 47.5, length: 31.0, shoulder: 21.0 },
];

function SelectQuantityComponent({ selectedProduct, updateSizeQty }) {
  const [displaySizeChart, setDisplaySizeChart] = useState(false);
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
      <Row className="step4-row mt-4 mb-4">
        <Col xs={12} md={5} lg={4}>
          <div className="step4-left box">
            <div className="product-icn">
              <img src={selectedProduct.designedImg} width="300pt" />
            </div>
          </div>
        </Col>
        <Col xs={12} md={7} lg={8}>
          <div className="step4-right box mt-4 mt-md-0">
            <div className="step4-right-body">
              <div>
                {" "}
                <strong>Round Neck T-shirt (Black)</strong>
              </div>
              <div className="input-row size-label">
                <label>Size</label>{" "}
                <span
                  className="size-chart-lbl"
                  onClick={() => setDisplaySizeChart(true)}
                >
                  {" "}
                  Size-Chart
                </span>
              </div>
              <div className="size-container">
                <Col xs={2}>
                  <div className="size-txt">
                    <strong>S</strong>
                  </div>
                  <div>
                    <input
                      type="text"
                      value={selectedProduct.qty && selectedProduct.qty.s}
                      onChange={(e) => updateSizeQty(e.target.value, "s")}
                    />
                  </div>
                  <div className="stock-txt-box">Stock : 1000</div>
                </Col>
                <Col xs={2}>
                  <div className="size-txt">
                    <strong>M</strong>
                  </div>
                  <div>
                    <input
                      type="text"
                      value={selectedProduct.qty && selectedProduct.qty.m}
                      onChange={(e) => updateSizeQty(e.target.value, "m")}
                    />
                  </div>
                  <div className="stock-txt-box">Stock : 1000</div>
                </Col>
                <Col xs={2}>
                  <div className="size-txt">
                    <strong>L</strong>
                  </div>
                  <div>
                    <input
                      type="text"
                      value={selectedProduct.qty && selectedProduct.qty.l}
                      onChange={(e) => updateSizeQty(e.target.value, "l")}
                    />
                  </div>
                  <div className="stock-txt-box">Stock : 1000</div>
                </Col>
                <Col xs={2}>
                  <div className="size-txt">
                    <strong>XL</strong>
                  </div>
                  <div>
                    <input
                      type="text"
                      value={selectedProduct.qty && selectedProduct.qty.xl}
                      onChange={(e) => updateSizeQty(e.target.value, "xl")}
                    />
                  </div>
                  <div className="stock-txt-box">Stock : 1000</div>
                </Col>
                <Col xs={2}>
                  <div className="size-txt">
                    <strong>XXL</strong>
                  </div>
                  <div>
                    <input
                      type="text"
                      value={selectedProduct.qty && selectedProduct.qty.xxl}
                      onChange={(e) => updateSizeQty(e.target.value, "xxl")}
                    />
                  </div>
                  <div className="stock-txt-box">Stock : 1000</div>
                </Col>
              </div>
              <div className="product-list-table ">
                <DataTable
                  value={products}
                  bodyClassName="product-list thin-scroll"
                >
                  <Column field="qty" header="Qty"></Column>
                  <Column field="uPrice" header="Unit price"></Column>
                  <Column field="tPrice" header="Total price"></Column>
                  <Column field="save" header="Save"></Column>
                </DataTable>
              </div>
              <div className="pduct-footer">
                <div>AED 15.00 each</div>
                <div>
                  <strong>AED 3000 / 200 pieces</strong>
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Dialog
          header="Size Chart"
          visible={displaySizeChart}
          style={{ width: "50vw" }}
          onHide={() => setDisplaySizeChart(false)}
        >
          <DataTable
            value={sizes}
            bodyClassName="product-list thin-scroll"
            headerClassName="size-chart-table-hdr"
          >
            <Column field="size" header="Size"></Column>
            <Column field="chest" header="Chest(In)"></Column>
            <Column field="length" header="Length(In)"></Column>
            <Column field="shoulder" header="Across Shoulder(In)"></Column>
          </DataTable>
        </Dialog>
      </Row>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    selectedProduct: state.design.selectedProduct,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateSizeQty: (value, key) => {
      dispatch({ type: "UPDATE_SIZE_QTY", payload: { value, key } });
      console.log("ownProps", ownProps);
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectQuantityComponent);

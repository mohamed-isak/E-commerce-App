/* eslint-disable no-unused-vars */
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Button } from "primereact/button";

export default function StyleCategoryComponent({ img, fits, title }) {
  return (
    <Row className="fit-item">
      <Col sm={5}>
        <div className="d-flex d-sm-block justify-content-between">
          <div>
            <h6>
              <strong>{title}</strong>
            </h6>
            <ul>
              {fits.map((item) => (
                <li key={item.id}> {item.name}</li>
              ))}
            </ul>
          </div>
          <Button
            label="Browse"
            className="p-button-rounded p-button-outlined tee-btn-outlined"
          />
        </div>
      </Col>
      <Col sm={7}>
        <img src={img} alt="" width="250" />
      </Col>
    </Row>
  );
}

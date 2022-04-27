import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
import { TabView, TabPanel } from "primereact/tabview";
import { useDispatch, useSelector } from "react-redux";
import ItemListComponent from "./ItemListComponent";
import DesignStepTwoComponent from "./DesignStepTwoComponent";
import roundNeck from "../../../assets/images/design/round neck-men.svg";
import poloNeck from "../../../assets/images/design/Polo neck-Men.svg";
import hoodie from "../../../assets/images/design/Hoodie-men.svg";
import cap from "../../../assets/images/design/cap-1.svg";
import cargoPant from "../../../assets/images/design/cargo pant-men.svg";
import clothBag from "../../../assets/images/design/cloth bag.svg";
import shortsMen from "../../../assets/images/design/shorts-men.svg";
import roundNeckWomen from "../../../assets/images/design/round neck - women.svg";
import poloNeckWomen from "../../../assets/images/design/polo neck-women.svg";
import hoodieWomen from "../../../assets/images/design/hoodie-women.svg";
import cargoPantWomen from "../../../assets/images/design/cargo pant-women.svg";
import shortsWomen from "../../../assets/images/design/shots-women.svg";
import roundNeckKids from "../../../assets/images/design/round neck-boys.svg";
import poloNeckids from "../../../assets/images/design/Polo neck-boys.svg";
import capKids from "../../../assets/images/design/cap-kids.svg";
import shortsUnisex from "../../../assets/images/design/shots-unisex.svg";
import poloneckGirls from "../../../assets/images/design/polo neck-girls.svg";
import DesignStepThreeComponent from "./DesignStepThreeComponent";
import SelectQuantityComponent from "./SelectQuantityComponent";
import DesignCheckoutComponent from "./DesignCheckoutComponent";

const womenItems = [
  {
    id: 1,
    name: "Round Neck T-shirt",
    price: 15,
    img: roundNeckWomen,
    color: "#F5F5F5",
  },
  {
    id: 2,
    name: "Polo Neck T-shirt",
    price: 15,
    img: poloNeckWomen,
    color: "#FAF1E2",
  },
  { id: 3, name: "hoodie", price: 15, img: hoodieWomen, color: "#ECE7F7" },
  { id: 4, name: "Cap", price: 15, img: cap, color: "#EFF9E5" },
  {
    id: 5,
    name: "Cargo Pant",
    price: 15,
    img: cargoPantWomen,
    color: "#EFF9E5",
  },
  { id: 7, name: "Shorts", price: 15, img: shortsWomen, color: "#FAF1E2" },
];

const allItems = [
  {
    id: 1,
    name: "Round Neck T-shirt",
    price: 15,
    img: roundNeck,
    color: "#F5F5F5",
  },
  {
    id: 2,
    name: "Polo Neck T-shirt",
    price: 15,
    img: poloNeck,
    color: "#FAF1E2",
  },
  { id: 3, name: "hoodie", price: 15, img: hoodie, color: "#ECE7F7" },
  { id: 4, name: "Cap", price: 15, img: cap, color: "#EFF9E5" },
  { id: 5, name: "Cargo Pant", price: 15, img: cargoPant, color: "#EFF9E5" },
  { id: 6, name: "Cloth Bag", price: 15, img: clothBag, color: "#ECE7F7" },
  { id: 7, name: "Shorts", price: 15, img: shortsMen, color: "#FAF1E2" },
];

const kidstems = [
  {
    id: 1,
    name: "Round Neck T-shirt (Boys)",
    price: 15,
    img: roundNeckKids,
    color: "#F5F5F5",
  },
  {
    id: 2,
    name: "Polo Neck T-shirt (Boys)",
    price: 15,
    img: poloNeckids,
    color: "#FAF1E2",
  },
  {
    id: 3,
    name: "Polo Neck T-shirt (Girls)",
    price: 15,
    img: poloneckGirls,
    color: "#ECE7F7",
  },
  { id: 4, name: "Cap", price: 15, img: capKids, color: "#EFF9E5" },
  {
    id: 6,
    name: "Shorts (Unisex)",
    price: 15,
    img: shortsUnisex,
    color: "#ECE7F7",
  },
];

const accessories = [
  { id: 6, name: "Cloth Bag", price: 15, img: clothBag, color: "#ECE7F7" },
];
const mapState = (state) => ({
  product: state.design.selectedProduct,
  step: state.design.designStep,
});

const DesignContainerComponent = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { product, step } = useSelector(mapState);

  console.log("step", step);
  return (
    <Row className="design-container">
      {(step === 1 || step === 2) && (
        <Container>
          {step === 1 && (
            <TabView
              activeIndex={activeIndex}
              onTabChange={(e) => setActiveIndex(e.index)}
              className="apparel-tab"
            >
              <TabPanel header="All styles">
                <ItemListComponent items={allItems} />
              </TabPanel>
              <TabPanel header="Men’s apparel">
                <ItemListComponent
                  items={allItems.filter((item) => item.id !== 6)}
                />
              </TabPanel>
              <TabPanel header="Women’s apparel">
                <ItemListComponent items={womenItems} />
              </TabPanel>
              <TabPanel header="Kids’s apparel">
                <ItemListComponent items={kidstems} />
              </TabPanel>
              <TabPanel header="Accessories">
                <ItemListComponent items={accessories} />
              </TabPanel>
            </TabView>
          )}
          {step === 2 && (
            <Row className="step2-row">
              <DesignStepTwoComponent product={product} />
            </Row>
          )}
        </Container>
      )}
      {step === 3 && <DesignStepThreeComponent product={product} />}
      {step === 4 && <SelectQuantityComponent />}
      {step === 5 && <DesignCheckoutComponent />}
    </Row>
  );
};

export default DesignContainerComponent;

import React from "react";

function CatalogComponent(props) {
  const { src, text, width } = props;
  return (
    <div className="catalog-container">
      <img src={src} alt="" width={width}></img>
      <div className="catlog-text">
        <strong>{text}</strong>
      </div>
    </div>
  );
}

export default CatalogComponent;

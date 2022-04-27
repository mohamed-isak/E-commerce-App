import React from "react";

export default function InfoBox(props) {
  const { primaryIcon, secondaryIcon, title, description } = props;
  return (
    <div className="infobox-container" style={conatinerStyle}>
      <img src={primaryIcon} alt="" width="140" height="140" />
      <img src={secondaryIcon} alt="" width="44" height="44" />
      <strong>{title}</strong>
      <p>{description}</p>
    </div>
  );
}

const conatinerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  textAlign: "center",
};

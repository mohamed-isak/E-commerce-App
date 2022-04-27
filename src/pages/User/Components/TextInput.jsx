/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { useForm, Controller } from "react-hook-form";

export default function TextInput(props) {
  return (
    <div className="p-field">
      <span className="p-float-label">
        <InputText
          key={"in" + props.name}
          value={props.value}
          onChange={(e) => props.setValue(e.target.value)}
        />
        <label htmlFor={props.name}>{props.label}</label>
      </span>
    </div>
  );
}

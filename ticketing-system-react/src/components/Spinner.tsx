import React from "react";
import { useState } from "react";
// import { jsx, css, ClassNames} from "@emotion/react";
import { css } from "@emotion/css";
import ClipLoader from "react-spinners/ClipLoader";
import { RotateLoader } from "react-spinners";
import "../assets/styles/Loader.css";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  margin-top: 300px;
`;

type SpinnerProps = {
  crl: string;
  loading: boolean;
};

const Spinner = ({ crl, loading }: SpinnerProps) => {
  let [color, setColor] = useState("#ffffff");
  return (
    <div className="lds-spinner">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Spinner;

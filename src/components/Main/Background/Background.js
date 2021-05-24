import React from "react";
import "./base.scss";
import backgoundImage from "../../../resources/images/background_big.jpg";
import backgoundImageMobile from "../../../resources/images/background_mobile.jpg";

const Background = (props) => {
  return (
    <img
      className={props.isMobile ? "backgroundImageMobile" : "backgroundImage"}
      src={props.isMobile ? backgoundImageMobile : backgoundImage}
      alt={"background"}
    />
  );
};

export default Background;

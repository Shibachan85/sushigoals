import React, { useState, useEffect } from "react";
import "./base.scss";
//import HeaderLogo from "../../../resources/images/header.png";
import HeaderLogo from "../../../resources/images/header_sushi_guild.png";

const MOBILE_HEADER_STICKY_POSITION = 80;
const RELATIVE_TOP = 10;

const Header = (props) => {
  const [isSticky, setIsSticky] = useState(true);

  const handleLoad = (e) => {
    const { name } = e.target;
    props.setLoadingState({ ...props.loadingState, [name]: true });
  };

  useEffect(() => {
    window.onscroll = () => {
      if (
        (window.pageYOffset || document.documentElement.scrollTop) >=
          MOBILE_HEADER_STICKY_POSITION &&
        isSticky
      ) {
        setIsSticky(false);
      } else if (
        (window.pageYOffset || document.documentElement.scrollTop) <
          MOBILE_HEADER_STICKY_POSITION &&
        !isSticky
      ) {
        setIsSticky(true);
      }
    };
  }, [isSticky]);

  const positionStyle = {
    position: isSticky ? "sticky" : "relative",
    top: isSticky
      ? `${RELATIVE_TOP}px`
      : `${MOBILE_HEADER_STICKY_POSITION + RELATIVE_TOP}px`,
  };

  return (
    <div className={"siteHeader"} style={positionStyle}>
      <img name={"logo"} src={HeaderLogo} onLoad={handleLoad} alt={"header"} />
      <span className={"headerLine"} />
      <h3 className={"headerText"}>Vault achievement</h3>
    </div>
  );
};

export default Header;

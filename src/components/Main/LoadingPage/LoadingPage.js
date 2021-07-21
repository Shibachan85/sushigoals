import classNames from "classnames";
import { useEffect } from "react";
import Firefly from "../Firefly/Firefly";
import "./base.scss";

const body = document.body;
const NO_SCROLL = "no-scroll";

const LoadingPage = (props) => {
  useEffect(() => {
    body.classList.add(NO_SCROLL);
    return () => {
      body.classList.remove(NO_SCROLL);
    };
  }, []);

  return (
    <div
      className={classNames("loadingPageContainer", {
        unmount_loadingScreen: props.unmountLoadingScreen,
      })}
    >
      <Firefly amount={10} />
      <svg width="0" height="0">
        <filter id="gooey-black-hole">
          <feGaussianBlur in="SourceGraphic" stdDeviation="20" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 50 -16"
            result="goo"
          />
        </filter>
      </svg>
      <div className="black-hole">
        <ul className="gooey-container">
          <li className="bubble"></li>
          <li className="bubble"></li>
          <li className="bubble"></li>
          <li className="bubble"></li>
          <li className="bubble"></li>
          <li className="bubble"></li>
        </ul>
      </div>
      <h3 className={"loadingTitle"}>Preparing sushi rolls</h3>
    </div>
  );
};

export default LoadingPage;

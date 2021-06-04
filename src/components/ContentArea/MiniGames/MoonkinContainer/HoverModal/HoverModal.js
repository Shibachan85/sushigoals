import "./base.scss";
import {
  X_MODIFIER,
  Y_MODIFIER,
} from "../../../../../utilities/customfunctions";
import { useEffect, useState } from "react";

const HoverModal = (props) => {
  const [state, setState] = useState(false);

  useEffect(() => {
    setState(true);
    // if (props.crumbsClicked) {
    //   //setState(true);
    //   setTimeout(() => {
    //     setState(true);
    //   }, 2000);
    // }
  }, [props.crumbsClicked]);

  const percentifyCoord = (coord, modifier) => {
    return (coord / modifier) * 100;
  };

  const style = {
    left: `${percentifyCoord(props.data.x, X_MODIFIER)}%`,
    top: `${percentifyCoord(props.data.y, Y_MODIFIER)}%`,
  };

  return (
    <>
      {props.crumbsClicked || props.showChatBox ? (
        state ? (
          <div className={"moonkinChatBox"} style={style}>
            <p>{props.data.msg}</p>
          </div>
        ) : null
      ) : (
        <div className={"hoverModal"} style={style}>
          <p>{props.data.msg}</p>
        </div>
      )}
    </>
  );
};

export default HoverModal;

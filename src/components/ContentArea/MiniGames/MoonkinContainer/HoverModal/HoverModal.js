import "./base.scss";
import {
  X_MODIFIER,
  Y_MODIFIER,
} from "../../../../../utilities/customfunctions";
import { useEffect, useState } from "react";

const HoverModal = (props) => {
  const [state, setState] = useState(false);

  useEffect(() => {
    if (props.showMoonkinChatBox) {
      setTimeout(() => {
        setState(true);
        setTimeout(() => {
          setState(false);
        }, 2000);
      }, 3500);
    }
  }, [props.showMoonkinChatBox]);

  const percentifyCoord = (coord, modifier) => {
    return (coord / modifier) * 100;
  };

  const style = {
    left: `${percentifyCoord(props.data.x, X_MODIFIER)}%`,
    top: `${percentifyCoord(props.data.y, Y_MODIFIER)}%`,
  };

  console.log(style);

  return (
    <>
      {props.showMoonkinChatBox ? (
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

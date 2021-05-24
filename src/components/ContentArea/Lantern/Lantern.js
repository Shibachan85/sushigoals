import "./base.scss";
import { X_MODIFIER, Y_MODIFIER } from "../../../utilities/customfunctions";

const Lantern = (props) => {
  const percentifyCoord = (coord, modifier) => {
    return (coord / modifier) * 100;
  };

  const style = {
    left: `${percentifyCoord(props.lantern.x, X_MODIFIER)}%`,
    top: `${percentifyCoord(props.lantern.y, Y_MODIFIER)}%`,
    animationDelay: `${props.lantern.delay}s`,
    boxShadow: `0px 0px ${props.lantern.size}px ${props.lantern.size}px rgba(255, 154, 255, 0.99)`,
  };
  return (
    <>
      <div className={"lantern"} style={style} />
    </>
  );
};

export default Lantern;

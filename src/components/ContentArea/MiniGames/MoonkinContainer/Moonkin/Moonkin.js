import "./base.scss";
import classnames from "classnames";

const Moonkin = (props) => {
  return (
    <img
      className={classnames("moonkin__image", {
        unmountMoonkin: props.unmountMoonkin,
      })}
      //style={props.style}
      src={props.moonkin.image}
      alt={"moonkin"}
    />
  );
};

export default Moonkin;

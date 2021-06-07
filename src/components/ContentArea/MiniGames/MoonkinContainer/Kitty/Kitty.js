import "./base.scss";
import classnames from "classnames";

const Kitty = (props) => {
  return (
    <div
      className={classnames("kittyContainer", "mount_kitty", {
        unmountKitty: props.unmountKitty,
      })}
    >
      {props.kittyImgJSX}
    </div>
  );
};

export default Kitty;

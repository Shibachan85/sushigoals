import "./base.scss";
import KittyCat from "../../../../../resources/images/kitty_small.png";
import classnames from "classnames";

const Kitty = (props) => {
  return (
    <div
      className={classnames("kittyContainer", {
        unmountKitty: props.unmountKitty,
      })}
    >
      <img src={KittyCat} alt={"KittyCat"} />
    </div>
  );
};

export default Kitty;

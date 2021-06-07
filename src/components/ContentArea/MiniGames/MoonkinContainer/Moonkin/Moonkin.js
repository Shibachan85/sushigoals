import "./base.scss";
import classnames from "classnames";

const Moonkin = (props) => {
  return (
    <div
      className={classnames("moonkinContainer__moonkin", "mount_moonkin", {
        unmount_moonkin: props.unmountMoonkin,
      })}
    >
      {props.children}
    </div>
  );
};

export default Moonkin;

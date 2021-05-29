import "./base.scss";
import classnames from "classnames";

const Spinner = (props) => {
  return <div className={classnames("loader", { small: props.small })} />;
};

export default Spinner;

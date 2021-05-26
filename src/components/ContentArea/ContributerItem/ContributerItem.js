import "./base.scss";
import classnames from "classnames";

const ContributerItem = (props) => {
  return (
    <div
      className={classnames("contributerItem", {
        contributerItem__achievement: props.isAchievement,
      })}
    >
      <p>{props.content}</p>
    </div>
  );
};

export default ContributerItem;

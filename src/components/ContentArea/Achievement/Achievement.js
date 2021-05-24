import React, { useEffect, useState } from "react";
import "./base.scss";
import classnames from "classnames";

const Achievement = (props) => {
  const [goalIsReached, setGoalIsReached] = useState(false);

  useEffect(() => {
    if (props.currentGold >= props.goldTarget) {
      setGoalIsReached(true);
    } else {
      goalIsReached && setGoalIsReached(false);
    }
  }, [props.currentGold, goalIsReached, props.goldTarget]);

  const bottom = `${props.bottom}px`;

  return (
    <div className={"achievementMeasureContainer"} style={{ bottom: bottom }}>
      <p
        className={classnames("achievementText", {
          completedText: goalIsReached,
        })}
      >
        {props.title} TAB {props.amount}G
      </p>
      <div
        className={classnames("achievementLine", {
          completedLine: goalIsReached,
        })}
      ></div>
    </div>
  );
};

export default Achievement;

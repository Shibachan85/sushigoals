import React, { useEffect, useState, useRef } from "react";
import "./base.scss";
import classnames from "classnames";

const Achievement = (props) => {
  const [goalIsReached, setGoalIsReached] = useState(false);
  const refNode = useRef(null);

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
        style={{ animationDelay: `${props.animationDelay + 0.35}s` }}
      >
        {props.title} TAB {props.amount}G
      </p>
      <div
        ref={refNode}
        className={classnames("achievementLine", {
          completedLine: goalIsReached,
        })}
        style={{
          animationDelay: props.animationDelay + "s",
          width: `${props.widthMultiplier}px`,
        }}
      ></div>
    </div>
  );
};

export default Achievement;

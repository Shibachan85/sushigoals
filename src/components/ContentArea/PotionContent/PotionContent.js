import classNames from "classnames";
import React, { useRef, useEffect, useState, useCallback } from "react";
import "./base.scss";

const MIN = 0;

const PotionContent = (props) => {
  const contentNode = useRef(null);
  const [radius, setRadius] = useState(3);

  const checkHeight = useCallback(
    (height) => {
      if (height > props.max) {
        return props.max;
      } else if (height < MIN) {
        return MIN;
      }
      return height;
    },
    [props.max]
  );

  const calculateRadius = useCallback(
    (value) => {
      if (value > 269) {
        setRadius(70);
      } else if (value > 265 && value <= 269) {
        setRadius(65);
      } else if (value <= 265 && value > 260) {
        setRadius(55);
      } else if (value <= 260 && value > 250) {
        setRadius((value - 200) / 2);
      } else if (value <= 250 && value > 244) {
        setRadius(18);
      } else if (value <= 244 && value > 240) {
        setRadius(15);
      } else {
        setRadius(3);
      }

      const validValue = checkHeight(value);
      return `${validValue}px`;
    },
    [checkHeight]
  );

  useEffect(() => {
    contentNode.current.style.height = calculateRadius(props.height);
  }, [props.height, calculateRadius]);

  const newRadius = `${radius}px ${radius}px 10px 10px`;

  return (
    <>
      {/* <h4>Radius: {radius}</h4>
      <h4>Height: {height}</h4> */}
      <div
        className={classNames("potionContent", {
          mount_potionContent: props.showAchievement,
        })}
        ref={contentNode}
        style={{ opacity: props.opacity, borderRadius: newRadius }}
      />
    </>
  );
};

export default PotionContent;

import React, { useEffect, useState } from "react";
import "./base.scss";
import Potion from "../Potion/Potion";
import Achievement from "../Achievement/Achievement";
import {
  MAX_HEIGHT,
  MAX_GOLD,
  BOTTOM_PADDING,
  LINE_HEIGHT,
  INTERVAL_GOLD,
  INTERVAL_VALUE,
  INTERVAL_TITLE,
  LINE_ADJUSTMENT,
  POTION_PIXEL_TARGETS,
  MAX_GOLD_POTION_CAN_HOLD,
} from "../../../utilities/customfunctions";
import classNames from "classnames";

const AchievementContainer = (props) => {
  const [currentHeight, setCurrentHeight] = useState(0);

  useEffect(() => {
    let result =
      calculateGoldPerPixel() * props.currentGold +
      achievementModifier(props.currentGold);
    if (result < 1 && result > 0) {
      result = 1;
    } else {
      result = Math.floor(result);
    }

    result = keepOnePixel(props.currentGold, result);

    setCurrentHeight(result);
  }, [props.currentGold]);

  const keepOnePixel = (gold, pixel) => {
    if (
      (gold < INTERVAL_GOLD.first && pixel === POTION_PIXEL_TARGETS.first) ||
      (gold < INTERVAL_GOLD.second && pixel === POTION_PIXEL_TARGETS.second) ||
      (gold < INTERVAL_GOLD.third && pixel === POTION_PIXEL_TARGETS.third) ||
      (gold < INTERVAL_GOLD.fourth && pixel === POTION_PIXEL_TARGETS.fourth) ||
      (gold < INTERVAL_GOLD.fifth && pixel === POTION_PIXEL_TARGETS.fifth) ||
      (gold < INTERVAL_GOLD.sixth && pixel === POTION_PIXEL_TARGETS.sixth)
    ) {
      return pixel - 1;
    }
    return pixel;
  };

  const calculateGoldPerPixel = () => {
    const result = MAX_HEIGHT / MAX_GOLD;
    return result;
  };

  const achievementModifier = (gold) => {
    if (gold <= INTERVAL_GOLD.first) {
      const multiplier = gold / INTERVAL_GOLD.first;
      const adjustment = multiplier * (LINE_ADJUSTMENT.first + 1);
      return adjustment;
    } else if (gold > INTERVAL_GOLD.first && gold <= INTERVAL_GOLD.second) {
      const multiplier = (gold - INTERVAL_VALUE.first) / INTERVAL_VALUE.second;
      const adjustment = multiplier * LINE_ADJUSTMENT.second;
      const deMultiplier = (1 - multiplier) * LINE_ADJUSTMENT.first;
      return adjustment + deMultiplier;
    } else if (gold > INTERVAL_GOLD.second && gold <= INTERVAL_GOLD.third) {
      const multiplier = (gold - INTERVAL_GOLD.second) / INTERVAL_GOLD.third;
      const adjustment = multiplier * (LINE_ADJUSTMENT.third + 14);
      const deMultiplier = (1 - multiplier) * LINE_ADJUSTMENT.second;
      return adjustment + deMultiplier;
    } else if (gold > INTERVAL_GOLD.third && gold <= INTERVAL_GOLD.fourth) {
      const multiplier = (gold - INTERVAL_GOLD.third) / INTERVAL_GOLD.fourth;
      const adjustment = multiplier * (LINE_ADJUSTMENT.fourth + 9);
      const deMultiplier = (1 - multiplier) * LINE_ADJUSTMENT.third;
      return adjustment + deMultiplier;
    } else if (gold > INTERVAL_GOLD.fourth && gold <= INTERVAL_GOLD.fifth) {
      const multiplier = (gold - INTERVAL_GOLD.fourth) / INTERVAL_GOLD.fifth;
      const adjustment = multiplier * (LINE_ADJUSTMENT.fifth - 7);
      const deMultiplier = (1 - multiplier) * LINE_ADJUSTMENT.fourth;
      return adjustment + deMultiplier;
    } else if (gold > INTERVAL_GOLD.fifth && gold <= INTERVAL_GOLD.sixth) {
      const multiplier = (gold - INTERVAL_GOLD.fifth) / INTERVAL_GOLD.sixth;
      const adjustment = multiplier * (LINE_ADJUSTMENT.sixth - 60);
      const deMultiplier = (1 - multiplier) * LINE_ADJUSTMENT.fifth;
      return adjustment + deMultiplier;
    } else if (gold >= INTERVAL_GOLD.sixth) {
      const multiplier =
        (gold - INTERVAL_GOLD.sixth) / MAX_GOLD_POTION_CAN_HOLD;
      const adjustment = multiplier * (LINE_ADJUSTMENT.sixth - 60);
      const deMultiplier = (1 - multiplier) * LINE_ADJUSTMENT.sixth;
      return adjustment + deMultiplier;
    } else {
      console.error("FAILED TO PROCESS ACHIEVEMENT MODIFIER");
      return 0;
    }
  };

  const setLevel = (value, adjustment) => {
    const level =
      BOTTOM_PADDING +
      (MAX_HEIGHT / MAX_GOLD) * value +
      adjustment -
      LINE_HEIGHT;
    const rounded = Math.round(level);
    return rounded;
  };

  const generateGoals = () => {
    const goals = [];
    let count = 0;

    for (const key in INTERVAL_GOLD) {
      goals.push(
        <Achievement
          key={key + INTERVAL_GOLD[key]}
          bottom={setLevel(INTERVAL_GOLD[key], LINE_ADJUSTMENT[key])}
          amount={INTERVAL_GOLD[key]}
          title={INTERVAL_TITLE[key]}
          currentGold={props.currentGold}
          goldTarget={INTERVAL_GOLD[key]}
          animationDelay={0.2 * count}
          widthMultiplier={282 * (0.525 + 0.08 * count)}
        />
      );
      count++;
    }
    return goals;
  };

  // const vw = Math.max(
  //   document.documentElement.clientWidth || 0,
  //   window.innerWidth || 0
  // );
  // const vh = Math.max(
  //   document.documentElement.clientHeight || 0,
  //   window.innerHeight || 0
  // );

  //const style = {transform: `scale(${v})`}

  return (
    <>
      {!props.showAchievement && <div className={"initialAchievement"} />}
      <div
        className={classNames("achievementContainer", {
          showAchievement: props.showAchievement,
          moveToSide: props.showDeathRoll,
        })}
      >
        <Potion
          height={currentHeight}
          max={MAX_HEIGHT}
          loadingState={props.loadingState}
          setLoadingState={props.setLoadingState}
          showAchievement={props.showAchievement}
        />
        {generateGoals()}
      </div>
    </>
  );
};

export default AchievementContainer;

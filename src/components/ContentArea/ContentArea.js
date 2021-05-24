import React, { useState } from "react";
import { CONTRIBUTERS } from "../../utilities/customfunctions";
import AchievementContainer from "./AchievementContainer/AchievementContainer";
import AdminArea from "./Admin/AdminArea";
import ContributersContainer from "./ContributersContainer/ContributersContainer";
import LanternController from "./LanternController/LanternController";
import Summery from "./Summery/Summery";
import "./base.scss";

const ContentArea = (props) => {
  const [currentGold, setCurrentGold] = useState(0);
  return (
    <div className={"contentArea"}>
      <AdminArea />
      <AchievementContainer
        currentGold={currentGold}
        setCurrentGold={setCurrentGold}
      />
      <Summery currentGold={currentGold} />
      <ContributersContainer contributers={CONTRIBUTERS} />
      {!props.isMobile && <LanternController />}
    </div>
  );
};

export default ContentArea;

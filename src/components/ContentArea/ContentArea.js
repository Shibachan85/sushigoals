import React, { useEffect, useState } from "react";
//import { CONTRIBUTERS } from "../../utilities/customfunctions";
import AchievementContainer from "./AchievementContainer/AchievementContainer";
import AdminArea from "./Admin/AdminArea";
import ContributersContainer from "./ContributersContainer/ContributersContainer";
import LanternController from "./LanternController/LanternController";
import Summery from "./Summery/Summery";
import "./base.scss";
import LoginModal from "./LoginModal/LoginModal";
import DonationForm from "./DonationForm/DonationForm";

const ContentArea = (props) => {
  const [currentGold, setCurrentGold] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);
  const [userData, setUserData] = useState({});
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (props.data.length > 0) {
      const sushiFortune = props.data.reduce((acc, curr) => {
        return acc + curr.gold;
      }, 0);
      setCurrentGold(sushiFortune);
    }
  }, [props.data]);

  return (
    <div className={"contentArea"}>
      <AdminArea isOpen={isOpen} setIsOpen={setIsOpen} />
      <AchievementContainer
        currentGold={currentGold}
        setCurrentGold={setCurrentGold}
      />
      <Summery currentGold={currentGold} isPending={props.isPending} />
      <ContributersContainer data={props.data} isPending={props.isPending} />
      {!props.isMobile && <LanternController />}
      {isOpen && !isAuthed && (
        <LoginModal
          setUserData={setUserData}
          setIsAuthed={setIsAuthed}
          setToken={setToken}
        />
      )}
      {isAuthed && <DonationForm userData={userData} token={token} />}
    </div>
  );
};

export default ContentArea;

import React, { useEffect, useState } from "react";
import AchievementContainer from "./AchievementContainer/AchievementContainer";
import AdminArea from "./Admin/AdminArea";
import ContributersContainer from "./ContributersContainer/ContributersContainer";
import LanternController from "./LanternController/LanternController";
import Summery from "./Summery/Summery";
import "./base.scss";
import LoginModal from "./LoginModal/LoginModal";
import DonationForm from "./DonationForm/DonationForm";
import { useCurrentUser } from "../../utilities/Context/CurrentUser/CurrentUser";
import { INTERVAL_GOLD, URL } from "../../utilities/customfunctions";
import axios from "axios";

const ContentArea = (props) => {
  const [currentGold, setCurrentGold] = useState(-1);
  const [loginIsOpen, setLoginIsOpen] = useState(false);
  const [donationIsOpen, setDonationIsOpen] = useState(false);
  const currentUser = useCurrentUser();
  const isAuthed = currentUser.isAuthed;

  //const dispatch = useDispatchCurrentUser();

  // const handleLogout = () => {
  //   axios
  //     .post(URL + "/logout")
  //     .then(() => {
  //       dispatch(actions.logout(types.LOGOUT));
  //     })
  //     .catch(() => {
  //       console.error("FAILED TO LOGOUT USER");
  //     });
  // };

  const checkIfNewAchievement = (oldGold, newGold) => {
    if (oldGold === -1) {
      return false;
    } else if (oldGold < INTERVAL_GOLD.first && newGold > INTERVAL_GOLD.first) {
      return 1;
    } else if (
      oldGold < INTERVAL_GOLD.second &&
      newGold > INTERVAL_GOLD.second
    ) {
      return 2;
    } else if (oldGold < INTERVAL_GOLD.third && newGold > INTERVAL_GOLD.third) {
      return 3;
    } else if (
      oldGold < INTERVAL_GOLD.fourth &&
      newGold > INTERVAL_GOLD.fourth
    ) {
      return 4;
    } else if (oldGold < INTERVAL_GOLD.fifth && newGold > INTERVAL_GOLD.fifth) {
      return 5;
    } else if (oldGold < INTERVAL_GOLD.sixth && newGold > INTERVAL_GOLD.sixth) {
      return 6;
    } else {
      return false;
    }
  };

  const addDonationAchievement = (achievement, sushiFortune) => {
    const bodyParameters = {
      name: achievement.title,
      gold: achievement.gold,
    };

    axios
      .post(URL + "/guild-vault-contributers", bodyParameters)
      .then(() => {
        setCurrentGold(sushiFortune);
        props.getAllContributes();
      })
      .catch((error) => {
        console.error("FAILED TO SET ACHIEVEMENT");
      });
  };

  useEffect(() => {
    if (props.data.length > 0) {
      const sushiFortune = props.data.reduce((acc, curr) => {
        return acc + curr.gold;
      }, 0);
      const newAchievement = checkIfNewAchievement(currentGold, sushiFortune);
      if (newAchievement !== false) {
        const achievement = {
          title: `Congratulations! You unlocked tab ${newAchievement}!`,
          gold: -1,
        };
        addDonationAchievement(achievement, sushiFortune);
      }
      !newAchievement && setCurrentGold(sushiFortune);
    }
  }, [props.data]);

  return (
    <div className={"contentArea"}>
      <AdminArea
        isOpen={loginIsOpen}
        setIsOpen={setLoginIsOpen}
        isAuthed={isAuthed}
        donationIsOpen={donationIsOpen}
        setDonationIsOpen={setDonationIsOpen}
      />
      <AchievementContainer
        currentGold={currentGold}
        setCurrentGold={setCurrentGold}
      />
      <Summery currentGold={currentGold} isPending={props.isPending} />
      <ContributersContainer data={props.data} isPending={props.isPending} />
      {!props.isMobile && <LanternController />}
      {loginIsOpen && !isAuthed && <LoginModal />}
      {donationIsOpen && isAuthed && (
        <DonationForm getAllContributes={props.getAllContributes} />
      )}
    </div>
  );
};

export default ContentArea;

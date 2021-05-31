import React, { useCallback, useEffect, useState } from "react";
import AchievementContainer from "./AchievementContainer/AchievementContainer";
import AdminArea from "./Admin/AdminArea";
import ContributersContainer from "./ContributersContainer/ContributersContainer";
import LanternController from "./LanternController/LanternController";
import Summery from "./Summery/Summery";
import "./base.scss";
import LoginModal from "./LoginModal/LoginModal";
import DonationForm from "./DonationForm/DonationForm";
import { useCurrentUser } from "../../utilities/Context/CurrentUser/CurrentUser";
import { INTERVAL_GOLD, API_URL } from "../../utilities/customfunctions";
import axios from "axios";

const ContentArea = (props) => {
  const [currentGold, setCurrentGold] = useState(0);
  const [loginIsOpen, setLoginIsOpen] = useState(false);
  const [donationIsOpen, setDonationIsOpen] = useState(false);
  const [closeDonationWithAnimation, setCloseDonationWithAnimation] =
    useState(false);
  const currentUser = useCurrentUser();
  const { getAllContributes } = props;
  const isAuthed = currentUser.isAuthed;

  const checkUnlocks = (highestCrossedInterval, currentAchievement) => {
    if (highestCrossedInterval - 1 > currentAchievement) {
      const unlocks = {
        newUnlock: currentAchievement + 1,
        remainingUnlocks: highestCrossedInterval - currentAchievement,
      };
      return unlocks;
    }
    return highestCrossedInterval;
  };

  const addDonationAchievement = useCallback(
    (newAchievement, gold, repeat) => {
      const achievement = {
        title: `Congratulations! You unlocked tab ${newAchievement}!`,
        isAchievement: true,
      };
      const bodyParameters = {
        name: achievement.title,
        isAchievement: achievement.isAchievement,
      };

      const token = JSON.parse(sessionStorage.getItem("access_token"));
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios
        .post(API_URL + "/guild-vault-contributers", bodyParameters, config)
        .then(() => {
          setCurrentGold(gold);
          getAllContributes();
          if (repeat) {
            addDonationAchievement(currentGold);
          }
        })
        .catch((error) => {
          console.error("FAILED TO SET ACHIEVEMENT");
        });

      // HTTPONLY
      // axios
      //   .post(API_URL + "/guild-vault-contributers", bodyParameters)
      //   .then(() => {
      //     setCurrentGold(gold);
      //     props.getAllContributes();
      //     if (repeat) {
      //       addDonationAchievement(currentGold);
      //     }
      //   })
      //   .catch((error) => {
      //     console.error("FAILED TO SET ACHIEVEMENT");
      //   });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentGold]
  );

  const checkIfNewAchievement = useCallback(
    (oldGold, newGold, numberOfUnlocks, isAchievementPost) => {
      if (isAchievementPost) {
        return false;
      } else if (
        (oldGold < INTERVAL_GOLD.first && newGold > INTERVAL_GOLD.first) ||
        newGold === INTERVAL_GOLD.first
      ) {
        return checkUnlocks(1, numberOfUnlocks);
      } else if (
        (oldGold < INTERVAL_GOLD.second && newGold > INTERVAL_GOLD.second) ||
        newGold === INTERVAL_GOLD.second
      ) {
        return checkUnlocks(2, numberOfUnlocks);
      } else if (
        (oldGold < INTERVAL_GOLD.third && newGold > INTERVAL_GOLD.third) ||
        newGold === INTERVAL_GOLD.third
      ) {
        return checkUnlocks(3, numberOfUnlocks);
      } else if (
        (oldGold < INTERVAL_GOLD.fourth && newGold > INTERVAL_GOLD.fourth) ||
        newGold === INTERVAL_GOLD.fourth
      ) {
        return checkUnlocks(4, numberOfUnlocks);
      } else if (
        (oldGold < INTERVAL_GOLD.fifth && newGold > INTERVAL_GOLD.fifth) ||
        newGold === INTERVAL_GOLD.fifth
      ) {
        return checkUnlocks(5, numberOfUnlocks);
      } else if (
        (oldGold < INTERVAL_GOLD.sixth && newGold > INTERVAL_GOLD.sixth) ||
        newGold === INTERVAL_GOLD.sixth
      ) {
        return checkUnlocks(6, numberOfUnlocks);
      } else {
        return false;
      }
    },
    []
  );

  useEffect(() => {
    if (props.data.length > 0) {
      const sushiFortune = props.data.reduce(
        (acc, cur) => {
          return {
            gold: cur.isAchievement ? acc.gold : acc.gold + cur.gold,
            numberOfUnlocks: cur.isAchievement
              ? acc.numberOfUnlocks + 1
              : acc.numberOfUnlocks,
          };
        },
        { gold: 0, numberOfUnlocks: 0 }
      );

      const isAchievementPost = props.data[props.data.length - 1].isAchievement;
      const newAchievement = checkIfNewAchievement(
        currentGold,
        sushiFortune.gold,
        sushiFortune.numberOfUnlocks,
        isAchievementPost
      );

      if (newAchievement) {
        addDonationAchievement(newAchievement, sushiFortune.gold);
      }
      !newAchievement && setCurrentGold(sushiFortune.gold);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.data, currentGold]);

  return (
    <div className={"contentArea"}>
      <AdminArea
        isOpen={loginIsOpen}
        setIsOpen={setLoginIsOpen}
        isAuthed={isAuthed}
        donationIsOpen={donationIsOpen}
        setDonationIsOpen={setDonationIsOpen}
        setCloseDonationWithAnimation={setCloseDonationWithAnimation}
      />
      <AchievementContainer
        currentGold={currentGold}
        setCurrentGold={setCurrentGold}
      />
      <Summery currentGold={currentGold} isPending={props.isPending} />
      <ContributersContainer
        data={props.data}
        isPending={props.isPending}
        isAuthed={isAuthed}
        getAllContributes={props.getAllContributes}
      />
      {!props.isMobile && <LanternController />}
      {loginIsOpen && !isAuthed && (
        <LoginModal setLoginIsOpen={setLoginIsOpen} />
      )}
      {donationIsOpen && isAuthed && (
        <DonationForm
          getAllContributes={props.getAllContributes}
          donationIsOpen={donationIsOpen}
          setDonationIsOpen={setDonationIsOpen}
          close={closeDonationWithAnimation}
        />
      )}
    </div>
  );
};

export default ContentArea;

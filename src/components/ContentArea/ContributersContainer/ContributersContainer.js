//import React, {useState, useState} from 'react';
import classNames from "classnames";
import Spinner from "../../../utilities/Spinner/Spinner";
import ContributerItem from "../ContributerItem/ContributerItem";
import "./base.scss";

const ContributersContainer = (props) => {
  return (
    <div
      className={classNames("constributersContainer", {
        loadingStyle: props.isPending,
      })}
    >
      {props.isPending ? (
        <Spinner />
      ) : (
        props.data
          .map((contributer, index) => {
            const isAchievement = contributer.gold === -1;
            const setText = () => {
              if (isAchievement) {
                return contributer.name;
              }
              return `${contributer.name} donated ${contributer.gold}g`;
            };

            const achievementStyle = () => {
              if (isAchievement) {
                return true;
              }
              return false;
            };

            return (
              <ContributerItem
                key={contributer.name + index + contributer.gold}
                content={setText()}
                isAchievement={achievementStyle()}
              />
            );
          })
          .reverse()
      )}
    </div>
  );
};

export default ContributersContainer;

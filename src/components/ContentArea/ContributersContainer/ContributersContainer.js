//import React, {useState, useState} from 'react';
import classNames from "classnames";
import Spinner from "../../../utilities/Spinner/Spinner";
import ContributerItem from "../ContributerItem/ContributerItem";
import "./base.scss";
import axios from "axios";

const ContributersContainer = (props) => {
  const updateContributer = (data) => {
    const bodyParameters = {
      name: data.name,
      gold: data.gold,
    };

    axios
      .put(`/guild-vault-contributers/${data.id}`, bodyParameters)
      .then((response) => {
        props.getAllContributes();
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
            const setContent = () => {
              if (contributer.isAchievement) {
                return {
                  id: contributer.id,
                  name: contributer.name,
                  isAchievement: contributer.isAchievement,
                };
              }
              return {
                id: contributer.id,
                name: contributer.name,
                gold: contributer.gold,
                isAchievement: contributer.isAchievement,
              };
            };

            return (
              <ContributerItem
                key={contributer.name + "sushi" + contributer.id}
                content={setContent()}
                isAchievement={contributer.isAchievement}
                updateContributer={updateContributer}
                isAuthed={props.isAuthed}
              />
            );
          })
          .reverse()
      )}
    </div>
  );
};

export default ContributersContainer;

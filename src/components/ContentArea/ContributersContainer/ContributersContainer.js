import classNames from "classnames";
import Spinner from "../../../utilities/Spinner/Spinner";
import ContributerItem from "../ContributerItem/ContributerItem";
import "./base.scss";
import axios from "axios";
import { API_URL } from "../../../utilities/customfunctions";
import { useState } from "react";

const ContributersContainer = (props) => {
  const [isEditingContributer, setIsEditingContributer] = useState(false);

  const updateContributer = (data) => {
    const bodyParameters = {
      name: data.name,
      gold: data.gold,
    };

    const token = JSON.parse(sessionStorage.getItem("access_token"));
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .put(
        `${API_URL}/guild-vault-contributers/${data.id}`,
        bodyParameters,
        config
      )
      .then(() => {
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

            console.log();

            return (
              <ContributerItem
                key={contributer.name + "sushi" + contributer.id}
                content={setContent()}
                isAchievement={contributer.isAchievement}
                updateContributer={updateContributer}
                isAuthed={props.isAuthed}
                isEditingContributer={isEditingContributer}
                setIsEditingContributer={setIsEditingContributer}
                failedToEdit={props.failedToEdit}
                setFailedToEdit={props.setFailedToEdit}
              />
            );
          })
          .reverse()
      )}
    </div>
  );
};

export default ContributersContainer;

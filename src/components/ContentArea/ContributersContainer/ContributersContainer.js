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
          .map((contributer, index) => (
            <ContributerItem
              key={contributer.name + index + contributer.gold}
              content={`${contributer.name} donated ${contributer.gold}g`}
            />
          ))
          .reverse()
      )}
    </div>
  );
};

export default ContributersContainer;

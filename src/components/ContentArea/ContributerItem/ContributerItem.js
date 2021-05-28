import "./base.scss";
import classnames from "classnames";
import { useState, useEffect } from "react";

const ContributerItem = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [state, setState] = useState({
    characterName: props.content.name,
    gold: props.content.gold,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setState({ ...state, [name]: value });
  };

  const setInputWidth = (value, isText) => {
    const multiplier = isText ? 6 : 7.5;
    const width = `${(value.length + 1) * multiplier}px`;
    return width;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      id: props.content.id,
      name: state.characterName,
      gold: state.gold,
    };

    props.updateContributer(data);

    setIsEditing(false);
  };

  useEffect(() => {
    isEditing && !props.isAuthed && setIsEditing(false);
  }, [props.isAuthed, isEditing]);

  return (
    <div
      className={classnames("contributerItem", {
        contributerItem__achievement: props.isAchievement,
      })}
    >
      {props.content.isAchievement ? (
        <div className={"contributer__achievementContent"}>
          <p>{props.content.name}</p>
        </div>
      ) : (
        <div
          className={"contributer__userContent"}
          onClick={() => props.isAuthed && setIsEditing(true)}
        >
          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <input
                type={"text"}
                name={"characterName"}
                value={state.characterName}
                onChange={handleChange}
                style={{ width: setInputWidth(state.characterName, true) }}
              />{" "}
            </form>
          ) : (
            <p>{state.characterName}</p>
          )}
          <p> donated </p>
          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <input
                type={"text"}
                name={"gold"}
                value={state.gold}
                onChange={handleChange}
                style={{ width: setInputWidth(state.gold, false) }}
              />
            </form>
          ) : (
            <p>{state.gold}</p>
          )}
          <p>gold</p>
        </div>
      )}
      {isEditing && (
        <button
          onClick={() => setIsEditing(false)}
          className={"contributer__closeBtn"}
        >
          <span>x</span>
        </button>
      )}
    </div>
  );
};

export default ContributerItem;

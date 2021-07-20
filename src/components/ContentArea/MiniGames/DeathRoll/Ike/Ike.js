import "./base.scss";
import ChatBubble from "../ChatBubble/ChatBubble";
import classNames from "classnames";

const Ike = (props) => {
  return (
    <div
      className={classNames(
        "ikeContainer",
        { ikeMount: !props.unmount },
        { ikeUnmount: props.unmount }
      )}
    >
      <ChatBubble msg={props.msg} />
      {props.children}
      <div className={"ikeImageContainer"}>
        <img
          className={"ikeCharacter"}
          src={props.deathrollImgs[0].image}
          alt={"Ike, your deathroll opponent"}
        />
        <div className={"fireplaceContainer"}>
          <img
            className={"fireplace"}
            src={props.deathrollImgs[1].image}
            alt={"A fireplace"}
          />
          <img
            className={"fire"}
            src={props.deathrollImgs[2].image}
            alt={"A fire"}
          />
        </div>
      </div>
    </div>
  );
};

export default Ike;

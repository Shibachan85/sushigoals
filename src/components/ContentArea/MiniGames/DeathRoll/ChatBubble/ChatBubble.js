import "./base.scss";
import classnames from "classnames";
import { useEffect, useState } from "react";

let timeout = null;

const ChatBubble = (props) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (props.msg) {
      setShow(true);
    } else if (timeout) {
      clearTimeout(timeout);
      timeout = null;
      setShow(false);
    }
  }, [props.msg]);

  useEffect(() => {
    if (show) {
      timeout = setTimeout(() => {
        setShow(false);
      }, 6000);
    }
  }, [show]);

  return (
    <div
      className={classnames("chatBubbleContainer", {
        showChatBubble: show,
      })}
    >
      <p>{props.msg}</p>
    </div>
  );
};

export default ChatBubble;

import { useCallback } from "react";
import "./base.scss";

const Firefly = (props) => {
  const fireflies = useCallback(() => {
    const arr = [];
    for (let index = 0; index < props.amount; index++) {
      arr.push(<div key={index + "_firefly"} className={"firefly"} />);
    }
    return arr;
  }, [props.amount]);

  return <div className={"fireflyContainer"}>{fireflies()}</div>;
};

export default Firefly;

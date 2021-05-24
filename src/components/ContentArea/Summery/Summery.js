import "./base.scss";
import { MAX_GOLD } from "../../../utilities/customfunctions";
import Spinner from "../../../utilities/Spinner/Spinner";

const Summery = (props) => {
  return (
    <div className={"summeryContainer"}>
      <span className={"summeryTitles"}>
        <h3>Full achievement:</h3>
        <h3>Sushi fortune:</h3>
      </span>
      <span className={"summerValues"}>
        <h3>{MAX_GOLD}g</h3>
        {props.isPending ? <Spinner small /> : <h3>{props.currentGold}g</h3>}
      </span>
    </div>
  );
};

export default Summery;

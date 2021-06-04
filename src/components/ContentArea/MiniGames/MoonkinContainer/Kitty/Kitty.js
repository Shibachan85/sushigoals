import "./base.scss";
import KittyCat from "../../../../../resources/images/kitty.png";

const Kitty = () => {
  return (
    <div className={"kittyContainer"}>
      <img src={KittyCat} alt={"KittyCat"} />
    </div>
  );
};

export default Kitty;

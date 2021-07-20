import DeathRoll from "./DeathRoll/DeathRoll";
import MoonkinContainer from "./MoonkinContainer/MoonkinContainer";
import Ike_Sitting from "../../../resources/images/ike/ike_sitting_1.png";
import Fire from "../../../resources/images/ike/fire_2.gif";
import Fireplace from "../../../resources/images/ike/fireplace_1.png";
import ImageCache from "./ImageCache/ImageCache";

const deathrollImgs = [
  { name: "ike_sitting", image: Ike_Sitting },
  { name: "fireplace", image: Fireplace },
  { name: "fire", image: Fire },
];

const MiniGames = (props) => {
  const handleLoad = (e) => {
    const { name } = e.target;
    props.setLoadingState({ ...props.loadingState, [name]: true });
  };

  return (
    <>
      {!props.showDeathRoll && <MoonkinContainer />}
      {props.showDeathRoll && (
        <DeathRoll
          deathrollIsOpen={props.deathrollIsOpen}
          setDeathrollIsOpen={props.setDeathrollIsOpen}
          close={props.closeDeathrollWithAnimation}
          deathrollImgs={deathrollImgs}
        />
      )}
      <ImageCache handleLoad={handleLoad} deathrollImgs={deathrollImgs} />
    </>
  );
};

export default MiniGames;

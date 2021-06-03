import { BREAD_CRUMBS_COORDS } from "../../../../utilities/customfunctions";
import "./base.scss";
import BreadCrumb from "./BreadCrumb/BreadCrumb";
import Moonkin_Standing_Straight from "../../../../resources/images/moonkin/mk_standing_straight.png";
import Moonkin_Standing_Looking_Right from "../../../../resources/images/moonkin/mk_standing_looking_right.png";
import Moonkin_Sitting_Straight from "../../../../resources/images/moonkin/mk_sitting_straight.png";
import Moonkin_Sitting_Eating_1 from "../../../../resources/images/moonkin/mk_sitting_eating_1.png";
import Moonkin_Sitting_Eating_2 from "../../../../resources/images/moonkin/mk_sitting_eating_2.png";
import Moonkin from "./Moonkin/Moonkin";
import { useEffect, useState } from "react";
import { X_MODIFIER, Y_MODIFIER } from "../../../../utilities/customfunctions";
import HoverModal from "./HoverModal/HoverModal";

const hoverModalData = [
  { x: 1200, y: 338, msg: "Bread crumbs..." },
  { x: 1230, y: 440, msg: "How strange..." },
  { x: 1190, y: 350, msg: "Who would've left those there?" },
  { x: 1240, y: 450, msg: "In the middle of Azuremyst Isle..." },
  { x: 1230, y: 350, msg: "They look freshly chewed too!" },
  { x: 1200, y: 330, msg: "I wonder if we can lure it out" },
  { x: 1200, y: 330, msg: "Whatever IT is..." },
  { x: 1170, y: 440, msg: "Let's place a new bread there" },
  { x: 1240, y: 440, msg: "Try clicking it" },
];

const moonkinChatBoxData = [{ x: 1290, y: 220, msg: "Nom! Bred!" }];

const moonkin = [
  {
    classname: "moonkin_standing_straight",
    image: Moonkin_Standing_Straight,
  },
  {
    classname: "moonkin_standing_looking_right",
    image: Moonkin_Standing_Looking_Right,
  },
  {
    classname: "moonkin_sitting_straight",
    image: Moonkin_Sitting_Straight,
  },
  {
    classname: "moonkin_eating_1",
    image: Moonkin_Sitting_Eating_1,
  },
  {
    classname: "moonkin_eating_2",
    image: Moonkin_Sitting_Eating_2,
  },
];

const MoonkinContainer = () => {
  const [state, setState] = useState(moonkin[0]);
  const [crumbsClicked, setCrumbsClicked] = useState(false);
  const [showHoverModal, setShowHoverModal] = useState(false);
  const [hoverIteration, setHoverIteration] = useState(0);

  const percentifyCoord = (coord, modifier) => {
    return (coord / modifier) * 100;
  };

  const style = {
    left: `${percentifyCoord(BREAD_CRUMBS_COORDS[0].x, X_MODIFIER)}%`,
    top: `${percentifyCoord(BREAD_CRUMBS_COORDS[0].y, Y_MODIFIER)}%`,
  };

  useEffect(() => {
    let index = 0;
    let interval = setInterval(() => {
      setState(moonkin[index]);
      setTimeout(() => {
        setState(moonkin[index + 1]);
      }, 8500);
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {" "}
      <div
        className={"crumbContainer"}
        style={style}
        {...(!crumbsClicked && { onMouseEnter: () => setShowHoverModal(true) })}
        {...(!crumbsClicked && {
          onMouseLeave: () => {
            setShowHoverModal(false);
            hoverIteration < hoverModalData.length - 1 &&
              setHoverIteration(hoverIteration + 1);
          },
        })}
        {...(hoverIteration === hoverModalData.length - 1 && {
          onClick: () => setCrumbsClicked(true),
        })}
      >
        {BREAD_CRUMBS_COORDS.map((crumbs, index) => (
          <BreadCrumb key={crumbs.x + "key" + index} crumbs={crumbs} />
        ))}
      </div>
      {(showHoverModal || crumbsClicked) && (
        <HoverModal
          data={
            crumbsClicked
              ? moonkinChatBoxData[0]
              : hoverModalData[hoverIteration]
          }
          showMoonkinChatBox={crumbsClicked}
        />
      )}
      {crumbsClicked && <Moonkin moonkin={state} />}
    </>
  );
};

export default MoonkinContainer;

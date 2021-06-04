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
import Kitty from "./Kitty/Kitty";
import classnames from "classnames";

let interval = null;
let timeout = null;

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
  { x: 1334, y: 300, msg: "*Rattle rattle*" },
  { x: 1280, y: 275, msg: "*Rattle rattle*" },
];

const moonkinChatBoxData = [
  { x: 1290, y: 210, msg: "Nom! Bred!" },
  { x: 13, y: 463, msg: "I can smell a chimkin!" },
];

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
  const [spawnMoonkin, setSpawnMoonkin] = useState(false);
  const [hoverIteration, setHoverIteration] = useState(0);
  const [showIntroNarrater, setShowIntroNarrater] = useState(true);
  const [spawnKitty, setSpawnKitty] = useState(false);
  const [chatBoxIteration, setChatBoxIteration] = useState(0);
  const [showChatBox, setShowChatBox] = useState(false);
  const [noHover, setNoHover] = useState(false);

  const percentifyCoord = (coord, modifier) => {
    return (coord / modifier) * 100;
  };

  const style = {
    left: `${percentifyCoord(BREAD_CRUMBS_COORDS[0].x, X_MODIFIER)}%`,
    top: `${percentifyCoord(BREAD_CRUMBS_COORDS[0].y, Y_MODIFIER)}%`,
  };

  const runInterval = (startIndex, arr, intervalTime, timeoutTime) => {
    interval = setInterval(() => {
      setState(arr[startIndex]);
      timeout = setTimeout(() => {
        setState(arr[startIndex + 1]);
      }, timeoutTime);
    }, intervalTime);
  };

  useEffect(() => {
    return () => {
      clearAll();
    };
  }, []);

  const clearAll = () => {
    clearInterval(interval);
    clearTimeout(timeout);
  };

  const wait = (time) => {
    return new Promise((resolve) => {
      setTimeout(resolve, time);
    });
  };

  const handleClick = () => {
    setNoHover(true);
    setShowIntroNarrater(false);
    wait(2000)
      .then(() => {
        setShowIntroNarrater(true);
        setShowHoverModal(true);
        setHoverIteration(9);
        return wait(2000);
      })
      .then(() => {
        setShowIntroNarrater(false);
        return wait(1500);
      })
      .then(() => {
        setShowIntroNarrater(true);
        setHoverIteration(10);
        return wait(1500);
      })
      .then(() => {
        setShowHoverModal(false);
        return wait(1500);
      })
      .then(() => {
        setCrumbsClicked(true);
        return wait(2000);
      })
      .then(() => {
        setSpawnMoonkin(true);
        return wait(2000);
      })
      .then(() => {
        setState(moonkin[1]);
        setShowIntroNarrater(false);
        return wait(1000);
      })
      .then(() => {
        setState(moonkin[0]);
        return wait(2000);
      })
      .then(() => {
        clearAll();
        setShowIntroNarrater(false);
        return wait(250);
      })
      .then(() => {
        setState(moonkin[2]);
        return wait(250);
      })
      .then(() => {
        // Sit down
        setState(moonkin[2]);
        return wait(2000);
      })
      .then(() => {
        // eating
        runInterval(3, moonkin, 250, 100);
        return wait(3000);
      })
      .then(() => {
        // pausing
        clearAll();
        return wait(250);
      })
      .then(() => {
        // pausing
        setState(moonkin[2]);
        return wait(2000);
      })
      .then(() => {
        // eating
        runInterval(3, moonkin, 250, 100);
        return wait(3000);
      })
      .then(() => {
        // stopping
        clearAll();
        return wait(250);
      })
      .then(() => {
        // stopped eating
        setState(moonkin[2]);
        return wait(2000);
      })
      .then(() => {
        // pausing
        setState(moonkin[0]);
        return wait(3500);
      })
      .then(() => {
        // pausing
        setState(moonkin[1]);
        return wait(1500);
      })
      .then(() => {
        // pausing
        setState(moonkin[0]);
        return wait(6500);
      })
      .then(() => {
        // pausing
        setState(moonkin[1]);
        return wait(2000);
      })
      .then(() => {
        // pausing
        setState(moonkin[0]);
        return wait(6000);
      })
      .then(() => {
        // despawn
        setSpawnMoonkin(false);
        return wait(1000);
      })
      .then(() => {
        // Spawn kitty
        setSpawnKitty(true);
        return wait(3000);
      })
      .then(() => {
        // Kitty chatbox
        setChatBoxIteration(1);
        setShowChatBox(true);
        setShowIntroNarrater(true);
        return wait(3000);
      })
      .then(() => {
        // prepare to despawn
        setShowChatBox(false);
        setShowIntroNarrater(false);
        return wait(2000);
      })
      .then(() => {
        // Kitty despawn
        setSpawnKitty(false);
        return wait(10000);
      })
      .then(() => {
        setSpawnMoonkin(true);
        runInterval(0, moonkin, 10000, 8500);
        return wait(300000);
      })
      .then(() => {
        clearAll();
        setSpawnMoonkin(false);
      });
  };

  return (
    <>
      {" "}
      <div
        className={classnames("crumbContainer", { noHover: noHover })}
        style={style}
        {...(!crumbsClicked &&
          hoverIteration < 9 && {
            onMouseEnter: () => setShowHoverModal(true),
          })}
        {...(!crumbsClicked &&
          hoverIteration < 9 && {
            onMouseLeave: () => {
              setShowHoverModal(false);
              hoverIteration < 8 && setHoverIteration(hoverIteration + 1);
            },
          })}
        {...(hoverIteration === 8 && {
          onClick: handleClick,
        })}
      >
        {BREAD_CRUMBS_COORDS.map((crumbs, index) => (
          <BreadCrumb key={crumbs.x + "key" + index} crumbs={crumbs} />
        ))}
      </div>
      {(showHoverModal || crumbsClicked || showChatBox) &&
        showIntroNarrater && (
          <HoverModal
            data={
              crumbsClicked
                ? moonkinChatBoxData[chatBoxIteration]
                : hoverModalData[hoverIteration]
            }
            crumbsClicked={crumbsClicked}
            showChatBox={showChatBox}
          />
        )}
      {spawnMoonkin && <Moonkin moonkin={state} />}
      {spawnKitty && <Kitty />}
    </>
  );
};

export default MoonkinContainer;

import { BREAD_CRUMBS_COORDS } from "../../../../utilities/customfunctions";
import "./base.scss";
import BreadCrumb from "./BreadCrumb/BreadCrumb";
import Moonkin_Standing_Straight from "../../../../resources/images/moonkin/small/mk_standing_straight_small.png";
import Moonkin_Standing_Looking_Right from "../../../../resources/images/moonkin/small/mk_standing_looking_right_small.png";
import Moonkin_Sitting_Straight from "../../../../resources/images/moonkin/small/mk_sitting_straight_small.png";
import Moonkin_Sitting_Eating_1 from "../../../../resources/images/moonkin/small/mk_sitting_eating_1_small.png";
import Moonkin_Sitting_Eating_2 from "../../../../resources/images/moonkin/small/mk_sitting_eating_2_small.png";
import KittyCat from "../../../../resources/images/kitty_small.png";

import Moonkin from "./Moonkin/Moonkin";
import { useEffect, useState } from "react";
import { X_MODIFIER, Y_MODIFIER } from "../../../../utilities/customfunctions";
import HoverModal from "./HoverModal/HoverModal";
import Kitty from "./Kitty/Kitty";
import classnames from "classnames";
const html = document.querySelector("html");

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
  // { x: 1334, y: 300, msg: "*Rattle rattle*" },
  // { x: 1280, y: 275, msg: "*Rattle rattle*" },
  { x: 175, y: 613, msg: "*Rattle rattle*" },
  { x: 72, y: 510, msg: "*Rattle rattle*" },
  { x: 110, y: 435, msg: "A wild Muzi appeared" },
];

const moonkinChatBoxData = [
  { x: 1290, y: 210, msg: "Nom! Bred!" },
  { x: 60, y: 463, msg: "I smell chimkin..." },
  { x: 65, y: 450, msg: "Gib chimkin! >:3" },
  { x: 60, y: 459, msg: "Oooo a hörb!!!" },
  { x: 220, y: 457, msg: "wwwwwwwwwwwwwwwwwwwwww", transform: "scaleX(-1)" },
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
  const [state, setState] = useState([]);
  const [crumbsClicked, setCrumbsClicked] = useState(false);
  const [showHoverModal, setShowHoverModal] = useState(false);
  const [spawnMoonkin, setSpawnMoonkin] = useState(false);
  const [hoverIteration, setHoverIteration] = useState(0);
  const [showIntroNarrater, setShowIntroNarrater] = useState(true);
  const [spawnKitty, setSpawnKitty] = useState(false);
  const [chatBoxIteration, setChatBoxIteration] = useState(0);
  const [showChatBox, setShowChatBox] = useState(false);
  const [noHover, setNoHover] = useState(false);
  const [unmountKitty, setUnmountKitty] = useState(false);
  const [unmountMoonkin, setUnmountMoonkin] = useState(false);
  const [moonkinImgJSX, setMoonkinImgJSX] = useState([]);
  const [kittyImgJSX, setKittyImgJSX] = useState(null);

  const percentifyCoord = (coord, modifier) => {
    return (coord / modifier) * 100;
  };

  const style = {
    left: `${percentifyCoord(BREAD_CRUMBS_COORDS[0].x, X_MODIFIER)}%`,
    top: `${percentifyCoord(BREAD_CRUMBS_COORDS[0].y, Y_MODIFIER)}%`,
  };

  // const moonkinStyle = {
  //   right: "3%",
  //   //left: `${percentifyCoord(moonkinPosition.x, X_MODIFIER)}%`,
  //   //top: `${percentifyCoord(moonkinPosition.y, Y_MODIFIER)}%`,
  //   //width: `${percentifyCoord(moonkinPosition.width, X_MODIFIER)}%`,
  // };

  const runInterval = (startIndex, arr, intervalTime, timeoutTime) => {
    interval = setInterval(() => {
      setState(arr[startIndex]);
      timeout = setTimeout(() => {
        setState(arr[startIndex + 1]);
      }, timeoutTime);
    }, intervalTime);
  };

  useEffect(() => {
    const ImgEls = moonkin.map((image) => {
      return (
        <img
          className={classnames("moonkin__image", {
            unmountMoonkin: unmountMoonkin,
          })}
          //style={props.style}
          src={image.image}
          alt={"moonkin"}
        />
      );
    });
    const kittyEl = <img src={KittyCat} alt={"KittyCat"} />;
    setKittyImgJSX(kittyEl);
    setState(ImgEls[0]);
    setMoonkinImgJSX(ImgEls);
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
    //wait(2000)
    wait(3000)
      // .then(() => {
      //   //setShowIntroNarrater(true);
      //   //setShowHoverModal(true);
      //   //setHoverIteration(9);
      //   return wait(2000);
      // })
      // .then(() => {
      //   //setShowIntroNarrater(false);
      //   return wait(1500);
      // })
      // .then(() => {
      //   //setShowIntroNarrater(true);
      //   //setHoverIteration(10);
      //   return wait(1500);
      // })
      // .then(() => {
      //   //setShowHoverModal(false);
      //   return wait(1500);
      // })
      .then(() => {
        html.classList.add("shakeIt");
        return wait(1000);
      })
      .then(() => {
        html.classList.remove("shakeIt");
        return wait(1000);
      })
      .then(() => {
        html.classList.add("shakeIt");
        return wait(1000);
      })
      .then(() => {
        html.classList.remove("shakeIt");
        return wait(1000);
      })
      .then(() => {
        html.classList.add("shakeIt");
        return wait(1000);
      })
      .then(() => {
        html.classList.remove("shakeIt");
        return wait(500);
      })
      .then(() => {
        html.classList.add("shakeIt");
        return wait(500);
      })
      .then(() => {
        html.classList.remove("shakeIt");
        return wait(100);
      })
      .then(() => {
        html.classList.add("shakeIt");
        return wait(100);
      })
      .then(() => {
        html.classList.remove("shakeIt");
        return wait(50);
      })
      .then(() => {
        html.classList.add("shakeIt");
        return wait(100);
      })
      .then(() => {
        html.classList.remove("shakeIt");
        return wait(100);
      })
      .then(() => {
        html.classList.add("shakeIt");
        return wait(100);
      })
      .then(() => {
        html.classList.remove("shakeIt");
        setShowIntroNarrater(true);
        return wait(2000);
      })
      .then(() => {
        setCrumbsClicked(true);
        return wait(1500);
      })
      .then(() => {
        setSpawnMoonkin(true);
        return wait(1000);
      })
      .then(() => {
        setShowIntroNarrater(false);
        return wait(1000);
      })
      .then(() => {
        setState(moonkinImgJSX[1]);
        return wait(1000);
      })
      .then(() => {
        setState(moonkinImgJSX[0]);
        return wait(1500);
      })
      .then(() => {
        // Sit down
        setState(moonkinImgJSX[2]);
        return wait(1250);
      })
      .then(() => {
        // eating
        runInterval(3, moonkinImgJSX, 250, 100);
        return wait(3000);
      })
      .then(() => {
        // pausing
        clearAll();
        return wait(250);
      })
      .then(() => {
        // pausing
        setState(moonkinImgJSX[2]);
        return wait(2000);
      })
      .then(() => {
        // eating
        runInterval(3, moonkinImgJSX, 250, 100);
        return wait(3000);
      })
      .then(() => {
        // stopping
        clearAll();
        return wait(250);
      })
      .then(() => {
        // stopped eating
        setState(moonkinImgJSX[2]);
        return wait(2000);
      })
      .then(() => {
        // pausing
        setState(moonkinImgJSX[0]);
        return wait(3500);
      })
      .then(() => {
        // pausing
        setState(moonkinImgJSX[1]);
        return wait(1500);
      })
      .then(() => {
        // pausing
        setState(moonkinImgJSX[0]);
        return wait(2000);
      })
      .then(() => {
        // despawn
        setCrumbsClicked(false);
        setUnmountMoonkin(true);
        setTimeout(() => {
          setSpawnMoonkin(false);
        }, 1000);
        return wait(4000);
      })
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
        setShowIntroNarrater(false);
        return wait(1500);
      })
      .then(() => {
        setShowIntroNarrater(true);
        setHoverIteration(11);
        return wait(1500);
      })
      .then(() => {
        // Spawn kitty
        setSpawnKitty(true);
        return wait(1000);
      })
      .then(() => {
        setShowIntroNarrater(false);
        return wait(3000);
      })
      .then(() => {
        setCrumbsClicked(true);
        // Kitty chatbox
        setChatBoxIteration(1);
        setShowChatBox(true);
        setShowIntroNarrater(true);
        return wait(2000);
      })
      .then(() => {
        setShowIntroNarrater(false);
        return wait(1000);
      })
      .then(() => {
        setChatBoxIteration(2);
        setShowIntroNarrater(true);
        return wait(2000);
      })
      .then(() => {
        setShowIntroNarrater(false);
        return wait(3000);
      })
      .then(() => {
        setChatBoxIteration(3);
        setShowIntroNarrater(true);
        return wait(2000);
      })
      .then(() => {
        setShowIntroNarrater(false);
        return wait(500);
      })
      .then(() => {
        setChatBoxIteration(4);
        setShowIntroNarrater(true);
        // kitty despawn
        setUnmountKitty(true);
        setTimeout(() => {
          setSpawnKitty(false);
        }, 750);
        return wait(3000);
      })
      .then(() => {
        // despawn all modal and reset
        setCrumbsClicked(false);
        setShowChatBox(false);
        setShowIntroNarrater(false);
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
      {spawnMoonkin && (
        <Moonkin spawnMoonkin={spawnMoonkin} unmountMoonkin={unmountMoonkin}>
          {state}
        </Moonkin>
      )}
      {spawnKitty && (
        <Kitty unmountKitty={unmountKitty} kittyImgJSX={kittyImgJSX} />
      )}
    </>
  );
};

export default MoonkinContainer;

import { useCallback, useEffect, useState } from "react";
import "./base.scss";
import classnames from "classnames";
import Ike from "./Ike/Ike";
import axios from "axios";
import { API_URL } from "../../../../utilities/customfunctions";
import SpinnerDots from "../../../../utilities/SpinnerDots/SpinnerDots";

const IKE = "ike";
const PLAYER = "player";
const IKE_NAME = "Ike";
const MIN = 1;
const YOU = "You";

const invalidMsgObj = {
  ike: "Impawster!",
  You: "Really?",
};

const ikeWins = [
  "Woohoo!!",
  "Wow, did I really win?",
  "Crap... oh I won? Woohoo!!",
  "This is fun! Again?",
  "Let's try again.",
  "So sorry, but it seems I won, again!",
  "Me wins, I hope you will be the next winner.",
  "Hooray hooray hooraaaay!",
  "Want to go again?",
  "Whoop I actually won a roll!",
];
const ikeLoses = [
  "That was a good game!",
  "Deathroll me again!",
  "Nooooooes, rematch?",
  "Again please... I still have gold to lose!",
  "If I had a copper...",
  "Oh whale, winning isn't everything...",
  "GZ, you won a fair game!",
  "That game was... Legendary!",
  "Deathrolling legend right here!",
  "Reeeeee I lost!",
];

const DeathRoll = (props) => {
  const [maxRoll, setMaxRoll] = useState(100);
  const [entered, setEntered] = useState(false);
  const [winner, setWinner] = useState(null);
  const [pending, setPending] = useState(false);
  const [tempRoll, setTempRoll] = useState([]);
  const [deathRolls, setDeathRolls] = useState([]);
  const [state, setState] = useState({ name: "" });
  const [userName, setUserName] = useState(YOU);
  const [gameRunning, setGameRunning] = useState(false);
  const [invalidMsg, setInvalidMsg] = useState(null);
  const [firstStart, setFirstStart] = useState(true);
  const [showGameBoard, setShowGameBoard] = useState(false);
  const [imposterIke, setImposterIke] = useState(false);
  const [currentMsg, setCurrentMsg] = useState("");
  const [unmount, setUnmount] = useState(false);
  const [welcomeFromIke, setWelcomeFromIke] = useState(false);
  const [totalSessions, setTotalSessions] = useState(0);
  const [numberOfLosses, setNumberOfLosses] = useState(0);
  const [dataIsPending, setDataIsPending] = useState(false);
  const [didPost, setDidPost] = useState(false);

  const getDeathrollStatistics = useCallback(() => {
    setDataIsPending(true);
    axios
      .get(API_URL + "/deathroll-statistics")
      .then((response) => {
        const totalLosses = response.data.filter(
          (item) => item.ikeWin === false
        ).length;
        setTotalSessions(response.data.length);
        setNumberOfLosses(totalLosses);
        setDataIsPending(false);
      })
      .catch((err) => {
        console.error(err);
        setDataIsPending(false);
      });
  }, []);

  const postDeathrollStatistics = useCallback(() => {
    const bodyParameters = {
      ikeWin: winner === IKE ? true : false,
    };

    axios
      .post(API_URL + "/deathroll-statistics", bodyParameters)
      .then((response) => {
        setDidPost(true);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [winner]);

  useEffect(() => {
    getDeathrollStatistics();
  }, [getDeathrollStatistics]);

  useEffect(() => {
    if (didPost) {
      getDeathrollStatistics();
      setDidPost(false);
    }
  }, [didPost, getDeathrollStatistics]);

  useEffect(() => {
    let message = "";
    if (winner) {
      if (winner === IKE) {
        message = getIkeMessage(ikeWins);
      } else {
        message = getIkeMessage(ikeLoses);
      }
      postDeathrollStatistics();
    }
    setCurrentMsg(message);
  }, [winner, postDeathrollStatistics]);

  const getIkeMessage = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  useEffect(() => {
    setDeathRolls((prevDeathroll) => [...prevDeathroll, tempRoll]);
  }, [tempRoll]);

  useEffect(() => {
    if (winner && gameRunning) {
      const winnerMsg = `${winner === IKE ? "Ike" : userName} won!`;
      setDeathRolls([...deathRolls, winnerMsg]);
      setGameRunning(false);
      setTimeout(() => {
        setPending(false);
      }, 250);
    } else {
    }
  }, [winner, userName, deathRolls, gameRunning]);

  const roll = useCallback(
    (max, deathRoller, runAgain) => {
      max = Math.floor(max);
      const rolled = Math.floor(Math.random() * (max - MIN + 1) + MIN);
      setMaxRoll(rolled);

      let newRoll = null;

      if (deathRoller === PLAYER) {
        newRoll =
          userName === YOU
            ? `${userName} roll ${rolled} (1-${max})`
            : `${userName} rolls ${rolled} (1-${max})`;
      } else {
        newRoll = `Ike rolls ${rolled} (1-${max})`;
      }

      setTempRoll(newRoll);

      if (rolled === 1) {
        setTimeout(() => {
          setWinner(deathRoller === PLAYER ? IKE : PLAYER);
        }, 1000);
        return;
      } else if (runAgain) {
        setTimeout(() => {
          roll(rolled, IKE, false);
        }, getRandomIntInclusive(1000, 3000));
      } else {
        setPending(false);
      }
    },
    [userName]
  );

  const handleChange = (e) => {
    invalidMsg && setInvalidMsg(null);
    const { name, value } = e.target;
    if (value.length > 16) {
      return;
    }
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let name = state.name;

    for (const key in invalidMsgObj) {
      if (name.toLowerCase() === key.toLowerCase()) {
        if (key.toLowerCase() === IKE && !imposterIke) {
          setImposterIke(true);
        } else if (key.toLowerCase() === IKE && imposterIke) {
          name = `Impawster-${IKE_NAME}`;
          break;
        }
        setInvalidMsg(invalidMsgObj[key]);
        setState({ ...state, name: "" });
        return;
      }
    }

    invalidMsg && setInvalidMsg(null);

    name ? setUserName(name) : setUserName(YOU);
    if (state.name.toLowerCase() === IKE) {
      setState({ ...state, name });
    } else {
      !name && setState({ ...state, name: YOU });
    }
    setEntered(true);
    setWelcomeFromIke(true);
  };

  const runWelcomeFromIke = useCallback(() => {
    let name = userName;
    let welcomeMsg = `Herrow ${name === YOU ? "fellow " : ""}Deathroller${
      name === YOU ? "" : ` ${name}`
    }, let's play!`;

    if (name === "Muzi" || name === "Auróra" || name === "Muz") {
      welcomeMsg = `Herrow ${name}, my Deathrolling better half, let's play!`;
    }

    setCurrentMsg(welcomeMsg);
  }, [userName]);

  useEffect(() => {
    welcomeFromIke && runWelcomeFromIke();
  }, [welcomeFromIke, runWelcomeFromIke]);

  const handleRollClick = () => {
    currentMsg && setCurrentMsg("");
    setPending(true);
    setTimeout(() => {
      roll(maxRoll, PLAYER, true);
    }, 200);
  };

  const handleStart = () => {
    setPending(true);
    setFirstStart(false);
    userName === YOU && setState({ name: YOU });
    setTimeout(() => {
      setGameRunning(true);
      setShowGameBoard(true);
      const startMsg = "Deathroll has started! (Click Roll to begin)";
      setDeathRolls([...deathRolls, startMsg]);
      setPending(false);
    }, 250);
  };

  const handleRestart = () => {
    setPending(true);
    setGameRunning(true);
    setWinner(null);
    setMaxRoll(100);
    setTimeout(() => {
      const startMsg = "Deathroll has started!";
      setDeathRolls([...deathRolls, startMsg]);
      setPending(false);
    }, 250);
  };

  const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  useEffect(() => {
    props.close && setUnmount(true);
  }, [props.close]);

  return (
    <>
      <div
        className={classnames(
          "deathRollContainer",
          { deathrollMount: !unmount },
          { deathrollUnmount: unmount }
        )}
      >
        <div className={"deathrollContainerTop"}>
          <p className={"deathrollTitle"}>Let's Deathroll</p>
          {entered && state.name === userName ? (
            <p className={"deathRollWelcome"}>
              {userName === YOU
                ? `Welcome Deathroller`
                : `Welcome Deathroller ${userName}`}
            </p>
          ) : (
            <>
              <form className={"deathRollForm"} onSubmit={handleSubmit}>
                <input
                  type="text"
                  name={"name"}
                  value={state.name}
                  onChange={handleChange}
                  placeholder={"Enter your name... or not"}
                />
                <button type="submit">Enter</button>
              </form>
              {invalidMsg && (
                <p className={"deathrollErrorMsg"}>{invalidMsg}</p>
              )}
            </>
          )}
          <div className={"deathrollStatisticsContainer"}>
            {dataIsPending ? (
              <>
                <SpinnerDots scale={"0.5"} />
                <SpinnerDots scale={"0.5"} />
              </>
            ) : (
              <>
                <p>Deathroll sessions: {totalSessions} </p>
                <p>Ike lost {numberOfLosses} times</p>
              </>
            )}
          </div>
        </div>
        <div className={"deathRoll_rollContainer"}>
          {showGameBoard && (
            <div className={"deathRoll_Board"}>
              {deathRolls
                .map((item, index) => <p key={index + item}>{item}</p>)
                .reverse()}
            </div>
          )}
          {winner && (
            <button
              className={classnames(
                "deathrollBaseButton deathrollRestartButton"
              )}
              {...(!pending && { onClick: handleRestart })}
            >
              An otter one
            </button>
          )}
          {entered && firstStart && (
            <button
              className={classnames("deathrollBaseButton deathrollStartButton")}
              onClick={handleStart}
            >
              Start
            </button>
          )}
        </div>
      </div>
      <Ike
        msg={currentMsg}
        deathrollImgs={props.deathrollImgs}
        unmount={unmount}
      >
        {" "}
        {gameRunning && (
          <button
            className={classnames("deathrollBaseButton deathRoll_Rollbutton", {
              pendingRollButton: pending,
            })}
            onClick={handleRollClick}
          >
            {pending ? "Waiting" : "Roll"}
          </button>
        )}
      </Ike>
    </>
  );
};

export default DeathRoll;

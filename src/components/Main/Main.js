import React, { useCallback, useEffect, useState } from "react";
import "./base.scss";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import ContentArea from "../ContentArea/ContentArea";
import Background from "./Background/Background";
import {
  deviceIsMobile,
  MOBILE_WIDTH,
  API_URL,
} from "../../utilities/customfunctions";
import axios from "axios";
import LoadingPage from "./LoadingPage/LoadingPage";
import Firefly from "./Firefly/Firefly";

let timeout = null;

const Main = () => {
  const [isMobile, setIsMobile] = useState(deviceIsMobile());
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [currentGold, setCurrentGold] = useState(-1);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingState, setLoadingState] = useState({
    background: false,
    logo: false,
    cork: false,
    body: false,
    reflection_bottom: false,
    bottle_top: false,
    bottle_outline: false,
    bottle_outline_right: false,
    reflection_top: false,
    ike_sitting: false,
    fireplace: false,
    fire: false,
  });
  const [showAchievement, setShowAchievement] = useState(false);
  const [unmountLoadingScreen, setUnmountLoadingScreen] = useState(false);
  const [failedToEdit, setFailedToEdit] = useState(false);

  useEffect(() => {
    let result;
    if (isMobile) {
      let modifiedForMobile = { ...loadingState };
      delete modifiedForMobile.ike_sitting;
      delete modifiedForMobile.fireplace;
      delete modifiedForMobile.fire;
      result = Object.values(modifiedForMobile).includes(false);
    } else {
      result = Object.values(loadingState).includes(false);
    }

    if (!result) {
      let min = 3;
      let currentTime = 0;
      const interval = 400; // ms
      let expected = Date.now() + interval;
      timeout = setTimeout(step, interval);
      function step() {
        var dt = Date.now() - expected; // the drift (positive for overshooting)
        if (dt > interval) {
          // something really bad happened. Maybe the browser (tab) was inactive?
          // possibly special handling to avoid futile "catch up" run
        }
        if (currentTime >= min) {
          setUnmountLoadingScreen(true);
          setTimeout(() => {
            setIsLoading(false);
            setShowAchievement(true);
          }, 150);
        }

        currentTime++;

        expected += interval;
        setTimeout(step, Math.max(0, interval - dt)); // take into account drift
      }
    }
  }, [loadingState, isMobile]);

  const getAllContributes = () => {
    !isPending && setIsPending(true);
    axios
      .get(API_URL + "/guild-vault-contributers")
      .then((response) => {
        setData(response.data);
        setIsPending(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const goldCollector = (data) => {
    const sushiFortune = data.reduce((acc, cur) => acc + cur.gold, 0);
    return sushiFortune;
  };

  const getContributers = useCallback(() => {
    axios
      .get(API_URL + "/guild-vault-contributers")
      .then((response) => {
        setData(response.data);
        setCurrentGold(goldCollector(response.data));
        setIsPending(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const postVisitStatistics = useCallback(() => {
    const bodyParameters = {
      siteLoaded: true,
    };

    axios.post(API_URL + "/statistics", bodyParameters).catch((err) => {
      console.error(err);
    });
  }, []);

  useEffect(() => {
    getContributers();
    const newSession = !JSON.parse(sessionStorage.getItem("session_success"));
    if (newSession) {
      postVisitStatistics();
      sessionStorage.setItem("session_success", "true");
    }
  }, [getContributers, postVisitStatistics]);

  // const [coords, setCoords] = useState({ x: 0, y: 0 });

  // function getCursorPosition(canvas, event) {
  //   const rect = canvas.getBoundingClientRect();
  //   const x = event.clientX - rect.left;
  //   const y = event.clientY - rect.top;
  //   setCoords({ x, y });
  // }

  // useEffect(() => {
  //   const canvas = document.querySelector("body");
  //   canvas.addEventListener("mousedown", function (e) {
  //     getCursorPosition(canvas, e);
  //   });
  // }, []);

  useEffect(() => {
    clearTimeout(timeout);
  }, [isLoading]);

  useEffect(() => {
    window.onresize = () => {
      if (
        (window.innerWidth || document.documentElement.clientWidth) <
          MOBILE_WIDTH &&
        !isMobile
      ) {
        setIsMobile(true);
      } else if (
        (window.innerWidth || document.documentElement.clientWidth) >=
          MOBILE_WIDTH &&
        isMobile
      ) {
        setIsMobile(false);
      }
    };
  }, [isMobile]);

  return (
    <div className={"main"}>
      {isLoading && <LoadingPage unmountLoadingScreen={unmountLoadingScreen} />}
      {/* <div
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          color: "white",
          backgroundColor: "black",
        }}
      >{`X: ${coords.x} Y: ${coords.y}`}</div> */}
      <Header loadingState={loadingState} setLoadingState={setLoadingState} />
      <Firefly amount={2} />
      <ContentArea
        isMobile={isMobile}
        data={data}
        isPending={isPending}
        getAllContributes={getAllContributes}
        currentGold={currentGold}
        loadingState={loadingState}
        setLoadingState={setLoadingState}
        isLoading={isLoading}
        showAchievement={showAchievement}
        failedToEdit={failedToEdit}
        setFailedToEdit={setFailedToEdit}
      />
      <Background
        loadingState={loadingState}
        setLoadingState={setLoadingState}
        isMobile={isMobile}
      />
      <Footer />
      {failedToEdit && (
        <div className={"overlay_mask"}>
          <div className={"editFailed"}>
            <p>You can only edit one contributer at a time</p>
            <p>Please close your first edit</p>
            <button onClick={() => setFailedToEdit(false)}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;

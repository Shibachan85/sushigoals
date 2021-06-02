import React, { useEffect, useState } from "react";
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

const Main = () => {
  const [isMobile, setIsMobile] = useState(deviceIsMobile());
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [currentGold, setCurrentGold] = useState(-1);

  // const markup = useCallback(
  //   (count) => {
  //     const stringCountCorrection = count + 1;
  //     return (
  //       // Some markup that references the sections prop
  //     );
  //   },
  //   [count, /* and any other dependencies the react linter suggests */]
  // );

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

  useEffect(() => {
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

  const [coords, setCoords] = useState({ x: 0, y: 0 });

  function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setCoords({ x, y });
  }

  useEffect(() => {
    const canvas = document.querySelector("body");
    canvas.addEventListener("mousedown", function (e) {
      getCursorPosition(canvas, e);
    });
  }, []);

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
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          color: "white",
          backgroundColor: "black",
        }}
      >{`X: ${coords.x} Y: ${coords.y}`}</div>
      <Header />
      <ContentArea
        isMobile={isMobile}
        data={data}
        isPending={isPending}
        getAllContributes={getAllContributes}
        currentGold={currentGold}
      />
      <Background isMobile={isMobile} />
      <Footer />
    </div>
  );
};

export default Main;

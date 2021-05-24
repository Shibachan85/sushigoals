import React, { useEffect, useState } from "react";
import "./base.scss";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import ContentArea from "../ContentArea/ContentArea";
import Background from "./Background/Background";
import {
  deviceIsMobile,
  MOBILE_WIDTH,
  URL,
} from "../../utilities/customfunctions";
import axios from "axios";

const Main = () => {
  const [isMobile, setIsMobile] = useState(deviceIsMobile());
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    axios
      .get(URL + "/guild-vault-contributers")
      .then((response) => {
        setData(response.data);
        setIsPending(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  //const [coords, setCoords] = useState({ x: 0, y: 0 });

  // function getCursorPosition(canvas, event) {
  //   const rect = canvas.getBoundingClientRect();
  //   const x = event.clientX - rect.left;
  //   const y = event.clientY - rect.top;
  //   setCoords({ x, y });
  // }

  // const canvas = document.querySelector("body");
  // canvas.addEventListener("mousedown", function (e) {
  //   getCursorPosition(canvas, e);
  // });

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
      {/* {!isMobile && (
        <p style={{ color: "white" }}>
          Current coords: x: {coords.x}, y: {coords.y}
        </p>
      )} */}
      <Header />
      <ContentArea isMobile={isMobile} data={data} isPending={isPending} />
      <Background isMobile={isMobile} />
      <Footer />
    </div>
  );
};

export default Main;

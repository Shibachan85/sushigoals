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
import { Helmet } from "react-helmet";

const Main = () => {
  const [isMobile, setIsMobile] = useState(deviceIsMobile());
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(true);

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
      .get(URL + "/guild-vault-contributers")
      .then((response) => {
        setData(response.data);
        setIsPending(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

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
      <Helmet>
        <title>Sushi: A world of warcraft commewnity - Classic</title>
      </Helmet>
      <Header />
      <ContentArea
        isMobile={isMobile}
        data={data}
        isPending={isPending}
        getAllContributes={getAllContributes}
      />
      <Background isMobile={isMobile} />
      <Footer />
    </div>
  );
};

export default Main;

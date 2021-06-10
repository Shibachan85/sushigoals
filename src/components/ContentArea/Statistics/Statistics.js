import axios from "axios";
import classNames from "classnames";
import { useCallback, useEffect, useRef, useState } from "react";
import { API_URL } from "../../../utilities/customfunctions";
import "./base.scss";

const Statistics = (props) => {
  const [stats, setStats] = useState({ visits: 0, moonkinFeeds: 0 });
  const [unmount, setUnmount] = useState(false);
  const refStats = useRef(null);

  const getFeedStatistics = useCallback(() => {
    const token = JSON.parse(sessionStorage.getItem("access_token"));
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(API_URL + "/statistics", config)
      .then((response) => {
        const responseArray = response.data;
        console.log(responseArray);
        const data = responseArray.reduce(
          (acc, cur) => {
            return {
              visits: cur.siteLoaded ? acc.visits + 1 : acc.visits,
              moonkinFeeds: cur.breadClick
                ? acc.moonkinFeeds + 1
                : acc.moonkinFeeds,
            };
          },
          { visits: 0, moonkinFeeds: 0 }
        );

        setStats(data);
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    getFeedStatistics();
  }, [getFeedStatistics]);

  const handleClick = useCallback(
    (e) => {
      if (!refStats.current.contains(e.target)) {
        setUnmount(true);
        setTimeout(() => {
          props.setStatsIsOpen(false);
        }, 200);
      }
    },
    [props]
  );

  useEffect(() => {
    !props.statsIsOpen && handleClick();
  }, [props.close, handleClick, props.statsIsOpen]);

  useEffect(() => {
    document.addEventListener("mouseup", handleClick);
    return () => {
      document.removeEventListener("mouseup", handleClick);
    };
  }, [handleClick]);

  console.log(stats);

  return (
    <div
      ref={refStats}
      className={classNames(
        "statsContainer",
        { statsMount: !unmount },
        { statsUnmount: unmount }
      )}
      onClick={handleClick}
    >
      <div className={"innerStatsContainer"}>
        <div className={"stats"}>
          <p>Site visits</p>
          <p>{stats.visits}</p>
        </div>
        <div className={"stats"}>
          <p>Moonkin feeds</p>
          <p>{stats.moonkinFeeds}</p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;

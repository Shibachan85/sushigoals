import "./base.scss";
import classnames from "classnames";
import { useDispatchCurrentUser } from "../../../utilities/Context/CurrentUser/CurrentUser";
import axios from "axios";
import { API_URL } from "../../../utilities/customfunctions";
import * as types from "../../../utilities/Context/types";
import * as actions from "../../../utilities/Context/actions";
import { useState } from "react";

const AdminArea = (props) => {
  const dispatch = useDispatchCurrentUser();
  const [unmount, setUnmount] = useState(false);

  const handleLogout = () => {
    axios
      .post(API_URL + "/logout")
      .then(() => {
        setUnmount(true);
        setTimeout(() => {
          dispatch(actions.logout(types.LOGOUT));
          //sessionStorage.setItem("GET", "false");
          sessionStorage.removeItem("access_token");
          setUnmount(false);
          setTimeout(() => {}, 1000);
        }, 500);

        props.isOpen && props.setIsOpen(false);
      })
      .catch(() => {
        console.error("FAILED TO LOGOUT USER");
      });
  };

  const handleClick = () => {
    if (props.isAuthed) {
      handleLogout();
      props.donationIsOpen && props.setDonationIsOpen(false);
    } else {
      !props.isOpen && props.setIsOpen(true);
    }
  };

  const handleDonationClick = () => {
    !props.donationIsOpen && props.setDonationIsOpen(true);
    props.donationIsOpen && props.setCloseDonationWithAnimation(true);
  };

  const handleStatsClick = () => {
    !props.statsIsOpen && props.setStatsIsOpen(true);
    props.statsIsOpen && props.setCloseStatsWithAnimation(true);
  };

  return (
    <div
      className={classnames(
        "adminArea",
        { adminLoginPanel: !props.isAuthed },
        { adminPanel: props.isAuthed || unmount },
        { adminSlideIn: props.isAuthed && !unmount },
        { adminSlideOut: unmount }
      )}
    >
      {props.isAuthed && (
        <div className={"adminPanel__buttonContainer"}>
          <button onClick={handleDonationClick}>Add donation</button>
          <button onClick={handleStatsClick}>Statistics</button>
        </div>
      )}
      <button
        className={classnames("adminLoginBtn", {
          adminLoginSlide: props.isOpen,
        })}
        onClick={handleClick}
      >
        {props.isAuthed ? "Logout" : "Login"}
      </button>
    </div>
  );
};

export default AdminArea;

import "./base.scss";
import CloseIcon from "../../../resources/images/Icons/close_gray.svg";
import classnames from "classnames";
import { useDispatchCurrentUser } from "../../../utilities/Context/CurrentUser/CurrentUser";
import axios from "axios";
import { URL } from "../../../utilities/customfunctions";
import * as types from "../../../utilities/Context/types";
import * as actions from "../../../utilities/Context/actions";
import { useState } from "react";

const AdminArea = (props) => {
  const dispatch = useDispatchCurrentUser();
  const [unmount, setUnmount] = useState(false);

  const handleLogout = () => {
    axios
      .post(URL + "/logout")
      .then(() => {
        setUnmount(true);
        setTimeout(() => {
          dispatch(actions.logout(types.LOGOUT));
          sessionStorage.setItem("GET", "false");
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
          <button
            onClick={() => props.setDonationIsOpen(!props.donationIsOpen)}
          >
            Add donation
          </button>
          <button>Statistics</button>
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

import "./base.scss";
import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import classnames from "classnames";
import { API_URL } from "../../../utilities/customfunctions";

const DonationForm = (props) => {
  const [state, setState] = useState({ characterName: "", gold: "" });
  const [invalid, setInvalid] = useState(false);
  const [success, setSuccess] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [unmount, setUnmount] = useState(false);
  const refNode = useRef(null);

  const handleClick = useCallback(
    (e) => {
      e.stopPropagation();
      if (!refNode.current.contains(e.target)) {
        setUnmount(true);
        setTimeout(() => {
          props.setDonationIsOpen(false);
        }, 200);
      }
    },
    [props]
  );

  useEffect(() => {
    !props.donationIsOpen && handleClick();
  }, [props.close, handleClick, props.donationIsOpen]);

  useEffect(() => {
    document.addEventListener("mouseup", handleClick);
    return () => {
      document.removeEventListener("mouseup", handleClick);
    };
  }, [handleClick]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addDonation();
    setState({ characterName: "", gold: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
    invalid && setInvalid(false);
    completed && setCompleted(false);
    success && setSuccess(false);
  };

  const addDonation = () => {
    const bodyParameters = {
      name: state.characterName,
      gold: state.gold,
      isAchievement: false,
    };

    const token = JSON.parse(sessionStorage.getItem("access_token"));
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post(API_URL + "/guild-vault-contributers", bodyParameters, config)
      .then(() => {
        setSuccess(true);
        setCompleted(true);
        props.getAllContributes();
      })
      .catch((error) => {
        setSuccess(false);
        setCompleted(true);
      });
  };

  return (
    <div
      ref={refNode}
      className={classnames(
        "donationContainer",
        { donationMount: !unmount },
        { donationUnmount: unmount }
      )}
    >
      <form onSubmit={handleSubmit}>
        <label>
          Character
          <input
            type={"text"}
            name={"characterName"}
            value={state.characterName}
            onChange={handleChange}
          />
        </label>
        <label>
          Gold
          <input
            type={"number"}
            name={"gold"}
            value={state.gold}
            onChange={handleChange}
          />
        </label>
        {invalid && <p>Invalid credentials</p>}
        <div className={"donationBtnContainer"}>
          <button type={"submit"}>Submit</button>
        </div>
      </form>
      {completed && (
        <p
          className={classnames(
            "donationMessage",
            { successMessage: success },
            { errorMessage: !success }
          )}
        >
          {success ? "Donation added" : "Donation failed, please try again"}
        </p>
      )}
    </div>
  );
};

export default DonationForm;

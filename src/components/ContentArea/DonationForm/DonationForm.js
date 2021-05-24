import "./base.scss";
import axios from "axios";
import { useState } from "react";
import classnames from "classnames";
import { URL } from "../../../utilities/customfunctions";

const DonationForm = (props) => {
  const [state, setState] = useState({ username: "", password: "" });
  const [invalid, setInvalid] = useState(false);
  const [success, setSuccess] = useState(false);
  const [completed, setCompleted] = useState(false);

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
    const config = {
      headers: { Authorization: `Bearer ${props.token}` },
    };

    const bodyParameters = {
      name: state.characterName,
      gold: state.gold,
    };

    axios
      .post(URL + "/guild-vault-contributers", bodyParameters, config)
      .then(() => {
        setSuccess(true);
        setCompleted(true);
      })
      .catch((error) => {
        setSuccess(false);
        setCompleted(true);
      });
  };

  return (
    <div className={"donationContainer"}>
      <form onSubmit={handleSubmit}>
        <label>
          Character name
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

import { useState } from "react";
import "./base.scss";
import axios from "axios";
import { URL } from "../../../utilities/customfunctions";

const LoginModal = (props) => {
  const [state, setState] = useState({ username: "", password: "" });
  const [invalid, setInvalid] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    e.preventDefault();
    axios
      .post(URL + "/auth/local", {
        identifier: state.username,
        password: state.password,
      })
      .then((response) => {
        props.setIsAuthed(true);
        const token = response.data.jwt;
        props.setToken(token);
        props.setUserData(response.data);
      })
      .catch((error) => {
        setInvalid(true);
      });
    setState({ username: "", password: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
    invalid && setInvalid(false);
  };

  return (
    <div className={"loginModal"}>
      <form onSubmit={handleSubmit}>
        <label>
          Username
          <input
            type={"text"}
            name={"username"}
            value={state.username}
            onChange={handleChange}
          />
        </label>
        <label>
          Password
          <input
            type={"password"}
            name={"password"}
            value={state.password}
            onChange={handleChange}
          />
        </label>
        {invalid && <p>Invalid credentials</p>}
        <div className={"loginBtnContainer"}>
          <button type={"submit"}>Login</button>
        </div>
      </form>
    </div>
  );
};

export default LoginModal;

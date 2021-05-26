import { useState } from "react";
import "./base.scss";
import axios from "axios";
import { URL } from "../../../utilities/customfunctions";
import { useDispatchCurrentUser } from "../../../utilities/Context/CurrentUser/CurrentUser";
import * as types from "../../../utilities/Context/types";
import * as actions from "../../../utilities/Context/actions";

const LoginModal = (props) => {
  const [state, setState] = useState({ username: "", password: "" });
  const [invalid, setInvalid] = useState(false);
  const dispatch = useDispatchCurrentUser();

  const handleSubmit = (e) => {
    e.preventDefault();

    const bodyParameters = {
      identifier: "Shibachan85",
      password: "FreyaEllie1719",
    };

    const credentials = {
      credentials: "include",
    };

    axios
      .post(URL + "/auth/local", bodyParameters, credentials)
      .then((response) => {
        dispatch(actions.login(types.LOGIN, response.data));
        sessionStorage.setItem("GET", "true");
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

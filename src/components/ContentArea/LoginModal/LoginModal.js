import { useState } from "react";
import "./base.scss";
import axios from "axios";
import { URL } from "../../../utilities/customfunctions";
//import Cookies from "universal-cookie";
import { useDispatchCurrentUser } from "../../../utilities/Context/CurrentUser/CurrentUser";
import * as types from "../../../utilities/Context/types";
import * as actions from "../../../utilities/Context/actions";
//const cookies = new Cookies();

const LoginModal = (props) => {
  const [state, setState] = useState({ username: "", password: "" });
  const [invalid, setInvalid] = useState(false);
  const dispatch = useDispatchCurrentUser();

  const cookieHandler = (token) => {
    //cookies.set("myCat", token, { path: "/" });
    //console.log(cookies.get("myCat"));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const config = {
    //   headers: { Authorization: `Bearer ${props.token}` },
    // };

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
        props.setIsAuthed(true);
        const token = response.data.jwt;
        props.setToken(token);
        props.setUserData(response.data);
        cookieHandler(token);
        dispatch(actions.login(types.LOGIN, response.data));
        console.log(response.user);
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

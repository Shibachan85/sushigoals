import { useEffect, useState, useRef, useCallback } from "react";
import "./base.scss";
import axios from "axios";
import { API_URL } from "../../../utilities/customfunctions";
import { useDispatchCurrentUser } from "../../../utilities/Context/CurrentUser/CurrentUser";
import * as types from "../../../utilities/Context/types";
import * as actions from "../../../utilities/Context/actions";
import classnames from "classnames";

const LoginModal = (props) => {
  const [state, setState] = useState({ username: "", password: "" });
  const [invalid, setInvalid] = useState(false);
  const [unmount, setUnmount] = useState(false);
  const dispatch = useDispatchCurrentUser();
  const refNode = useRef(null);

  const handleClick = useCallback(
    (e) => {
      if (!refNode.current.contains(e.target)) {
        setUnmount(true);
        setTimeout(() => {
          props.setLoginIsOpen(false);
        }, 200);
      }
    },
    [props]
  );

  useEffect(() => {
    document.addEventListener("mouseup", handleClick);
    return () => {
      document.removeEventListener("mouseup", handleClick);
    };
  }, [handleClick]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const bodyParameters = {
      identifier: state.username,
      password: state.password,
    };

    const credentials = {
      credentials: "include",
    };

    axios
      .post(API_URL + "/auth/local", bodyParameters, credentials)
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
    <div
      className={classnames(
        "loginModal",
        { loginMount: !unmount },
        {
          loginUnmount: unmount,
        }
      )}
      ref={refNode}
    >
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

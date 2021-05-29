import { useReducer, useContext, createContext, useEffect } from "react";
import * as types from "../types";
import * as actions from "../actions";
import axios from "axios";
import { API_URL } from "../../customfunctions";

const CurrentUserStateContext = createContext();
const CurrentUserDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case types.LOGIN:
      return { ...state, ...action.user, isAuthed: true };
    case types.LOGOUT:
      return { isAuthed: false };
    default:
      console.error("FAILED TO PROCESS USER");
  }
};

export const CurrentUserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { isAuthed: false });

  useEffect(() => {
    const canGetUser = JSON.parse(sessionStorage.getItem("GET"));
    if (canGetUser) {
      const getUser = () => {
        axios
          .get(API_URL + "/users/me")
          .then((response) => {
            dispatch(actions.login(types.LOGIN, response.user));
          })
          .catch((error) => {
            console.error("FAILED TO GET USER");
          });
      };

      getUser();
    }
  }, [state.isAuthed]);
  return (
    <CurrentUserDispatchContext.Provider value={dispatch}>
      <CurrentUserStateContext.Provider value={state}>
        {children}
      </CurrentUserStateContext.Provider>
    </CurrentUserDispatchContext.Provider>
  );
};

export const useCurrentUser = () => useContext(CurrentUserStateContext);
export const useDispatchCurrentUser = () =>
  useContext(CurrentUserDispatchContext);

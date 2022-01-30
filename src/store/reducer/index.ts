import { ACTION_TYPES } from "./../../constants/actionTypes";

import { StateType, Action } from "./../../types";

const repoExplorerReducer = (state: StateType, action: Action) => {
  switch (action.type) {
    case ACTION_TYPES.TOGGLE_THEME_MODE:
      return {
        ...state,
        darkMode: !state.darkMode,
      };

    case ACTION_TYPES.LOGIN: {
      localStorage.setItem(
        "isLoggedIn",
        JSON.stringify(action.payload.isLoggedIn)
      );
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      return {
        ...state,
        isLoggedIn: action.payload.isLoggedIn,
        user: action.payload.user,
      };
    }
    case ACTION_TYPES.LOGOUT: {
      localStorage.clear();
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    }

    default:
      return state;
  }
};

export { repoExplorerReducer };

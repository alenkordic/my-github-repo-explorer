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
      return {
        ...state,
        isLoggedIn: true
      };
    }
    case ACTION_TYPES.LOGOUT: {
      return {
        ...state,
        isLoggedIn: false
      };
    }

    default:
      return state;
  }
};

export { repoExplorerReducer };

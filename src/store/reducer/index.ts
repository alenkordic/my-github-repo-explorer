import { ACTION_TYPES } from "./../../constants/actionTypes";

import { StateType, Action } from "./../../types";

const repoExplorerReducer = (state: StateType, action: Action) => {
  switch (action.type) {
    case ACTION_TYPES.TOGGLE_THEME_MODE:
      return {
        ...state,
        darkMode: !state.darkMode,
      };

    default:
      return state;
  }
};

export { repoExplorerReducer };

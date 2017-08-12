import { NAV } from "../actions/constants";

const initialState = {
    activeRoute: "/"
};

const navReducer = (state = initialState, action) => {
  switch (action.type) {
    case NAV.SET_ROUTE:
      state = {
        ...state,
        activeRoute: action.payload
      };
      break;
  }
  return state
}

export default navReducer

const configReducer = (state = {configValues: null}, action) => {
  let configToValue = action.payload;
  switch (action.type) {
    case "SET_CONFIG_VALUES":
      state = {
        ...state,
      };
      state[configToValue[0]] = state[configToValue[1]];
      break;
    case "SET_INIT_CONFIG":
      state = {
        ...action.payload
      };
      break;
  }
  return state
};

export default configReducer
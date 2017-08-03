const configReducer = (
  state = {configValues: null}, action) => {
  let configToValue = action.payload;

  switch (action.type) {

    case "SET_CONFIG_VALUES":
      state = {
        ...state,
      };
      state.configValues[configToValue[0]] = configToValue[1];
      break;

    case "SET_INIT_CONFIG":
      state = {
        ...state,
        configValues: {...action.payload},
      };
      break;

    case "SET_SAVE_CONFIG":
      console.log("Ajax post call to save settings");
      console.log(state);
      /* Add ajax post request here */
      break;
  }
  return state
};

export default configReducer
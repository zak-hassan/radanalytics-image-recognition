const configReducer = (
  state = {configValues: null}, action) => {

  /*

  Example of a state:
  state.configValues = {uploadFolder: {placeholder: 'pathto/upload/folder', active: True},
           imageFolder: {placeholder: 'pathto/image/folder', active: False}}
  */

  switch (action.type) {
    case "SET_CONFIG_VALUES": {
      state = {
        ...state,
      };

      let configToValue = action.payload;
      let key = configToValue[0];

      state.configValues[key] = {
        ...state.configValues[key],
        placeholder: configToValue[1]
      };

      break;
    }

    case "SET_INIT_CONFIG": {
      state = {
        ...state,
      };
      let newConfigValues = {};
      let configValues = action.payload.config;
      let configKeys = Object.keys(configValues);
      configKeys.map((key) => {
        newConfigValues[key] = {placeholder: configValues[key], active: false}
      });

      state.configValues = newConfigValues;
      break;
    }

    case "SET_SAVE_CONFIG":
      console.log("Ajax post call to save settings");
      console.log(state);
      /* Add ajax post request here */
      break;

    case "SET_INPUT_STATUS": {
      let key = action.payload[0];
      let status = action.payload[1];
      state = {
        ...state
      };
      state.configValues[key].active = status;
      break;
    }
  }
  return state
};

export default configReducer
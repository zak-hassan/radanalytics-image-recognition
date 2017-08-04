
const configReducer = (
  state = {
    configValues: {},
    futureValues: {},
    executingSave: false,
    loadingForm: true,
  }, action) => {

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

      state.futureValues = {
        ...state.futureValues,
      };

      state.futureValues[key] = {...state.configValues[key], placeholder: configToValue[1]};
      break;
    }

    case "SET_INIT_CONFIG": {
      state = {...state,};

      let newConfigValues = {};
      let configValues = action.payload.config;
      let configKeys = Object.keys(configValues);
      configKeys.map((key) => {
        newConfigValues[key] = {placeholder: configValues[key], active: false}
      });

      state.configValues = newConfigValues;
      state.futureValues = {};
      break;
    }

    case "SET_SAVE_CONFIG": {
      let config_change = action.payload.config_change;
      state = {...state,};

      /* TODO: add check for config existing in state */

      config_change.map((config) => {
        state.configValues[config.field] =
          {
            ...state.configValues[config.field],
            placeholder: config.new_value,
            active: false
          }
      });

      console.log(state);
      break;
    }

    case "SET_INPUT_STATUS": {
      let key = action.payload[0];
      let status = action.payload[1];
      state = {
        ...state
      };
      state.configValues[key].active = status;
      break;
    }

    case "SET_EXECUTING_SAVE_STATUS":
      console.log('executing save');
      state = {...state};
      state.executingSave = action.payload;
      break;

    case "SET_LOADING_FORM_STATUS":
      state = {...state};
      state.loadingForm = action.payload;
      break;
  }
  return state
};

export default configReducer
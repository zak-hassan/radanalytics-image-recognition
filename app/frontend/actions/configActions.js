export function setConfigValues (updatedValues) {
  return {
    type: "SET_CONFIG_VALUES",
    payload: updatedValues
  }
}

export function setInitConfig(){
  /* Mock config values, plan to get using ajax calls */
  let configValues = {
    uploadFolder: '/blah/blah',
    modelLocation: 'also/blah/blah'
  };

  return {
    type: "SET_INIT_CONFIG",
    payload: configValues
  }
}
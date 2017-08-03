export function setConfigValues (e) {
  e.preventDefault();
  let updatedValues = [e.target.name, e.target.value];
  return {
    type: "SET_CONFIG_VALUES",
    payload: updatedValues
  }
}

function getConfigValues(){
  /* Mock config values, plan to get using ajax calls */
  let configValues = {
    uploadFolder: '/blah/blah',
    modelLocation: 'also/blah/blah',
    random: 'also/random/stuff',
    imagefolder: 'random/resources/image/folder'
  };

  return configValues
}

export function setInitConfig(){
  return {
    type: "SET_INIT_CONFIG",
    payload: getConfigValues()
  }
}

export function saveConfig(){
  return {
    type: "SET_SAVE_CONFIG",
  }
}

export function resetConfig(){
  return {
    type: "SET_INIT_CONFIG",
    payload: getConfigValues()
  }
}

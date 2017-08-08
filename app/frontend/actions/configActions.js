export function setConfigValues (e) {
  e.preventDefault();
  let updatedValues = [e.target.name, e.target.value];
  return {
    type: "SET_CONFIG_VALUES",
    payload: updatedValues
  }
}

export function setInitConfig(configuration){
  return {
    type: "SET_INIT_CONFIG",
    payload: configuration
  }
}

export function saveConfig(result){
  return {
    type: "SET_SAVE_CONFIG",
    payload: result
  }
}

export function setInputStatus(key, status){
  return {
    type: "SET_INPUT_STATUS",
    payload: [key, status]
  }
}

/* Track when post request is being handled */
export function setExecutingSaveStatus(status){
  return {
    type: "SET_EXECUTING_SAVE_STATUS",
    payload: status
  }
}

/* Track when get request is being handled for form load */
export function setLoadingFormStatus(status){
  return {
    type: "SET_LOADING_FORM_STATUS",
    payload: status
  }
}

export function deactivateConfigFields(){
  return {
    type:"DEACTIVATE_CONFIG_FIELDS",
  }
}

import { CONFIG } from "./constants"

export function setConfigValues (e) {
  e.preventDefault();
  let updatedValues = [e.target.name, e.target.value];
  return {
    type: CONFIG.SET_CONFIG_VALUES,
    payload: updatedValues
  }
}

export function setInitConfig(configuration){
  return {
    type: CONFIG.SET_INIT_CONFIG,
    payload: configuration
  }
}

export function saveConfig(result){
  return {
    type: CONFIG.SET_SAVE_CONFIG,
    payload: result
  }
}

export function setInputStatus(key, status){
  return {
    type: CONFIG.SET_INPUT_STATUS,
    payload: [key, status]
  }
}

/* Track when post request is being handled */
export function setExecutingSaveStatus(status){
  return {
    type: CONFIG.SET_EXECUTING_SAVE_STATUS,
    payload: status
  }
}

/* Track when get request is being handled for form load */
export function setLoadingFormStatus(status){
  return {
    type: CONFIG.SET_LOADING_FORM_STATUS,
    payload: status
  }
}

export function resetConfig(){
  return {
    type: CONFIG.SET_RESET_CONFIG,
  }
}

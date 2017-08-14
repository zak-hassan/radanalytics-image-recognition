import { CONFIG } from "./constants"
import $ from "jquery";
import { setMessage, setMessageWithTimeout } from "./messageActions";

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

export function handleConfigGET(){
  const url = '/api/v1/settings';
  return (dispatch) => {
    dispatch(setLoadingFormStatus(true));
    $.ajax({
      type: 'GET',
      url: url,
      dataType: 'json',
      success: function(result){
        dispatch(setInitConfig(result));
        dispatch(setLoadingFormStatus(false));
      }.bind(this),
      error: function(){
        dispatch(setLoadingFormStatus(false));
        dispatch(setMessage('Could not successfully retrieve information from server', "danger"));
      }.bind(this),
    });
  };

}

export function handleConfigPOST(event, futureValues){
    event.preventDefault();
    const url = '/api/v1/settings';

    return(dispatch) => {
      let payLoad = {config: futureValues};
      dispatch(setExecutingSaveStatus(true));
      $.ajax({
        type: 'POST',
        url: url,
        data: JSON.stringify(payLoad),
        dataType: 'json',
        contentType: 'application/json',
        success: function (result) {
          dispatch(setExecutingSaveStatus(false));
          dispatch(saveConfig(result));
          dispatch(setMessageWithTimeout('Configuration Updated Successfully!', "success"));
        }.bind(this),
        error: function () {
          dispatch(setExecutingSaveStatus(false));
          dispatch(setMessage('Could not successfully send information to server', "danger"));
        }.bind(this)
      })
    }
}

import $ from "jquery";
import { setMessage, setMessageWithTimeout } from "../pf-lib/message/messageActions";
import { toggleModal } from "../pf-lib/modal/modalActions"
import { MODALS } from "../configs.jsx"
import { CLASSIFIER } from "../constants"

export function setUploadFile(file) {
  return {
    type: CLASSIFIER.SET_FILE,
    payload: file
  }
}

export function setClassification(classification) {
  return {
    type: CLASSIFIER.SET_CLASSIFICATION,
    payload: classification
  }
}

export function clearClassification() {
  return {
    type: CLASSIFIER.CLEAR_CLASSIFICATION
  }
}

export function setImageClassification(file) {
  let formData = new FormData();
  formData.append("file", file);
  const url = "/api/v1/imgrecognize";

  return(dispatch) => {
    $.ajax({
      type: "POST",
      url: url,
      data: formData,
      contentType: false,
      processData: false,
      beforeSend: function() {
        dispatch(clearClassification());
      },
      success: function(result) {
        dispatch(setClassification(result.pred));
        dispatch(setMessageWithTimeout("Successfully classified image", "success"));
      },
      error: function(error) {
        dispatch(setMessage(error, "danger"));
      }
    })
  }
}

export function setSelectedOption(selection){
  return {
    type: CLASSIFIER.SET_OPTION,
    payload: selection
  }
}

export function setExecutingSave(state){
  return {
    type: CLASSIFIER.SET_EXECUTING_SAVE,
    payload: state
  }
}

export function handleFeedBackPOST(e, selectedOption, imageFile){
  e.preventDefault();
  // Do a post request then close mdoal
  let formData = new FormData();
  formData.append("file", imageFile);
  formData.append("option", selectedOption);
  const url = '/api/v1/stats';

  return(dispatch) => {
    dispatch(setExecutingSave(true));
    dispatch(toggleModal(MODALS.FEEDBACK_MODAL));
    $.ajax({
      type: 'POST',
      url: url,
      data: formData,
      contentType: false,
      processData: false,
      success: function () {
        dispatch(setExecutingSave(false));
        dispatch(setMessageWithTimeout('Feedback stored successfully, thank you!', "success"));
      }.bind(this),
      error: function (){
        dispatch(setExecutingSave(false));
        dispatch(setMessage('Could not successfully send information to server', "danger"));
      }.bind(this)
    });
  }
}

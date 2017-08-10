import $ from "jquery";
import { setMessage, setMessageWithTimeout } from "./messageActions";

export function setUploadFile(file) {
  return {
    type: "SET_FILE",
    payload: file
  }
}

export function clearFile() {
  return {
      type: "CLEAR_FILE"
  }
}

export function setClassification(classification) {
  return {
    type: "SET_CLASSIFICATION",
    payload: classification
  }
}

export function setFeedback(feedback) {
  return {
    type: "SET_FEEDBACK",
    payload: feedback
  }
}

export function clearClassification() {
  return {
    type: "CLEAR_CLASSIFICATION"
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
    type: "SET_OPTION",
    payload: selection
  }
}

export function setExecutingSave(state){
  return {
    type: "SET_EXECUTING_SAVE",
    payload: state
  }
}

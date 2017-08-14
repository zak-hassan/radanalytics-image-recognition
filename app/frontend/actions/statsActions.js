import { STATS } from "./constants"

import $ from "jquery";
import { setMessage } from "./messageActions";

export function setLastResultDate(date) {
  return {
    type: STATS.SET_LAST_RES_DATE,
    payload: date
  }
}

export function setLastResultTimeTaken(time) {
  return {
    type: STATS.SET_LAST_RES_TIME_TAKEN,
    payload: time
  }
}

export function setModalDownloadTime(time) {
  return {
    type: STATS.SET_MODAL_DOWNLOAD_TIME,
    payload : time
  }
}

export function setNumResults(num) {
  return {
    type: STATS.SET_NUM_RES,
    payload: num
  }
}

export function setResultHistory(results) {
  return {
    type: STATS.SET_RES_HIS,
    payload: results
  }
}

export function getStats() {
  const url = "/api/v1/historyServer";

  return(dispatch) => {
    $.ajax({
      type: "GET",
      url: url,
      success: function(result) {
        dispatch(setLastResultTimeTaken(result.time_taken));
        dispatch(setLastResultDate(result.last_transaction));
        dispatch(setModalDownloadTime(result.modal_download_time));
        dispatch(setNumResults(result.num_results));
        dispatch(setResultHistory(result.results));
      },
      error: function(error) {
        dispatch(setMessage(error, "danger"));
      }
    })
  }
}

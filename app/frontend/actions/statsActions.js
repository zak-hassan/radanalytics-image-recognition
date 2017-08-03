import $ from 'jquery'
import { setMessage } from './messageActions'

export function setLastResultDate(date) {
  return {
    type:"SET_LAST_RES_DATE",
    payload: date
  }
}

export function setLastResultTimeTaken(time) {
  return {
    type:"SET_LAST_RES_TIME_TAKEN",
    payload: time
  }
}

export function setNumResults(num) {
  return {
    type:"SET_NUM_RES",
    payload: num
  }
}

export function setResultHistory(results) {
  return {
    type: "SET_RES_HIS",
    payload: results
  }
}

export function getStats() {
  const url = "/api/v1/historyServer"

  return(dispatch) => {
    $.ajax({
      type: "GET",
      url: url,
      success: function(result) {
        dispatch(setLastResultTimeTaken(result.time_taken))
        dispatch(setLastResultDate(result.last_transaction))
        dispatch(setNumResults(result.num_results))
        dispatch(setResultHistory(result.results))
      },
      error: function(error) {
        dispatch(setMessage(error, 'error'))
      }
    })
  }
}

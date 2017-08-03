import $ from 'jquery'
import { setMessage } from './messageActions'

export function setLastTransationDate(date) {
  return {
    type:"SET_LAST_TRANS_DATE",
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
    type:"SET_NUM_RESULTS",
    payload: num
  }
}

export function setResultHistory(results, numPages) {
  return {
    type: "SET_RESULT_HISTORY",
    payload: {results: results, numPages: numPages}
  }
}

export function getStats() {
  const url = '/api/v1/historyServer'

  return(dispatch) => {
    $.ajax({
      type: 'GET',
      url: url,
      success: function(result) {
        dispatch(setLastResultTimeTaken(result.time_taken))
        dispatch(setLastTransationDate(result.last_transaction))
        dispatch(setNumResults(result.num_results))
        dispatch(setResultHistory(result.results, result.num_pages))
      },
      error: function(error) {
        dispatch(setMessage(error, 'error'))
      }
    })
  }
}

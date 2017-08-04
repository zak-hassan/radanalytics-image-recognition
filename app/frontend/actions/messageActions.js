import { getIcon } from "./utils"

export function setMessage(message, type){
  const icon = getIcon(type)
  return {
    type: "SET_MESSAGE",
    payload: {message:message, messageType: type, icon: icon}
  }
}

export function setVisible(isVisible) {
  return {
    type: "SET_VISIBLE",
    payload: isVisible
  }
}

export function clearMessage() {
  return {
    type: "CLEAR_MESSAGE"
  }
}

export function setMessageWithTimeout(message, type) {
  return(dispatch) => {
    dispatch(setMessage(message, type))
    setTimeout(() => {
      dispatch(setVisible(false))}, 3000)
    }
}


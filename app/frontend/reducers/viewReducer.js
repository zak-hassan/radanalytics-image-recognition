const viewReducer = (state = {view: "classifyImage"}, action) => {
  switch (action.type) {
    case "SET_VIEW":
      state = {
        view:action.payload
      }
      break
  }
  return state
}

export default viewReducer

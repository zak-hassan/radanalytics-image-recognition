const imageClassificationReducer = (state = {file: null, classification: null}, action) => {
  switch (action.type) {
    case "SET_FILE":
      state = {
        ...state,
        file: action.payload
      }
      break
    case "SET_CLASSIFICATION":
      state = {
        ...state,
        classification: action.payload
      }
      break
    case "CLEAR_CLASSIFICATION":
      state = {
        ...state,
        classification: null
      }
      break
  }
  return state
}

export default imageClassificationReducer

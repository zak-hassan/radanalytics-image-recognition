import { CLASSIFIER } from "../actions/constants"

const initialState = {
  file: null,
  classification: null,
  selectedOption: 1,
  executingSave: false,
};

const imageClassificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLASSIFIER.SET_FILE:
      state = {
        ...state,
        file: action.payload
      };
      break;
    case CLASSIFIER.SET_CLASSIFICATION:
      state = {
        ...state,
        classification: action.payload
      };
      break;
    case CLASSIFIER.CLEAR_CLASSIFICATION:
      state = {
        ...state,
        classification: null
      };
      break;
    case CLASSIFIER.SET_OPTION:
      state = {
        ...state,
        selectedOption: action.payload
      };
      break;
    case CLASSIFIER.SET_EXECUTING_SAVE:
      state = {
        ...state,
        executingSave: action.payload
      };
      break;
  }
  return state
};

export default imageClassificationReducer

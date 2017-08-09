const initialState = {
  modalState: false
};

const modalReducer = function(state = initialState, action){
  switch(action.type){
    case "TOGGLE_MODAL": {
      console.log("In Modal Reducer.");
      state = {...state};
      state.modalState = !state.modalState;
      return state;
    }
    default:
      return state;
  }
};

export default modalReducer
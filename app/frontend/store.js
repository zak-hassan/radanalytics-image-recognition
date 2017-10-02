import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';

import imageClassificationReducer from "./classifierView/imageClassificationReducer";
import messageReducer from "./pf-lib/message/messageReducer";
import configReducer from "./configurationView/configReducer";
import statsReducer from "./statisticsView/statsReducer";
import modalReducer from "./pf-lib/modal/modalReducer";

export default createStore(
  combineReducers({
    modalReducer,
    messageReducer,
    imageClassificationReducer,
    configReducer,
    statsReducer
  }),
  applyMiddleware(thunk)
);


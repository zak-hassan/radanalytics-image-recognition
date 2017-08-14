import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';

import imageClassificationReducer from "./reducers/imageClassificationReducer";
import messageReducer from "./reducers/messageReducer";
import configReducer from "./reducers/configReducer";
import statsReducer from "./reducers/statsReducer";
import modalReducer from "./reducers/modalReducer";
import navReducer from "./reducers/navReducer";

export default createStore(
  combineReducers({
    modalReducer,
    imageClassificationReducer,
    messageReducer,
    configReducer,
    statsReducer,
    navReducer}),
  applyMiddleware(thunk)

);


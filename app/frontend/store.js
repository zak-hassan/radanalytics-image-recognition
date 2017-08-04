import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from 'redux-thunk'

import imageClassificationReducer from "./reducers/imageClassificationReducer"
import messageReducer from "./reducers/messageReducer"
import configReducer from "./reducers/configReducer"
import statsReducer from "./reducers/statsReducer"

export default createStore(
  combineReducers({imageClassificationReducer, messageReducer, configReducer, statsReducer}), applyMiddleware(thunk)

)


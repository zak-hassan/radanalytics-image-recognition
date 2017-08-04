import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from 'redux-thunk'

import imageClassificationReducer from "./reducers/imageClassificationReducer"
import messageReducer from "./reducers/messageReducer"
import statsReducer from "./reducers/statsReducer"

export default createStore(
  combineReducers({imageClassificationReducer, messageReducer, statsReducer}), applyMiddleware(thunk)
)


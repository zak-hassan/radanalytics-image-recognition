import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from 'redux-thunk'

import viewReducer from "./reducers/viewReducer"
import imageClassificationReducer from "./reducers/imageClassificationReducer"
import messageReducer from "./reducers/messageReducer"

export default createStore(
  combineReducers({imageClassificationReducer, viewReducer, messageReducer}), applyMiddleware(thunk)
)


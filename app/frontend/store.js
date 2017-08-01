import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from 'redux-thunk'

import imageClassificationReducer from "./reducers/imageClassificationReducer"
import messageReducer from "./reducers/messageReducer"

export default createStore(
  combineReducers({imageClassificationReducer, messageReducer}), applyMiddleware(thunk)
)


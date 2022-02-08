import {combineReducers,createStore} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import notificationReducer from './reducer/notificationReducer'
import { applyMiddleware } from 'redux'

const reducer=combineReducers({
  notification: notificationReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk)))

export default store
import {combineReducers,createStore} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import notificationReducer from './reducer/notificationReducer'
import anecdoteReducer from './reducer/anecdoteReducer'
import { applyMiddleware } from 'redux'

const reducer=combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk)))

export default store
import { combineReducers,  createStore } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { applyMiddleware } from 'redux'

import blogReducer from './reducer/blogReducer'
import notificationReducer from './reducer/notificationReducer'
import loggedUserReducer from './reducer/loggedUserReducer'
import userReducer from './reducer/userReducer'

const reducer=combineReducers({
  blogs: blogReducer,
  notification: notificationReducer,
  loggedUser: loggedUserReducer,
  users: userReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk)))

export default store
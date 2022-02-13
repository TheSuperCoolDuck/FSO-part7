const notificationReducer = (state={ type: null, message: '' }, action) => {
  switch(action.type){
  case 'CREATE_NOTIFICATION':
    return action.data
  case 'CLEAR_NOTIFICATION':
    return { type: '', message: '' }
  default:
    return state
  }
}

export const clearNotification=() => {
  return{
    type: 'CLEAR_NOTIFICATION',
  }
}

export const createNotification=(type ,message,timeout) => {
  return async dispatch => {
    setTimeout(() => {
      dispatch(clearNotification())
    }, timeout)
    dispatch({
      type: 'CREATE_NOTIFICATION',
      data: { type, message }
    })
  }
}

export default notificationReducer
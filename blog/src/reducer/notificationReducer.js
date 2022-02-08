const notificationReducer = (state='', action) => {
  switch(action.type){
  case 'CREATE_NOTIFICATION':
    return action.message
  case 'CLEAR_NOTIFICATION':
    return ''
  default:
    return state
  }
}

export const clearNotification=() => {
  return{
    type: 'CLEAR_NOTIFICATION'
  }
}

export const createNotification=(message,timeout) => {
  return async dispatch => {
    setTimeout(() => {
      dispatch(clearNotification())
    }, timeout)
    dispatch({
      type: 'CREATE_NOTIFICATION',
      message
    })
  }
}

export default notificationReducer
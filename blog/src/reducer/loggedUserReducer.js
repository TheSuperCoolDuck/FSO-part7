const reducer = (state=[], action) => {
  switch(action.type){
  case 'SET_USER':
    return action.data
  case 'CLEAR_USER':
    return null
  default:
    return state
  }
}

export const setUser = (user) => {
  return dispatch => {
    dispatch({
      type: 'SET_USER',
      data: user
    })
  }
}

export const clearUser = () => {
  return dispatch => {
    dispatch({
      type: 'CLEAR_USER'
    })
  }
}

export default reducer
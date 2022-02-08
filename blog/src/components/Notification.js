import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notificationStyle={
    background: 'lightgray',
    fontSize:20,
    borderStyle:'solid',
    borderRadius:5,
    padding:10,
    marginBottom:10
  }

  const notification = useSelector(state => state.notification)

  if(notification===''){
    return null
  }

  return(
    <div style={notificationStyle}>
      {notification}
    </div>
  )
}

export default Notification
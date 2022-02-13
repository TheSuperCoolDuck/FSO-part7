import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Button } from '@material-ui/core'

const Togglable = (props) => {
  const [visable, setVisable] = useState(false)

  const hideWhenVisable = { display: visable ? 'none' : '' }
  const showWhenVisable = { display: visable ? '' : 'none' }

  const toggleVisibility = () => {
    setVisable(!visable)
  }

  return (
    <div>
      <div style={hideWhenVisable}>
        <Button variant="contained" color="primary" onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisable}>
        {props.children}
        <Button variant="outlined" color="primary" onClick={toggleVisibility}>cancel</Button>
      </div>
    </div>
  )
}

Togglable.propTypes={
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable
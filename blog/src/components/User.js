import React from 'react'

import { useRouteMatch } from 'react-router-dom'

const User = ({ users }) => {
  const match = useRouteMatch('/users/:id')
  const matchedUser = match
    ? users.find(u => u.id===match.params.id)
    : null

  if(!matchedUser){
    return null
  }

  return (
    <div>
      <h2>{matchedUser.name}</h2>
      <h4>added blogs</h4>
      <ul>
        {matchedUser.blogs.map(b =>
          <li key={b.id}>
            {b.title}
          </li>)}
      </ul>
    </div>
  )
}

export default User
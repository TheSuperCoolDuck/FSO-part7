import { Table, TableCell, TableRow, TableContainer } from '@material-ui/core'
import React from 'react'

import { Link } from 'react-router-dom'

const UserList = ({ users }) => {
  return (
    <div>
      <h2>Users</h2>
      <TableContainer>
        <Table>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>blogs created</TableCell>
          </TableRow>
          {users.map(user =>
            <TableRow key={user.id}>
              <TableCell><Link to={`/users/${user.id}`}>{user.name}</Link></TableCell>
              <TableCell>{user.blogs.length}</TableCell>
            </TableRow>
          )}
        </Table>
      </TableContainer>
    </div>
  )
}

export default UserList
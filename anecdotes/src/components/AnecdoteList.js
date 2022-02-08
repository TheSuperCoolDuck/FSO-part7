import React from "react"
import { useSelector, useDispatch } from "react-redux"
import {Link} from 'react-router-dom'

const AnecdoteList = ({ anecdotes }) => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map(anecdote => 
          <li key={anecdote.id} >
            <Link to={`/ancedotes/${anecdote.id}`}>{anecdote.content}</Link>
         </li>)}
      </ul>
    </div>
  )
}

export default AnecdoteList
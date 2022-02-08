import React from "react"
import { voteAnecdote, deleteAnecdote } from '../reducer/anecdoteReducer'
import { useDispatch } from 'react-redux'
import {useHistory} from 'react-router-dom'

const Anecdote = ({anecdote})=>{

  const dispatch = useDispatch()
  const history = useHistory()

  const vote = () => {
    dispatch(voteAnecdote(anecdote.id))
  }

  const remove = () => {
    dispatch(deleteAnecdote(anecdote.id))
    history.push('/')
  } 

  return(
    <div>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <p>has {anecdote.votes} votes <button onClick={vote}>vote</button></p>
      <button onClick={remove}>delete</button>
    </div>
  )
}

export default Anecdote
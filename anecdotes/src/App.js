import React, { useEffect } from 'react'
import {useField} from './hooks'

import {
  Switch, Route, Link,
  useRouteMatch,
  useHistory,
} from 'react-router-dom'

import Notification from './components/Notification'
import AnecdoteList from './components/AnecdoteList'
import Anecdote from './components/Anecdote'

import { useDispatch, useSelector } from 'react-redux'
import { createNotification } from './reducer/notificationReducer'
import { initalizeAnecdotes, createAnecdote} from './reducer/anecdoteReducer'

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.
    <br/>
    <br/>
    See <a href='https://github.com/fullstack-hy/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const resetFields=()=>{
    content.reset()
    author.reset()
    info.reset()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button>create</button>
        <button type="button" onClick={resetFields}>reset</button>
      </form>
    </div>
  )
}

const App = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const anecdotes = useSelector(state=>state.anecdotes)

  useEffect(()=>{
    dispatch(initalizeAnecdotes())
  }, [dispatch])

  const addNew = (anecdote) => {
    dispatch(createAnecdote(anecdote))
    history.push('/')
    dispatch(createNotification(`a new anecdote ${anecdote.content} created!`, 10000))
  }

  const padding = {
    paddingRight: 5
  }

  const match = useRouteMatch('/ancedotes/:id')
  const anecdote = match
    ? anecdotes.find(a => a.id == Number(match.params.id))
    : null


  return (
    <div>
      <h1>Software anecdotes</h1>
      <div>
        <div>
          <Link style={padding} to="/">anecdotes</Link>
          <Link style={padding} to="/create">create new</Link>
          <Link style={padding} to="about">about</Link>
        </div>
        <Notification/>
        <Switch>
          <Route path="/ancedotes/:id">
            <Anecdote anecdote={anecdote}/>
          </Route>
          <Route path="/create">
            <CreateNew addNew={addNew} />        
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route>
            <AnecdoteList anecdotes={anecdotes} />
          </Route>
        </Switch>
      </div>      
      <Footer />
    </div>
  )
}

export default App;
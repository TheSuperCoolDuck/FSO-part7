const initialAnecdotes = [{
  content: 'If it hurts, do it more often',
  author: 'Jez Humble',
  info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
  votes: 0,
  id: '1'
},
{
  content: 'Premature optimization is the root of all evil',
  author: 'Donald Knuth',
  info: 'http://wiki.c2.com/?PrematureOptimization',
  votes: 0,
  id: '2'
}
]

const reducer = (state=[], action)=>{
  switch(action.type){
    case 'INIT_ANECDOTES':
      return action.data
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    default:
      return state
  }
}

export const initalizeAnecdotes=()=>{
  return async dispatch=>{
    dispatch({
      type: 'INIT_ANECDOTES',
      data: initialAnecdotes
    })
  }
}

export const createAnecdote=({content, author, info})=>{
  return async dispatch=>{
    dispatch({
      type: 'NEW_ANECDOTE',
      data: {
        content,
        author,
        info,
        votes: 0,
        id: (Math.random() * 10000).toFixed(0)
      }
    })
  }
}

export default reducer
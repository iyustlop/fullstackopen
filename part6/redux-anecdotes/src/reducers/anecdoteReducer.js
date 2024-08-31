import { createSlice, current } from "@reduxjs/toolkit"

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
} 

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    newAnecdote(state, action){ 
      const anecdote = asObject(action.payload)
      return [...state, anecdote  ]
    },
    newVote(state, action){
      const id = action.payload
      const anecdoteToChange = state.find(n => n.id === id)
      const anecdoteChanged = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state
        .map(anecdote => 
        anecdote.id !== id ? anecdote : anecdoteChanged
      ).sort((a,b) => b.votes - a.votes)
    },
    appendAnecdote(state, action){
      state.push(action.payload)
    },
    setAnecdotes(state, action){
      return action.payload
    }
  }
})

export const { newAnecdote,newVote,appendAnecdote,setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
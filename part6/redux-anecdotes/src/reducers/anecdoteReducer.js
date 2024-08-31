import { createSlice } from "@reduxjs/toolkit"


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    newAnecdote(state, action){ 
      state.push(action.payload)
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
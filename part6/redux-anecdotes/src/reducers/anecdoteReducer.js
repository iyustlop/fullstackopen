import { createSlice } from '@reduxjs/toolkit'
import  anecdotesService  from '../services/anecdotesService'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    newAnecdote(state, action){
      state.push(action.payload)
    },
    newVote(state, action){
      const anecdoteVoted = action.payload
      return state
        .map(anecdote => anecdote.id !== anecdoteVoted.id ? anecdote : anecdoteVoted
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

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    const recoveredAnecdotes = anecdotes.sort((a,b) => b.votes - a.votes)
    dispatch(setAnecdotes(recoveredAnecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const updateVotes = anecdote => {
  const anecdoteUpdateVotes = {
    ...anecdote, votes: anecdote.votes +1
  }
  return async dispatch => {
    dispatch(newVote(anecdoteUpdateVotes))
    await anecdotesService.updateVotes(anecdoteUpdateVotes.id, anecdoteUpdateVotes)
  }
}

export default anecdoteSlice.reducer
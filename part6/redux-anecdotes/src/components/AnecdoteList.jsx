import { useDispatch, useSelector } from "react-redux"
import { createNotification } from "../reducers/notificationReducer"
import { updateVotes } from "../reducers/anecdoteReducer"

const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if ( filter === '') return anecdotes
    else return  anecdotes.filter(p => p.content.includes(filter))}
  )

  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(updateVotes(anecdote))
    dispatch(createNotification(`you voted '${anecdote.content}'`))
  }

  return (
    <>
    {anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() =>{ vote(anecdote) }}>vote</button>
        </div>
      </div>
    )}
    </>
  )
}

export default AnecdoteList
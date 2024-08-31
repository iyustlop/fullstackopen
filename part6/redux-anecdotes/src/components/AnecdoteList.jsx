import { useDispatch, useSelector } from "react-redux"
import { setNotification } from "../reducers/notificationReducer"
import { updateVotes } from "../reducers/anecdoteReducer"

const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if ( filter === '') return anecdotes
    else return  anecdotes.filter(p => p.content.includes(filter))}
  )

  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(updateVotes(anecdote))
    dispatch(setNotification(`you voted '${anecdote.content}'`,5))
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
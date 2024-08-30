import { useDispatch, useSelector } from "react-redux"
import { createNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if ( filter === '') return anecdotes
    else return  anecdotes.filter(p => p.content.includes(filter))}
  )

  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch({ type: 'anecdotes/newVote', payload: id})
    const anecdote = anecdotes.filter(p => p.id === id)[0]
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
          <button onClick={() =>{ 
            vote(anecdote.id)
            }}>vote</button>
        </div>
      </div>
    )}
    </>
  )
}

export default AnecdoteList
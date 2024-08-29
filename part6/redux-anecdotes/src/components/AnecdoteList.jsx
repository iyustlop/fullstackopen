import { useDispatch, useSelector } from "react-redux"

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    if (state.filter === '') {
      return [...state.anecdotes].sort((a,b) => b.votes - a.votes)
    } else {
      return [...state.anecdotes]
        .filter(p => p.content.includes(state.filter))
        .sort((a,b) => b.votes - a.votes)
    }
  })
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch({ type: 'anecdotes/newVote', payload: id})
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
          <button onClick={() => vote(anecdote.id)}>vote</button>
        </div>
      </div>
    )}
    </>
  )
}

export default AnecdoteList
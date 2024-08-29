import { useDispatch } from "react-redux"

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const newAnecdote = (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch({ type: 'anecdotes/newAnecdote', payload: anecdote})
      }

    return (
        <>
          <h2>create new</h2>
          <form onSubmit={newAnecdote}>
            <div><input name='anecdote' /></div>
            <button type='submit'>create</button>
          </form>
        </>
    )
}

export default AnecdoteForm
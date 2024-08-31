import { useDispatch } from "react-redux"
import { createNotification } from "../reducers/notificationReducer"
import anecdotesService from "../services/anecdotesService"

const AnecdoteForm = () => {
    const dispatch = useDispatch()

  const asObject = (anecdote) => {
    return {
      content: anecdote,
      votes: 0
    }
  } 

    const newAnecdote = async (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ''
        const anecdoteResponse = await anecdotesService.createNew(asObject(anecdote))
        dispatch({ type: 'anecdotes/newAnecdote', payload: anecdoteResponse})
        dispatch(createNotification(`you added '${anecdote}'`))
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
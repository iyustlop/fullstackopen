import { useDispatch } from "react-redux"
import { createNotification } from "../reducers/notificationReducer"
import { createAnecdote } from "../reducers/anecdoteReducer"


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
        dispatch(createAnecdote(asObject(anecdote)))
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
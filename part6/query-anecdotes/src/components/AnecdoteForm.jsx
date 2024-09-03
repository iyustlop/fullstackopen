import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../services/request'
import { setNotification, useNotificationDispatch } from '../NotificationContext'

const AnecdoteForm = () => {

  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      console.log('llamada')
      queryClient.invalidateQueries({ queryKey: ['anecdotes']})
    },
    onError: (error) => {
      const errorMessage = error.response.data.error
      setNotification(notificationDispatch, errorMessage)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
    setNotification(notificationDispatch, `You added '${content}'`)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm

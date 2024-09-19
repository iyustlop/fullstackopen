import { useNavigate } from "react-router-dom"
import { useField } from "../hooks"

const CreateNew = (props) => {
    const { reset: resetContet, ...content } = useField('text')
    const { reset: resetAuthor, ...author } = useField('text')
    const { reset: resetInfo, ...info} = useField('text')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
      e.preventDefault()  
      props.addNew({
        content: content.value,
        author: author.value,
        info: info.value,
        votes: 0
      })
      navigate('/')
      props.handleNotification(`a new anecdote: ${content.value} created`)
    }

    const handleReset = (e) => {
      e.preventDefault()
      resetContet()
      resetAuthor()
      resetInfo()
    }
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input {...content} />
          </div>
          <div>
            author
            <input {...author} />
          </div>
          <div>   
            url for more info
            <input {...info} />
          </div>
          <button onClick={handleSubmit}>create</button>
          <button onClick={handleReset}>reset</button>
        </form>
      </div>
    )
  
  }

  export default CreateNew
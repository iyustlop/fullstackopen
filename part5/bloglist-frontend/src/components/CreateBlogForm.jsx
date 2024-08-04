import { useState } from 'react'

const CreateBlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = async (event) => {
      event.preventDefault()
      createBlog({
        title: title,
        author: author,
        url: url
      })
    }

    return (
      <div>
        <h2>Create new</h2>
        <form onSubmit={addBlog}>
          <div>title <input value={title} onChange={event => setTitle(event.target.value)}/></div>
          <div>author <input value={author}onChange={event => setAuthor(event.target.value)}/></div>
          <div>url <input value={url}onChange={event => setUrl(event.target.value)}/></div>
          <button type='submit'>create</button>
        </form>
      </div>
    )
  }

  export default CreateBlogForm
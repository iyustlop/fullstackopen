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
        <div>title <input
          data-testid='title'
          value={title}
          onChange={event => setTitle(event.target.value)}
          placeholder='Blog title'
        /></div>
        <div>author <input
          data-testid='author'
          value={author}
          onChange={event => setAuthor(event.target.value)}
          placeholder='Blog author'
        /></div>
        <div>url <input
          data-testid='url'
          value={url}
          onChange={event => setUrl(event.target.value)}
          placeholder='blog url'
        /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default CreateBlogForm
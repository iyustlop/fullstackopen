import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import login from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsappUser')
    if (loggedUserJSON) {
      console.log(loggedUserJSON)

      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await login.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogsappUser', JSON.stringify(user)
      )

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setError('Wrong credentials')
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
  }

  const handleCloseSession = async (event) => {
    window.localStorage.removeItem('loggedBlogsappUser')
    setUser(null)
    setUsername('')
    setPassword('')
  }

  const handleCreateNewBlog = async () => {
    const blog = {
      title: title,
      author: author,
      url: url
    }
    console.log(blog)
    
    blogService.saveOneBlog(blog)
  }

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
          username:
          <input
            type='text'
            value={username}
            name='username'
            onChange={({ target }) => setUsername(target.value)}
          />
          password:
          <input
            type='password'
            value={password}
            name='password'
            onChange={({ target }) => setPassword(target.value)}
          />
          <button type='submit'>login</button>
        </div>
      </form>
    )
  }

  const createBlog = () => {
    return (
      <>
        <h2>Create new</h2>
        <div>title <input onChange={({ target }) => setTitle(target.value)}/></div>
        <div>author <input onChange={({ target }) => setAuthor(target.value)}/></div>
        <div>url <input onChange={({target}) => setUrl(target.value)}/></div>
        <button onClick={handleCreateNewBlog}>create</button>
      </>
    )
  }

  return (
    <div>
      {user === null ? loginForm() : <div><p>{user.name} logged-in</p><button onClick={handleCloseSession}>logout</button></div>}
      {user !== null && createBlog()}
      {user !== null && <h2>blogs</h2>}
      {user !== null && blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
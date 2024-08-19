import { useState, useEffect } from 'react'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import CreateBlogForm from './components/CreateBlogForm'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import login from './services/login'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')
  const [error, setError] = useState(false)
  const [loginVisible, setLoginVisible] = useState(false)


  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a,b) => b.likes - a.likes)
      setBlogs(blogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsappUser')
    if (loggedUserJSON) {
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
      setMessage('Wrong user and password')
      setError(true)
      setTimeout(() => {
        setError(null)
        setMessage('')
      }, 5000)
    }
  }

  const handleCloseSession = async () => {
    window.localStorage.removeItem('loggedBlogsappUser')
    setUser(null)
    setUsername('')
    setPassword('')
  }

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}> log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </div>
        <button onClick={() => setLoginVisible(false)}>cancel</button>
      </div>
    )
  }

  const createBlog = async (blog) => {
    console.log('blog')

    const response = await blogService.saveOneBlog(blog)

    setBlogs(blogs.concat(response))
    setMessage(
      `Anew blog ${blog.title}`
    )
    setTimeout(() => {
      setMessage('')
    }, 5000)
  }

  const handleLike = async (newblog) => {
    const response = await blogService.updateABlog(newblog)
    const updatedBlogs = blogs.map(blog => blog.id !== newblog.id ? blog : { ...blog, likes: response.likes })
    updatedBlogs.sort((a,b) => b.likes - a.likes)
    setBlogs(updatedBlogs)
  }

  const handleRemoveBlog = async (blogtoRemove) => {
    console.log(blogtoRemove)
    if (window.confirm(`Remove blog ${blogtoRemove.title} by ${blogtoRemove.author}`)) {
      await blogService.removeBlog(blogtoRemove.id)
      const blogsLeft = blogs.filter(blog => blog.id !== blogtoRemove.id)
      setBlogs(blogsLeft)
    }
  }

  return (
    <div>
      <Notification message={message} esError={error} />
      {user === null ? loginForm() : <div><p>{user.name} logged-in <button onClick={handleCloseSession}>logout</button></p></div>}
      {user !== null &&
        <Togglable buttonLabelOpen='Create new blog' buttonLabelClose='Cancel'>
          <CreateBlogForm createBlog={createBlog} />
        </Togglable>
      }
      {user !== null && <h2>blogs</h2>}
      {user !== null && blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleLike={handleLike} handleRemoveBlog={handleRemoveBlog}/>
      )}
    </div>
  )
}

export default App
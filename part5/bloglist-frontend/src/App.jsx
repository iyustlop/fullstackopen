import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogsService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import CreateBlogForm from './components/CreateBlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState('')
  const [error, setError] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogsService
    .setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogsService
  
      .getAll()
      .then(initialNotes => {
        setBlogs(initialNotes)
      })
  }, [])

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
  
    blogsService
  
      .update(id, changedNote)
        .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 
      blogsService
    .setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong user and password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const createBlog = async (blog) => {
    const response = await blogsService
  .create(blog)

    setBlogs(blogs.concat(response))
    setMessage(
      `A new blog ${blog.title}`
    )
    setTimeout(() => {
      setMessage('')
    }, 5000)
  }


  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
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

      {!user && loginForm()}
      {user && <div>
       <p>{user.name} logged in</p>
       <Togglable buttonLabelOpen='Create new blog' buttonLabelClose='Cancel'>
       <CreateBlogForm 
         createBlog={createBlog} 
      />
      </Togglable>
      </div>
     } 
      {user !== null && <h2>blogs</h2>}
      {user !== null && blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleLike={handleLike} handleRemoveBlog={handleRemoveBlog}/>
      )}
    </div>
  )
}

export default App
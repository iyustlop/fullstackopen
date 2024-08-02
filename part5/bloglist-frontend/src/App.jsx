import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import login from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
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

const loginForm = () => {
  return(
    <form onSubmit={handleLogin}>
    <div>
      username:
      <input
        type='text'
        value={ username }
        name='username'
        onChange={ ({ target }) => setUsername(target.value)}
      />
    </div>
    <div>
      password:
      <input
        type='password'
        value={password}
        name='password'
        onChange={ ({ target }) => setPassword(target.value)}
      />
    </div>
    <button type='submit'>login</button>
  </form>
  )
}

  return (
    <div>
      { user === null ? loginForm() : <div><p>{user.name} logged-in</p><button onClick={handleCloseSession}>cerrar</button></div>}
      <h2>blogs</h2>
      {user !== null && blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
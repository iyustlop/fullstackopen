const LoginForm = ({ username, password, handleLogin, handleUsername, handlePassword}) => {
return (
    <form onSubmit={handleLogin}>
        <div>
          username:
          <input
            type='text'
            value={ username }
            name='username'
            onChange={handleUsername}
          />
        </div>
        <div>
          password:
          <input
            type='password'
            value={password}
            name='password'
            onChange={handlePassword}
          />
        </div>
        <button type='submit'>login</button>
      </form>
)
}

export default LoginForm
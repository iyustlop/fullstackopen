import PropTypes from 'prop-types'

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          username:
          <input
            className={'username'}
            data-testid="username"
            type='text'
            value={username}
            name='username'
            onChange={handleUsernameChange}
          />
          password:
          <input
            className='password'
            data-testid='password'
            type='password'
            value={password}
            name='password'
            onChange={handlePasswordChange}
          />
          <button type='submit'>login</button>
        </div>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired
}

export default LoginForm
const LoginForm = (props) => {
    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={props.handleLogin}>
                <div>
                    username:
                    <input
                        type='text'
                        value={props.username}
                        name='username'
                        onChange={props.handleChange}
                    />
                    password:
                    <input
                        type='password'
                        value={props.password}
                        name='password'
                        onChange={props.handleChange}
                    />
                    <button type='submit'>login</button>
                </div>
            </form>
        </div>
    )
}


export default LoginForm
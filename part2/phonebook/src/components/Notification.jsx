const Notification = ({ message, esError }) => {
    if (message === '') {
      return null
    }
  
    return (
      <div className={esError ? 'error' : 'notification'} >
        {message}
      </div>
    )
  }
  
  export default Notification
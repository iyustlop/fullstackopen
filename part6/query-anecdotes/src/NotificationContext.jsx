import { createContext, useContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type){
  case 'setNotification':
    return action.payload
  case 'removeNotification':
    return ''
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer,'')

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      { props.children }
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

export const setNotification = (dispatch, message) => {
  dispatch({ type: 'setNotification', payload: message })
  setTimeout(() => dispatch({ type: 'removeNotification' }), 5000)
}

export default NotificationContext
import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    newNotification(state, action) {
      return action.payload
    },
  }
})

let timeoutId = null

export const setNotification = (message,delay) => {
  return async (dispatch) => {
    dispatch(newNotification(message))
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => dispatch(setNotification(null)), delay * 1000)
  }
}

export const { newNotification } = notificationSlice.actions
export default notificationSlice.reducer
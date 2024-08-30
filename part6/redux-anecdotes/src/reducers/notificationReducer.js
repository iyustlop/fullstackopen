import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        setNotification(state, action) {
            return action.payload;
          },
    }
})

let timeoutId = null

export const createNotification = (message) => {
    return async (dispatch) => {
        dispatch(setNotification(message))
        
        if (timeoutId) {
            clearTimeout(timeoutId)
        }

        timeoutId = setTimeout(() => dispatch(setNotification(null)), 5000);
    }
}

export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer
import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filterReducer(state,action)  {
      return action.payload
    }
  }
})

export const { filterReducer } = filterSlice.actions
export default filterSlice.reducer
import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    showNotification(state, action) {
      return action.payload 
    },
    clearNotification(state) {
      return null
    }
  }
})

export const { showNotification, clearNotification } = notificationSlice.actions

export const setNotification = (message, type, seconds) => {
  return dispatch => {
    dispatch(showNotification({ message, type }))
    setTimeout(() => {
      dispatch(clearNotification())
    }, seconds * 1000)
  }
}

export default notificationSlice.reducer
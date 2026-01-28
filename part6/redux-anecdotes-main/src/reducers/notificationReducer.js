import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    updateNotification(state, action) {
      return action.payload
    },
    clearNotification() {
      return ''
    }
  }
})

const { clearNotification, updateNotification } = notificationSlice.actions

export const setNotification = (message, seconds) => {
  return async (dispatch) => {
    dispatch(updateNotification(message))

    setTimeout(() => {
      dispatch(clearNotification())
    }, seconds * 1000);
  }
}

export default notificationSlice.reducer
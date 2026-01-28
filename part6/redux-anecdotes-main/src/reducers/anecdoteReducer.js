import { createSlice } from '@reduxjs/toolkit'  

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(n => n.id === id)

      if (anecdoteToChange) {
        anecdoteToChange.votes += 1
      }
    },
    createAnecdote(state, action) {
      const content = action.payload

      state.push({
        content,
        id: getId(),
          votes: 0
      })
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { voteAnecdote, createAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer

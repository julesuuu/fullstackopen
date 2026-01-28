import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes.js'

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
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})  

const { setAnecdotes } = anecdoteSlice.actions

export const initializedAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const { voteAnecdote, createAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer

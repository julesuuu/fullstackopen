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

const { createAnecdote, setAnecdotes, voteAnecdote } = anecdoteSlice.actions

export const initializedAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const appendAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
  }
}

export const voteUpdate = (id) => {
  return async (dispatch, getState) => {

    const { anecdotes } = getState()
    const anecdoteToChange = anecdotes.find(a => a.id === id)

    const changedAnecdote = {
      ...anecdoteToChange,
      votes: anecdoteToChange.votes + 1
    }

    const updatedAnecdote = await anecdoteService.update(id, changedAnecdote)

    dispatch(voteAnecdote(updatedAnecdote.id))
  }
}

export default anecdoteSlice.reducer

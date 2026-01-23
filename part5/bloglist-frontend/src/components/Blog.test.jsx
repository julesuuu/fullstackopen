import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { test, expect } from 'vitest'

test('renders title and author', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Arto Hellas',
    url: 'https://fullstackopen.com/',
    likes: 10,
    user: {
      username: 'jules'
    }
  }

  render(<Blog blog={blog} />)

  const title = screen.getByText('Component testing is done with react-testing-library', { exact: false })
  expect(title).toBeDefined()

  const author = screen.getByText('Arto Hellas', { exact: false })
  expect(author).toBeDefined()

  const url = screen.queryByText('https://fullstackopen.com/')
  expect(url).toBeNull()

  screen.debug(author)
})

test('clicking the view button displays url and likes', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Arto Hellas',
    url: 'https://fullstackopen.com/',
    likes: 10,
    user: {
      username: 'jules',
      name: 'Jules'
    }
  }

  render(<Blog blog={blog} />)

  const user = userEvent.setup()

  const button = screen.getByText('view')
  await user.click(button)

  const url = screen.getByText('https://fullstackopen.com/')
  const likes = screen.queryByText('likes 10', { exact: false })

  expect(url).toBeDefined()
  expect(likes).toBeDefined()

  screen.debug(button)
})
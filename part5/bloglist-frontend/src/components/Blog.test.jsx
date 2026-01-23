import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

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

  screen.debug()
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

  screen.debug()
})

test('clicking the like button twice', async () => {
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

  const mockHandler = vi.fn()

  render(<Blog blog={blog} handleLike={mockHandler} />)

  const user = userEvent.setup()

  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
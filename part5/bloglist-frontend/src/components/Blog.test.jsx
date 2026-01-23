import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'
import { send } from 'vite'
import { expect } from 'vitest'

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
  console.log('🚀 ~ :19 ~ title:', title)
  expect(title).toBeDefined()

  const author = screen.getByText('Arto Hellas', { exact: false })
  console.log('🚀 ~ :22 ~ author:', author)
  expect(author).toBeDefined()

  const url = screen.queryByText('https://fullstackopen.com/')
  console.log('🚀 ~ :25 ~ url:', url)
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
  console.log('🚀 ~ :45 ~ user:', user)

  const button = screen.getByText('view')
  console.log('🚀 ~ :47 ~ button:', button)
  await user.click(button)

  const url = screen.getByText('https://fullstackopen.com/')
  console.log('🚀 ~ :50 ~ url:', url)
  const likes = screen.queryByText('likes 10', { exact: false })
  console.log('🚀 ~ :51 ~ likes:', likes)

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
  console.log('🚀 ~ :71 ~ mockHandler:', mockHandler)

  render(<Blog blog={blog} handleLike={mockHandler} />)

  const user = userEvent.setup()
  console.log('🚀 ~ :75 ~ user:', user)

  const viewButton = screen.getByText('view')
  console.log('🚀 ~ :78 ~ viewButton:', viewButton)
  await user.click(viewButton)

  const likeButton = screen.getByText('like')
  console.log('🚀 ~ :81 ~ likeButton:', likeButton)
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
  console.log('🚀 ~ :85 ~ mockHandler.mock.calls:', mockHandler.mock.calls)

  screen.debug()
})

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const titleInput = screen.getByPlaceholderText('write title here')
  const authorInput = screen.getByPlaceholderText('write author here')
  const urlInput = screen.getByPlaceholderText('write url here')
  const sendButton = screen.getByText('create')

  await user.type(titleInput, 'testing form title')
  await user.type(authorInput, 'test author')
  await user.type(urlInput, 'www.test.com')

  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)

  expect(createBlog.mock.calls[0][0].title).toBe('testing form title')
  expect(createBlog.mock.calls[0][0].author).toBe('test author')
  expect(createBlog.mock.calls[0][0].url).toBe('www.test.com')

  screen.debug()
})
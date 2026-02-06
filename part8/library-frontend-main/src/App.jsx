import { useState } from 'react'
import { useQuery } from '@apollo/client/react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { ALL_AUTHORS, ALL_BOOKS } from './queries.js'
import Notify from './components/Notify.jsx'

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)

  if (authors.loading) {
    return <div>loading...</div>
  }

  if (books.loading) {
    return <div>loading...</div>
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000);
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors
        authors={authors.data.allAuthors}
        show={page === 'authors'}
      />

      <Books
        books={books.data.allBooks}
        show={page === 'books'}
      />

      <NewBook
        setError={notify}
        show={page === 'add'}
      />
    </div>
  )
}

export default App

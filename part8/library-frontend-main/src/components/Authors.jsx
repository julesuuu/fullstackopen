import { useState } from 'react'
import { ALL_AUTHORS, UPDATE_AUTHOR } from '../queries'
import { useMutation } from '@apollo/client/react'
import { useQuery } from '@apollo/client/react'

const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const result = useQuery(ALL_AUTHORS)

  const setError = props.setError

  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onCompleted: (data) => {
      console.log('mutation data', data)
      if (!data.editAuthor) {
        setError('author not found')
      }
    }
  })

  if (!props.show) return null

  if (result.loading) return <div>loading...</div>

  const authors = result.data?.allAuthors || []
  console.log('Current authors in state:', authors)

  const submit = async (event) => {
    event.preventDefault()
    updateAuthor({ variables: { name, setBornTo: Number(born) } })
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
        </thead>
        <tbody>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <select value={name} onChange={({ target }) => setName(target.value)}>
            <option value="">Select an author...</option>
            {authors.map(a => (
              <option key={a.id} value={a.name}>{a.name}</option>
            ))}
          </select>
        </div>
        <div>
          born <input
            type='number'
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors

import { useEffect, useState } from 'react'
import userService from '../services/users.js'
import { Link } from 'react-router-dom'

const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    userService
      .getAll()
      .then(data => setUsers(data))
  }, [])

  return (
    <div>
      <h3>Users</h3>
      <table>
        <thead>
          <tr>
            <th></th>
            <th><strong>blogs created</strong></th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td><Link to={`/users/${u.id}`}>{u.name}</Link></td>
              <td>{u.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
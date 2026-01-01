import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Julius D Pogi', id: 'Julius D Pogi', number: '+63-991-341-4796' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addContact = (event) => {
    event.preventDefault()

    const nameExists = persons.some(person => person.name === newName)

    if (nameExists) {
    alert(`${newName} is already added to phonebook`)
    return
    }
    
    const nameOject = {
      name: newName,
      id: newName,
      number: newNumber
    }
    setPersons(persons.concat(nameOject))
    setNewName('')
    setNewNumber('')
  }

  const handleAddName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  
  const handleAddNumber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addContact}>
        <div>
          name: <input
            value={newName}
            onChange={handleAddName}
          />
        </div>
        <div>
          number: <input
            value={newNumber}
            onChange={handleAddNumber}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => 
        <p key={person.id}>{person.name} {person.number}</p>
      )}
      <div>debug: {newName} {newNumber} </div>
    </div>
  )
}

export default App
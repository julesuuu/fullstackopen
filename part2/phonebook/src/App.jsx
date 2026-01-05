import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import personServices from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [info, setInfo] = useState({message: null, type: null})

  const notify = (message, type = 'success') => {
    setInfo({ message, type })
    setTimeout(() => {
      setInfo({ message: null, type: null })
    },3000)
  }

  useEffect(() => {
  personServices
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
    console.log(event.target.value)
  }

  const personsToShow = persons.filter(person => 
    person.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
  )

  const addContact = (event) => {
    event.preventDefault()

    const existingPerson = persons.find(person => person.name === newName)
    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const changedPerson = { ...existingPerson, number: newNumber }
        
        personServices
          .update(existingPerson.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => 
              person.id !== existingPerson.id ? person : returnedPerson
            ))
            setNewName('')
            setNewNumber('')
            console.log('done')

            notify(`Number for '${returnedPerson.name}' is changed successfully!`, 'success')
          })
          .catch(error => {
            console.log(error)
            
            notify(`Information of '${existingPerson.name}' was already removed from the server`, 'error')
            setPersons(persons.filter(person => person.id !== existingPerson.id))
          })
      }
      return
    }

    const nameOject = { 
      name: newName,
      number: newNumber
    }

    personServices
      .create(nameOject)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        
        notify(`Added '${returnedPerson.name}' successfully!`, 'success')
      })
  }

  const handleAddName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  
  const handleAddNumber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleDelete = (id, person) => {
    console.log('deleting', id , 'typeOf', typeof id)
    if (window.confirm(`Delete ${person}`)) {
      personServices
        .deleteName(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          notify(`Deleted '${person}' successfully!`)

        })
        .catch(error => {
          console.log(error)
          notify(`Information of '${person}' was already removed from the server`, 'error')
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification info={info} />
      <Filter
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
      />
      <h3>add a new</h3>
      <PersonForm
        addContact={addContact}
        newName={newName}
        handleAddName={handleAddName}
        newNumber={newNumber}
        handleAddNumber={handleAddNumber}
      />
      <h3>Numbers</h3>
      <Persons
        personsToShow={personsToShow}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default App
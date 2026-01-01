const PersonForm = ({addContact, newName, handleAddName, newNumber, handleAddNumber}) => {
  return (
    <form onSubmit={addContact}>
      <div>
        name: <input value={newName} onChange={handleAddName} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleAddNumber} />
      </div>
      <button type='submit'>add</button>
    </form>
  )
}

export default PersonForm
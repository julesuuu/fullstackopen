const PersonForm = ({onSubmit, newName, handleAddName, newNumber, handleAddNumber}) => {
  return (
    <form onSubmit={onSubmit}>
      <h3>add a new</h3>
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
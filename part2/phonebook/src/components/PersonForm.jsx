const PersonForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <h3>add a new</h3>
      <div>
        name: <input value={props.newName} onChange={props.handleAddName} />
      </div>
      <div>
        number: <input value={props.new} onChange={props.handleAddNumber} />
      </div>
      <button type='submit'>add</button>
    </form>
  )
}

export default PersonForm
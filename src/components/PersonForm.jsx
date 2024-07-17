const PersonForm = (props) => {
  return (
    <form>
      <div>
        Name: <input id='input_name' onChange={props.handleNameChange} />
      </div>
      <div>
        Number: <input id='input_number' onChange={props.handleNumberChange} />
      </div>
      <div>
        <button onClick={props.handleSubmitName} type="submit">Add</button>
      </div>
    </form>
  )
}

export default PersonForm;
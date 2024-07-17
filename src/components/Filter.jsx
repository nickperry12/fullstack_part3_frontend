const Filter = (props) => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div>
        Search: <input id="input_search" type="text" onChange={props.handleSearchName} />
      </div>
    </form>
  )
}

export default Filter;
const Success = (props) => {
  const successStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return (
    <div style={successStyle}>
      <p>{props.successMsg}</p>
    </div>
  )
}

export default Success;
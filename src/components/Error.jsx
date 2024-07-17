const style = {
  color: 'red',
  background: 'lightgrey',
  fontSize: 20,
  border: 'solid',
  borderRadius: 5,
  marginBottom: 10,
  padding: 10
}

const Error = (props) => {
  return (
    <div style={style}>
      {props.errorMsg}
    </div>
  )
}

export default Error;
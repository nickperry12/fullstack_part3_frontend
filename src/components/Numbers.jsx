import Delete from './Delete';

const Numbers = (props) => {
  return (
    <>
      <tr>
        <td>{props.name} {props.number}</td>
        <td><Delete handleDelete={props.handleDelete}/></td>
      </tr>
    </>
  )
}

export default Numbers;
import { useState, useEffect } from 'react';
import Numbers from './components/Numbers';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Success from './components/Success';
import Error from './components/Error';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newSearchName, setSearchName] = useState('');
  const [SuccessMsg, setSuccess] = useState(null);
  const [ErrorMsg, setError] = useState(null);

  useEffect(() => {
    personService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons);
      })
      .catch(error => console.error('There was an error: ', error));
  }, []);

  const resetFields = () => {
    setNewName('');
    setNewNumber('');
    document.getElementById('input_name').value = '';
    document.getElementById('input_number').value = '';
  }

  const updateSuccess = (msg) => {
    setSuccess(msg);
    setTimeout(() => {
      setSuccess(null);
    }, 5000);
  }

  const updateError = (msg) => {
    setError(msg);
    setTimeout(() => {
      setError(null);
    }, 10000)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleSearchName = (event) => {
    event.preventDefault();
    setSearchName(event.target.value);
  }

  const handleDelete = (id) => () => {
    const person = persons.find(person => person.id === id);
    let index = persons.indexOf(person);
    let updatedPersons = persons.slice();
    updatedPersons.splice(index, 1);

    if (confirm('Are you sure you want to delete the number?')) {
      personService
        .remove(id)
        .then((result) => {
          console.log(person);
          setPersons(updatedPersons);
          updateSuccess(`${person.name} successfully deleted`);
        })
        .catch(err => {
          updateError(`There was an error: ${err}`);
        });
    } else {
      console.log('User cancelled delete.');
    }
  }

  const namesToShow = newSearchName === ''
    ? persons
    : persons.filter(person => {
        return person.name.toLowerCase()
                      .startsWith(newSearchName.toLowerCase())
    });

  const handleSubmitName = (event) => {
    event.preventDefault();
    if (persons.some(person => person.name === newName)) {
      if (confirm(`${newName} already exists. Do you want to replace it?`)) {
        let person = persons.find(person => person.name === newName);
        let newPerson = { ...person, name: newName, number: newNumber };
        personService
          .update(person.id, newPerson)
          .then((result) => {
            const updatedPersons = persons.map(person => {
                                      return person.id === result.id
                                      ? result
                                      : person;
                                    });
            setPersons(updatedPersons);
            resetFields();
          })
          .catch(err => console.error('There was an error: ', err));
      }
    } else {
      const newId = persons.length > 0 
                                   ? Math.max(persons.map(p => p.id)) + 1
                                   : 1;

      
      let newPerson = {
        id: newId,
        name: newName,
        number: newNumber,
      };

      personService
        .create(newPerson)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          updateSuccess(`${returnedPerson.name} was successfully added!`);
          resetFields();
        })
        .catch(error => console.error('There was an error: ', error));
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      {ErrorMsg ? <Error errorMsg={ErrorMsg} /> : null }
      {SuccessMsg ? <Success successMsg={SuccessMsg} /> : null }
      <Filter handleSearchName={handleSearchName} />
      <h2>Add New Name</h2>
      <PersonForm
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleSubmitName={handleSubmitName}
      />
      <h2>Numbers</h2>
      <table>
        <tbody>
          {namesToShow.map(person => {
            return <Numbers 
              key={person.id} 
              name={person.name} 
              number={person.number}
              handleDelete={handleDelete(person.id)}  
            />
          })}
        </tbody>
      </table>
    </div>
  )
}

export default App;
import React, { useState, useEffect } from 'react'
import Filter from './components/filter'
import PersonForm from './components/personForm'
import Persons from './components/persons'
import axios from 'axios';

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ searchOption, setSearchOption ] = useState('');
  const [ searchResult, setSearchResult ] = useState(persons);

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(res => {
      const data = res.data;
      setPersons(data);
    });
  }, []);

  // clears name and number inputs
  const clear = () => {
    setNewName('');
    setNewNumber('');
  }
  // check if name and number are not empty strings or number is in correct form
  const validateNameAndNum = (personObject) => {
    if (!newName || !newNumber || isNaN(newNumber)) {
        clear();
        return;
    }
    // check if there is already a person with the same name
    if (persons.map(person => person.name.toLowerCase()) 
      .includes(newName.trim().toLowerCase())) {
        clear()
        return alert(`${personObject.name} is already added to phonebook`);
    }
    return true;
  }

  const addPerson = (e) => {
    e.preventDefault();
    const personObject = {
        name: newName,
        number: newNumber 
    }
    // if name and number are ok, add person to the phonebook
    if (validateNameAndNum(personObject)) { 
      setPersons(persons.concat(personObject));
      clear();
    }
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  }
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  }
  const handleSearchOption = (e) => {
    setSearchOption(e.target.value);

    // search in array of persons' names with input value
    const result = persons.filter( 
      person => person.name
      .toLowerCase()
      .includes(
        e.target.value
        .toLowerCase()
        .trim()
      )
    );
    setSearchResult(result);
  }
  // if input field for searching is empty, show all persons
  const phoneBook = searchOption ? searchResult : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleSearchOption={handleSearchOption} />
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newName={newName} newNumber={newNumber} />
      <h2>Numbers</h2>
      <Persons phoneBook={phoneBook} />
    </div>
  )
}

export default App
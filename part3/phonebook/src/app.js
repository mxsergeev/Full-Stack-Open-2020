import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchOption, setSearchOption ] = useState('')
  const [ searchResult, setSearchResult ] = useState(persons)
  const [notificationMessage, setNotificationMessage ] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, []);

  // clears name and number inputs
  const validateNameAndNum = (personObject) => {
    // check if name and number are not empty strings or number is in correct form
    if (!newName || !newNumber || isNaN(newNumber)) {
      return alert(`Name or number is not specified or number is in wrong format`)
    }
    // check if there is already a person with the same name
    const exists = persons.filter(person => person.name.toLowerCase() === newName.toLowerCase())
    if (exists.length > 0) {
      const existingPerson = persons.find(person => person.name === personObject.name)
      handleUpdate(personObject, existingPerson.id)
      return
    }
    return true
  }
  const clear = () => {
    setNewName('')
    setNewNumber('')
  }
  const addPerson = (e) => {
    e.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber 
    }
    // if name and number are ok, add person to the phonebook
    if (validateNameAndNum(personObject)) { 
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          clear()
          const notification = {
            message: `Added ${personObject.name}`, 
            error: false
          }
          setNotificationMessage(notification)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
    }
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }
  const handleSearchOption = (e) => {
    setSearchOption(e.target.value)

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
  const handleUpdate = (personObject, id) => {
    if (window.confirm(`${personObject.name} is already added to phonebook, replace the old number with a new one?`)) {
      personService
        .updatePerson(personObject, id)
        .then(returnedPerson => {
          const filteredPhonebook = persons.filter(p => p.id !== id)
          setPersons(filteredPhonebook.concat(returnedPerson))
          clear()
          const notification = {
            message: `${returnedPerson.name} updated`, 
            error: false
          }
          setNotificationMessage(notification)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
        .catch(error => {
          const filteredPhonebook = persons.filter(p => p.id !== id)
          setPersons(filteredPhonebook)
          clear()
          const notification = {
            message: `Information of ${personObject.name} has already been removed from server.`, 
            error: true
          }
          setNotificationMessage(notification)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
    }
  }
  const handleDeletion = (name, id) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personService
        .deletePerson(id)
        .then(() => {
          const filteredPhonebook = persons.filter(p => p.id !== id)
          setPersons(filteredPhonebook)
        })
    }
  }
  // if input field for searching is empty, show all persons
  const phoneBook = searchOption ? searchResult : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notificationMessage}/>
      <Filter handleSearchOption={handleSearchOption} />
      <h2>add a new</h2>
      <PersonForm 
        addPerson={addPerson} 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange} 
        newName={newName} 
        newNumber={newNumber} 
      />
      <h2>Numbers</h2>
      <Persons phoneBook={phoneBook} handleDeletion={handleDeletion}/>
    </div>
  )
}

export default App
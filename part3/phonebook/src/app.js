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
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, []);

  // check if name and number are not empty strings
  const nameAndNumExist = () => {
    if (!newName || !newNumber || isNaN(newNumber)) {
      return alert(`Name or number is not specified or number is in wrong format`)
    }
    return true
  }
  
  // clears name and number inputs
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
    // check if there is already a person with the same name
    // if so, update and return
    const exists = persons.filter(person => person.name.toLowerCase() === newName.toLowerCase())
    if (exists.length > 0) {
      const existingPerson = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
      handleUpdate({...existingPerson, number: newNumber}, existingPerson.id)
      return
    }
    // if name and number are ok, add person to the phonebook
    if (nameAndNumExist()) { 
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          clear()
          const notification = {
            message: `Added ${personObject.name}`, 
            error: false
          }
          setNotification(notification)
        })
        .catch(err => {
          setNotificationForValidationErrors(err.response.data.error)
        })
    }
  }

  function setNotification(notification) {
    setNotificationMessage(notification)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  function setNotificationForValidationErrors(errMessage) {
    const notification = {
      message: errMessage.length > 1 ? errMessage.join('\n') : errMessage,
      error: true
    }
    setNotification(notification)
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
            if (!returnedPerson) throw new Error(`${personObject.name} has already been removed from server.`)

            const filteredPhonebook = persons.filter(p => p.id !== id)
            setPersons(filteredPhonebook.concat(returnedPerson))
            clear()
            const notification = {
              message: `${returnedPerson.name} updated`, 
              error: false
            }
            setNotification(notification)
        })
        .catch(err => {
          if (err.response) {
            return setNotificationForValidationErrors(err.response.data.error)
          }
          const filteredPhonebook = persons.filter(p => p.id !== id)
          setPersons(filteredPhonebook)
          clear()
          const notification = {
            message: err.message,   
            error: true
          }
          setNotification(notification)
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
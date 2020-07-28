import React from 'react';

const Persons = ({ phoneBook, handleDeletion }) => {
  return (
    phoneBook.map(person => {
      return (
        <div key={person.name}>
          {person.name} {person.number}
          <button key={person.id} onClick={() => { handleDeletion(person.name, person.id) } }>Delete</button>
        </div>
      )
    })
  )
}

export default Persons
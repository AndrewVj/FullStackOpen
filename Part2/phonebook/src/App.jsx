import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from '../components/Persons'
import Filter from '../components/Filter'
import PersonForm from '../components/PersonForm'
import personsService from '../services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    personsService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const handleNewNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNewFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const removePerson = (person) => {
    const userChoice = window.confirm(`Delete ${person.name} ?`);

    if(userChoice) {
      personsService
      .remove(person.id)
      .then(deletedPerson => {
        setPersons(persons.filter(person => person.id !== deletedPerson.id))
        setNewName('')
        setNewNumber('')
        setNewFilter('')
      })
    }

  }

  const addPerson = (event) => {

    event.preventDefault()
    
    const personObj = {
      name: newName,
      number: newNumber
    }

    let alreadyPresent = false
    let existingPerson = {}

    persons.forEach((person) => {
      if (person.name === newName) {
       alreadyPresent = true
       existingPerson = person
      }
    })

    if(alreadyPresent) {
      const usrChoice = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if(usrChoice) {
        personsService
        .update(existingPerson.id, {...existingPerson, number: newNumber})
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson ))
        })
      }
    } else {
      personsService
      .create(personObj)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setNewFilter('')
      })    
    }    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        newFilter={newFilter} 
        handleNewFilterChange={handleNewFilterChange}
      />
      <h2>add a new</h2>
      <PersonForm 
        addPerson = {addPerson} 
        newName = {newName} 
        handleNewNameChange = {handleNewNameChange}
        newNumber = {newNumber}
        handleNewNumberChange = {handleNewNumberChange}
      />
      <h2>Numbers</h2>
      <Persons 
        persons={persons} 
        newFilter={newFilter}
        removePerson = {removePerson}
      />
    </div>
  )
}

export default App
import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from '../components/Persons'
import Filter from '../components/Filter'
import PersonForm from '../components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then((response) => {
      setPersons(response.data)
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

  const addPerson = (event) => {

    event.preventDefault()
    
    const personObj = {
      name: newName,
      number: newNumber
    }

    let alreadyPresent = false

    persons.forEach((person) => {
      if (person.name === newName) {
       alreadyPresent = true
      }
    })

    alreadyPresent ? alert(`${newName} is already added to phonebook`) : setPersons(persons.concat(personObj))
    setNewName('')
    setNewNumber('')
    setNewFilter('')
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
      />
    </div>
  )
}

export default App
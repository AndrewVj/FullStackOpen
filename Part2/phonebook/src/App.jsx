import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from '../components/Persons'
import Filter from '../components/Filter'
import PersonForm from '../components/PersonForm'
import personsService from '../services/persons'
import Notification from '../components/Notification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [isError, setIsError] = useState(false)

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

        setNotificationMessage(`${deletedPerson.name} was deleted `)

          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)

        setNewName('')
        setNewNumber('')
        setNewFilter('')
      })
      .catch((error) => {
        console.log("Error => ", error)

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
          console.log("Inside Update")
          setNotificationMessage(`New number is updated for ${returnedPerson.name} `)

          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)

          setNewName('')
          setNewNumber('')
          setNewFilter('')

        })
        .catch((error) => {
         
          setIsError(true)
          setNotificationMessage(`Information of ${existingPerson.name} has already been removed from the server`)

          setTimeout(() => {
            setNotificationMessage(null)
            setIsError(false)
          }, 5000)

          setPersons(persons.filter(person => person.id !== existingPerson.id))

        })
      }
    } else {
      personsService
      .create(personObj)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNotificationMessage(`Added ${returnedPerson.name} `)
        
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)

        setNewName('')
        setNewNumber('')
        setNewFilter('')
    
      })
      .catch((error) => {
        console.log("Error => ", error)
      })   
    }    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} isError={isError}/>
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
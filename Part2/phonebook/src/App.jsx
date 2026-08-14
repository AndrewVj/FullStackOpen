import { useState } from 'react'

const Person = ({person}) => {
  return (
    <div>{person.name} {person.number}</div>
  )
}

const Numbers = ({persons}) => {
  return persons.map(person => <Person key={person.name} person={person}/>)
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '040-1234567'
     }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNewNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumberChange = (event) => {
    setNewNumber(event.target.value)
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
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit = {addPerson}>
        <div>
          name: <input 
                  value={newName}
                  onChange={handleNewNameChange}
                />
        </div>
        <div>
          number: <input 
                  value={newNumber}
                  onChange={handleNewNumberChange}
                />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Numbers persons={persons} />
    </div>
  )
}

export default App
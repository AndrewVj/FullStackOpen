import { useState } from 'react'

const Person = ({person}) => {
  return (
    <div>{person.name}</div>
  )
}

const Numbers = ({persons}) => {
  return persons.map(person => <Person key={person.name} person={person}/>)
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNewNameChange = (event) => {
    setNewName(event.target.value)
  }

  const addName = (event) => {

    event.preventDefault()
    
    const nameObj = {name: newName}

    let alreadyPresent = false

    persons.forEach((person) => {
      if (person.name === newName) {
       alreadyPresent = true
      }
    })

    alreadyPresent ? alert(`${newName} is already added to phonebook`) : setPersons(persons.concat(nameObj))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit = {addName}>
        <div>
          name: <input 
                  value={newName}
                  onChange={handleNewNameChange}
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
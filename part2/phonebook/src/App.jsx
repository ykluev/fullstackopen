import { useState, useEffect } from 'react'
import axios from 'axios'

const Person = ({name, number}) => (
  <p>{name} {number}</p>
)

const Filter = ({filter, onChange}) => {
  return (
    <>
    filter shown with <input 
        value={filter}
        onChange={onChange}
      />

    </>
  )
  
}

const PersonForm = ({entry, onSubmit}) => {
  return (
    <>
    <form onSubmit={onSubmit}>
        <div>
          name: <input 
            value={entry.name.val}
            onChange={entry.name.handler}
          />
        </div>
        <div>
          number: <input 
            value={entry.number.val}
            onChange={entry.number.handler}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
    </>
  )
}

const Persons = ({persons, searchFilter}) => {
  return (
      persons
       .filter((p) => p.name.toLowerCase().includes(searchFilter.toLowerCase()))
       .map(person => <Person key={person.id} name={person.name} number={person.number}/>)
  )
}
   
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchFilter, setNewFilter] = useState('')

  
  const addName = (event) => {
    event.preventDefault()
    if (persons.map(p => p.name.toLowerCase()).includes(newName.toLowerCase())) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    const newPeople = persons.concat(newPerson)
    setPersons(newPeople)
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const phoneEntry = {
    name: {val: newName, handler: handleNameChange},
    number: {val: newNumber, handler: handleNumberChange}
  }

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })    
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={searchFilter} onChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm entry={phoneEntry} onSubmit={addName}/>
      <h2>Numbers</h2>    
      <Persons persons={persons} searchFilter={searchFilter}/>  
    </div>
  )
}

export default App
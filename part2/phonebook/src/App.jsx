import { useState, useEffect } from 'react'

import personService from './services/persons'

const Person = ({person, onClick}) => (
  <p>
    {person.name} {person.number} 
    <button onClick={() => onClick(person)}>delete</button>
  </p> 
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

const Persons = ({persons, searchFilter, onDelete}) => {
  return (
      persons
       .filter((p) => p.name.toLowerCase().includes(searchFilter.toLowerCase()))
       .map(person => <Person key={person.id} person={person} onClick={onDelete}/>)
  )
}
   
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchFilter, setNewFilter] = useState('')

  console.log("render")

  const addName = (event) => {
    event.preventDefault()
    
    const newPerson = {
      name: newName,
      number: newNumber
    }

    if (persons.map(p => p.name.toLowerCase()).includes(newName.toLowerCase())) {
      const id = persons.find((p) => p.name === newName).id
      console.log('filtered person', persons.filter((p) => p.name === newName) )
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        personService
          .update(id, newPerson)
          .then( response => {
            setPersons(persons.map(p => p.id === id ? response.data : p ))
            setNewName('')
            setNewNumber('')
          })
      }
      return
    }

    personService
      .create(newPerson)
      .then(response => {
        const newPeople = persons.concat(response.data)
        setPersons(newPeople)
        setNewName('')
        setNewNumber('')
      })
    
  }

  const deleteName = (person) => {
    console.log(`del ${person.id}`)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
      .deletePerson(person.id)
      .then(() => {
        setPersons(persons.filter(p => p.id != person.id))
      })
    }
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
    personService
      .getAll()
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
      <Persons persons={persons} searchFilter={searchFilter} onDelete={deleteName}/>  
    </div>
  )
}

export default App
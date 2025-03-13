import { useState } from 'react'


const Person = ({name, number}) => (
  <p>{name} {number}</p>
)

const Filter = () => {
  

}
 
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
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
    console.log(newNumber);
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with <input 
        value={searchFilter}
        onChange={handleFilterChange}
      />
      <h2>add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          number: <input 
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>      
      {
       persons
        .filter((p) => p.name.toLowerCase().includes(searchFilter.toLowerCase()))
        .map(person => <Person key={person.id} name={person.name} number={person.number}/>)
      }
    </div>
  )
}

export default App
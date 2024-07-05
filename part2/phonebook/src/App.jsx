import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterName = (event) => {
    setFilter(event.target.value)
  }

  const cosas = () => {
    const resultado = persons.filter(el => el.name.toLowerCase().includes(filter.toLowerCase()))
    console.log(resultado);
  }

  const addName = (event) => {
    event.preventDefault()
    const noteObject = {
      name: newName,
      number: newNumber
    }
    console.log('añado el nombre', noteObject)
    console.log('lista', persons)
    const index = persons.findIndex(i => i.name === noteObject.name);
    console.log('indice', index)
    if (index === -1) {
      setPersons(persons.concat(noteObject))
      setNewName('')
    }
    else {
      alert(`${noteObject.name} is already added to phonebook`);
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with <input onChange={handleFilterName} />
      <h2>Add a new</h2>
      <form onSubmit={addName}>
        <div onChange={handleNameChange}>
          name: <input />
        </div>
        <div onChange={handleNumberChange}>
          number: <input />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {cosas}
      {persons
        .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
        .map(person =>  <p key={person.id}>{person.name} {person.number}</p>)}
    </div>
  )
}

export default App

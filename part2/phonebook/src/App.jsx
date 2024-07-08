import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import axios from 'axios'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }

  useEffect(hook, [])
  console.log('render', persons.length, 'persons')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterName = (event) => {
    setFilter(event.target.value)
  }

  const deletePerson = (id) => {
    const name = persons.filter((person) => {
      console.log(person.id, id);
      return person.id === id
    })

    if (confirm(`${name[0].name}`)) {
      console.log('name', name[0].name, id, name[0].id);
      personsService.remove(name[0].id)
        .then(setPersons(persons.filter(person => person.id !== name[0].id)))
    } else {
      console.log('Cosas');
    }
  }

  const addName = (event) => {
    event.preventDefault()
    const noteObject = {
      id: (persons.length + 1).toString,
      name: newName,
      number: newNumber
    }
    console.log('añado el nombre', noteObject)
    console.log('lista', persons)
    const index = persons.findIndex(i => i.name === noteObject.name);
    console.log('indice', index)
    if (index === -1) {
      personsService
        .create(noteObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
        })
    } else {
      alert(`${noteObject.name} is already added to phonebook`);
    }

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterName={handleFilterName} />
      <h3>Add a new</h3>
      <PersonForm addName={addName} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} deletePerson={deletePerson} />
    </div>
  )
}

export default App

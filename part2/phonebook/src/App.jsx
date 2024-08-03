import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import personsService from './services/persons'
import login from './services/login'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const hook = () => {
    console.log('effect')
    personsService
      .getAll()
      .then(response => {
        console.log('promise fulfilled', response)
        setPersons(response)
      })
  }

  useEffect(hook, [])
  console.log('render', persons.length, 'persons')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedPhoneBookappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      personsService.setToken(user.token)
    }
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterName = (event) => {
    setFilter(event.target.value)
  }
  

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await login.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedPhoneBookappUser', JSON.stringify(user)
      ) 
      
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setError('Wrong credentials')
      setTimeout(() => {
        setError(null)
      }, 5000)
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
          setMessage(
            `Added ${returnedPerson.name}`
          )
          setTimeout(() => {
            setMessage('')
          }, 5000)
          setPersons(persons.concat(returnedPerson))
          setNewName('')
        })
        .catch(error => {
          console.log(error.response.data.error)
          setError(true)
          setMessage(error.response.data.error)
          setTimeout(() => {
            setMessage('')
          }, 5000)
        })
    }
    else {
      confirm(`${noteObject.name} is already added to phonebook, replace the old number with a new one?`)
      const oldId = persons[index].id
      noteObject.id = oldId
      personsService
        .update(oldId, noteObject)
        .then(() => {
          console.log(noteObject)
          setMessage(`Updated ${noteObject.name}`)
          setTimeout(() => {
            setMessage('')
          }, 5000)
          const arr = persons.filter(person => person.id !== oldId)
          console.log('update', arr);
          const newArr = arr.concat(noteObject)
          console.log('concat', newArr);
          setPersons(newArr)
          setNewName('')
        })
        .catch(error => {
          console.log(error);
          setError(true)
          setMessage(`Information of ${noteObject.name} has already been removed from server`)
          setTimeout(() => {
            setMessage('')
          }, 5000)
        })
    }
  }

  const deletePerson = (id) => {
    const name = persons.filter((person) => {
      console.log(person.id, id);
      return person.id === id
    })

    if (confirm(`Delete ${name[0].name} ?`)) {
      console.log('name', name[0].name, id, name[0].id);
      personsService.remove(name[0].id)
        .then(setPersons(persons.filter(person => person.id !== name[0].id)))
        .catch(error => {
          console.log(error);
          setError(true)
          setMessage(`Information of ${name[0].name} has already been removed from server`)
          setTimeout(() => {
            setMessage('')
          }, 5000)
        }
        )
    } else {
      console.log('User has cancel the operation');
    }
  }

  const LoginForm = () => {
    return (
        <form onSubmit={handleLogin}>
            <div>
              username:
              <input
                type='text'
                value={ username }
                name='username'
                onChange={ ({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
              password:
              <input
                type='password'
                value={password}
                name='password'
                onChange={ ({ target }) => setPassword(target.value)}
              />
            </div>
            <button type='submit'>login</button>
          </form>
    )
    }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} esError={error} />
      { user === null ? LoginForm() : <div><p>{user.name} logged-in</p></div>}
      <Filter handleFilterName={handleFilterName} />
      <h3>Add a new</h3>
      <PersonForm addName={addName} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} deletePerson={deletePerson} />
    </div>
  )
}

export default App

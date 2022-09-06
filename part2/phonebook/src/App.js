import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import backend from './services/backend'
import Notification from './components/Notification'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [filteredNames, setFilteredNames] = useState([])
  const [notificationMessage, setNotificationMessage] = useState(null)

  useEffect(() => {
    backend
      .getAll()
      .then((initializedPersons) => {
        setPersons(initializedPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const person = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
    if (person && window.confirm(`${person.name} is already added to the phonebook, replace the old number with a new one?`)) {
      // alert(`${newName} is already added to phonebook`)
      const newPerson = { name: person.name, number: newNumber }
      backend
        .update(person.id, newPerson)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
          setNewName('')
          setNewNumber('')
        })
        setNotificationMessage(`Updated ${person.name}`)
    } else {
      const newPerson = { name: newName, number: newNumber }
      backend
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
        setNotificationMessage(`Added ${newName}`)
    }
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterNameChange = (event) => {
    setFilterName(event.target.value)
    const filtered = persons.filter(person =>
      person.name.toLowerCase().includes(event.target.value)
    )
    setFilteredNames(filtered)
  }

  const deletePerson = (id) => {
    const person = persons.find(n => n.id === id)
    if (window.confirm(`Delete ${person.name} ?`)) {
      backend
        .deletePerson(id)
        .then(() => setPersons(persons.filter(p => p.id !== id)))
        .catch(err => {
          setNotificationMessage(`Information of ${person.name} has already been removed from server`)
          setPersons(persons.filter(p => p.id !== id))
        })
        setNotificationMessage(`Deleted ${person.name}`)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} /> 

      <Filter filterName={filterName} filteredNames={filteredNames}
        handleFilterNameChange={handleFilterNameChange} />

      <h2>Add a new</h2>

      <PersonForm addPerson={addPerson} newName={newName} handlePersonChange={handlePersonChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange} />

      <h2>Numbers</h2>

      <Persons persons={persons} deletePerson={deletePerson} />

    </div>
  )
}

export default App;

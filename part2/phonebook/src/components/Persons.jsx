const Persons = (props) => {
  console.log('numbers', props);
  const { persons, filter, deletePerson } = props
  return (
    <>
      {persons
        .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
        .map(person => <p key={person.id}>{person.name} {person.number}  <button type="submit" onClick={() => deletePerson(person.id)}>delete</button></p>)}
    </>
  )
}

export default Persons
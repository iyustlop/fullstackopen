const Numbers = (props) => {
    console.log('numbers', props);
    const { persons, filter } = props
    return (
        <>
      {persons
        .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
        .map(person =>  <p key={person.id}>{person.name} {person.number}</p>)}
        </>
    )
}

export default Numbers
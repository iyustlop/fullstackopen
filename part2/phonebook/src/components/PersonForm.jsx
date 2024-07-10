const PersonForm = ({addName, handleNameChange, handleNumberChange}) => {
    console.log('Peson Form', addName, handleNameChange, handleNumberChange);
    return (
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
        )
}

export default PersonForm
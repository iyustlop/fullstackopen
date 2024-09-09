const Country = ({ country }) => {
  console.log(country)
    if (!country) {
      return null
    }
    
    if (country.error) {
      return (
        <div>
          not found...
        </div>
      )
    }
    
    return (
      <div>
        <h3>{country.data.name.common} </h3>
        <div>capital {country.data.capital} </div>
        <div>population {country.data.population}</div> 
        <img src={country.data.flags.png} height='100' alt={`flag of ${country.data.name.coomon}`}/>  
      </div>
    )
  }

export default Country
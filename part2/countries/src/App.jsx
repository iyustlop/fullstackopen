import { useState, useEffect } from 'react'
import Country from './components/Country'
import countriesService from './services/countries'

const App = () => {
  const [country, setCountry] = useState("")
  const [countries, setCountries] = useState([])

  useEffect(() => {
    console.log('use Efect boot');
    if (country) {
      console.log('country:', country);
      countriesService
        .getAll()
        .then((returnedCountries) => {
          setCountries(returnedCountries.filter(returned => returned.name.common.toLowerCase().includes(country.toLowerCase())))
        })
    } else setCountries([])
  }, [country])

  const handleChange = (event) => {
    setCountry(event.target.value)
  }

  const showCountry = (name) => {
    setCountries(countries.filter((i) => i.name.common == name));
  };

  return (
    <>
      <label htmlFor="country">Find Country</label>
      <input id="country" value={country} onChange={handleChange} />
      <div>
        {countries &&
          (countries.length > 10 ? (
            "Too many matches, specifies another filter"
          ) : countries.length == 1 ? (
            <Country data={countries[0]} />
          ) : (
            <ul>
              {countries.map((c) => (
                <li key={c.name.common}>
                  {c.name.common}{" "}<button onClick={() => showCountry(c.name.common)}>show</button>
                </li>
              ))}
            </ul>
          ))}
      </div>
    </>
  );
};

export default App

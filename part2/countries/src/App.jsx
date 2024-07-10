import { useState, useEffect } from 'react'
import Country from './components/Country'
import countriesService from './services/countries'

const App = () => {
  const [country, setCountry] = useState("")
  const [countries, setCountries] = useState([])
  const [weather, setWeather] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    console.log('use Efect boot');
    if (country) {
      console.log('country:', country);
      countriesService
        .getAll()
        .then((returnedCountries) => {
          setCountries(returnedCountries.filter(returned => returned.name.common.toLowerCase().includes(country.toLowerCase())))
        })
        .catch((err) => {
          setError(err.message);
          setTimeout(() => setError(""), 5000);
        });
    } else setCountries([])
  }, [country])

  useEffect(() => {
    if (countries.length == 1) {
      countriesService
        .getWeatherByCountry(countries[0].name.common)
        .then((res) => {
          setWeather(res);
        })
        .catch((err) => {
          setError(err.message);
          setTimeout(() => setError(""), 5000);
        });
    }
  }, [countries]);

  const handleChange = (event) => {
    setCountry(event.target.value)
  }

  const showCountry = (name) => {
    setCountries(countries.filter((i) => i.name.common == name));
  };
console.log(weather);
  return (
    <>
      {error && (
        <div style={{
            color: "red",
            padding: 10,
            border: "2px solid red",
            backgroundColor: "lightgray",
          }}>
          {error}
        </div>
      )}
      <label htmlFor="country">Find Country</label>
      <input id="country" value={country} onChange={handleChange} />
      <div>
        {countries &&
          (countries.length > 10 ? (
            "Too many matches, specifies another filter"
          ) : countries.length == 1 && Object.keys(weather).length? (
            <Country data={countries[0]} weather={weather}/>
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

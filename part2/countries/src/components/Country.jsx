const Country = ({ data, weather }) => {

  const languages = Object.keys(data.languages);
  console.log('weather',weather);
  return (
    <div>
      <h2>{data.name.common}</h2>
      <div>capital {data.capital}</div>
      <div>area {data.area}</div>
      <h4>Languages</h4>
      <ul>
        {languages.map((l) => (
          <li key={l}> {data.languages[l]}</li>
        ))}
      </ul>
      <img src={data.flags.png} alt={data.flags.alt} />
      <h3>Weather in {data.name.common}</h3>
      <div>temperature - {weather.main.temp} Celcius</div>
      <div>
        <img
          src={` https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
        />
      </div>
    </div>
  );
};

export default Country
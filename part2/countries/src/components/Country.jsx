const Country = ({ data, weather }) => {

  const languages = Object.keys(data.languages);
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
    </div>
  );
};

export default Country
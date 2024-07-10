import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const countryUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name/'
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather'
const apiKey = import.meta.env.VITE_SOME_KEY

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const getCountry = (country) => {
    const request = axios.get(`${countryUrl}${country}`)
    return request.then(response => response.data)
}

const getWeatherByCountry = (country) => {
    console.log(apiKey);
    const request = axios.get(`${weatherUrl}?q=${country}&appid=${apiKey}&units=metric`)
    return request.then(response => response.data)
}


export default { getAll, getCountry, getWeatherByCountry}

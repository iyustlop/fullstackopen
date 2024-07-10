import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const countryUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name/'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const getCountry = (country) => {
    const request = axios.get(`${countryUrl}${country}`)
    return request.then(response => response.data)
}



export default { getAll, getCountry }

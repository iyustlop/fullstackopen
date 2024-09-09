import axios from "axios"

    const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name'

    const getCountry = async (name) => {
        const response = await axios.get(`${baseUrl}/${name}`)
        
        return response
    }

export default { getCountry}
import { useState, useEffect } from "react"
import CountryService from "../services/countrySerivice"

export const useCountry = (name) => {
    const [country, setCountry] = useState(null)

    useEffect(() => {
        console.log('name',name)
        if (name !== '') {
            const response = CountryService.getCountry(name)
            response
                .then(response => {
                    console.log(response)
                    setCountry(response)
                })
                .catch((error) => {
                    setCountry(error.response.data)
                })
        }
    }, [name])
  
    return country
  }
  
import { useState, useEffect } from 'react'
import axios from 'axios'
import DisplayCountries from './components/DisplayCountries'

const App = () => {

    const [findCountry, setFindCountry] = useState('')
    const [countries, setCountries] = useState([])
    const [filteredCountries, setFilteredCountries] = useState([])


    const handleFindCountry = (event) => {
        setFindCountry(event.target.value)
        const filtered = countries.filter(country =>
            country.name.common.toLowerCase().includes(event.target.value)
        )
        setFilteredCountries(filtered)
    }

    useEffect(() => {
        axios
            .get('https://restcountries.com/v3.1/all')
            .then(response => {
                setCountries(response.data)
            })
    }, [])



    return (
        <div>
            find countries <input value={findCountry} onChange={handleFindCountry} /> 
            <DisplayCountries countries={filteredCountries} />
        </div>
    )
}

export default App
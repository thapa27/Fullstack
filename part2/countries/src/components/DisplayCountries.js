import { useState } from 'react'
import DisplayCountry from './DisplayCountry'

const DisplayCountries = ({ countries }) => {

    const [showSingleCountry, setShowSingleCountry] = useState(false)
    const [singleCountry, setSingleCountry] = useState([])

    const showCountry = (country) => {
        setShowSingleCountry(true)
        setSingleCountry(country)
    }

    if (countries.length > 10) {
        return (<div>Too many matches, specify another filter</div>)
    } else if (countries.length <= 10 && countries.length > 1) {

        return (
            <div>
                {countries.map(country => <p key={country.name.common}>
                    {country.name.common} <button onClick={() => showCountry(country)}>show</button>
                </p>)}
                {showSingleCountry && <DisplayCountry country={singleCountry} />}
            </div>
        )
    } else if (countries.length === 1 ) {
        return (<DisplayCountry country={countries[0]} />)
    }
}

export default DisplayCountries
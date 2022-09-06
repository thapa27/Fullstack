import { useState, useEffect } from 'react'
import axios from 'axios'

const DisplayCountry = ({ country }) => {

    const [weather, setWeather] = useState({})
    const [gotWeather, setGotWeather] = useState(false)
    const api_key = process.env.REACT_APP_API_KEY
    const weatherURL = `http://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${api_key}`

    useEffect(() => {
        axios
            .get(weatherURL)
            .then(response => {
                setWeather(response.data)
                setGotWeather(true)
            })
    }, [weatherURL])

    console.log(weather)



    let languages = []
    for (const key in country.languages) {
        languages.push(country.languages[key])
    }

    return (
        <div>
            <h1>{country.name.common}</h1>
            capital {country.capital} <br />
            area {country.area}
            <h3>languages:</h3>
            <ul>
                {languages.map(language => <li key={language}>{language}</li>)}
            </ul>
            <img src={country.flags.svg} alt="flag" height="150" width="150" />
            <h2>Weather in {country.capital}</h2>
            temperature {gotWeather && weather.main.temp} Celsius <br />
            <img src={`http://openweathermap.org/img/wn/${gotWeather && weather.weather[0].icon}.png`} height="100" width="100" alt="weather icon" /> <br />
            wind {gotWeather && weather.wind.speed} m/s
        </div>
    )
}

export default DisplayCountry

import { useState, useEffect } from "react" 
import axios from 'axios'
import Filter from "./components/Filter"
import countryService from "./services/countries"
import Display from "./components/Display"

const App = () => {

const [countries, setCountries] = useState([])
const [countryFilter, setCountryFilter] = useState(null)
const [countriesToDisplay, setCountriesToDisplay] = useState([])
const [value, setValue] = useState('')

useEffect(() => {
  if(countryFilter) {
    countryService.getAllCountries()
       .then(allCountries => {
        setCountries(allCountries)
        const filteredCountries = allCountries.filter(country => country.name.common.toLowerCase().includes(countryFilter.toLowerCase()));
        setCountriesToDisplay(filteredCountries)
       })
       .catch(error => {
        console.log("Error => ", error)
       })
  }
}, [countryFilter])


const handleValue = (event) => {
  setValue(event.target.value)
  setCountryFilter(event.target.value)
}

const handleShowButton = (country) => {
  console.log("Event handleShowButton => ", country)
}

  return (
    <div>
      <Filter 
        value={value}
        handleValue={handleValue}
      />

    <Display 
      countriesToDisplay={countriesToDisplay} 
      handleShowButton={handleShowButton}
    />
    </div>
  )
}

export default App
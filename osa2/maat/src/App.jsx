import {useEffect, useState} from "react";
import {Search} from "./components/Search.jsx";
import axios from 'axios'
import CountryOrchestrator from "./components/CountryOrchestrator.jsx";

const baseURL = 'https://studies.cs.helsinki.fi/restcountries/api/all'

function App() {
    const [search, setSearch] = useState('')
    const [countries, setCountries] = useState([]);
    const [chosenCountry, setChosenCountry] = useState(null);

    useEffect(() => {
        axios.get(baseURL)
        .then(res => {
            setCountries(res.data)
        })
    },[])

    const filteredCountries = countries.filter(country => {
        return country.name.common.toLowerCase().includes(search.toLowerCase())
    })
    
    const visibleCountries = chosenCountry ? filteredCountries.filter(country => {
            return country.name.common === chosenCountry
        }) : filteredCountries

    console.log(visibleCountries);

    const handleSelectCountry = (selectedCountry) => {
        setChosenCountry(selectedCountry    )
    }

    const handleSearchChange = (event) => {
        setSearch(event.target.value)
        setChosenCountry(null);
    }


  return (
      <div>
          <Search value={search} onChange={e => handleSearchChange(e)}/>
          <CountryOrchestrator handleSelectCountry={handleSelectCountry} countries={visibleCountries} />
      </div>


  )
}

export default App

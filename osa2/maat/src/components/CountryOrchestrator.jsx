import Country from "./Country.jsx";
import CountrySelector from "./CountrySelector.jsx";

const CountryOrchestrator = ({countries, handleSelectCountry}) => {

    if (!countries || countries.length > 10) return null;

    if (countries.length === 1) {
        return (
            <Country country={countries[0]}/>
        )
    }

    return (
        <div className="countryList">
        {countries.map( (country) => {
            return <CountrySelector key={country.name.common} country={country} onClick={handleSelectCountry}/>
        })}
        </div>
    )
}

export default CountryOrchestrator
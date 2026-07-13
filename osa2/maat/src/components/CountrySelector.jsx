const CountrySelector = ({country, onClick}) => {
    return (
        <div className="countrySelector">
            <p>{country.name.common}</p>
            <button onClick={() => onClick(country.name.common)}>show</button>
        </div>
    )
}
export default CountrySelector;
const Country = ({country}) => {
    const languages = country.languages;
    const capital = country.capital;
    const name = country.name.common;
    const area = country.area;
    const flagLink = country.flags.png;
    const flagAlt = country.flags.alt;

    return (
        <div>
            <h1>{name}</h1>
            <div>
                <p>capital: {capital}</p>
                <p>Area {area}</p>
            </div>
            <div>
                <h2>Languages</h2>
                {Object.entries(languages).map(([key, value]) => (
                    <p key={value}>{value}</p>
                ))}
            </div>
                <img className="fit-picture"
                     src={flagLink}
                     alt={flagAlt}/>
        </div>
    )
}

export default Country
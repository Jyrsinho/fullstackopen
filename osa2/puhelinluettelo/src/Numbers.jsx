export function Numbers({persons}) {
    if (persons.length === 0) return null;
    return (
        <div>
            <h2>Numbers: </h2>
            {persons.map((person) => (
                <div key={person.name}>
                    <p>{person.name}: {person.phone}</p>
                </div>
            ))}
        </div>

    )
}
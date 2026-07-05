export function Numbers({persons}) {
    if (persons.length === 0) return null;
    return (
        <div>
            <h2>Numbers: </h2>
            {persons.map((person) => (
                <p key={person.name}>{person.name}</p>
            ))}
        </div>

    )
}
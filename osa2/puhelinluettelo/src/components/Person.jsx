export function Person({person, handleDelete}) {
    return <div
        style={{display: "flex", flexDirection: "row"}}>
        <p>{person.name}: {person.phone}</p>
        <button style={{padding: 0}} onClick={handleDelete}>delete</button>
    </div>;
}
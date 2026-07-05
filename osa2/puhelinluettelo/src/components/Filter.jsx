export function Filter({filter, onChange}) {
    return <div>
        <label htmlFor={"search"}>filter shown with: </label>
        <input value={filter} onChange={ (event) => onChange(event)} type={"text"} id={"search"}/>
    </div>;
}
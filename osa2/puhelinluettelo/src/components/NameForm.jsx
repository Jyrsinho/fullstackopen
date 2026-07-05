function Input({value, onChange, id}) {
    return <div>
        <label htmlFor={id} >{id}: </label>
        <input id={id} value={value} onChange={(e) => onChange(e)} type="text"/>
    </div>;
}

const NameForm = ({handleNameChange, handleNumberChange, newNumber, newName, onSubmit}) => {
    return (
        <form onSubmit={onSubmit}>
            <h2>add a new</h2>
            <Input value={newName} onChange={handleNameChange} id={"name"} />
            <Input value={newNumber} onChange={handleNumberChange} id={"number"} />
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default NameForm
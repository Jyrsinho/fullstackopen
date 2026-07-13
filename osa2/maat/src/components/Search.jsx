export function Search({value, onChange}) {
    return <div>
        <label>find countries:</label>
        <input type="text" value={value} onChange={onChange}/>
    </div>;
}
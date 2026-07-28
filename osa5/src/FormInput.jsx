export function FormInput({label, onChange, value}) {
    return (
        <div className="form-input">
            <label>{label}
                <input value={value} onChange={({target}) => onChange(target.value)} type={'text'}/>
            </label>
        </div>
    )
}
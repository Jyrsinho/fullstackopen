export function FormInput({label, onChange, value, type='text'}) {
    return (
        <div className="form-input">
            <label>{label}
                <input value={value}
                       onChange={({target}) => onChange(target.value)}
                       type={type}/>
            </label>
        </div>
    )
}
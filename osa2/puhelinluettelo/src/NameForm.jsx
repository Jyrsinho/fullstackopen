const NameForm = ({onChange, onSubmit, value}) => {
    return (
        <form onSubmit={onSubmit}>
            <div>
                <label htmlFor={'name'}></label> <input value={value} onChange={onChange} type='text' />
            </div>
            <div>
                <button type="submit" >add</button>
            </div>
        </form>
    )
}

export default NameForm
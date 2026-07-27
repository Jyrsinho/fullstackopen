export function ErrorMessage({errorMessage}) {

    if (!errorMessage) return null

    return (
        <div>
            <p className={'error-message'}>{errorMessage}</p>
        </div>
    )
}
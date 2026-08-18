import { useEffect } from 'react'

export function StatusMessage({ message, setMessage }) {

    useEffect(() => {
        setTimeout(() => {
            setMessage(null)
        }, 5000)
    }, [message])

    const classname = message.status === 'error' ? 'error-message' : 'success-message'

    if (!message) return null
    return (
        <div className={'status-message-container'}>
            <p className={classname}>{message.message}</p>
        </div>
    )
}
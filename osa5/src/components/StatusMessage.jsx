import { useEffect } from 'react'

export function StatusMessage({ message, resetMessage }) {

    useEffect(() => {
        setTimeout(() => {
            resetMessage()
        }, 5000)
    }, [message, resetMessage])

    const classname = message.status === 'error' ? 'error-message' : 'success-message'

    return (
        <div className={'status-message-container'}>
            <p className={classname}>{message.message}</p>
        </div>
    )
}
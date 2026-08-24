import { useEffect } from 'react'

export function StatusMessage({ message, resetMessage }) {

    useEffect(() => {
        setTimeout(() => {
            resetMessage()
        }, 15000)
    }, [message, resetMessage])

    if (!message) return null

    const classname = message.status === 'error' ? 'error-message' : 'success-message'

    return (
        <div className={'status-message-container'}>
            <p className={classname}>{message.message}</p>
        </div>
    )
}
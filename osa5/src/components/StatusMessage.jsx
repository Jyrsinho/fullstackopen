import { useEffect } from 'react'
import { Alert } from '@mui/material'

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
            <Alert className={classname}>{message.message}</Alert>
        </div>
    )
}
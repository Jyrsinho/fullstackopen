import { useEffect } from 'react'
import { Alert } from '@mui/material'

export function StatusMessage({ message, resetMessage }) {

    const textColor = message?.status === 'success' ? 'green' : 'red'

    const style = {
        margin: '1em',
        color: textColor,
    }

    useEffect(() => {
        setTimeout(() => {
            resetMessage()
        }, 15000)
    }, [message, resetMessage])

    if (!message) return null

    return (
        <div className={'status-message-container'}>
            <Alert data-testid="alert" sx={style}>{message.message}</Alert>
        </div>
    )
}
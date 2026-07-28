import {useEffect} from "react";

export function StatusMessage({ message, setMessage }) {

    if (!message) return null

    useEffect(() => {
        setTimeout(() => {
            setMessage(null)
        }, 5000)
    }, [message]);

    const classname = message.status === 'error' ? 'error-message' : 'success-message';

    return (
        <div className={'status-message-container'}>
            <p className={classname}>{message.message}</p>
        </div>
    )
}
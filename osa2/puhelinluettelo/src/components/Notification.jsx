const Notification = ({notification}) => {

    if (!notification) return null;

    const classNameString = notification.type === 'error' ? 'errorMessage' : 'successMessage'

    return (
        <div className={`message ${classNameString}`}>{notification.message}</div>
    )
}
export default Notification
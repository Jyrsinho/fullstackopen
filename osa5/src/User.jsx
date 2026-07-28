export function User({user, onLogout}) {
    return (
        <div>
            <p>{user.name} logged in</p>
            <button onClick={onLogout}>logout</button>
        </div>
    )
}

export default User
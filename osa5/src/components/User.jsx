export function User({ loggedUser, onLogout }) {
    return (
        <div>
            <p>{loggedUser.name} logged in</p>
            <button onClick={onLogout}>logout</button>
        </div>
    )
}

export default User
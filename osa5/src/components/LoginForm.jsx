import { useState } from 'react'
import { FormInput } from './FormInput.jsx'

export function LoginForm({ onSubmit, loggedUser }) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    //TODO - jos on loggedUser näytetään loggedUser - muuten näytetään loginForm
    return (
        <div>
            <h2>Login: </h2>
            <form onSubmit={(e) => onSubmit(e, { username, password })}>
                <FormInput name="username" onChange={ setUsername} value={username} label={'username: '} />
                <FormInput type={'password'} name="password" onChange={ setPassword} value={password} label={'password: '} />
                <button onChange={(e) => onSubmit(e)}>login</button>
            </form>
        </div>
    )
}
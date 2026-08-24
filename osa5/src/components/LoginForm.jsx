import { useState } from 'react'
import { FormInput } from './FormInput.jsx'

export function LoginForm({ handleLogin }) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div>
            <h2>Login: </h2>
            <form onSubmit={(e) => handleLogin(e, { username, password })}>
                <FormInput name="username" onChange={ setUsername} value={username} label={'username: '} />
                <FormInput type={'password'} name="password" onChange={ setPassword} value={password} label={'password: '} />
                <button type={'submit'}>login</button>
            </form>
        </div>
    )
}
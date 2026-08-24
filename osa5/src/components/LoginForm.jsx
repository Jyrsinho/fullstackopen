import { useState } from 'react'
import { Button,  TextField } from '@mui/material'

export function LoginForm({ handleLogin }) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div>
            <h2>Login: </h2>
            <form onSubmit={(e) => handleLogin(e, { username, password })}>
                <TextField autoFocus={true} name={'username'} label={'username'} type={'text'} onChange={(e) => setUsername(e.target.value)} value={username}></TextField>
                <TextField name={'password'} label={'password'} type={'password'} onChange={(e) => setPassword(e.target.value)} value={password}></TextField>
                <Button type={'submit'}>login</Button>
            </form>
        </div>
    )
}
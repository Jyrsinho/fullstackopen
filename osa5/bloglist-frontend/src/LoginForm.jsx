import {useState} from "react";

export function LoginForm({onSubmit}) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div>
            <h2>Login: </h2>
            <form onSubmit={(e) => onSubmit(e, {username, password})}>
                <label >
                    username:
                <input type={'text'}
                       value={username}
                       onChange={({target}) => setUsername(target.value)}
                />
                </label>
                <label >
                    password:
                    <input value={password}
                           onChange={ ({target}) => setPassword(target.value)  } type={'password'}/>
                </label>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}
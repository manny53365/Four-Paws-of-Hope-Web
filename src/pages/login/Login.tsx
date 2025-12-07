import React, { useState } from "react";
import { useLogin } from "../../hooks/useLogin";

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function Login() {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const {login, isPending, error} = useLogin();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await login(email, password);
    }

  return (
    <form className='auth-form' onSubmit={handleSubmit}>
            <h2>Log In</h2>
            <TextField className='signInBtn' required id="outlined-required" label="Email" type='email' value={email} onChange={e => setEmail(e?.target.value)} />
            <TextField className='signInBtn' required id="outlined-required" label="Password" type='password' value={password} onChange={e => setPassword(e?.target.value)} />
            {!isPending && <Button variant="contained">Sign In</Button>}
            {isPending && <Button variant="contained" disabled >Loading</Button>}
            {error && <div className='error'>{error}</div>}
        </form>
  )
}

export default Login

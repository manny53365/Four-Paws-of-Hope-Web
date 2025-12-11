import React, { useState } from "react";
import { useLogin } from "../../hooks/useLogin";

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LoginIcon from '@mui/icons-material/Login';

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
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid size={12}>
                        <TextField className='signUp' required id="outlined-required" label="Email" type='email' value={email} onChange={e => setEmail(e?.target.value)} />
                    </Grid>
                    <Grid size={12}>
                        <TextField className='signUp' required id="outlined-required" label="Password" type='password' value={password} onChange={e => setPassword(e?.target.value)} />
                    </Grid>
                    <Grid size={12}>
                        {!isPending && <Button className='signUpBtn' startIcon={<LoginIcon />} variant="contained">Log In</Button>}
                        {isPending && <Button className='signUpBtn' loading={isPending} variant="outlined" disabled>Logging in...</Button>}
                    </Grid>
                </Grid>
            </Box>
            {error && <div className='error'>{error}</div>}
        </form>
  )
}

export default Login

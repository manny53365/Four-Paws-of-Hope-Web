import { useState } from 'react';
import { useSignup } from '../../hooks/useSignup';

import './Signup.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { CloudUpload } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { HowToReg } from '@mui/icons-material';

export default function Signup() {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [displayName, setDisplayName] = useState<string>('');
    const [fName, setfName] = useState<string>('');
    const [lName, setlName] = useState<string>('');
    const [phone, setPhone] = useState<string>('')
    const [address,setAddress] = useState<string>('')
    const [pfp, setPfp] = useState<File | null>(null);
    const [pfpError, setpfpError] = useState<string | null>(null);
    const {signup, isPending, error} = useSignup();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement> )=> {
        setPfp(null);
        setpfpError(null);
        const selectedImg = event.target.files?.[0] ?? null;
        console.log(selectedImg);

        if (!selectedImg){
            setpfpError('Please select a file');
            return;
        };
        if (!selectedImg.type.includes('image')){
            setpfpError('Selected file must be an image');
            return;
        };
        if (selectedImg.size > 5 * 1024 * 1024) {
            setpfpError('Image file size must be less than 5MB');
            return;
        }

        setpfpError(null);
        setPfp(selectedImg);
        console.log('Thumbnail updated')
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        signup({ email, password, displayName, fName, lName, phone, address, pfp });
    }
    
    return (
        <form className='auth-form' onSubmit={handleSubmit}>

            <h2>Sign Up</h2>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid size={6}>
                        <TextField className='signUp' required id="outlined-required" label="Email" type='email' value={email} onChange={e => setEmail(e?.target.value)} />
                    </Grid>
                    <Grid size={6}>
                        <TextField className='signUp' required id="outlined-required" label="Password" type='password' value={password} onChange={e => setPassword(e?.target.value)} />
                    </Grid>
                    <Grid size={6}>
                        <TextField className='signUp' required id="outlined-required" label="Display Name" type='text' value={password} onChange={e => setDisplayName(e?.target.value)} />
                    </Grid>
                    <Grid size={6}>
                        <TextField className='signUp' required id="outlined-required" label="First Name" type='text' value={fName} onChange={e => setfName(e?.target.value)} />
                    </Grid>
                    <Grid size={6}>
                        <TextField className='signUp' required id="outlined-required" label="Last Name" type='text' value={lName} onChange={e => setlName(e?.target.value)} />
                    </Grid>
                    <Grid size={6}>
                        <TextField className='signUp' required id="outlined-required" label="Phone Number" type='tel' value={phone} onChange={e => setPhone(e?.target.value)} />
                    </Grid>
                    <Grid size={12}>
                        <TextField className='signUpBtn address' required id="outlined-required" label="Physical Address" type='text' value={address} placeholder='Street, City, State, Postal Code' onChange={e => setAddress(e?.target.value)} />
                    </Grid>
                    <Grid size={12}>
                        <Button className='signUpBtn' component="label" role={undefined} variant="contained" tabIndex={-1} startIcon={<CloudUpload />}>
                            Set Profile Photo
                            <input type="file" hidden accept="image/*" onChange={handleFileChange} />
                        </Button>
                    </Grid>
                    <Grid size={12}>
                        {!isPending && <Button className='signUpBtn' startIcon={<HowToReg />} variant="contained">Sign Up</Button>}
                        {isPending && <Button className='signUpBtn' loading={isPending} variant="outlined" disabled>Loading...</Button>}
                        {pfpError && <div className="error">{pfpError}</div>}
                    </Grid>
                </Grid>
            </Box>
            {error && <div className='error'>{error}</div>}
        </form>
    )
};

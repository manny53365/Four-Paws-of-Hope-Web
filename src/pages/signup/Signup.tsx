import { useState } from 'react';
import { useSignup } from '../../hooks/useSignup';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import { CloudUpload } from '@mui/icons-material';

export default function Signup() {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
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
        if (selectedImg.size > 1000000){
            setpfpError('Image file size must be less than 100kb');
            return;
        };

        setpfpError(null);
        setPfp(selectedImg);
        console.log('Thumbnail updated')
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        if (!pfp) {
            setpfpError('Please upload a thumbnail before signing up')
            return
        }
        signup(email, password, fName);
    }
    
    return (
        <form className='auth-form' onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <TextField className='signUpBtn' required id="outlined-required" label="Email" type='email' value={email} onChange={e => setEmail(e?.target.value)} />
            <TextField className='signUpBtn' required id="outlined-required" label="Password" type='password' value={password} onChange={e => setPassword(e?.target.value)} />
            <TextField className='signUpBtn' required id="outlined-required" label="First Name" type='text' value={fName} onChange={e => setfName(e?.target.value)} />
            <TextField className='signUpBtn' required id="outlined-required" label="Last Name" type='text' value={lName} onChange={e => setlName(e?.target.value)} />
            <TextField className='signUpBtn' required id="outlined-required" label="Phone Number" type='tel' value={phone} onChange={e => setPhone(e?.target.value)} />
            <TextField className='signUpBtn' required id="outlined-required" label="Physical Address" type='text' value={address} onChange={e => setAddress(e?.target.value)} />
            <Button className='signUpBtn' component="label" role={undefined} variant="contained" tabIndex={-1} startIcon={<CloudUpload />}>
                Set Profile Photo
                <input type="file" hidden accept="image/*" onChange={handleFileChange} />
            </Button>

            {pfpError && <div className="error">{pfpError}</div>}

            {!isPending && <Button variant="contained" startIcon={<Avatar src="/broken-image.jpg" />}>Sign Up</Button>}
            {isPending && <Button loading={isPending} variant="outlined" disabled>Loading...</Button>}
            {/* {isPending && <button className='btn' disabled>Loading</button>} */}
            {error && <div className='error'>{error}</div>}
        </form>
    )
};

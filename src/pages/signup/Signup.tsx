import { useState } from 'react';
import { useSignup } from '../../hooks/useSignup';

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
            <label>
                <span>Email:</span>
                <input
                type="email"
                required
                onChange={event => setEmail(event.target.value)}
                value={email}
                />
            </label>
            <label>
                <span>Password:</span>
                <input
                type="password"
                required
                onChange={event => setPassword(event.target.value)}
                value={password}
                />
            </label>
            <label>
                <span>First Name:</span>
                <input
                type="text"
                required
                onChange={event => setfName(event.target.value)}
                value={fName}
                />
            </label>
            <label>
                <span>Last Name:</span>
                <input
                type="text"
                required
                onChange={event => setlName(event.target.value)}
                value={lName}
                />
            </label>
            <label>
                <span>Phone Number:</span>
                <input
                type="text"
                required
                onChange={event => setPhone(event.target.value)}
                value={phone}
                />
            </label>
            <label>
                <span>Physical Address:</span>
                <input
                type="text"
                required
                onChange={event => setAddress(event.target.value)}
                value={address}
                />
            </label>
            <label>
                <span>Profile Photo:</span>
                <input
                type="file"
                onChange={handleFileChange}
                />
            </label>
            {!isPending && <button className='btn'>Sign up</button>}
            {isPending && <button className='btn' disabled>Loading</button>}
            {error && <div className='error'>{error}</div>}
        </form>
    )
};

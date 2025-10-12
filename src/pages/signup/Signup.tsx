import { useState } from 'react';
import { useSignup } from '../../hooks/useSignup';

export default function Signup() {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [displayName, setDisplayName] = useState<string>('');
    const {signup, isPending, error} = useSignup();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        signup(email, password, displayName);
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
                <span>Display Name:</span>
                <input
                type="text"
                required
                onChange={event => setDisplayName(event.target.value)}
                value={displayName}
                />
            </label>
            {!isPending && <button className='btn'>Sign up</button>}
            {isPending && <button className='btn' disabled>Loading</button>}
            {error && <div className='error'>{error}</div>}
        </form>
    )
};

import { useState, useEffect } from 'react'
import { projectAuth, projectFirestore } from '../firebase/config'
import { useAuthContext } from './useAuthContext';
import { createUserWithEmailAndPassword, UserCredential, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

interface UseSignupReturn {
    signup: (
      email: string,
      password: string,
      displayName: string
    ) => Promise<void>
    isPending: boolean
    error: string | null
}

export const useSignup = (): UseSignupReturn => {
    const [isCancelled, setIsCancelled] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isPending, setIsPending] = useState<boolean>(false);
    const { dispatch } = useAuthContext();
  
    const signup = async (email: string, password: string, displayName: string) => {
      setError(null);
      setIsPending(true);
    
      try {
        const res: UserCredential = await createUserWithEmailAndPassword(projectAuth, email, password);
  
        if (!res) {
          throw new Error('Could not complete signup');
        };
  
        await updateProfile(res.user, { displayName });

        const userDoc = doc(projectFirestore, 'users', res.user.uid);
        await setDoc(userDoc, {online: true, displayName });
  
        dispatch({ type: 'LOGIN', payload: res.user });
  
        if (!isCancelled) {
          setIsPending(false);
          setError(null);
        };
      } 
      catch(err: unknown) {
        if (!isCancelled) {
            const message =
          err instanceof Error ? err.message : 'An unexpected error occurred'
        setError(message)
        setIsPending(false)
        };
      };
    };
  
    useEffect(() => {
      return () => setIsCancelled(true);
    }, []);
  
    return { signup, error, isPending }
};

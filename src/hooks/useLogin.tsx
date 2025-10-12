import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, updateDoc } from 'firebase/firestore';
import { projectAuth, projectFirestore } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

type LoginReturn = {
    login: (email: string, password: string) => Promise<void>;
    isPending: boolean;
    error: string | null;
};

export const useLogin = (): LoginReturn => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email: string, password: string) => {
    setError(null);
    setIsPending(true);
  
    try {
      const res = await signInWithEmailAndPassword(projectAuth, email, password);

      dispatch({ type: 'LOGIN', payload: res.user });

      const userDocRef = doc(projectFirestore, 'users', res.user.uid);
      await updateDoc(userDocRef, {online: true});

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      };

    } 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch(err: any) {
      if (!isCancelled) {
        setError(err.message || 'An error occurred');
        setIsPending(false);
      };
    };
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { login, isPending, error }
};

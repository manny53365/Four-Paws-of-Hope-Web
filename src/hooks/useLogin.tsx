import { useState, useEffect, useRef } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from 'firebase/firestore';
import { projectAuth, projectFirestore } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

type LoginReturn = {
    login: (email: string, password: string) => Promise<void>;
    isPending: boolean;
    error: string | null;
};

export const useLogin = (): LoginReturn => {
  const cancelledRef = useRef(false);
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
      await setDoc(userDocRef, { online: true });

    } 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch(err: any) {
      const cleanMessage = err?.code ? err.code.replace('auth/', '').replace(/-/g, ' '): 'Login failed';

      if (!cancelledRef.current){
        setError(cleanMessage.toUpperCase())
      }
    } finally {
      if (!cancelledRef.current){
        setIsPending(false);
      }
    };
  };

  useEffect(() => {
    cancelledRef.current = false;
    return () => {
      cancelledRef.current = true;
    };
  }, []);

  return { login, isPending, error }
};

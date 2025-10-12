import { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { projectAuth, projectFirestore } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

interface FirebaseError extends Error {
  message: string;
}

interface User {
  uid: string;
}

interface LogoutHook {
  logout: () => Promise<void>;
  error: string | null;
  isPending: boolean;
}

export const useLogout = (): LogoutHook => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const { dispatch, user } = useAuthContext();

  const logout = async () => {
    setError(null);
    setIsPending(true);

    try {
      const { uid } = user as User;

      const userDocRef = doc(projectFirestore, 'users', uid);
      await updateDoc(userDocRef, { online: false });

      await signOut(projectAuth);

      dispatch({ type: 'LOGOUT' });

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      const firebaseErr = err as FirebaseError;
      if (!isCancelled) {
        setError(firebaseErr.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { logout, error, isPending };
};

import { useState, useEffect } from 'react'
import { projectAuth, projectFirestore, projectStorage } from '../firebase/config'
import { useAuthContext } from './useAuthContext'
import { createUserWithEmailAndPassword, UserCredential, updateProfile } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

interface SignupPayload {
  email: string
  password: string
  displayName: string
  fName: string
  lName: string
  phone: string
  address: string
  pfp: File | null
}

interface UseSignupReturn {
  signup: (data: SignupPayload) => Promise<void>
  isPending: boolean
  error: string | null
}

export const useSignup = (): UseSignupReturn => {
  const [isCancelled, setIsCancelled] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [isPending, setIsPending] = useState<boolean>(false)
  const { dispatch } = useAuthContext()

const signup = async ({
  email,
  password,
  displayName,
  fName,
  lName,
  phone,
  address,
  pfp,
}: SignupPayload): Promise<void> => {
  setError(null)
  setIsPending(true)

  try {
    if (!pfp) {
      throw new Error('Profile picture is required')
    }

    // Create user
    const res: UserCredential = await createUserWithEmailAndPassword(projectAuth, email, password)

    if (!res) {
      throw new Error('Could not complete signup')
    }

    // Upload profile picture to Storage
    const uploadPath = `profilePictures/${res.user.uid}/${pfp.name}`
    const imgRef = ref(projectStorage, uploadPath)
    await uploadBytes(imgRef, pfp)
    const photoURL = await getDownloadURL(imgRef)

    // Update user profile with displayName + photoURL
    await updateProfile(res.user, { displayName, photoURL })

    // Create Firestore doc for this user
    const userDoc = doc(projectFirestore, 'users', res.user.uid)
    await setDoc(userDoc, {
      online: true,
      displayName,
      fName,
      lName,
      phone,
      address,
      photoURL,   // pfp url for display purposes
      uploadPath, // we can delete/edit pfp at any time
    })

    // Update context
    dispatch({ type: 'LOGIN', payload: res.user })

    if (!isCancelled) {
      setIsPending(false)
      setError(null)
    }
  } catch (err: unknown) {
    if (!isCancelled) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred'
      setError(message)
      setIsPending(false)
    }
  }
}

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { signup, error, isPending }
}

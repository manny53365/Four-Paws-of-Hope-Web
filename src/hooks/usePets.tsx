import { useEffect, useState, useCallback } from "react"
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  updateDoc,
  deleteDoc,
  FirestoreError,
  doc
} from "firebase/firestore"
import { projectFirestore } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"
//TODO: Implement image storage for pet images

const petsRef = collection(projectFirestore, "pets")

export type PetStatus = "lost" | "found" | "reunited"

export interface PetInput {
  name: string
  animalType: string
  breed: string
  location: string
  description: string
  image: string
  status: PetStatus
}

export interface Pet extends PetInput {
  id: string
  userId: string
  createdAt: Date
  updatedAt?: Date
}

export type PetUpdate = Partial<PetInput>

export function usePets() {
  const { user, isAdmin } = useAuthContext()
  const [pets, setPets] = useState<Pet[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const q = query(petsRef, orderBy("createdAt", "desc"))
    const unsub = onSnapshot(
      q,
      snap => {
        setPets(
          snap.docs.map(d => ({
            id: d.id,
            ...(d.data() as Omit<Pet, "id">),
            createdAt: d.data().createdAt?.toDate?.(),
            updatedAt: d.data().updatedAt?.toDate?.()
          }))
        )
        setLoading(false)
      },
      (err: FirestoreError) => {
        setError(err.message)
        setLoading(false)
      }
    )
    return unsub
  }, [])

  const createPet = useCallback(async (input: Omit<PetInput, "status">) => {
    if (!user) throw new Error("Not authenticated")
    setLoading(true)
    setError(null)
    try {
      await addDoc(petsRef, {
        ...input,
        status: "lost" satisfies PetStatus,
        userId: user.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      })
      setLoading(false)
    } catch (err) {
      const message = err instanceof FirestoreError ? err.message : "Failed to create pet"
      setError(message)
      setLoading(false)
      throw err
    }
  }, [user])

  const updatePet = useCallback(async (petId: string, updates: PetUpdate) => {
    if (!user) throw new Error("Not authenticated")
    setLoading(true)
    setError(null)
    try {
      const petRef = doc(projectFirestore, "pets", petId)
      await updateDoc(petRef, {
        ...updates,
        updatedAt: serverTimestamp()
      })
      setLoading(false)
    } catch (err) {
      const message = err instanceof FirestoreError ? err.message : "Failed to update pet"
      setError(message)
      setLoading(false)
      throw err
    }
  }, [user])

  const deletePet = useCallback(async (petId: string) => {
    if (!user) throw new Error("Not authenticated")
    setLoading(true)
    setError(null)
    try {
      const petRef = doc(projectFirestore, "pets", petId)
      await deleteDoc(petRef)
      setLoading(false)
    } catch (err) {
      const message = err instanceof FirestoreError ? err.message : "Failed to delete pet"
      setError(message)
      setLoading(false)
      throw err
    }
  }, [user])

  const canManagePet = useCallback((pet: Pet) => {
    if (!user) return false
    return isAdmin || user.uid === pet.userId
  }, [user, isAdmin])

  return { pets, loading, error, createPet, updatePet, deletePet, canManagePet }
}
import { useEffect, useState, useCallback } from "react"
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  updateDoc,
  FirestoreError,
  doc
} from "firebase/firestore"
import { projectFirestore } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"
//TODO: Implement image storage for pet images
//TODO: Implement filtering and searching pets
// TODO: Fix updated at field

const petsRef = collection(projectFirestore, "pets")

export interface PetInput {
  name: string
  animalType: string
  breed: string
  location: string
  description: string
  image: string
}

export interface Pet extends PetInput {
  id: string
  userId: string
  createdAt: Date
  updatedAt?: Date
}

export type PetUpdate = Partial<PetInput>

export function usePets() {
  const { user } = useAuthContext()
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

    const createPet = useCallback(async (input: PetInput) => {
        if (!user) throw new Error("Not authenticated")

        setLoading(true)
        setError(null)

        await addDoc(petsRef, {
        ...input,
        userId: user.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
        })

        setLoading(false)
    }, [user])

    const updatePet = useCallback(
        async (petId: string, updates: PetUpdate) => {
            if (!user) throw new Error("Not authenticated")

            setLoading(true)
            setError(null)

            const petRef = doc(projectFirestore, "pets", petId)

            await updateDoc(petRef, {
            ...updates,
            updatedAt: serverTimestamp()
            })

            setLoading(false)
        },
        [user]
    )
    
    return { pets, loading, error, createPet, updatePet }
}

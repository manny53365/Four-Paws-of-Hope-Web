import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { doc, onSnapshot } from "firebase/firestore"
import { projectFirestore } from "../firebase/config"

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw Error("useAuthContext must be used inside an AuthContextProvider")
  }

  const { user } = context
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    if (!user) {
      setIsAdmin(false)
      return
    }
    const userRef = doc(projectFirestore, "users", user.uid)
    const unsub = onSnapshot(userRef, snap => {
      setIsAdmin(snap.data()?.role === "admin")
    })
    return unsub
  }, [user])

  return { ...context, isAdmin }
}
import { useRef, useState, useEffect } from "react"
import { Pet } from "../hooks/usePets"
import { usePets } from "../hooks/usePets"
import { useAuthContext } from "../hooks/useAuthContext"
import { useNavigate } from "react-router-dom"

const getStatusStyle = (status: string) => {
  switch (status) {
    case "found":
      return "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400"
    case "reunited":
      return "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
    default: 
      return "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400"
  }
}

interface PetCardProps {
  pet: Pet
  onEdit: (pet: Pet) => void
}

export default function PetCard({ pet, onEdit }: PetCardProps) {
  const { deletePet, canManagePet } = usePets()
  const { user } = useAuthContext()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [confirmingDelete, setConfirmingDelete] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
        setConfirmingDelete(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleDelete = async () => {
    if (!confirmingDelete) {
      setConfirmingDelete(true)
      return
    }
    try {
      await deletePet(pet.id)
    } catch {
      window.alert("Failed to delete the listing. Please try again.")}
  }

  return (
    <div className="flex flex-col bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark overflow-hidden group hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div
        className="bg-center bg-no-repeat aspect-video bg-cover"
        style={{ backgroundImage: `url(${pet.image})` }}
      />

      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start gap-2">
          <h4 className="text-lg font-bold text-secondary dark:text-white">{pet.name}</h4>

          <div className="flex items-center gap-2 flex-shrink-0">
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${getStatusStyle(pet.status)}`}>
              {pet.status}
            </span>

            {user && canManagePet(pet) && (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => { setMenuOpen(o => !o); setConfirmingDelete(false) }}
                  className="p-1 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  aria-label="More options"
                >
                  ⋯
                </button>

                {menuOpen && (
                  <div className="absolute right-0 mt-1 w-36 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10 overflow-hidden">
                    <button
                      onClick={() => { onEdit(pet); setMenuOpen(false) }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Edit listing
                    </button>
                    <button
                      onClick={handleDelete}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      {confirmingDelete ? "Tap to confirm" : "Delete listing"}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-text-light/70 dark:text-text-dark/70 mt-1">
          <span>{pet.name}</span>
          <span>•</span>
          <span>{pet.animalType}</span>
          <span>•</span>
          <span>{pet.breed}</span>
          <span>•</span>
          <span>{pet.location}</span>
        </div>

        <p className="text-sm mt-2 flex-grow">{pet.description}</p>

        <button
          onClick={() => navigate(`/pets/${pet.id}`)}
          className="mt-4 w-full text-center rounded-lg bg-primary/10 dark:bg-primary/20 text-primary px-4 py-2 text-sm font-semibold hover:bg-primary text-gray-500 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-200 transition-colors duration-300"
        >
          View Information
        </button>
      </div>
    </div>
  )
}
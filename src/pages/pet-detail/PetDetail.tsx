import { useParams, useNavigate } from "react-router-dom"
import { usePets } from "../../hooks/usePets"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useState } from "react"
import EditPetModal from "../../components/EditPetModal"
import { Pet } from "../../hooks/usePets"

const getStatusStyle = (status: string) => {
  switch (status) {
    case "found":    return "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400"
    case "reunited": return "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
    default:         return "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400"
  }
}

const PLACEHOLDER_IMAGE = "https://placehold.co/800x450?text=No+Image"

export default function PetDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { pets, loading, error, deletePet, canManagePet } = usePets()
  const { user } = useAuthContext()
  const [editingPet, setEditingPet] = useState<Pet | null>(null)
  const [confirmingDelete, setConfirmingDelete] = useState(false)

  const pet = pets.find(p => p.id === id)

  if (loading) {
    return (
      <div className="w-full py-32 text-center text-gray-500 dark:text-gray-400">
        Loading...
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full py-32 text-center text-red-500">
        {error}
      </div>
    )
  }

  if (!pet) {
    return (
      <div className="w-full py-32 text-center">
        <p className="text-gray-500 dark:text-gray-400 mb-4">This listing could not be found.</p>
        <button
          onClick={() => navigate(-1)}
          className="text-sm font-semibold text-primary hover:underline"
        >
          ← Go back
        </button>
      </div>
    )
  }

  const handleDelete = async () => {
    if (!confirmingDelete) { setConfirmingDelete(true); return }
    try {
      await deletePet(pet.id)
      navigate("/dashboard")
    } catch {
      window.alert("Failed to delete the listing. Please try again.")
    }
  }

  return (
    <>
      <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors mb-6"
        >
          ← Back to listings
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-border-light dark:border-border-dark overflow-hidden shadow-sm">
          <div
            className="w-full aspect-video bg-cover bg-center bg-no-repeat bg-gray-100 dark:bg-gray-800"
            style={{ backgroundImage: `url(${pet.image || PLACEHOLDER_IMAGE})` }}
          />

          <div className="p-6 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-2xl sm:text-3xl font-bold dark:text-white">{pet.name}</h1>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${getStatusStyle(pet.status)}`}>
                    {pet.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {pet.animalType} · {pet.breed}
                </p>
              </div>

              {user && canManagePet(pet) && (
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingPet(pet)}
                    className="px-4 py-2 text-sm font-semibold rounded-lg border border-border-light dark:border-border-dark text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    className="px-4 py-2 text-sm font-semibold rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
                  >
                    {confirmingDelete ? "Confirm delete?" : "Delete"}
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-400 mb-1">
                  Last Seen Location
                </p>
                <p className="text-sm font-medium dark:text-gray-200">{pet.location}</p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-400 mb-1">
                  Date Reported
                </p>
                <p className="text-sm font-medium dark:text-gray-200">
                  {pet.createdAt?.toLocaleDateString("en-GB", {
                    day: "numeric", month: "long", year: "numeric"
                  }) ?? "Unknown"}
                </p>
              </div>

              {pet.updatedAt && (
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-400 mb-1">
                    Last Updated
                  </p>
                  <p className="text-sm font-medium dark:text-gray-200">
                    {pet.updatedAt.toLocaleDateString("en-GB", {
                      day: "numeric", month: "long", year: "numeric"
                    })}
                  </p>
                </div>
              )}
            </div>

            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-400 mb-2">
                Description
              </h2>
              <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                {pet.description}
              </p>
            </div>
          </div>
        </div>
      </main>

      {editingPet && (
        <EditPetModal pet={editingPet} onClose={() => setEditingPet(null)} />
      )}
    </>
  )
}
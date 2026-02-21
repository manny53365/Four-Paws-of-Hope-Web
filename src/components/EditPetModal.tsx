import React, { useState, useEffect } from "react"
import { Pet, PetUpdate } from "../hooks/usePets"
import { usePets } from "../hooks/usePets"

interface EditPetModalProps {
  pet: Pet
  onClose: () => void
}

const MAX_LENGTHS = {
  name: 50,
  breed: 50,
  location: 100,
  description: 500,
} as const

export default function EditPetModal({ pet, onClose }: EditPetModalProps) {
  const { updatePet, error } = usePets()
  const [form, setForm] = useState<PetUpdate>({
    name: pet.name,
    animalType: pet.animalType,
    breed: pet.breed,
    location: pet.location,
    description: pet.description,
    status: pet.status,
  })
  const [saving, setSaving] = useState(false)
  const [validationError, setValidationError] = useState<string | null>(null)

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = "" }
  }, [])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [onClose])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    setValidationError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name?.trim())        { setValidationError("Pet name is required."); return }
    if (!form.animalType)          { setValidationError("Animal type is required."); return }
    if (!form.breed?.trim())       { setValidationError("Breed is required."); return }
    if (!form.location?.trim())    { setValidationError("Location is required."); return }
    if (!form.description?.trim()) { setValidationError("Description is required."); return }

    setSaving(true)
    try {
      await updatePet(pet.id, form)
      onClose()
    } catch {
      setValidationError("Failed to update pet listing.")
    } finally {
      setSaving(false)
    }
  }

    const inputStyle =
        "mt-1 w-full max-w-full box-border rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/30 text-sm sm:text-sm px-3 py-2 sm:px-4 sm:py-3 dark:text-white outline-none"

  return (
    <div
    className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-2 sm:p-4 overflow-y-auto"
    onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
        <div
        className="
        relative w-full sm:max-w-lg
        bg-white dark:bg-gray-900
        rounded-t-2xl sm:rounded-xl
        shadow-xl
        flex flex-col
        max-h-[calc(100dvh-2rem)] sm:max-h-[90vh]
        overflow-hidden
        "
        >
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-gray-100 dark:border-gray-800 flex-shrink-0">
          <h2 className="text-lg font-bold dark:text-white">Edit Listing</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-2xl leading-none p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Close"
          >
            ×
          </button>
        </div>

       <form
        id="edit-pet-form"
        onSubmit={handleSubmit}
        className="flex-1 w-full overflow-y-auto p-4 sm:p-5 space-y-4 min-w-0"
        >
          {(validationError || error) && (
            <div className="rounded-lg border border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/30 px-4 py-3 text-sm text-red-700 dark:text-red-400">
              {validationError || error}
            </div>
          )}

          <div>
            <label className="text-sm font-medium dark:text-gray-300">Pet Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              maxLength={MAX_LENGTHS.name}
              className={inputStyle}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium dark:text-gray-300">Animal Type</label>
              <select name="animalType" value={form.animalType} onChange={handleChange} className={inputStyle}>
                <option value="">Select type</option>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Bird">Bird</option>
                <option value="Reptile">Reptile</option>
                <option value="Equine">Equine</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium dark:text-gray-300">Breed</label>
              <input
                type="text"
                name="breed"
                value={form.breed}
                onChange={handleChange}
                maxLength={MAX_LENGTHS.breed}
                className={inputStyle}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium dark:text-gray-300">Status</label>
            <select name="status" value={form.status} onChange={handleChange} className={inputStyle}>
              <option value="lost">Lost</option>
              <option value="found">Found</option>
              <option value="reunited">Reunited</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium dark:text-gray-300">Last Seen Location</label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              maxLength={MAX_LENGTHS.location}
              className={inputStyle}
            />
          </div>

          <div>
            <label className="text-sm font-medium dark:text-gray-300">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              maxLength={MAX_LENGTHS.description}
              className={`${inputStyle} h-24 resize-none`}
            />
            <p className="text-xs text-gray-400 text-right mt-1">
              {form.description?.length ?? 0}/{MAX_LENGTHS.description}
            </p>
          </div>
        </form>

        <div className="flex gap-3 px-5 py-4 border-t border-gray-100 dark:border-gray-800 flex-shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="edit-pet-form"
            onClick={handleSubmit}
            disabled={saving}
            className="flex-1 rounded-lg bg-yellow-600 hover:bg-yellow-700 disabled:opacity-50 px-4 py-2.5 text-sm font-semibold text-white transition-colors"
          >
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  )
}
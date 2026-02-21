import { useState, useMemo } from "react"
import { Pet, PetStatus } from "./usePets"

export interface FilterState {
  search: string
  statuses: Set<PetStatus>
  animalTypes: Set<string>
}

const ALL_STATUSES: PetStatus[] = ["lost", "found", "reunited"]
const ALL_TYPES = ["Dog", "Cat", "Bird", "Reptile", "Equine", "Other"]

export function usePetFilters(pets: Pet[]) {
  const [search, setSearch] = useState("")
  const [statuses, setStatuses] = useState<Set<PetStatus>>(new Set(ALL_STATUSES))
  const [animalTypes, setAnimalTypes] = useState<Set<string>>(new Set(ALL_TYPES))

  const toggleStatus = (status: PetStatus) => {
    setStatuses(prev => {
      const next = new Set(prev)
      next.has(status) ? next.delete(status) : next.add(status)
      return next
    })
  }

  const toggleAnimalType = (type: string) => {
    setAnimalTypes(prev => {
      const next = new Set(prev)
      next.has(type) ? next.delete(type) : next.add(type)
      return next
    })
  }

  const filteredPets = useMemo(() => {
    const q = search.trim().toLowerCase()
    return pets.filter(pet => {
      if (statuses.size > 0 && !statuses.has(pet.status)) return false
      if (animalTypes.size > 0 && !animalTypes.has(pet.animalType)) return false
      if (q && !pet.name.toLowerCase().includes(q) && !pet.breed.toLowerCase().includes(q)) return false
      return true
    })
  }, [pets, search, statuses, animalTypes])

  return {
    search, setSearch,
    statuses, toggleStatus,
    animalTypes, toggleAnimalType,
    filteredPets,
    allStatuses: ALL_STATUSES,
    allTypes: ALL_TYPES,
  }
}
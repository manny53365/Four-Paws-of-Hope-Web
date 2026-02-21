import Filters from "../../components/Filters";
import PetCard from "../../components/PetCard";
import EditPetModal from "../../components/EditPetModal"
import Pagination from "../../components/Pagination";
import { Pet, usePets } from "../../hooks/usePets";
import { usePetFilters } from "../../hooks/usePetFilters"
import { useState } from "react";

export default function Dashboard() {
  const { pets, loading, error } = usePets();
  const {
    search, setSearch,
    statuses, toggleStatus,
    animalTypes, toggleAnimalType,
    filteredPets,
    allStatuses, allTypes,
  } = usePetFilters(pets)
  const [editingPet, setEditingPet] = useState<Pet | null>(null)

    if (loading) {
    return (
      <div className="w-full py-20 text-center text-gray-500">
        Loading pets...
      </div>
    );
    
  }
  if (error) {
  return (
    <div className="w-full py-20 text-center text-red-500">
      Failed to load pets: <span className="font-medium">{error}</span>
    </div>
  );
  }
  return (
    <main className="w-full mx-auto container px-4 sm:px-6 lg:px-10 py-8 grid grid-cols-12 gap-8">
      <aside className="col-span-12 lg:col-span-3">
        <Filters
          search={search}
          onSearchChange={setSearch}
          statuses={statuses}
          onToggleStatus={toggleStatus}
          animalTypes={animalTypes}
          onToggleAnimalType={toggleAnimalType}
          allStatuses={allStatuses}
          allTypes={allTypes}
        />
      </aside>

      <section className="col-span-12 lg:col-span-6 flex flex-col gap-6">
        {filteredPets.length === 0 && (
          <p className="text-center text-gray-500">
            {pets.length === 0 ? "No pets reported yet." : "No pets match your filters."}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPets.map(pet => (
            <PetCard key={pet.id} pet={pet} onEdit={setEditingPet} />
          ))}
        </div>

        {editingPet && (
          <EditPetModal pet={editingPet} onClose={() => setEditingPet(null)} />
        )}

        <Pagination />
      </section>
    </main>
  )
}
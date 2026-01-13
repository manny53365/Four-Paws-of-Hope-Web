import Filters from "../../components/Filters";
import PetCard from "../../components/PetCard";
import Pagination from "../../components/Pagination";
import { usePets } from "../../hooks/usePets";

export default function Dashboard() {
  const { pets, loading, error } = usePets();

    if (loading) {
    return (
      <div className="w-full py-20 text-center text-gray-500">
        Loading pets...
      </div>
    );
  }
  return (
    <main className="w-full mx-auto container px-4 sm:px-6 lg:px-10 py-8 grid grid-cols-12 gap-8">
      <aside className="col-span-12 lg:col-span-3">
        <Filters />
      </aside>

      <section className="col-span-12 lg:col-span-6 flex flex-col gap-6">
        {pets.length === 0 && (
          <p className="text-center text-gray-500">
            No pets reported yet.
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pets.map(pet => (
            <PetCard key={pet.id} Pet={pet} />
          ))}
        </div>

        <Pagination />
      </section>
    </main>
  );
}

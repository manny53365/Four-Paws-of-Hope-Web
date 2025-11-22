interface PetCardProps {
  Pet: {
    name: string;
    breed: string;
    location: string;
    description: string;
    status: "Lost" | "Found";
    image: string;
  };
}
export default function PetCard({ Pet }: PetCardProps) {
  return (
    <div className="flex flex-col bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark overflow-hidden group hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="bg-center bg-no-repeat aspect-video bg-cover" style={{ backgroundImage: `url(${Pet.image})` }}></div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start">
          <h4 className="text-lg font-bold text-secondary dark:text-white">{Pet.name}</h4>
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${Pet.status === 'Lost' ? 'bg-red-500' : 'bg-green-500'} text-white`}>
            {Pet.status}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-text-light/70 dark:text-text-dark/70 mt-1">
          <span>{Pet.breed}</span>
          <span>•</span>
          <span>{Pet.location}</span>
        </div>
        <p className="text-sm mt-2 flex-grow">{Pet.description}</p>
        <button className="mt-4 w-full text-center rounded-lg bg-primary/10 dark:bg-primary/20 text-primary px-4 py-2 text-sm font-semibold hover:bg-primary text-gray-500 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-200 transition-colors duration-300">
          View Information
        </button>
      </div>
    </div>
  );
}

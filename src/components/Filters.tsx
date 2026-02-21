import { Search, ChevronDown } from "lucide-react"
import { PetStatus } from "../hooks/usePets"

interface FiltersProps {
  search: string
  onSearchChange: (value: string) => void
  statuses: Set<PetStatus>
  onToggleStatus: (status: PetStatus) => void
  animalTypes: Set<string>
  onToggleAnimalType: (type: string) => void
  allStatuses: PetStatus[]
  allTypes: string[]
}

const STATUS_LABELS: Record<PetStatus, string> = {
  lost: "Lost",
  found: "Found",
  reunited: "Reunited",
}

export default function Filters({
  search, onSearchChange,
  statuses, onToggleStatus,
  animalTypes, onToggleAnimalType,
  allStatuses, allTypes,
}: FiltersProps) {
  const inputStyle = "h-5 w-5 rounded border-border-light dark:border-text-dark/50 text-primary focus:ring-primary/50 bg-transparent"

  return (
    <div className="flex flex-col p-4 rounded-xl bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark">
      <h3 className="text-lg font-bold text-black dark:text-gray-300 mb-4">
        Search Pet By Filtering
      </h3>

      {/* Search */}
      <div className="py-3">
        <div className="flex w-full items-stretch rounded-lg h-12">
          <div className="flex items-center justify-center pl-4 rounded-l-lg border border-r-0 border-border-light dark:border-border-dark bg-card-light dark:bg-background-dark text-text-light/70 dark:text-text-dark/70">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="search"
            value={search}
            onChange={e => onSearchChange(e.target.value)}
            placeholder="Search by name, breed..."
            className="flex-1 rounded-r-lg border border-l-0 border-border-light dark:border-border-dark bg-card-light dark:bg-background-dark text-text-light dark:text-text-dark placeholder:text-text-light/50 dark:placeholder:text-text-dark/50 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>

      <details className="border-t border-border-light dark:border-border-dark py-2 group" open>
        <summary className="flex cursor-pointer items-center justify-between py-2 list-none">
          <p className="text-sm font-medium">Status</p>
          <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
        </summary>
        <div className="flex flex-col gap-2 pt-2">
          {allStatuses.map(status => (
            <label
              key={status}
              className="flex items-center gap-3 rounded-lg border border-border-light dark:border-border-dark p-3 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              <input
                type="checkbox"
                className={inputStyle}
                checked={statuses.has(status)}
                onChange={() => onToggleStatus(status)}
              />
              <p className="text-sm font-medium">{STATUS_LABELS[status]}</p>
            </label>
          ))}
        </div>
      </details>

      <details className="border-t border-border-light dark:border-border-dark py-2 group" open>
        <summary className="flex cursor-pointer items-center justify-between py-2 list-none">
          <p className="text-sm font-medium">Pet Type</p>
          <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
        </summary>
        <div className="flex flex-col gap-1 pt-2">
          {allTypes.map(type => (
            <label
              key={type}
              className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              <input
                type="checkbox"
                className={inputStyle}
                checked={animalTypes.has(type)}
                onChange={() => onToggleAnimalType(type)}
              />
              <p className="text-sm font-medium">{type}</p>
            </label>
          ))}
        </div>
      </details>
    </div>
  )
}
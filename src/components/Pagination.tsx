import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
export default function Pagination() {
  return (
    <div className="flex justify-center items-center gap-2 mt-4">
      <button className="p-2 rounded-lg bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark text-text-light/70 dark:text-text-dark/70 hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors">
        <ArrowBigLeft className="w-4 h-4" />
      </button>
      {[1,2,3].map(page => (
        <button key={page} className={`px-4 py-2 text-sm rounded-lg ${page === 1 ? 'bg-primary text-gray-300' : 'bg-card-light dark:bg-card-dark hover:bg-primary/10 dark:hover:bg-primary/20'}`}>
          {page}
        </button>
      ))}
      <button className="p-2 rounded-lg bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark text-text-light/70 dark:text-text-dark/70 hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors">
        <ArrowBigRight className="w-4 h-4" />
      </button>
    </div>
  );
}

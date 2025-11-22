//Additional filtering could be added if needed
// I have used lucide react for icons but you can change the library
import { Search, ArrowDown } from "lucide-react";
export default function Filters() {
  return (
    <div className="flex flex-col p-4 rounded-xl bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark">
      <h3 className="text-lg font-bold text-secondary text-black dark:text-gray-300 mb-4">Search Pet By Filtering</h3>

      <div className="px-0 py-3">
        <label className="flex flex-col min-w-40 h-12 w-full">
          <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
            <div className="text-text-light/70 dark:text-text-dark/70 flex border border-r-0 border-border-light dark:border-border-dark bg-card-light dark:bg-background-dark items-center justify-center pl-4 rounded-l-lg">
              <Search className="w-4 h-4" />
            </div>
            <input
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-light dark:text-text-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-light dark:border-border-dark bg-card-light dark:bg-background-dark h-full placeholder:text-text-light/50 dark:placeholder:text-text-dark/50 px-4 rounded-l-none border-l-0 pl-2 text-sm font-normal leading-normal"
              placeholder="Search by name, breed..."
            />
          </div>
        </label>
      </div>

      <details className="flex flex-col border-t border-t-border-light dark:border-t-border-dark py-2 group" open>
        <summary className="flex cursor-pointer items-center justify-between gap-6 py-2 list-none">
          <p className="text-sm font-medium leading-normal">Status</p>
          <span className="material-symbols-outlined group-open:rotate-180 transition-transform"><ArrowDown className="w-4 h-4" /></span>
        </summary>
        <div className="flex flex-col gap-3 pt-2">
          <label className="flex items-center gap-4 rounded-lg border border-solid border-border-light dark:border-border-dark p-3">
            <input type="radio" name="status-filter" className="h-5 w-5 border-2 border-border-light dark:border-text-dark/50 bg-transparent text-primary focus:ring-primary/50" defaultChecked />
            <p className="text-sm font-medium leading-normal">Lost</p>
          </label>
          <label className="flex items-center gap-4 rounded-lg border border-solid border-border-light dark:border-border-dark p-3">
            <input type="radio" name="status-filter" className="h-5 w-5 border-2 border-border-light dark:border-text-dark/50 bg-transparent text-primary focus:ring-primary/50" />
            <p className="text-sm font-medium leading-normal">Found</p>
          </label>
        </div>
      </details>

      <details className="flex flex-col border-t border-t-border-light dark:border-t-border-dark py-2 group">
        <summary className="flex cursor-pointer items-center justify-between gap-6 py-2 list-none">
          <p className="text-sm font-medium leading-normal">Pet Type</p>
          <span className="material-symbols-outlined group-open:rotate-180 transition-transform"><ArrowDown className="w-4 h-4" /></span>
        </summary>
        <div className="flex flex-col gap-3 pt-2">
          {["Dog","Cat","Bird","Other"].map(type => (
            <label key={type} className="flex items-center gap-3 p-2">
              <input type="checkbox" className="h-5 w-5 rounded border-border-light dark:border-text-dark/50 text-primary focus:ring-primary/50 bg-transparent" defaultChecked={type === "Cat"} />
              <p className="text-sm font-medium leading-normal">{type}</p>
            </label>
          ))}
        </div>
      </details>
    </div>
  );
}

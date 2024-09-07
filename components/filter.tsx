import { DateFilter } from "./date-filter";

export function Filter() {
  return (
    <div className="flex flex-col lg:flex-row ml-auto items-center gap-y-2 lg:gap-x-2">
      <DateFilter />
    </div>
  );
}

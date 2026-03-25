import { useRef } from "react";
import { MagnifyingGlassIcon, XMarkIcon, BarsArrowUpIcon, BarsArrowDownIcon } from "@heroicons/react/24/outline";

const SORT_OPTIONS = [
  { value: "name", label: "Name" },
];

const STATUS_OPTIONS = [
  { value: "",         label: "All Statuses" },
  { value: "active",   label: "Active" },
  { value: "inactive", label: "Inactive" },
];

export default function SearchFilter({
  search,
  onSearch,
  sortBy,
  onSort,
  order,
  onOrderToggle,
  status,
  onStatusChange,
}) {
  const inputRef = useRef(null);

  const handleClear = () => {
    onSearch("");
    inputRef.current?.focus();
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="relative flex-1 min-w-48">
        <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-base-content/40">
          <MagnifyingGlassIcon className="w-4 h-4" />
        </span>
        <input id = "search" name = "search"
          ref={inputRef}
          type="text"
          className="input input-bordered w-full pl-9 pr-8 input-sm h-10"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
        />
        {search && (
          <button
            className="absolute inset-y-0 right-2 flex items-center text-base-content/40 hover:text-base-content"
            onClick={handleClear}
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        )}
      </div>

      <select id = "status" name = "status"
        className="select select-bordered select-sm h-10"
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
      >
        {STATUS_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>

      <select id="sort" name="sort"
        className="select select-bordered select-sm h-10"
        value={sortBy}
        onChange={(e) => onSort(e.target.value)}
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>Sort: {opt.label}</option>
        ))}
      </select>

      <button
        className="btn btn-sm btn-outline h-10 gap-1"
        onClick={onOrderToggle}
        title={order === "asc" ? "Ascending" : "Descending"}
      >
        {order === "asc" ? (
          <><BarsArrowUpIcon className="w-4 h-4" /> Asc</>
        ) : (
          <><BarsArrowDownIcon className="w-4 h-4" /> Desc</>
        )}
      </button>
    </div>
  );
}
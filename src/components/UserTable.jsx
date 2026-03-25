import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { ChevronUpDownIcon, ChevronUpIcon, ChevronDownIcon, DocumentIcon, StarIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarSolidIcon } from "@heroicons/react/24/solid";

function SortIcon({ active, order }) {
  if (!active) return <ChevronUpDownIcon className="w-3 h-3 opacity-25" />;
  return order === "asc"
    ? <ChevronUpIcon className="w-3 h-3 text-primary" />
    : <ChevronDownIcon className="w-3 h-3 text-primary" />;
}

function StatusBadge({ status }) {
  const map = {
    active:   "badge-success",
    inactive: "badge-error",
    pending:  "badge-warning",
    banned:   "badge-error",
  };
  const cls = map[status?.toLowerCase()] ?? "badge-ghost";
  return (
    <span className={`badge badge-sm capitalize ${cls}`}>
      {status ?? "—"}
    </span>
  );
}

function UserAvatar({ name, avatar }) {
  const fallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name ?? "U"
  )}&size=64&background=random`;

  return (
    <div className="avatar">
      <div className="w-8 h-8 rounded-full">
        <img
          src={avatar || fallback}
          alt={name ?? "User"}
          onError={(e) => { e.currentTarget.src = fallback; }}
        />
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-base-content/40 gap-3">
      <DocumentIcon className="w-14 h-14" />
      <p className="text-base font-medium">No users found</p>
      <p className="text-sm">Try adjusting your search or filters.</p>
    </div>
  );
}

export default function UserTable({ users = [], sortBy, order, onSort }) {
  const navigate                       = useNavigate();
  const { isFavorite, toggleFavorite } = useApp();

  if (users.length === 0) return <EmptyState />;

  const th =
    "px-4 py-3 text-left text-xs font-semibold text-base-content/50 uppercase tracking-wider whitespace-nowrap select-none";
  const sortableTh = `${th} cursor-pointer hover:text-base-content transition-colors`;

  return (
    <div className="overflow-x-auto rounded-xl border border-base-300 shadow-sm">
      <table className="table table-zebra w-full">
        <thead className="bg-base-200">
          <tr>
            <th className={sortableTh} onClick={() => onSort?.("name")}>
              <div className="flex items-center gap-1">
                Name
                <SortIcon active={sortBy === "name"} order={order} />
              </div>
            </th>
            <th className={th}>Designation</th>
            <th className={th}>Department</th>
            <th className={th}>Email</th>
            <th className={th}>Phone</th>
            <th className={th}>Status</th>
            <th className={`${th} text-center`}>Fav</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => {
            const fav = isFavorite(user.id);
            return (
              <tr
                key={user.id}
                className="hover cursor-pointer transition-colors"
                onClick={() => navigate(`/users/${user.id}`)}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <UserAvatar name={user.name} avatar={user.avatar} />
                    <div className="flex flex-col min-w-0">
                      <span className="font-medium text-sm truncate">{user.name}</span>
                      {user.employee_id && (
                        <span className="text-xs text-base-content/40">#{user.employee_id}</span>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-base-content/70">{user.designation || "—"}</td>
                <td className="px-4 py-3 text-sm text-base-content/70">{user.department || "—"}</td>
                <td className="px-4 py-3 text-sm text-base-content/70">
                  <span className="truncate block max-w-50">{user.email}</span>
                </td>
                <td className="px-4 py-3 text-sm text-base-content/70">{user.phone || "—"}</td>
                <td className="px-4 py-3"><StatusBadge status={user.status} /></td>
                <td className="px-4 py-3 text-center" onClick={(e) => e.stopPropagation()}>
                  <button
                    className={`btn btn-ghost btn-xs transition-colors ${
                      fav ? "text-warning" : "text-base-content/25 hover:text-warning"
                    }`}
                    onClick={() => toggleFavorite(user.id)}
                    title={fav ? "Remove from favorites" : "Add to favorites"}
                  >
                    {fav
                      ? <StarSolidIcon className="w-4 h-4" />
                      : <StarIcon className="w-4 h-4" />
                    }
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
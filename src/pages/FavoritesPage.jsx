import { useEffect, useState } from "react";
import { useApp } from "../context/AppContext";
import { getFavUsers } from "../api/userApi";
import UserTable from "../components/UserTable";
import { StarIcon } from "@heroicons/react/24/outline";

export default function FavoritesPage() {
  const { favorites, cachedUsers } = useApp();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (favorites.length === 0) {
      setUsers([]);
      return;
    }

    const fromCache = cachedUsers.filter((u) => favorites.includes(u.id));

    if (fromCache.length === favorites.length) {
      setUsers(fromCache);
      return;
    }

    setLoading(true);
    setError("");
    getFavUsers(favorites)
      .then((res) => {
        const list = res.data.data ?? [];
        setUsers(list);
      })
      .catch(() => {
        if (fromCache.length > 0) {
          setUsers(fromCache);
        } else {
          setError("Failed to load favorites. Please try again.");
        }
      })
      .finally(() => setLoading(false));
  }, [favorites, cachedUsers]);

  return (
    <div className="p-6 flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div>
          <h1 className="text-2xl font-bold">Favorites</h1>
          <p className="text-base-content/50 text-sm mt-0.5">
            {favorites.length} saved user{favorites.length !== 1 ? "s" : ""}
          </p>
        </div>
        <span className="badge badge-primary badge-lg ml-1">
          {favorites.length}
        </span>
      </div>

      {error && (
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <span className="loading loading-spinner loading-lg text-primary" />
        </div>
      ) : favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-base-content/40">
          <StarIcon className="w-16 h-16" />
          <p className="text-lg font-medium">No favorites yet</p>
          <p className="text-sm">
            Star users from the User List to save them here.
          </p>
        </div>
      ) : (
        <UserTable users={users} />
      )}
    </div>
  );
}

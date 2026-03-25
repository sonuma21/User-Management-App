import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById } from "../api/userApi";
import { useApp } from "../context/AppContext";

export default function UserDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useApp();
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserById(id).then(res => setUser(res.data)); 
  }, [id]);

  if (!user) return <span className="loading loading-spinner loading-lg"/>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <button className="btn btn-ghost mb-4" onClick={() => navigate(-1)}>← Back to List</button>
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">

          <div className="flex items-center gap-4">

            {user.avatar ? (
              <div className="avatar">
                <div className="w-16 rounded-full">
                  <img src={user.avatar} alt={user.name ?? "User"} />
                </div>
              </div>
            ) : (
              <div className="avatar placeholder">
                <div className="w-16 rounded-full bg-neutral text-neutral-content">
                  <span className="text-xl">
                    {user.name ? user.name.charAt(0).toUpperCase() : "?"}
                  </span>
                </div>
              </div>
            )}

            <div>
              <h2 className="card-title">{user.name ?? "Unknown Name"}</h2>
              <p className="text-base-content/60">
                {user.designation ?? "No Designation"} · {user.department ?? "No Department"}
              </p>
            </div>

            <button className="btn btn-ghost ml-auto" onClick={() => toggleFavorite(user.id)}>
              {favorites.includes(user.id) ? "★" : "☆"}
            </button>
          </div>

          <div className="divider"/>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm opacity-60">Email</p>
              <p>{user.email ?? "N/A"}</p>
            </div>
            <div>
              <p className="text-sm opacity-60">Phone</p>
              <p>{user.phone ?? "N/A"}</p>
            </div>
            <div>
              <p className="text-sm opacity-60">Status</p>
              {user.status ? (
                <span className={`badge ${user.status === "active" ? "badge-success" : "badge-error"}`}>
                  {user.status}
                </span>
              ) : (
                <span className="badge badge-ghost">Unknown</span>
              )}
            </div>
           
          </div>

        </div>
      </div>
    </div>
  );
}
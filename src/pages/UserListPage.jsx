import { useEffect, useState, useCallback } from "react";
import { useApp } from "../context/AppContext";
import { getUsers } from "../api/userApi";
import UserTable    from "../components/UserTable";
import Pagination   from "../components/Pagination";
import SearchFilter from "../components/SearchFilter";

export default function UserListPage() {
  const { itemsPerPage, mergeCache } = useApp();

  const [users, setUsers]     = useState([]);
  const [total, setTotal]     = useState(0);
  const [page, setPage]       = useState(1);
  const [search, setSearch]   = useState("");
  const [sortBy, setSortBy]   = useState("name");   
  const [order, setOrder]     = useState("asc");    
  const [status, setStatus]   = useState("");       
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  const fetchUsers = useCallback(() => {
    setLoading(true);
    setError("");

    const params = {
      page,
      per_page:  itemsPerPage,
      sort:   sortBy,        
      order,                    
      ...(search && { search }),
      ...(status && { status }),
    };

    getUsers(params)
      .then((res) => {
        setUsers(res.data.data);
        setTotal(res.data.meta.total);  
        mergeCache?.(res.data.data);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Failed to load users.");
        console.error("Error:", err.response?.data);
      })
      .finally(() => setLoading(false));
  }, [page, search, sortBy, order, status, itemsPerPage]);

  useEffect(() => { setPage(1); }, [search, sortBy, order, status, itemsPerPage]);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  const handleSort = (field) => {
    
    if (field !== "name") return;
    if (sortBy === field) {
      setOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(field);
      setOrder("asc");
    }
  };

  const handleOrderToggle = () => {
    setOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <div className="p-6 flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">User List</h1>
          <p className="text-base-content/50 text-sm mt-0.5">{total} total users</p>
        </div>
        <button className="btn btn-primary btn-sm gap-2">+ Add User</button>
      </div>

      <SearchFilter
        search={search}
        onSearch={setSearch}
        sortBy={sortBy}
        onSort={handleSort}
        order={order}
        onOrderToggle={handleOrderToggle}
        status={status}
        onStatusChange={setStatus}
      />

      {error && (
        <div className="alert alert-error">
          <span>{error}</span>
          <button className="btn btn-sm btn-ghost" onClick={fetchUsers}>Retry</button>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-20">
          <span className="loading loading-spinner loading-lg text-primary" />
        </div>
      ) : (
        <UserTable
          users={users}
          sortBy={sortBy}
          order={order}
          onSort={handleSort}
        />
      )}

      <Pagination
        page={page}
        total={total}
        perPage={itemsPerPage}
        onPageChange={setPage}
      />
    </div>
  );
}
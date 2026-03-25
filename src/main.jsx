import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider, useApp } from "./context/AppContext";
import DashboardLayout from "./layouts/DashboardLayout";
import LoginPage      from "./pages/LoginPage";
import UserListPage   from "./pages/UserListPage";
import UserDetailPage from "./pages/UserDetailPage";
import FavoritesPage  from "./pages/FavoritesPage";
import "./index.css";

function ProtectedRoute({ children }) {
  const { user } = useApp();
  return user ? children : <Navigate to="/login" replace />;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <AppProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route index         element={<Navigate to="/users" replace />} />
          <Route path="users"           element={<UserListPage />} />
          <Route path="users/:id"       element={<UserDetailPage />} />
          <Route path="favorites"       element={<FavoritesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </AppProvider>
);

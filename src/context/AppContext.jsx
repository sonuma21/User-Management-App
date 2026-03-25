import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

const DEFAULTS = { theme: "light", itemsPerPage: 10, favorites: [], user: null };

export function AppProvider({ children }) {
  const load = (key) => {
    try { return JSON.parse(localStorage.getItem(key)); } catch { return null; }
  };

  const [theme, setTheme]               = useState(load("theme") ?? DEFAULTS.theme);
  const [itemsPerPage, setItemsPerPage] = useState(load("itemsPerPage") ?? DEFAULTS.itemsPerPage);
  const [favorites, setFavorites]       = useState(load("favorites") ?? DEFAULTS.favorites);
  const [user, setUser]                 = useState(load("user") ?? DEFAULTS.user);
  const [cachedUsers, setCachedUsers]   = useState([]); 

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("itemsPerPage", JSON.stringify(itemsPerPage));
  }, [itemsPerPage]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const isFavorite = (id) => favorites.includes(id);

  const toggleFavorite = (id) =>
    setFavorites(prev =>
      prev.includes(id)
        ? prev.filter(f => f !== id)
        : [...prev, id]
    );

  const resetPreferences = () => {
    setTheme(DEFAULTS.theme);
    setItemsPerPage(DEFAULTS.itemsPerPage);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        itemsPerPage,
        setItemsPerPage,
        favorites,
        toggleFavorite,
        isFavorite,
        user,
        setUser,
        logout,
        resetPreferences,
        cachedUsers,        
        setCachedUsers,     
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
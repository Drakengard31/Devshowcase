import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import UserDetail from "./pages/UserDetail";
import Favorites from "./pages/Favorites";
import { FavoritesProvider } from "./context/FavoritesContext";

export default function App() {
  const [darkMode, setDarkMode] = useState(
      () => localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
      <FavoritesProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
            <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/user/:username" element={<UserDetail />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </div>
        </BrowserRouter>
      </FavoritesProvider>
  );
}
import { Link, NavLink } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext.jsx";

export default function Navbar({ darkMode, setDarkMode }) {
    const { favorites } = useFavorites();

    const linkClass = ({ isActive }) =>
        `px-4 py-2 rounded-lg transition ${
            isActive ? "bg-indigo-600 text-white" : "hover:bg-gray-200 dark:hover:bg-gray-700"
        }`;

    return (
        <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
                <Link to="/" className="text-xl font-bold text-indigo-600">
                    🚀 DevShowcase
                </Link>
                <div className="flex items-center gap-2">
                    <NavLink to="/" className={linkClass}>Accueil</NavLink>
                    <NavLink to="/favorites" className={linkClass}>
                        Favoris ({favorites.length})
                    </NavLink>
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
                        aria-label="Toggle dark mode"
                    >
                        {darkMode ? "☀️" : "🌙"}
                    </button>
                </div>
            </div>
        </nav>
    );
}
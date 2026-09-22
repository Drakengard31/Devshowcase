import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext.jsx";

export default function UserCard({ user }) {
    const { toggleFavorite, isFavorite } = useFavorites();
    const fav = isFavorite(user.login);

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 flex flex-col items-center gap-3 hover:shadow-lg transition">
            <img
                src={user.avatar_url}
                alt={user.login}
                className="w-20 h-20 rounded-full"
                loading="lazy"
            />
            <Link
                to={`/user/${user.login}`}
                className="font-semibold text-lg hover:text-indigo-600"
            >
                {user.login}
            </Link>
            <button
                onClick={() => toggleFavorite(user)}
                className={`text-sm px-3 py-1 rounded-full transition ${
                    fav
                        ? "bg-yellow-400 text-gray-900"
                        : "bg-gray-200 dark:bg-gray-700 hover:bg-yellow-200"
                }`}
            >
                {fav ? "⭐ Favori" : "☆ Ajouter"}
            </button>
        </div>
    );
}
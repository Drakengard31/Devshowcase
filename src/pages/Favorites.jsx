import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext.jsx";
import UserCard from "../components/UserCard.jsx";

export default function Favorites() {
    const { favorites } = useFavorites();

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 dark:text-white">⭐ Mes favoris</h1>
            {favorites.length === 0 ? (
                <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                    <p>Aucun favori pour le moment.</p>
                    <Link to="/" className="text-indigo-600 hover:underline mt-2 inline-block">
                        Découvrir des devs →
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {favorites.map((user) => (
                        <UserCard key={user.login} user={user} />
                    ))}
                </div>
            )}
        </div>
    );
}
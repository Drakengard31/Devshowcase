import { useState } from "react";
import { searchUsers } from "../services/githubApi.js";
import { useFetch } from "../hooks/useFetch.js";
import SearchBar from "../components/SearchBar.jsx";
import UserCard from "../components/UserCard.jsx";
import Loader from "../components/Loader.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";

export default function Home() {
    const [query, setQuery] = useState("javascript");
    const [page, setPage] = useState(1);

    const { data, loading, error } = useFetch(
        () => searchUsers(query, page),
        [query, page]
    );

    const handleSearch = (q) => {
        setQuery(q);
        setPage(1);
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-6 dark:text-white">
                Trouve des développeurs inspirants
            </h1>
            <SearchBar onSearch={handleSearch} initialValue={query} />

            {loading && <Loader />}
            {error && <ErrorMessage message={error} />}

            {data && !loading && (
                <>
                    <p className="text-center text-gray-500 mt-4 mb-6 dark:text-gray-400">
                        {data.total_count} résultats
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {data.items.map((user) => (
                            <UserCard key={user.id} user={user} />
                        ))}
                    </div>

                    <div className="flex justify-center gap-4 mt-8">
                        <button
                            disabled={page === 1}
                            onClick={() => setPage((p) => p - 1)}
                            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg disabled:opacity-50"
                        >
                            ← Précédent
                        </button>
                        <span className="px-4 py-2 dark:text-white">Page {page}</span>
                        <button
                            disabled={data.items.length < 12}
                            onClick={() => setPage((p) => p + 1)}
                            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg disabled:opacity-50"
                        >
                            Suivant →
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
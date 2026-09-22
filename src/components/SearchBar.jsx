import { useState } from "react";

export default function SearchBar({ onSearch, initialValue = "" }) {
    const [query, setQuery] = useState(initialValue);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) onSearch(query.trim());
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-xl mx-auto">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher un dev sur GitHub..."
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700
                   bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
                type="submit"
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
                Rechercher
            </button>
        </form>
    );
}
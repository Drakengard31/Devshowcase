import { useParams, Link } from "react-router-dom";
import { getUser, getUserRepos } from "../services/githubApi.js";
import { useFetch } from "../hooks/useFetch.js";
import Loader from "../components/Loader.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";

export default function UserDetail() {
    const { username } = useParams();
    const { data: user, loading, error } = useFetch(() => getUser(username), [username]);
    const { data: repos } = useFetch(() => getUserRepos(username), [username]);

    if (loading) return <Loader />;
    if (error) return <ErrorMessage message={error} />;
    if (!user) return null;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <Link to="/" className="text-indigo-600 hover:underline">← Retour</Link>

            <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col sm:flex-row gap-6">
                <img src={user.avatar_url} alt={user.login} className="w-32 h-32 rounded-full" />
                <div className="flex-1">
                    <h1 className="text-2xl font-bold dark:text-white">{user.name || user.login}</h1>
                    <p className="text-gray-600 dark:text-gray-400">@{user.login}</p>
                    {user.bio && <p className="mt-3 dark:text-gray-300">{user.bio}</p>}
                    <div className="flex gap-4 mt-4 text-sm dark:text-gray-300">
                        <span>👥 {user.followers} followers</span>
                        <span>📦 {user.public_repos} repos</span>
                    </div>
                    <a
                        href={user.html_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                    >
                        Voir sur GitHub →
                    </a>
                </div>
            </div>

            <h2 className="text-xl font-bold mt-8 mb-4 dark:text-white">Derniers repos</h2>
            <div className="grid gap-3">
                {repos?.map((repo) => (
                    <a
                        key={repo.id}
                        href={repo.html_url}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-md transition"
                    >
                        <p className="font-semibold text-indigo-600">{repo.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {repo.description || "Pas de description"}
                        </p>
                        {repo.language && (
                            <span className="text-xs mt-2 inline-block bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                {repo.language}
              </span>
                        )}
                    </a>
                ))}
            </div>
        </div>
    );
}
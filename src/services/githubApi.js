const BASE_URL = "https://api.github.com";

export const searchUsers = async (query, page = 1, perPage = 12) => {
    const res = await fetch(
        `${BASE_URL}/search/users?q=${query}&page=${page}&per_page=${perPage}`
    );
    if (!res.ok) throw new Error("Erreur lors de la recherche");
    return res.json();
};

export const getUser = async (username) => {
    const res = await fetch(`${BASE_URL}/users/${username}`);
    if (!res.ok) throw new Error("Utilisateur introuvable");
    return res.json();
};

export const getUserRepos = async (username) => {
    const res = await fetch(
        `${BASE_URL}/users/${username}/repos?sort=updated&per_page=10`
    );
    if (!res.ok) throw new Error("Impossible de charger les repos");
    return res.json();
};
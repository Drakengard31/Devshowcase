import { createContext, useContext, useEffect, useState } from "react";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem("favorites");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (user) => {
        setFavorites((prev) =>
            prev.some((f) => f.login === user.login)
                ? prev.filter((f) => f.login !== user.login)
                : [...prev, user]
        );
    };

    const isFavorite = (login) => favorites.some((f) => f.login === login);

    return (
        <FavoritesContext.Provider
            value={{ favorites, toggleFavorite, isFavorite }}
        >
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => useContext(FavoritesContext);
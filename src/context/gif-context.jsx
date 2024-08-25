import { createContext, useContext, useState } from "react";
import { GiphyFetch } from "@giphy/js-fetch-api";

// Create a context for sharing GIF-related data between components
const GifContext = createContext();

// Create a provider component that wraps the app and provides the GIF data
const GifProvider = ({ children }) => {
    const [gifs, setGifs] = useState([]);
    const [filter, setFilter] = useState("gifs");
    const [favorites, setFavorites] = useState([]);

    // Create a GiphyFetch instance with the API key
    const gif = new GiphyFetch(import.meta.env.VITE_GIPHY_KEY);

    // Memoize the value object to prevent unnecessary re-renders
    const value = {
        gif,
        gifs,
        setGifs,
        filter,
        setFilter,
        favorites,
        setFavorites,
    };

    return <GifContext.Provider value={value}>{children}</GifContext.Provider>;
};

// Create a custom hook to access the GIF context
const useGifContext = () => {
    const context = useContext(GifContext);
    if (!context) {
        throw new Error("useGifContext must be used within a GifProvider");
    }
    return context;
};

export { GifProvider, useGifContext };

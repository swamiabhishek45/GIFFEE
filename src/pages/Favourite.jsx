import React, { useEffect, useState } from "react";
import { useGifContext } from "../context/gif-context";
import Gif from "../components/Gif";

const Favourite = () => {
    const [favoritesGIFs, setFavoritesGIFs] = useState([]);

    const { gif, favorites } = useGifContext();

    const fetchFavoritesGIFs = async () => {
        const { data: gifs } = await gif.gifs(favorites);
        setFavoritesGIFs(gifs);
    };
    useEffect(() => {
        fetchFavoritesGIFs();
    }, []);
    return (
        <div className="mt-2">
            <span className="flex justify-center font-semibold text-3xl">
                My Favorites GIFs
            </span>
            <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2 mt-2">
                {favoritesGIFs.map((favGIF) => {
                    return <Gif key={favGIF.id} gif={favGIF} />;
                })}
            </div>
        </div>
    );
};

export default Favourite;

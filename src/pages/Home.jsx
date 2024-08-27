import React, { useEffect } from "react";
import { useGifContext } from "../context/gif-context";
import Gif from "../components/Gif";
import FilterGIFs from "../components/FilterGIFs";

const Home = () => {
    const { gif, gifs, setGifs, filter } = useGifContext();

    const fetchTrendingGIFs = async () => {
        const { data } = await gif.trending({
            limit: 20,
            type: filter,
            rating: "g",
        });
        setGifs(data);
    };
    console.log(gif);

    useEffect(() => {
        fetchTrendingGIFs();
    }, [filter]);

    return (
        <div>
            <img
                src="/banner.gif"
                alt=""
                className="mt-2 rounded w-full"
            />

            <FilterGIFs showTrending={true} />

            <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2  ">
                {gifs.map((gif) => {
                    return <Gif gif={gif} key={gif.title} />;
                })}
            </div>
        </div>
    );
};

export default Home;

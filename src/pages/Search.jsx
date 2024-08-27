import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGifContext } from "../context/gif-context";
import FilterGIFs from "../components/FilterGIFs";
import Gif from "../components/Gif";

const Search = () => {
    const [searchResults, setSearchResults] = useState([]);

    const { gif, filter } = useGifContext();

    const { query } = useParams();

    const fetchSeachResult = async () => {
        const { data } = await gif.search(query, {
            sort: "relevant",
            lang: "en",
            type: filter,
            limit: 20,
        });

        setSearchResults(data);
    };

    useEffect(() => {
        fetchSeachResult();
    }, [filter, query]);

    return (
        <div className="my-4">
            <h1 className="text-4xl md:text-5xl text-center md:text-start font-extrabold pb-3">{query}</h1>

            <FilterGIFs alignLeft={true} />

            {searchResults.length > 0 ? (
                <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2  ">
                    {searchResults.map((gif) => {
                        return <Gif gif={gif} key={gif.title} />;
                    })}
                </div>
            ) : (
                <span className="">
                    No GIF found for <span className="text-purple-500">{query} </span>. Try searching for
                    text instead.
                </span>
            )}
        </div>
    );
};

export default Search;

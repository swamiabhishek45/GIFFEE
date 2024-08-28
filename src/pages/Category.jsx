import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGifContext } from "../context/gif-context";
import Gif from "../components/Gif";

import FollowOn from "../components/FollowOn";

const Category = () => {
    const [results, setResults] = useState([]);

    const { gif } = useGifContext();

    const { category } = useParams();

    const fetchResult = async () => {
        const { data } = await gif.gifs(category, category);
        setResults(data);
    };

    useEffect(() => {
        fetchResult();
    }, [category]);

    return (
        <>
            <img
                src="https://giphy.com/static/img/artist-banner.webp"
                alt=""
                className="mt-2 rounded w-full"
            />
            <div className="flex flex-col sm:flex-row gap-5 my-4">
                <div className="w-full sm:w-72">
                    {results.length > 0 && (
                        <Gif gif={results[0]} hover={false} />
                    )}
                    <span className="text-gray-400 text-sm py-2 ">
                        Don't tell it to me, GIF it to me!
                    </span>
                    <hr className="mt-10"/>
                    <FollowOn />
                    <hr />
                </div>
                <div>
                    <h2 className="text-4xl pb-1 font-extrabold capitalize">
                        {category.split("-").join("&")} GIFs
                    </h2>
                    <h2 className="text-gray-400 hover:text-gray-50 text-large pb-3 font-bold cursor-pointer">
                        @{category}
                    </h2>
                    {results.length > 0 && (
                        <div className="columns-2 sm:columns-3  md:columns-4 lg:columns-5 xl:columns-6 gap-2">
                            {results.slice(1).map((res) => {
                                return <Gif key={res.id} gif={res} />;
                            })}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Category;

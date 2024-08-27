import React from "react";
import { useGifContext } from "../context/gif-context";
import { HiMiniArrowTrendingUp } from "react-icons/hi2";

const filters = [
    {
        title: "GIFs",
        value: "gifs",
        background:
            "bg-gradient-to-tr from-purple-500 via-purple-600 to-purple-500",
    },
    {
        title: "Stickers",
        value: "stickers",
        background: "bg-gradient-to-tr from-teal-500 via-teal-600 to-teal-500",
    },
    {
        title: "Text",
        value: "text",
        background: "bg-gradient-to-tr from-blue-500 via-blue-600 to-blue-500",
    },
];

const FilterGIFs = ({ alignLeft = false, showTrending = false }) => {
    const { filter, setFilter } = useGifContext();

    return (
        <div
            className={`flex my-3 gap-3 ${alignLeft ? "" : "justify-end"} ${
                showTrending
                    ? "justify-between flex-col sm:flex-row sm:items-center"
                    : ""
            }`}
        >
            {showTrending && (
                <span className="gap-2 hidden sm:block md:flex">
                    {showTrending && (
                        <HiMiniArrowTrendingUp
                            size={25}
                            className="text-teal-400"
                        />
                    )}
                    <span className="font-semibold text-gray-400">
                        Trending
                    </span>
                </span>
            )}

            <div className="flex min-w-80 rounded-full bg-gray-700">
                {filters.map((f) => {
                    return (
                        <span
                            onClick={() => setFilter(f.value)}
                            className={` ${
                                filter === f.value ? f.background : ""
                            } bg-gray-600 font-semibold py-2 w-1/3 text-center rounded-full cursor-pointer m-1`}
                            key={f.title}
                        >
                            {f.title}
                        </span>
                    );
                })}
            </div>
        </div>
    );
};

export default FilterGIFs;

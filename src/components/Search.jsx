import React, { useState } from "react";
import { HiMagnifyingGlass, HiMiniXMark } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const Search = () => {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const searchGIFs = async () => {
        if (query.trim() === "") {
            return;
        }

        navigate(`/search/${query}`);
    };

    const handleKeyDown = (e) => {
        if(e.key === "Enter"){
            searchGIFs();
        }
    }

    return (
        <div className="flex relative h-14 ">
            {/* input bar */}
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full text-xl text-black rounded-l-md pl-4 pr-14 py-5 outline-none"
                placeholder="Search all the GIFs and Stickers"
            />

            {/* clear button  */}
            {query && (
                <button
                    onClick={() => setQuery("")}
                    className="absolute bg-gray-300 opacity-90 rounded-full right-14 mr-2 top-5"
                >
                    <HiMiniXMark size={22} />
                </button>
            )}

            {/* Search button  */}
            <button
                onClick={searchGIFs}
                className="bg-gradient-to-tr from-pink-600 to-orange-400 rounded-r-md w-14 flex items-center justify-center"
            >
                <HiMagnifyingGlass size={35} className="" />
            </button>
        </div>
    );
};

export default Search;

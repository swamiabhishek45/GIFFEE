import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiDotsVertical } from "react-icons/hi";
import { HiMiniBars3BottomRight } from "react-icons/hi2";

const Header = () => {
    const [categories, setCategories] = useState([]);
    const [showCategories, setShowCategories] = useState(false);

    return (
        <nav>
            <div className="relative flex items-center justify-between gap-4 mb-2">
                <Link className="flex gap-2" to="/">
                    <img src="./logo.svg" className="w-8" alt="" />
                    <h1 className="text-5xl font-bold tracking-tight cursor-pointer">
                        GIFEE
                    </h1>
                </Link>

                <div className="flex items-center gap-4 text-lg font-bold">
                    {/* render categories  */}
                    <Link className="hidden px-4 py-1 border-b-4 hover:gradient lg:block">
                        Reactions
                    </Link>

                    <button onClick={() => setShowCategories(!showCategories)}>
                        <HiDotsVertical
                            size={35}
                            className={`hidden px-2 py-1 border-b-4 hover:gradient lg:block ${
                                showCategories ? "gradient" : ""
                            }`}
                        />
                    </button>

                    <div className="px-6 pt-1 bg-gray-700 rounded cursor-pointer h-9">
                        <Link to="/favourites">Favourite GIFs</Link>
                    </div>

                    <button>
                        <HiMiniBars3BottomRight
                            className="block text-sky-400 lg:hidden"
                            size={30}
                        />
                    </button>
                </div>

                {showCategories && (
                    <div className="absolute right-0 z-20 w-full px-10 top-14 py-9 gradient">
                        <span>Categories</span>
                        <hr />
                        <div>
                            <Link className="font-bold">Reactions</Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Header;

// https://giphy.com/static/img/artist-banner.webp

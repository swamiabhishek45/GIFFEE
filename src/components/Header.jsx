import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiDotsVertical } from "react-icons/hi";
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { useGifContext } from "../context/gif-context";
import Search from "./Search";

const Header = () => {
    const [categories, setCategories] = useState([]);
    const [showCategories, setShowCategories] = useState(false);

    const { gif, favorites } = useGifContext();

    const fetchGifCategories = async () => {
        const { data } = await gif.categories();
        setCategories(data);
    };

    useEffect(() => {
        fetchGifCategories();
    }, []);

    return (
        <nav>
            <div className="relative flex items-center justify-between gap-4 mb-2">
                <Link className="flex gap-2" to="/">
                    <img src="./logo.svg" className="w-6 sm:w-8" alt="" />
                    <h1 className="text-3xl sm:text-5xl font-bold tracking-tight cursor-pointer">
                        GIPHY
                    </h1>
                </Link>

                <div className="flex items-center gap-4 text-lg font-bold">
                    {/* render categories  */}
                    {categories?.slice(0, 5)?.map((category) => {
                        return (
                            <Link
                                key={category.name}
                                to={`/${category.name_encoded}`}
                                className="hidden px-4 py-1 border-b-4 hover:gradient lg:block"
                            >
                                {category.name}
                            </Link>
                        );
                    })}

                    {/* Dots Vertical Icon */}
                    <button onClick={() => setShowCategories(!showCategories)}>
                        <HiDotsVertical
                            size={35}
                            className={`hidden px-2 py-1 border-b-4 hover:gradient lg:block ${
                                showCategories ? "gradient" : ""
                            }`}
                        />
                    </button>

                    {showCategories && (
                        <div className="absolute right-0 z-20 w-full px-10 top-14 py-9 gradient">
                            <span className="text-3xl font-extrabold">
                                Categories
                            </span>
                            <hr className="my-5 bg-gray-100 opacity-50" />
                            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                                {categories.map((category) => {
                                    return (
                                        <Link
                                            key={category.name}
                                            to={`/${category.name_encoded}`}
                                            className=" p-2 font-bold hover:bg-gray-700 rounded-md"
                                        >
                                            {category.name}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Favourite Button  */}
                    {favorites.length >= 0 && (
                        <div className="flex">
                            <img
                                src="https://media.giphy.com/avatars/default2/80h.gif"
                                alt=""
                                className="w-8 rounded-l"
                            />
                            <div className="px-6 pt-1 bg-gray-700 rounded-r cursor-pointer h-9">
                                <Link to="/favourites" className="">
                                    Favourites
                                </Link>
                            </div>
                        </div>
                    )}

                    {/* Minibar Icon  */}
                    <button>
                        <HiMiniBars3BottomRight
                            className="block ml-2 text-sky-400 lg:hidden"
                            size={30}
                        />
                    </button>
                </div>
            </div>

            {/* search */}
            <Search />
        </nav>
    );
};

export default Header;

// https://giphy.com/static/img/artist-banner.webp
// https://media.giphy.com/avatars/default2/80h.gif

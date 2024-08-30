import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGifContext } from "../context/gif-context";
import Gif from "../components/Gif";
import {
    HiMiniChevronDown,
    HiMiniChevronUp,
    HiMiniHeart,
} from "react-icons/hi2";
import FollowOn from "../components/FollowOn";
import { HiOutlineExternalLink } from "react-icons/hi";
import { FaPaperPlane } from "react-icons/fa";
import { IoCodeSharp } from "react-icons/io5";

const contentType = ["gifs", "stickers", "texts"];

const SingleGIF = () => {
    const { type, slug } = useParams();

    const [gif, setGif] = useState({});
    const [relatedGifs, setRelatedGifs] = useState([]);
    const [readMore, setReadMore] = useState(false);

    const { gif: gf, addToFavorites, favorites } = useGifContext();

    const shareGif = () => {
        // TODO:
    };
    const EmbedGif = () => {
        // TODO:
    };

    const fetchGif = async () => {
        const gifId = slug.split("-");
        const { data } = await gf.gif(gifId[gifId.length - 1]);
        const { data: related } = await gf.related(gifId[gifId.length - 1], {
            limit: 10,
        });
        setGif(data);
        setRelatedGifs(related);
    };

    useEffect(() => {
        if (!contentType.includes(type)) {
            throw new Error("Invalid Content Type");
        }
        fetchGif();
    }, []);

    // console.log(gf);
    return (
        
        <div className="grid grid-cols-4 my-10 gap-4">
            {/* sidebar */}
            <div className="hidden sm:block">
                {gif?.user && (
                    <>
                        <div className="flex gap-3 mb-5">
                            <img
                                src={gif?.user?.avatar_url}
                                alt={gif?.user?.display_name}
                                className="h-14"
                            />
                            <div className="">
                                <div className="font-bold">
                                    {gif?.user.display_name}
                                </div>
                                <div className="font-thin">
                                    @{gif?.user.username}
                                </div>
                            </div>
                        </div>
                        {gif?.user?.description && (
                            <p className="mb-5 py-4 whitespace-pre-line text-gray-400 text-sm">
                                {readMore
                                    ? gif?.user?.description
                                    : gif?.user?.description.slice(0, 100) +
                                      "..."}
                                {gif?.user?.description.length > 100 && (
                                    <div
                                        onClick={() => setReadMore(!readMore)}
                                        className="flex items-center text-gray-500  cursor-pointer"
                                    >
                                        {readMore ? (
                                            <>
                                                Read less{" "}
                                                <HiMiniChevronUp size={20} />
                                            </>
                                        ) : (
                                            <>
                                                Read more{" "}
                                                <HiMiniChevronDown size={20} />
                                            </>
                                        )}
                                    </div>
                                )}
                            </p>
                        )}
                    </>
                )}
                <hr />
                <FollowOn />
                <hr />
                {gif?.source && (
                    <div className="my-10">
                        <span>Source:</span>
                        <div className="flex items-center text-sm font-bold gap-1">
                            <HiOutlineExternalLink size={25} />
                            <a
                                href={gif.source}
                                target="_blank"
                                className="truncate"
                            >
                                {gif.source}
                            </a>
                        </div>
                    </div>
                )}
            </div>
            <div className="col-span-4 sm:col-span-3">
                {/* singleGIF  */}
                <div className="flex gap-6">
                    <div className="w-full sm:w-3/4">
                        <div className="text-gray-400 truncate mb-2">
                            {gif.title}
                        </div>
                        <Gif gif={gif} hover={true} />

                        {/* mobile UI  */}
                        <div className="flex sm:hidden gap-1">
                            <img
                                src={gif?.user?.avatar_url}
                                alt={gif?.user?.display_name}
                                className="h-14"
                            />
                            <div className="px-2">
                                <div className="font-bold">
                                    {gif?.user?.display_name}
                                </div>
                                <div className="text-gray-400">
                                    @{gif?.user?.username}
                                </div>
                            </div>
                            <div className="ml-auto flex gap-4">
                                <button
                                    onClick={() => addToFavorites(gif.id)}
                                    className="flex gap-5 items-center font-bold text-lg"
                                >
                                    <HiMiniHeart
                                        size={30}
                                        className={`${
                                            favorites.includes(gif.id)
                                                ? "text-red-500"
                                                : ""
                                        }`}
                                    />
                                </button>
                                <button
                                    onClick={shareGif}
                                    className="flex gap-5 items-center font-bold text-lg"
                                >
                                    <FaPaperPlane size={25} />
                                </button>
                                <button
                                    onClick={EmbedGif}
                                    className="flex gap-5 items-center font-bold text-lg"
                                >
                                    <IoCodeSharp size={30} />
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* favourite / share / embeded */}
                    <div className="hidden sm:flex flex-col gap-5 mt-6">
                        <button
                            onClick={() => addToFavorites(gif.id)}
                            className="flex gap-5 items-center font-bold text-lg"
                        >
                            <HiMiniHeart
                                size={30}
                                className={`${
                                    favorites.includes(gif.id)
                                        ? "text-red-500"
                                        : ""
                                }`}
                            />
                            Favorite
                        </button>
                        <button
                            onClick={shareGif}
                            className="flex gap-5 items-center font-bold text-lg"
                        >
                            <FaPaperPlane size={25} />
                            Share
                        </button>
                        <button
                            onClick={EmbedGif}
                            className="flex gap-5 items-center font-bold text-lg"
                        >
                            <IoCodeSharp size={30} />
                            Embed
                        </button>
                    </div>
                </div>
                <div className="my-2">
                    <span className="font-bold text-gray-400">
                        Related GIFs
                    </span>
                    <div className="columns-2 md:columns-3 gap-2">
                        {relatedGifs.slice(1).map((rGif) => {
                            return (
                                <Gif key={rGif.id} gif={rGif} hover={true} />
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleGIF;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGifContext } from "../context/gif-context";
import Gif from "../components/Gif";
import { HiMiniChevronDown, HiMiniChevronUp } from "react-icons/hi2";
import FollowOn from "../components/FollowOn";
import { HiOutlineExternalLink } from "react-icons/hi";

const contentType = ["gifs", "stickers", "texts"];

const SingleGIF = () => {
    const { type, slug } = useParams();
    
    const [gif, setGif] = useState({});
    const [relatedGifs, setRelatedGifs] = useState([]);
    const [readMore, setReadMore] = useState(false);

    const { gif: gf } = useGifContext();

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

    return (
        <div className="grid grid-cols-4 my-10 gap-4">
            {/* sidebar */}
            <div className="hidden sm:block">
                {gif?.user && (
                    <>
                        <div className="flex gap-3 mb-10">
                            <img
                                src={gif?.user?.avatar_url}
                                alt={gif?.user?.display_name}
                                className="h-14"
                            />
                            <div className="px-2">
                                <div className="font-bold">
                                    {gif?.user.display_name}
                                </div>
                                <div className="font-thin">
                                    @{gif?.user.username}
                                </div>
                            </div>
                        </div>
                        {gif?.user?.description && (
                            <p className="py-4 whitespace-pre-line text-gray-400 text-sm">
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
                          <HiOutlineExternalLink size={25}/>
                          <a href={gif.source} target="_blank" className="truncate">{gif.source}</a>
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
                    </div>
                    favourite / share / embeded
                </div>
                <div>
                    <span className="font-bold text-gray-400">
                        Related GIFs
                    </span>
                    <div>
                        {relatedGifs.map((rGif) => {
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

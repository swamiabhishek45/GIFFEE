import React from "react";
import { Link } from "react-router-dom";

const Gif = ({ gif, hover = true }) => {
    // console.log(gif.images.original.url);

    // const downloadFile = (url, filename) => {
    //     const a = document.createElement("a");
    //     a.href = url;
    //     a.download = filename;
    //     document.body.appendChild(a);
    //     a.click();
    //     document.body.removeChild(a);
    // };

    // const handleDownload = () => {
    //     const imgUrl = gif.images.original.url; // Replace with your image/GIF URL
    //     const fileName = "downloaded-image.gif"; // Replace with your desired file name
    //     downloadFile(imgUrl, fileName);
    // };

    return (
        <Link to={`/${gif.type}s/${gif.slug}`}>
            <div className="w-full mb-2 relative cursor-pointer group aspect-video">
                <img
                    src={gif?.images?.fixed_width.webp}
                    alt={gif?.title}
                    className="w-full object-cover rounded transition-all duration-300"
                />

                {hover && (
                    <div className="absolute inset-0 opacity-0 rounded group-hover:opacity-100 bg-gradient-to-b from-transparent via-transparent to-black font-bold flex items-end gap-2 p-2">
                        <img
                            src={gif?.user?.avatar_url}
                            alt={gif?.user?.display_name}
                            className="h-8"
                        />
                        <span>{gif?.user?.display_name}</span>
                        {/* <button
                            onClick={handleDownload}
                            className="p-2 bg-blue-500 text-white rounded"
                        >
                            Download Image
                        </button> */}
                    </div>
                )}
            </div>
        </Link>
    );
};

export default Gif;

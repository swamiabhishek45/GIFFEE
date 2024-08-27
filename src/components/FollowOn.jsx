import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const FollowOn = () => {
    return (
        <div className="flex flex-col gap-3 pt-3 mb-8">
            <span className="font-bold">Follow on:</span>
            <div className="flex gap-4 pt-3">
                <a href="https://github.com/swamiabhishek45" target="_blank">
                    <FaGithub size={20} />
                </a>
                <a href="https://x.com/swamiabhishek45" target="_blank">
                    <FaXTwitter size={20} />
                </a>
                <a
                    href="https://www.linkedin.com/in/swamiabhishek45/"
                    target="_blank"
                >
                    <FaLinkedin size={20} />
                </a>
            </div>
        </div>
    );
};

export default FollowOn;

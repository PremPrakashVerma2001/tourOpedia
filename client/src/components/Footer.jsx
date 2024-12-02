import { useContext } from "react";
import { Link } from "react-router-dom";
import ThemeContext from "../contexts/ThemeContext";

function Footer() {
  const { theme } = useContext(ThemeContext);

  return (
    <footer
      className={
        "w-full flex flex-wrap" +
        `${
          theme === false
            ? " bg-[#FBFCF8] border-b-gray-700"
            : " bg-[#23272f] border-b-white/40 text-white "
        }`
      }
    >
      <div className="w-1/2 p-4 ">
        <h1 className="text-2xl">
          TourO<span className="text-blue-500">pedia</span>
        </h1>
        <p className=" break-words text-wrap mt-4 w-[80%] text-xs">
          TourOpedia is your ultimate platform to share and discover amazing
          travel experiences. From serene beaches to majestic mountains, recount
          your journeys, explore hidden gems, and inspire fellow travelers.
          Whether you're an avid explorer or a first-time adventurer, TourOpedia
          connects you to a world of unforgettable stories and destinations.
        </p>
        <p className="text-xs text-center mt-2">All Copywrite Reserved @2024</p>
      </div>
      <div className="w-1/2 flex flex-wrap items-center justify-evenly list-none p-4 font-bold">
        <Link>
          <li>Github</li>
        </Link>
        <Link>
          <li>About</li>
        </Link>
        <Link>
          <li>Owner</li>
        </Link>
      </div>
    </footer>
  );
}

export default Footer;

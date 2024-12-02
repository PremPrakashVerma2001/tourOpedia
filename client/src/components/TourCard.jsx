import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import { likeAction, tagAction } from "../redux/features/tourSlice";
import { useContext, useState } from "react";

import { FaHeart } from "react-icons/fa6";
import ThemeContext from "../contexts/ThemeContext";

function TourCard({ item }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  const [isLiked, setIsLiked] = useState(false);

  function handleClick(tagV) {
    dispatch(tagAction({ tagV, navigate, toast }));
  }

  function handleLikeClick(likeCount, id) {
    dispatch(likeAction({ likeCount, id, toast }));
    setIsLiked(!isLiked);
    // navigate("/dashboard");
  }

  return (
    <div className="w-[30vw] border-[2px] border-gray-600 shadow-md hover:shadow-gray-600 rounded-md p-2 relative flex flex-col gap-4">
      <div>
        <img
          src={item.imgFile.length}
          alt="tour_Img"
          className="max-w-full h-[180px] mx-auto "
        />
      </div>

      <h1 className="text-xl font-semibold">{item.title}</h1>
      {/* <h1>{item.name}</h1> */}
      <div className="flex flex-wrap items-center justify-between overflow-hidden">
        <div className="flex flex-wrap justify-start gap-1 ">
          {item.tags.map((tagV, index) => {
            return (
              <div
                key={index}
                className=" border-[2px] rounded-bl-lg px-1 rounded-r-lg border-yellow-400 bg-cyan-300/40 text-center text-sm font-extralight "
              >
                <Link to={`/tag/${tagV}`} onClick={() => handleClick(tagV)}>
                  # {tagV}
                </Link>
              </div>
            );
          })}
        </div>
        <div
          className={`cursor-pointer text-xl flex flex-wrap items-center gap-2 absolute top-0 right-0 p-2`}
          onClick={(e) => handleLikeClick(item.likeCount, item._id)}
        >
          {" "}
          <FaHeart className="text-pink-500" /> {item.likeCount}
        </div>
      </div>
      <p
        className={
          "break-words whitespace-pre-wrap justify-start " +
          `${theme === true ? "text-black/70 " : "text-white/70"}`
        }
      >
        {item.desc.length > 100 && item.desc.substring(0, 100) + "..."}{" "}
        <Link
          to={`/tour/${item._id}`}
          className="text-blue-500/80 hover:bg-gradient-to-br hover:from-blue-500 hover:to-teal-500/50 hover:text-white
           hover:rounded-lg p-1"
        >
          Read More
        </Link>{" "}
      </p>
    </div>
  );
}

export default TourCard;

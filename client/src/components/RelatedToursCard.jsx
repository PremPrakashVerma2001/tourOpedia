import { FaHeart } from "react-icons/fa6";
import { Link } from "react-router-dom";

const RelatedToursCard = ({ item }) => {
  return (
    <div className=" grid grid-cols-3 gap-4 {border-[3px]} rounded-lg p-2 w-[80%] mx-auto shadow-md hover:shadow-sky-400/50">
      {/* <div className=""> */}
      <h1 className="text-xl col-span-2 ">{item.title}</h1>
      <div
        className={`text-xl flex flex-wrap items-center gap-2 justify-center`}
        //   onClick={(e) => handleLikeClick(item.likeCount, item._id)}
      >
        {" "}
        <FaHeart className="text-pink-500" /> {item.likeCount}
        {/* </div> */}
      </div>
      <div className="col-span-2">Posted by - {item.name}</div>
      <Link
        to={`/tour/${item._id}`}
        className="text-blue-500/80 hover:bg-gradient-to-br hover:from-blue-500 hover:to-teal-500/50 hover:text-white
           hover:rounded-lg p-1 text-center"
      >
        View
      </Link>{" "}
    </div>
  );
};

export default RelatedToursCard;

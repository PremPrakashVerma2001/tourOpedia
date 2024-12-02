import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteTourByIdAction } from "../redux/features/tourSlice";
import toast from "react-hot-toast";
import { FiEdit2 } from "react-icons/fi";
import { MdOutlineDeleteOutline } from "react-icons/md";

const DashBoardCard = ({ item }) => {
  const dispatch = useDispatch();

  function handleDelete(id) {
    if (window.confirm("Are Your sure you want to Delete this Tour")) {
      dispatch(deleteTourByIdAction({ id, toast }));
    }
  }

  return (
    <div className="w-[30vw] {h-[60vh]} border-[2px] border-gray-600 shadow-2xl hover:shadow-gray-600 rounded-md p-2 {overflow-clip} relative flex flex-col gap-3 ">
      <div>
        <img
          src={item.imgFile}
          alt="tour_Img"
          className="max-w-full h-[180px] "
        />
      </div>

      <h1>{item.title}</h1>
      {/* <h1>{item.name}</h1> */}
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex flex-wrap justify-start gap-1">
          {item.tags.map((item, index) => {
            return (
              <div
                key={index}
                className=" border-[2px] rounded-bl-lg px-1 rounded-r-lg border-black bg-cyan-300/40 text-center text-sm font-extralight"
              >
                # {item}
              </div>
            );
          })}
        </div>
        <div className="absolute top-0 right-0 p-2 text-xl">
          {" "}
          🧡{item.likeCount}
        </div>
      </div>
      <p className="break-words whitespace-pre-wrap">
        {item.desc.length > 100 && item.desc.substring(0, 100) + "..."}{" "}
        <Link
          to={`/tour/${item._id}`}
          className="text-blue-500/80 hover:bg-gradient-to-br hover:from-blue-500 hover:to-teal-500/50 hover:text-white
           hover:rounded-lg p-1"
        >
          Read More
        </Link>{" "}
      </p>
      <div className="flex flex-wrap items-center justify-evenly">
        <Link to={`/editour/${item._id}`}>
          <button
            className=" flex flex-wrap items-center gap-2 rounded-lg bg-gradient-to-br from-blue-500 to-blue-400  hover:bg-gradient-to-tl hover:from-blue-600 hover:to-blue-500 hover:text-white px-3 py-2"
            type="submit"
          >
            <FiEdit2 />
            Edit
          </button>
        </Link>

        <button
          className=" flex flex-wrap items-center gap-2 rounded-lg {bg-red-500/50 hover:bg-red-600} bg-gradient-to-br from-red-500 to-red-400  hover:bg-gradient-to-tl hover:from-red-600 hover:to-red-500 hover:text-white px-3 py-2 active:scale-75"
          type="button"
          onClick={(e) => {
            handleDelete(item._id);
          }}
        >
          <MdOutlineDeleteOutline />
          Delete
        </button>
      </div>
    </div>
  );
};

export default DashBoardCard;

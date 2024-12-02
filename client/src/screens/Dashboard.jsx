import { useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getTourByUserIdAction } from "../redux/features/tourSlice";
// import TourCard from "../components/TourCard";
import DashBoardCard from "../components/DashBoardCard";
import Spinner from "../components/Spinner";
import ThemeContext from "../contexts/ThemeContext";

import { Link } from "react-router-dom";

function DashBoard() {
  const dispatch = useDispatch();

  const tourState = useSelector((state) => state.tour);
  // const authState = use;
  const { theme } = useContext(ThemeContext);

  const { userTours } = tourState;

  const userToursArray = userTours?.["tours"];
  // const deletedTour = tour?.["tour"];

  useEffect(() => {
    dispatch(getTourByUserIdAction(toast));
  }, []);

  // function handleDelete(id) {
  //   dispatch(deleteTourByIdAction({ id, toast }));
  // }

  return (
    <section
      className={
        "w-full {border-[4px] border-black} flex flex-wrap items-center gap-6 p-4 " +
        `${theme === true ? "bg-[#FBFCF8]" : "bg-[#23272f] text-white "}`
      }
    >
      {userToursArray ? (
        userToursArray.length !== 0 ? (
          userToursArray.map((item) => {
            return <DashBoardCard item={item} key={item._id} />;
          })
        ) : (
          <div
            className={
              "text-center text-4xl text-red-500/50 h-[80vh] grid grid-rows-1 items-center mx-auto "
            }
          >
            <h1>
              You have {userToursArray.length} Tour Created! Go to
              <span className="text-blue-500">
                {" "}
                <Link to={"/addtour"}> Add Tour </Link>{" "}
              </span>
              Page
            </h1>
          </div>
        )
      ) : (
        <Spinner />
      )}
    </section>
  );
}

export default DashBoard;

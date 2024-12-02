import { useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getTourByIdAction,
  relatedTourAction,
} from "../redux/features/tourSlice.jsx";
import Spinner from "../components/Spinner.jsx";
import RelatedTours from "../components/RelatedTours.jsx";
import ThemeContext from "../contexts/ThemeContext.jsx";

const SingleTour = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { theme } = useContext(ThemeContext);

  const tourState = useSelector((state) => {
    return state.tour;
  });

  const { tour, relatedTours } = tourState;

  //   const { imgFile, title, name, likeCount, tags, desc } = tour["tour"];
  const item = tour?.["tour"];
  const toursArray = relatedTours?.tours;

  const tags = item?.tags;

  useEffect(() => {
    dispatch(getTourByIdAction({ id, toast }));
    // if (tags) {
    //   dispatch(relatedTourAction({ tags, toast }));
    // }
  }, [id]);

  //why only difference useEffect is working not both together.
  useEffect(() => {
    if (tags) dispatch(relatedTourAction({ tags, toast }));
  }, [tags]);

  return (
    <>
      <div
        className={
          "w-full " +
          `${theme === true ? "bg-[#FBFCF8]" : "bg-[#23272f] text-white"}`
        }
      >
        <section
          className={
            " max-w-[80%] mx-auto {border-[2px] border-pink-400} p-2 flex flex-col gap-4 " +
            `${theme === true ? "bg-[#FBFCF8]" : "bg-[#23272f] text-white"}`
          }
        >
          {item ? (
            <>
              <img src={item?.imgFile} className="w-[75%] h-[400px] mx-auto " />
              <h1 className="text-6xl text-center font-extrabold ">
                {item?.title}
              </h1>
              <h1> Author Name: {item?.name.toUpperCase()}</h1>
              <div className="flex flex-wrap items-center justify-between w-[90%]">
                <div className="flex flex-wrap justify-start gap-1">
                  {item?.tags.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className=" border-[2px] rounded-bl-lg px-1 rounded-r-lg border-yellow-400 bg-cyan-300/40 text-center text-sm font-extralight "
                      >
                        # {item}
                      </div>
                    );
                  })}
                </div>
                <div className="text-4xl"> 🧡{item?.likeCount}</div>
              </div>

              <p className="text-justify w-[50%] mx-auto break-words">
                {item?.desc}
              </p>
              <hr className="h-[3px] bg-gradient-to-r from-[#9ad0f1] to-[#c2dae8] shadow-inner rounded-md max-w-full" />
              <RelatedTours relatedtoursArray={toursArray} tourId={id} />
            </>
          ) : (
            <Spinner />
          )}

          {/* <h1>SINGLE TOUR</h1> */}
        </section>
      </div>
    </>
  );
};

export default SingleTour;

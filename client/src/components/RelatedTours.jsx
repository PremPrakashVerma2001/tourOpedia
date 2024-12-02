import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { relatedTourAction } from "../redux/features/tourSlice";
import toast from "react-hot-toast";
import Spinner from "./Spinner";
import TourCard from "./TourCard";
import RelatedToursCard from "./RelatedToursCard";

const RelatedTours = ({ relatedtoursArray, tourId }) => {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  // const { relatedTours } = useSelector((state) => state.tour);

  const toursArray = relatedtoursArray?.filter((item, index) => {
    return item._id !== tourId;
  });

  // useEffect(() => {
  //   dispatch(relatedTourAction({ tags, navigate, toast }));
  // }, [id]);

  // console.log(tags);

  return (
    <>
      <h1 className="text-4xl text-start">Related Tours You May Like</h1>
      <section className="h-full flex flex-wrap item-center justify-start p-4 gap-4 {border-[2px] border-red-500} w-[70%] mx-auto my-3 ">
        {/* {toursArray?.length > 0 ? 
          toursArray.map((item, index) => {
            return <TourCard item={item} key={item._id} />;
          })
        ) : (
          <Spinner />
        )} */}
        {toursArray ? (
          toursArray.length !== 0 ? (
            toursArray.map((item) => {
              return <RelatedToursCard item={item} key={item._id} />;
            })
          ) : (
            <div className="text-center text-4xl text-red-500/70">
              <h1>Sorry , Looks Like No Related Tour Are there</h1>
            </div>
          )
        ) : (
          <Spinner />
        )}
      </section>
    </>
  );
};

export default RelatedTours;

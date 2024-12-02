import React, { useContext, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import TourCard from "../components/TourCard";
import { getTourAction, tagAction } from "../redux/features/tourSlice";
import toast from "react-hot-toast";
import Spinner from "../components/Spinner";

import { useNavigate, useParams } from "react-router-dom";
import Pagination from "../components/Pagination";
import ThemeContext from "../contexts/ThemeContext";
export const Home = () => {
  const [pageNo, setpageNo] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { theme } = useContext(ThemeContext);

  // const { tagV } = useParams();

  // console.log(tagV);

  const tourState = useSelector((state) => state.tour);

  const { tours, loading } = tourState;
  const toursArray = tours?.["tours"];
  const noOfPage = tours?.["noOfPage"];

  // console.log(toursArray?.length);

  useEffect(() => {
    dispatch(getTourAction({ toast, pageNo }));
    // if (tagV) {
    //   dispatch(tagAction({ tagV, navigate, toast }));
    // }
  }, []);

  // useEffect(() => {
  //   setToursArray(tours["tours"]);
  // }, [toursArray]);

  function handlePrevPage() {
    if (pageNo >= 1 && pageNo <= noOfPage) {
      if (pageNo === 1) setpageNo(1);
      else setpageNo((pageNo) => pageNo - 1);

      if (pageNo >= 1)
        dispatch(
          getTourAction({ toast, pageNo: pageNo === 1 ? 1 : pageNo - 1 })
        );
    }
  }
  function handleNextPage() {
    if (pageNo === noOfPage) setpageNo(noOfPage);
    else setpageNo((pageNo) => pageNo + 1);

    if (pageNo <= noOfPage)
      dispatch(
        getTourAction({
          toast,
          pageNo: pageNo === noOfPage ? pageNo : pageNo + 1,
        })
      );
  }

  return (
    <>
      {/* <h1 className="text-4xl text-center">{pageNo}</h1> */}
      <section
        className={
          "w-full h-full flex flex-col item-center justify-start p-3 {border-4 border-green-500} h-[90vh] " +
          `${theme === true ? "bg-[#FBFCF8]" : "bg-[#23272f] text-white"}`
        }
      >
        {" "}
        <div className="flex flex-wrap p-4 gap-4">
          {!loading ? (
            toursArray?.map((item, index) => {
              return <TourCard item={item} key={item._id} />;
            })
          ) : (
            <Spinner />
          )}
        </div>
        <div className="grid items-center">
          {!loading && (
            <Pagination
              pageNo={pageNo}
              onNext={handleNextPage}
              onPrev={handlePrevPage}
              maxPage={noOfPage}
            />
          )}
        </div>{" "}
        {/* <Spinner /> */}
      </section>
    </>
  );
};

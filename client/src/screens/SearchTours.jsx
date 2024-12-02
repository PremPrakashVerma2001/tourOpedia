import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Spinner from "../components/Spinner";

import TourCard from "../components/TourCard";

function SearchTours() {
  const { searchTours } = useSelector((state) => state?.tour);

  const toursArray = searchTours?.tours;

  return (
    <>
      {/* <h1 className="text-4xl text-center">{toursArray?.length}</h1> */}
      <section className="w-full h-full flex flex-wrap item-center justify-start p-4 gap-4 ">
        {toursArray ? (
          toursArray.map((item, index) => {
            return <TourCard item={item} key={item._id} />;
          })
        ) : (
          <Spinner />
        )}
      </section>
    </>
  );
}

export default SearchTours;

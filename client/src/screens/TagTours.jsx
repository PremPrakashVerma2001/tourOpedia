import { useSelector } from "react-redux";
import TourCard from "../components/TourCard";
import Spinner from "../components/Spinner";

const TagTours = () => {
  const { tagTours } = useSelector((state) => state.tour);

  const toursArray = tagTours?.tours;

  return (
    <>
      <h1 className="text-4xl text-center">{toursArray?.length}</h1>
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
};

export default TagTours;

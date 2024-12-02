import { useContext } from "react";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import ThemeContext from "../contexts/ThemeContext";

const Pagination = ({ pageNo, onNext, onPrev, maxPage }) => {
  const pages = new Array(maxPage);
  for (let i = 0; i < pages.length; i++) pages[i] = i + 1;

  const { theme } = useContext(ThemeContext);

  return (
    <div className="flex flex-wrap mx-auto items-center gap-4">
      <button
        className="text-3xl  hover:shadow-xl hover:shadow-gray-600/50 rounded-xl  active:scale-75 transition-transform focus:ring-red-400"
        type="button"
        disabled={pageNo === 1 ? true : false}
        onClick={(e) => {
          //   e.stopPropagation();
          onPrev();
        }}
      >
        <FaArrowAltCircleLeft />
      </button>
      {pages.map((item, index) => {
        return (
          <h1
            key={index}
            className={
              item === pageNo
                ? `bg-sky-200 text-sky-900  w-5 text-center text-xl rounded-t-lg rounded-b-lg`
                : ``
            }
          >
            {item}
          </h1>
        );
      })}
      <button
        className="text-3xl hover:shadow-xl hover:shadow-gray-600/50 rounded-xl active:scale-75 transition-transform"
        disabled={pageNo === maxPage ? true : false}
        onClick={() => {
          //   e.stopPropagation();
          onNext();
        }}
      >
        <FaArrowAltCircleRight />
      </button>
    </div>
  );
};

export default Pagination;

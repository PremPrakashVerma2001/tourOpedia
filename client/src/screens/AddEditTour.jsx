import { useState, useEffect, useContext } from "react";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { IoMdAddCircle } from "react-icons/io";

import {
  addTourAction,
  updateTourAction,
} from "../redux/features/tourSlice.jsx";

import formImg from "../img/form.gif";
import ThemeContext from "../contexts/ThemeContext.jsx";

const initState = {
  title: "",
  desc: "",
  tags: [],
  imgFile: "",
  // imgFile: null,
  // file : null,
};

const info = {
  style: {
    border: "1px solid white",
    padding: "5px",
    color: "black",
    borderRadius: "10px",
  },
  position: "top-center",
  icon: "ℹ️",
};
const clearToast = {
  style: {
    border: "1px solid white",
    padding: "5px",
    color: "gray",
    borderRadius: "10px",
  },
  position: "top-center",
  icon: "🧹",
};

function AddEditTour() {
  const [tour, setTour] = useState(initState);
  const [tagValue, setTagValue] = useState("");
  // const [file, setFile] = useState(null);

  const { title, desc, tags } = tour;

  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authState = useSelector((state) => state.auth);
  const tourState = useSelector((state) => state.tour);
  const { user } = authState;
  const { userTours } = tourState;
  const usersToursArray = userTours?.["tours"];

  // const { token } = user;
  // console.log(user?.token);

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (usersToursArray && id) {
      const editTour = usersToursArray.find((item, index) => item._id === id);
      // console.log()
      setTour({ ...editTour });
    }
  }, [id]);

  function handleSubmit(e) {
    e.preventDefault();
    // console.log(tour);

    if (title && desc && tags.length !== 0) {
      const updatedTourData = { ...tour, name: user?.user };
      // console.log(updatedTourData);

      if (!id) dispatch(addTourAction({ updatedTourData, navigate, toast }));
      else {
        // console.log(tour);
        dispatch(updateTourAction({ id, updatedTourData, navigate, toast }));
      }
    } else {
      toast("Kindly Fill All the Fields 🤗", info);
    }
  }

  function handleChange(e) {
    setTour({
      ...tour,
      [e.target.name]: e.target.value,
    });
  }
  function handleTagChange(e) {
    setTagValue(e.target.value);
  }

  function handleClear(e) {
    setTour({ ...initState });
    setTagValue("");
    toast.success("All Fields have been Cleared!", clearToast);
  }

  function handleAddTag() {
    setTour({
      ...tour,
      tags: [...tags, tagValue],
    });
    setTagValue("");
  }

  function handleDeleteTag(deleteTag) {
    // console.log("tags", tags);

    //always remember to return in arrow function even if single line-
    const newTags = tags.filter((item) => {
      return item !== deleteTag;
    });

    // console.log("newtags", newTags);

    setTour({
      ...tour,
      tags: newTags,
    });

    // e.stopPropagation();

    // console.log(e.target);
  }

  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // Get the selected file
  };

  return (
    <section
      className={
        "w-full  {border-[2px] border-cyan-600/50} flex flex-wrap justify-center items-center p-4 " +
        `${`${theme === true ? "bg-[#FBFCF8]" : "bg-[#23272f] text-white"}`}`
      }
    >
      <div className="w-1/2 shadow-md rounded-lg shadow-cyan-500/50 text-xs ">
        <img
          src={formImg}
          alt="loginIcon"
          className="w-[100px] h-[100px] mx-auto"
        />
        <form
          className="space-y-4 text-[1.3vmax] px-[2vw]"
          onSubmit={handleSubmit}
        >
          <div className="space-y-1">
            <label htmlFor="title">Title</label>
            <br />
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Write your title here..."
              minLength={1}
              maxLength={200}
              value={title}
              autoComplete="off"
              //   required
              className="w-full text-black p-2 bg-transparent border-b-2 border-b-black/50  focus:outline-none focus:border-b-2 focus:border-b-cyan-400/50 focus:bg-slate-500/20 focus:rounded-md"
              onChange={handleChange}
            />
          </div>
          <div className="">
            <label htmlFor="desc">Description</label>
            <br />
            <textarea
              type="text"
              name="desc"
              id="desc"
              placeholder="Write your details here..."
              minLength={1}
              maxLength={500}
              value={desc}
              rows={5}
              cols={15}
              //   required
              className="w-full text-black p-2 bg-transparent border-b-2 border-b-black/50  focus:outline-none focus:border-b-2 focus:border-b-cyan-400/50 focus:bg-slate-500/20 focus:rounded-md "
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="space-y-1">
            <label htmlFor="=tags">Tags</label>
            <br />
            <div className="flex flex-wrap item-center justify-between">
              <input
                type="text"
                name="tags"
                id="tags"
                placeholder="Add tag here..."
                minLength={1}
                maxLength={20}
                value={tagValue}
                autoComplete="off"
                //   required
                className="w-[90%] text-black p-2 bg-transparent border-b-2 border-b-black/50  focus:outline-none focus:border-b-2 focus:border-b-cyan-400/50 focus:bg-slate-500/20 focus:rounded-md"
                onChange={handleTagChange}
              />
              <div
                className="text-4xl cursor-pointer active:scale-75 hover:shadow-md rounded-[100%] hover:shadow-cyan-500/50"
                onClick={handleAddTag}
              >
                <IoMdAddCircle />
              </div>
            </div>
            <div className="flex flex-wrap justify-start gap-1">
              {tags.map((item, index) => {
                return (
                  <div
                    key={index}
                    className=" border-1 rounded-bl-lg px-1 rounded-r-lg border-white bg-cyan-300/40 text-center text-sm font-extralight"
                  >
                    {item}
                    <span
                      className="text-sm cursor-pointer"
                      onClick={(e) => {
                        handleDeleteTag(item);
                      }}
                    >
                      {" "}
                      ❌
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="">
            {/* <label htmlFor="desc">Choose File</label>
            <br /> */}
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) => {
                setTour({ ...tour, imgFile: base64 });
              }}
            />
            {/* new file */}
            {/* <input type="file" onChange={handleFileChange} /> */}
          </div>
          <div className="text-center space-y-2 flex flex-wrap justify-evenly items-baseline   p-2">
            <button
              className="rounded-lg {bg-green-500/50 hover:bg-green-600} bg-gradient-to-r from-green-500 via-emerald-500 to-green-500 hover:from-green-400 hover:via-emerald-500 hover:to-green-400  hover:text-white p-2 w-[80px] h-[40px]"
              type="submit"
            >
              {id ? "UPDATE" : "ADD"}
            </button>
            <button
              className="rounded-lg bg-gray-500/50 hover:bg-gray-600 hover:text-white p-2 w-[80px] h-[40px]"
              type="button"
              onClick={handleClear}
            >
              Clear
            </button>
            {/* <p className="text-black/60">Forgot Password ?</p> */}
          </div>
          {/* <div className="text-base text-center">
            <p>
              Don't have an Account ?{" "}
              <Link
                className="text-cyan-500/50 font-semibold hover:text-cyan-600 text-lg"
                to="/signup"
              >
                SignUp
              </Link>
            </p>
          </div> */}
        </form>
      </div>
    </section>
  );
}

export default AddEditTour;

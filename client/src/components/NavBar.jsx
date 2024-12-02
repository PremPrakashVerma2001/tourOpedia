import { useDispatch, useSelector } from "react-redux";
import tourImg from "../img/tourImg.png";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { setLogout } from "../redux/features/authSlice";
import { useContext, useState } from "react";
import { searchAction } from "../redux/features/tourSlice";
import ThemeContext from "../contexts/ThemeContext";
import { CiLight } from "react-icons/ci";
import { LiaUserSecretSolid } from "react-icons/lia";

import { MdDarkMode } from "react-icons/md";

import { useNavigate } from "react-router-dom";
function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);
  const { user, loading } = authState;

  const { theme, setTheme } = useContext(ThemeContext);

  const [searchInput, setSearchInput] = useState("");

  function handleLogout() {
    dispatch(setLogout());
    toast.success("Logout SuccessFully!");
    navigate("/login");
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(searchInput);

    if (searchInput) {
      dispatch(searchAction({ searchInput, navigate, toast }));
      navigate(`/search?title=${searchInput}`);
      setSearchInput("");
    }
  }

  return (
    <nav
      className={`flex flex-wrap justify-between items-center {h-[13vh]} w-full border-b-[2px] font-extrabold ${
        theme === true
          ? "bg-[#FBFCF8] border-b-gray-700"
          : "bg-[#23272f] border-b-white/40"
      } p-1 `}
    >
      <div className=" flex h-full justify-start items-center ">
        <img
          className="w-[70px] h-[70px] rounded-[50%]"
          src={tourImg}
          alt="tourpedia"
        />
        <h1 className={`text-[2vw] p-[1vw] ${!theme && "text-white"}`}>
          TourO<span className="text-blue-500">pedia</span>
        </h1>
      </div>

      <div className=" flex flex-wrap item-center justify-between relative">
        <form className="flex items-center w-full" onSubmit={handleSubmit}>
          <input
            type="text"
            name="searchInput"
            id="searchInput"
            placeholder="Search By keywords..."
            minLength={1}
            maxLength={20}
            value={searchInput}
            autoComplete="off"
            //   required
            className={
              "w-[100%] text-black p-2 {bg-transparent border-b-2} border-b-black/50  outline-none border-b-2 focus:border-b-blue-500 bg-slate-500/20 rounded-md " +
              `${!theme && " text-white"}`
            }
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button
            type="submit"
            className="text-2xl cursor-pointer absolute right-0 "
          >
            🔍
          </button>
        </form>
      </div>
      {/* <form
        className="space-y-4 text-[1.5vmax] px-[2vw]"
        // onSubmit={handleSubmit}
      >
        <div className="space-y-1">
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="xyz@gmail.com"
            minLength={5}
            maxLength={20}
            value={form.email}
            autoComplete="off"
            required
            className="w-full text-black p-2 bg-transparent border-b-2 border-b-black/50  focus:outline-none focus:border-b-2 focus:border-b-cyan-400/50 focus:bg-slate-500/20 focus:rounded-md"
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
          />
        </div>
      </form> */}
      <div className="MenuContainer ">
        <ul
          className={
            "Menu flex flex-wrap text-[1.4vw] justify-center items-center gap-4 p-[.5vw] " +
            `${!theme && " text-white"}`
          }
        >
          <div
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setTheme(!theme);
            }}
          >
            {theme === true ? (
              <li className=" text-[3vmax]  ">
                {" "}
                <MdDarkMode />
              </li>
            ) : (
              <li className=" text-[3vmax]  text-white">
                {" "}
                <CiLight />
              </li>
            )}
          </div>
          <Link to="/">
            <li className="basis-1/12 ">Home</li>
          </Link>
          {user && (
            <>
              <Link to="/addtour">
                <li className="basis-1/12 ">AddTour</li>
              </Link>
              <Link to="/dashboard">
                <li className="basis-1/12 ">DashBoard</li>
              </Link>
              <Link to="/about">About</Link>
            </>
          )}
          {user != null ? (
            <div>
              <Link to="">
                <li
                  className="basis-1/12 text-[4vmax] rounded-[50%] hover: bg-gradient-to-br p-1 hover:from-slate-600 hover:to-slate-900 hover:text-white/80"
                  onClick={handleLogout}
                >
                  <LiaUserSecretSolid />
                </li>
              </Link>
            </div>
          ) : (
            <Link to="/login">
              <li
                className={
                  "basis-1/12 p-2 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-cyan-500 hover:to-teal-500  hover:text-white/80 rounded-md " +
                  `${!theme && "hover:text-black/80"}`
                }
              >
                Login
              </li>
            </Link>
          )}
          {/* {user && <li>{user?.user?.toUpperCase()}</li>} */}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

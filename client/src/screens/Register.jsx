import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { signupAction } from "../redux/features/authSlice";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { PiUserPlus } from "react-icons/pi";

import signUpImg from "../img/sign-up.gif";
import ThemeContext from "../contexts/ThemeContext";
export const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
  });

  function handleChange(e) {
    // console.log(form);
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    // alert(JSON.stringify(form));

    if (form.email && form.username && form.password) {
      dispatch(signupAction({ form, navigate, toast }));
    }
  }
  return (
    <div
      className={
        "w-full h-[100vh] flex flex-wrap justify-center items-center {border-[2px] border-gray-600} " +
        `${theme === true ? "bg-[#FBFCF8]" : " bg-[#23272f] text-white "}`
      }
    >
      <div className=" text-[1.5vmax] px-[2vw] w-1/2  shadow-sm rounded-2xl shadow-teal-500/50 ">
        <img
          src={signUpImg}
          alt="loginIcon"
          className="w-[100px] h-[100px] mx-auto rounded-[50%] mt-2"
        />
        <form className="space-y-4 " onSubmit={handleSubmit}>
          <div className="">
            {/* <label htmlFor="email">Email</label> */}
            <div className="flex flex-wrap items-center gap-2 text-[1.8vmax]">
              <MdEmail /> <label htmlFor="email">Email</label>
            </div>
            {/* <br /> */}
            <input
              type="email"
              name="email"
              id="email"
              // value=""
              onChange={handleChange}
              placeholder="xyz@gmail.com"
              required
              minLength={5}
              maxLength={20}
              autoComplete="off"
              className="w-full text-black p-2 bg-transparent border-b-2 border-b-black/50  focus:outline-none focus:border-b-2 focus:border-b-emerald-400 focus:bg-slate-500/20 focus:rounded-md "
            />
          </div>
          <div className="">
            <div className="flex flex-wrap items-center gap-2 text-[1.8vmax]">
              <FaUser />
              <label htmlFor="username">UserName</label>
            </div>
            {/* <br /> */}
            <input
              type="text"
              name="username"
              id="username"
              // value=""
              onChange={handleChange}
              placeholder="Naruto Uzumaki"
              required
              minLength={1}
              maxLength={20}
              autoComplete="off"
              className="w-full text-black p-2 bg-transparent border-b-2 border-b-black/50  focus:outline-none focus:border-b-2 focus:border-b-emerald-400 focus:bg-slate-500/20 focus:rounded-md"
            />
          </div>
          <div className="">
            {/* <label htmlFor="password">Password</label> */}
            <div className="flex flex-wrap items-center gap-2 text-[1.8vmax]">
              <RiLockPasswordFill />
              <label htmlFor="password">Password</label>
            </div>
            {/* <br /> */}
            <input
              type="password"
              name="password"
              id="password"
              // value=""
              onChange={handleChange}
              placeholder="*****"
              required
              minLength={1}
              maxLength={20}
              className="w-full text-black p-2 bg-transparent border-b-2 border-b-black/50  focus:outline-none focus:border-b-2 focus:border-b-emerald-400 focus:bg-slate-500/20 focus:rounded-md "
            />
          </div>
          {/* <div className="">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <br />
            <input
              type="text"
              name="confirmPassword"
              id="confirmPassword"
              // value=""
              onChange={handleChange}
              placeholder="*****"
              required
              minLength={5}
              maxLength={20}
              className="w-full text-black p-2 bg-transparent border-b-2 border-b-black/50  focus:outline-none focus:border-b-2 focus:border-b-emerald-400 "
            />
          </div> */}
          <div className="text-center space-y-2">
            <button
              className="rounded-lg w-[100px] h-[40px] mx-auto text-xl flex flex-wrap items-center justify-center gap-2 {px-3 py-2} bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-cyan-500 hover:to-teal-500 hover:text-white"
              type="submit"
            >
              <PiUserPlus />
              Signup
            </button>
          </div>
          <hr className="h-[3px] bg-gradient-to-r from-[#9ad0f1] to-[#c2dae8] shadow-inner rounded-md max-w-full" />
          <div className="text-base text-center">
            <p>
              Already have an Account ?{" "}
              <Link
                className="text-teal-400 font-semibold hover:text-teal-600 text-xl"
                to="/login"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

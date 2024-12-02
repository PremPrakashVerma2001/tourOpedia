import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import toast from "react-hot-toast";
import { loginAction } from "../redux/features/authSlice.jsx";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { IoLogInOutline } from "react-icons/io5";
import loginImg from "../img/login.gif";
import ThemeContext from "../contexts/ThemeContext.jsx";

export const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { theme } = useContext(ThemeContext);

  //   console.log(form.email, form.password);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    // console.log(form.email, form.password);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = form;
    // check if email and password then go ahead:
    if (email && password) {
      //dispatch the loginAction
      dispatch(loginAction({ form, navigate, toast }));
      //   console.log();
    }
  }
  return (
    <div
      id="#login"
      className={
        "w-full h-[100vh] {border-[10px] border-green-400} flex flex-wrap items-center justify-center " +
        `${theme === true ? "bg-[#FBFCF8]" : " bg-[#23272f] text-white "}`
      }
    >
      <div
        className={
          "w-1/2 shadow-sm rounded-lg shadow-cyan-500/50 " +
          `${!theme && "shadow-teal-500"}`
        }
      >
        <img
          src={loginImg}
          alt="loginIcon"
          className="w-[100px] h-[100px] mx-auto rounded-[50%] mt-2"
        />
        <form
          className="space-y-4 text-[1.5vmax] px-[2vw]"
          onSubmit={handleSubmit}
        >
          <div className="">
            <div className="flex flex-wrap items-center gap-2 text-[1.8vmax]">
              <MdEmail /> <label htmlFor="email">Email</label>
            </div>
            {/* <br /> */}
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
              onChange={handleChange}
            />
          </div>
          <div className="">
            <div className="flex flex-wrap items-center gap-2 text-[1.8vmax]">
              <RiLockPasswordFill />
              <label htmlFor="password">Password</label>
            </div>
            {/* <br /> */}
            <input
              type="password"
              name="password"
              id="password"
              placeholder="*****"
              minLength={1}
              maxLength={20}
              value={form.password}
              required
              className="w-full text-black p-2 bg-transparent border-b-2 border-b-black/50  focus:outline-none focus:border-b-2 focus:border-b-cyan-400/50 focus:bg-slate-500/20 focus:rounded-md "
              onChange={handleChange}
            />
          </div>
          <div className="text-center space-y-2">
            <button
              className="rounded-lg w-[100px] h-[40px] mx-auto text-xl flex flex-wrap items-center justify-center gap-2 {px-3 py-2} bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-cyan-500 hover:to-teal-500 hover:text-white"
              type="submit"
            >
              <IoLogInOutline />
              Login
            </button>
            {/* <p className="text-black/60">Forgot Password ?</p> */}
          </div>
          <hr className="h-[3px] bg-gradient-to-r from-[#9ad0f1] to-[#c2dae8] shadow-inner rounded-md max-w-full" />
          <div className="text-base text-center">
            <p>
              Don't have an Account ?{" "}
              <Link
                className="text-cyan-500/50 font-semibold hover:text-cyan-600 text-lg"
                to="/signup"
              >
                SignUp
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

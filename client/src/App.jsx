import { Home } from "./screens/Home.jsx";
import { Login } from "./screens/Login";
import { Register } from "./screens/Register";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import Navbar from "./components/NavBar";
import { useContext, useEffect } from "react";
import { setLogin } from "./redux/features/authSlice";
import AddEditTour from "./screens/AddEditTour";
// import { getTourAction } from "./redux/features/tourSlice.jsx";
// import toast from "react-hot-toast";
import SingleTour from "./screens/SingleTour.jsx";
import DashBoard from "./screens/Dashboard.jsx";
import SearchTours from "./screens/SearchTours.jsx";
import TagTours from "./screens/TagTours.jsx";
import ThemeContext, { useTheme } from "./contexts/ThemeContext.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  // const toastStyle = []
  const user = JSON.parse(localStorage.getItem("profile"));

  const theme = useContext(ThemeContext);

  const dispatch = useDispatch();
  // const navigate = useNavigate();
  useEffect(() => {
    dispatch(setLogin(user));
    // dispatch(getTourAction(toast));
  }, []);
  return (
    <ThemeContext.Provider value={useTheme()}>
      <div id="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchTours />} />
          <Route path="/tag/:tagV" element={<TagTours />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/addtour" element={<AddEditTour />} />
          <Route path="/tour/:id" element={<SingleTour />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/editour/:id" element={<AddEditTour />} />
        </Routes>
        <Footer />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition:Bounce
        />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;

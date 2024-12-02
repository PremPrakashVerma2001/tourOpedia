import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { Provider } from "react-redux"; //to provide store from root to children:
import store from "./redux/store.jsx";
import { Toaster } from "react-hot-toast";
import ThemeContext from "./contexts/ThemeContext.jsx";
import { useTheme } from "./contexts/ThemeContext.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      {/* <ThemeContext.Provider value={useTheme()}> */}
      {/* <ToastContainer /> */}
      <App />
      <Toaster
        toastOptions={{
          className: "",
          success: {
            style: {
              border: "1px solid white",
              padding: "5px",
              color: "green",
              borderRadius: "30px",
            },
            position: "top-center",
            icon: "✅",
          },
          error: {
            style: {
              border: "1px solid white",
              padding: "5px",
              color: "red",
              borderRadius: "30px",
            },
            position: "top-center",
            icon: "❌",
          },
        }}
      />
      {/* </ThemeContext.Provider> */}
    </Provider>
  </BrowserRouter>
  // </StrictMode>
);

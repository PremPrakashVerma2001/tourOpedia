import { configureStore } from "@reduxjs/toolkit";

//first is auth-reducer:
import AuthReducer from "./features/authSlice.jsx";

//tour reducer for tour state:
import TourReducer from "./features/tourSlice.jsx";

export default configureStore({
  reducer: {
    auth: AuthReducer,
    tour: TourReducer,
  },
});

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api.jsx";

export const addTourAction = createAsyncThunk(
  "tour/add",
  async ({ updatedTourData, navigate, toast }) => {
    // console.log(token);
    try {
      const data = await api.addTour(updatedTourData);
      const { message, success } = data;

      // console.log(data);

      if (success == "true") {
        toast.success(message);
        // navigate("/");
        return data;
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.log(error);

      toast.error("Something went Wrong!🤧");
    }
  }
);

export const getTourAction = createAsyncThunk(
  "tour/getTours",
  async ({ toast, pageNo }) => {
    // console.log("getTourAction triggred!");
    try {
      const data = await api.getTour(pageNo);
      const { message, success } = data;

      // console.log(data);

      if (success == "true") {
        // toast.success("Fetched all The Tour to home SuccessFully!");
        // navigate("/");
        return data;
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.log(error);

      toast.error("Something went Wrong!🤧");
    }
  }
);

export const getTourByIdAction = createAsyncThunk(
  "tour/getTourById",
  async ({ id, toast }) => {
    // console.log("getTourAction triggred!");
    try {
      const data = await api.getTourById(id);
      const { message, success } = data;

      // console.log(data);

      if (success == "true") {
        // toast.success("Fetched all The Tour to home SuccessFully!");
        // navigate("/");
        return data;
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.log(error);

      toast.error("Something went Wrong!🤧");
    }
  }
);

export const getTourByUserIdAction = createAsyncThunk(
  "tour/getTourByUserId",
  async (toast) => {
    // console.log("getTourAction triggred!");
    try {
      const data = await api.getTourByUserId();
      const { message, success } = data;

      // console.log(data);

      if (success == "true") {
        // toast.success("Fetched all The Tour to home SuccessFully!");
        // navigate("/");
        return data;
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.log(error);

      toast.error("Something went Wrong!🤧");
    }
  }
);

export const deleteTourByIdAction = createAsyncThunk(
  "tour/deleteTourById",
  async ({ id, toast }) => {
    // console.log("getTourAction triggred!");
    try {
      const data = await api.deleteTourById(id);
      const { message, success } = data;

      // console.log(data);

      if (success == "true") {
        toast.success(message);
        // navigate("/");
        return data;
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.log(error);

      toast.error("Something went Wrong!🤧");
    }
  }
);

export const updateTourAction = createAsyncThunk(
  "tour/updateTour",
  async ({ id, updatedTourData, navigate, toast }) => {
    try {
      const data = await api.updateTour(id, updatedTourData);
      const { message, success } = data;

      if (success === "true") {
        toast.success(message);
        navigate("/dashboard");
        return data;
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong!🤧");
    }
  }
);

export const searchAction = createAsyncThunk(
  "tour/searchTour",
  async ({ searchInput, navigate, toast }) => {
    try {
      const data = await api.getTourBySearch(searchInput);
      const { message, success } = data;

      if (success === "true") {
        toast.success(message);
        // navigate("/search");
        return data;
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong!🤧");
    }
  }
);

export const tagAction = createAsyncThunk(
  "tour/tagTour",
  async ({ tagV, navigate, toast }) => {
    try {
      const data = await api.getTourByTag(tagV);
      const { message, success } = data;

      if (success === "true") {
        toast.success(message);
        // navigate("/search");
        return data;
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong!🤧");
    }
  }
);

export const relatedTourAction = createAsyncThunk(
  "tour/relatedTour",
  async ({ tags, toast }) => {
    try {
      const data = await api.getRelatedTour(tags);
      const { message, success } = data;

      if (success === "true") {
        // toast.success(message);
        // navigate("/search");
        return data;
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong related Action!🤧");
    }
  }
);

export const likeAction = createAsyncThunk(
  "tour/likeTour",
  async ({ likeCount, id, toast }) => {
    try {
      const data = await api.updateLike(likeCount, id);
      const { message, success } = data;

      if (success === "true") {
        toast.success(message);
        // navigate("/");
        return data;
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong Like Action!🤧");
    }
  }
);

const tourSlice = createSlice({
  name: "tour",
  initialState: {
    tour: {}, // for single tour by Id.
    tours: [], //all tours in  db
    userTours: [], //created by individual user:
    searchTours: [], //searched tours
    tagTours: [],
    relatedTours: [],
    error: "",
    loading: false,
  },

  //   reducers: {},
  extraReducers: (builder) => {
    //addTourAction types:
    builder.addCase(addTourAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addTourAction.fulfilled, (state, action) => {
      state.loading = false;
      state.tours = [action.payload];
    });
    builder.addCase(addTourAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message;
    });
    //getTourAction types:
    builder.addCase(getTourAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getTourAction.fulfilled, (state, action) => {
      state.loading = false;
      state.tours = action.payload; //not single but multiple arrays will be returned.
      // console.log(action);
    });
    builder.addCase(getTourAction.rejected, (state, action) => {
      state.loading = false;
      // console.log("action: ", action.payload);
      state.error = action.payload?.message;
    });

    //getTourByIdAction types:
    builder.addCase(getTourByIdAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getTourByIdAction.fulfilled, (state, action) => {
      state.loading = false;
      state.tour = action.payload; // single tour based on Id.
      // console.log(action);
    });
    builder.addCase(getTourByIdAction.rejected, (state, action) => {
      state.loading = false;
      // console.log("action: ", action.payload);
      state.error = action.payload?.message;
    });

    //getTourByUserIdAction types:
    builder.addCase(getTourByUserIdAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getTourByUserIdAction.fulfilled, (state, action) => {
      state.loading = false;
      state.userTours = action.payload; //  tours based on UserId.
      // console.log(action);
    });
    builder.addCase(getTourByUserIdAction.rejected, (state, action) => {
      state.loading = false;
      // console.log("action: ", action.payload);
      state.error = action.payload?.message;
    });

    //deleteTourByIdAction types:
    builder.addCase(deleteTourByIdAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteTourByIdAction.fulfilled, (state, action) => {
      state.loading = false;
      // console.log("action : ", action);
      // state.tour = action.payload; // single tour based on Id.

      if (action.meta.arg?.id) {
        // console.log(action.meta["arg"].id);

        const remainingUserTours = state.userTours["tours"]?.filter(
          (item, index) => {
            return item._id !== action.meta["arg"].id;
          }
        );

        console.log(remainingUserTours);

        const remainingAllTours = state.tours["tours"]?.filter(
          (item, index) => {
            return item._id !== action.meta["arg"].id;
          }
        );

        state.userTours = { ...state.userTours, tours: remainingUserTours };
        state.tours = { ...state.tours, tours: remainingAllTours };
      }
      // console.log(action);
    });
    builder.addCase(deleteTourByIdAction.rejected, (state, action) => {
      state.loading = false;
      // console.log("action: ", action.payload);
      state.error = action.payload?.message;
    });

    //updateTourAction States:
    builder.addCase(updateTourAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateTourAction.fulfilled, (state, action) => {
      state.loading = false;
      // console.log("action : ", action);
      // state.tour = action.payload; // single tour based on Id.

      if (action.meta.arg?.id) {
        //update the userTours state:
        // console.log(action.meta["arg"].id);

        const remainingUserTours = state.userTours["tours"].filter(
          (item, index) => {
            //replace only document who had been updated.
            return item._id === action.meta["arg"].id ? action.payload : item;
          }
        );

        const remainingAllTours = state.tours["tours"].filter((item, index) => {
          return item._id === action.meta["arg"].id
            ? action.payload?.tour
            : item;
        });

        state.userTours = { ...state.userTours, tours: remainingUserTours };
        state.tours = { ...state.tours, tours: remainingAllTours };
      }
      // console.log(action);
    });
    builder.addCase(updateTourAction.rejected, (state, action) => {
      state.loading = false;
      // console.log("action: ", action.payload);
      state.error = action.payload?.message;
    });

    //searchAction Types:
    builder.addCase(searchAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(searchAction.fulfilled, (state, action) => {
      state.loading = false;
      state.searchTours = action.payload; //  tours based on searchKeywords.
      // console.log(action);
    });
    builder.addCase(searchAction.rejected, (state, action) => {
      state.loading = false;
      // console.log("action: ", action.payload);
      state.error = action.payload?.message;
    });
    //tagAction Types:
    builder.addCase(tagAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(tagAction.fulfilled, (state, action) => {
      state.loading = false;
      state.tagTours = action.payload; //  tours based on UserId.
      // console.log(action);
    });
    builder.addCase(tagAction.rejected, (state, action) => {
      state.loading = false;
      // console.log("action: ", action.payload);
      state.error = action.payload?.message;
    });

    //relatedTourAction Types:
    builder.addCase(relatedTourAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(relatedTourAction.fulfilled, (state, action) => {
      state.loading = false;
      state.relatedTours = action.payload; //  tours based on UserId.
      // console.log(action);
    });
    builder.addCase(relatedTourAction.rejected, (state, action) => {
      state.loading = false;
      // console.log("action: ", action.payload);
      state.error = action.payload?.message;
    });

    //LikeTourAction States:
    builder.addCase(likeAction.pending, (state, action) => {
      // state.loading = true;
    });
    builder.addCase(likeAction.fulfilled, (state, action) => {
      state.loading = false;
      // console.log("action : ", action);
      // state.tour = action.payload; // single tour based on Id.

      if (action.meta.arg?.id) {
        // console.log(action.meta["arg"].id);

        // const remainingUserTours = state.userTours["tours"].filter(
        //   (item, index) => {
        //     return item._id === action.meta["arg"].id
        //       ? action.payload?.tour
        //       : item;
        //   }
        // );

        //.map() will work here not the .filter().
        const array = state.tours?.tours.map((item, index) => {
          return item._id === action.meta["arg"].id
            ? action.payload?.tour
            : item;
        });
        // const array = state.tours["tours"];

        // for (let i = 0; i < array.length; i++) {
        //   if (array[i]._id === action.meta?.arg.id) {
        //     array[i] = action.payload?.tour;
        //   }
        // }

        // state.userTours = { ...state.userTours, tours: remainingUserTours };
        state.tours = { ...state.tours, tours: array };
      }
      // console.log(action.payload?.tour);
    });
    builder.addCase(likeAction.rejected, (state, action) => {
      // state.loading = false;
      // console.log("action: ", action.payload);
      state.error = action.payload?.message;
    });
  },
});

export default tourSlice.reducer;

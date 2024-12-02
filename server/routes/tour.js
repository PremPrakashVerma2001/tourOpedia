import express from "express";
import {
  createNewTour,
  getAllTour,
  delTour,
  updateTour,
  getTourById,
  getTourByUserId,
  getTourBySearch,
  getTourByTag,
  getRelatedTours,
  updateLike,
} from "../controllers/tour.js";

import addUserId from "../middlewares/addUserId.js";

const router = express.Router();

// router.use((req, res, next) => {
//   console.log(req.headers);
//   next();
// });

router.get("/", getAllTour);
router.get("/search", getTourBySearch);
router.get("/user", addUserId, getTourByUserId);
router.get("/tag/:tagV", getTourByTag);
router.get("/:id", getTourById);

router.post("/add", addUserId, createNewTour);
router.post("/related", getRelatedTours);

router.delete("/:id", delTour);

router.patch("/like", updateLike);
router.patch("/:id", addUserId, updateTour);

export default router;

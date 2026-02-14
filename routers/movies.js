import express from "express";
import movieController from "../controllers/movieController.js";
import validateData from "../middlewares/validateData.js";
import formatData from "../middlewares/formatData.js";

const router = express.Router();

// INDEX
router.get("/", movieController.index);

// SHOW
router.get("/:slug", movieController.show);

// STORE (movie)
router.post(
  "/",
  validateData.movieData,
  formatData.movieData,
  movieController.store,
);

// STORE (review)
router.post(
  "/:id/reviews",
  validateData.reviewData,
  formatData.reviewData,
  movieController.storeReview,
);

export default router;

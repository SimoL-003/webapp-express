import express from "express";
import movieController from "../controllers/movieController.js";
import validateData from "../middlewares/validateData.js";

const router = express.Router();

// INDEX
router.get("/", movieController.index);

// SHOW
router.get("/:slug", movieController.show);

// STORE (movie)
router.post("/", movieController.store);

// STORE (review)
router.post("/:id/reviews", validateData, movieController.storeReview);

export default router;

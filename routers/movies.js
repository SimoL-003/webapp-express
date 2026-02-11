import express from "express";
import movieController from "../controllers/movieController.js";

const router = express.Router();

// INDEX
router.get("/", movieController.index);

// SHOW
router.get("/:slug", movieController.show);

// STORE (REVIEW)
router.post("/:id/reviews", movieController.storeReview);

export default router;

import { Router } from "express";
import { getReview, postReview } from "../controllers/review";

const router = Router();

router.post("/review", postReview);
router.get("/review/:id", getReview);

export default router;

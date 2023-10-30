import express  from "express";
import { createListing } from "../controllers/car-listing-controller.js";
import { verifyToken } from "../utils/verify.js";

const router = express.Router();

router.post('/create', verifyToken, createListing);

export default router;
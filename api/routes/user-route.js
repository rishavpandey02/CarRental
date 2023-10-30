import express from "express";
import { test, getUserListings } from '../controllers/user-controller.js'
import { verifyToken } from "../utils/verify.js";


const router = express.Router();

router.get('/test', test);
router.get('/listings/:id', verifyToken, getUserListings)


export default router;
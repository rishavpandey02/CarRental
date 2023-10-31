import express from "express";
import {getUserListings, getUser } from '../controllers/user-controller.js'
import { verifyToken } from "../utils/verify.js";


const router = express.Router();

router.get('/listings/:id', verifyToken, getUserListings)
router.get('/:id', verifyToken, getUser)


export default router;
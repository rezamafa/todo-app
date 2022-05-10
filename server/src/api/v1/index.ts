import express from "express";
import userRoutes from "./user/routes/userRoutes";
import authRoutes from "./auth/routes/authRoutes";

//  Initializing all different routes in api.
let router = express.Router();
console.log("Routers initializing now ...");

router.use('/v1/user', userRoutes);
router.use('/v1/auth', authRoutes);

export = router;
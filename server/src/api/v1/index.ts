import express from "express";
import authRoutes from "./auth/authRoutes";
import userRoutes from "./user/userRoutes";
import todoRoutes from "./todo/todoRoutes";


//  Initializing all different routes in api.
let router = express.Router();
console.log("Routers initializing now ...");

router.use('/v1/auth', authRoutes);
router.use('/v1/user', userRoutes);
router.use('/v1/todo', todoRoutes);

export = router;
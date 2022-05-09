import express from "express";
import userRoutes from "./user/routes/userRoutes";

//  Initializing all different routes in api.
let router = express.Router();
console.log("Routers initializing now ...");

router.use('/v1/user', userRoutes);

export = router;
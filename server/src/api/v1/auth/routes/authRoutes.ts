import express from "express";
import authController from "../controller/authController";

let authRoutes = express.Router();
let AuthController = new authController();

authRoutes.get('/login', AuthController.login());
authRoutes.post('/signup', AuthController.signup());

export = authRoutes;
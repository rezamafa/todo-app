import express from "express";
import userController from "../controller/userController";

let userRoutes = express.Router();
let UserController = new userController();

userRoutes.get('/login', UserController.login());
userRoutes.post('/signup', UserController.signup());
userRoutes.get('/allUsersList', UserController.getAllUsersList());

export = userRoutes;
import express from "express";
import userController from "../controller/userController";

let userRoutes = express.Router();
let UserController = new userController();

userRoutes.get('/', UserController.getUser());
userRoutes.put('/', UserController.createUser());
userRoutes.post('/', UserController.updateUser());
userRoutes.delete('/', UserController.deleteUser());
userRoutes.get('/all', UserController.getAllUsersList());

export = userRoutes;
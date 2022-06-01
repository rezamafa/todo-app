import express from "express";
import AuthController from "./authController";

let routes = express.Router();
let controller = new AuthController();

routes.post('/login', controller.login());
routes.post('/signup', controller.signup());

export default routes;
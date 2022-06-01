import express from "express";
import Controller from "./userController";

let routes = express.Router();
let controller = new Controller();

routes.get('/', controller.get());
routes.put('/', controller.create());
routes.post('/', controller.update());
routes.delete('/', controller.delete());
routes.get('/all', controller.getAll());

export default routes;
import express from "express";
import TodoController from "./todoController";

let routes = express.Router();
let controller = new TodoController();

routes.get('/', controller.get());
routes.put('/', controller.create());
routes.post('/', controller.update());
routes.delete('/', controller.delete());
routes.get('/all', controller.getAll());

export default routes;
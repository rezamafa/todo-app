import express from "express";
import TodoController from "./todoController";

let routes = express.Router();
let controller = new TodoController();

routes.get('/:id', controller.get());
routes.post('/', controller.create());
routes.put('/', controller.update());
routes.delete('/:id', controller.delete());

export default routes;
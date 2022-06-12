import express from "express";
import Repository from "./todoReposirory";
import { apiResponse } from "../../models/expressModels";
import { User } from "../../models/user";
import { TodoList, TodoItem } from "../../models/todoList";
import ExpressHelper from "../../middlewares/expressRespondHelper";
import AuthorizationUtils from "../../middlewares/authorizationUtils";
import { ObjectId } from "mongodb";

export default class TodoListController {
  private rep = new Repository();

  public get(): express.RequestHandler {
    return async (req: express.Request, res: express.Response) => {
      if (!req || !req.params || !req.params.id) return ExpressHelper.send(res, 400, false, null, ["Request Denied."]);

      if (!req.headers || !req.headers.auth) return ExpressHelper.send(res, 400, false, null, ["Request Denied."]);
      let user: User = (await AuthorizationUtils.jwtDecode( req.headers.auth as string )) as User;
      if (!user || !user._id) return ExpressHelper.send(res, 403, false, null, ["Access Denied."]);

      let result = (req.params.id == "all") ?  await this.rep.get({ user: new ObjectId(user._id) }) : 
        await this.rep.get({_id: new ObjectId(req.params.id), user: new ObjectId(user._id) });
      if (!result) return ExpressHelper.send(res, 400, false, null, ["TodoList not found."]);
      
      return ExpressHelper.send(res, 200, true, result);
    };
  }

  public create(): express.RequestHandler {
    return async (req: express.Request, res: express.Response) => {
      if (!req.body || !req.body.title) return ExpressHelper.send(res, 400, false, null, ["Request Denied."]);
      let todoList: TodoList = req.body as TodoList;

      if (!req.headers || !req.headers.auth) return ExpressHelper.send(res, 400, false, null, ["Request Denied."]);
      let user: User = (await AuthorizationUtils.jwtDecode( req.headers.auth as string )) as User;
      if (!user || !user._id) return ExpressHelper.send(res, 403, false, null, ["Access Denied."]);
      todoList.user = new ObjectId(user._id);
      todoList.createdOn = new Date();

      let result = await this.rep.create(todoList);
      if (!result || !result.acknowledged || !result.insertedId)
        return ExpressHelper.send(res, 500, false, null, ["Request Failed."]);

      return ExpressHelper.send(res, 200, true, result);
    };
  }

  public update(): express.RequestHandler {
    return async (req: express.Request, res: express.Response) => {
      if (!req.body || !req.body._id || !req.body.title || !req.body.todoItems || !req.body.user )
        return ExpressHelper.send(res, 400, false, null, ["Request Denied."]);

      if (!req.headers || !req.headers.auth) return ExpressHelper.send(res, 400, false, null, ["Request Denied."]);
      let user: User = (await AuthorizationUtils.jwtDecode( req.headers.auth as string )) as User;
      if (!user || !user._id)  return ExpressHelper.send(res, 403, false, null, ["Access Denied."]);
      if (user._id != req.body.user)  return ExpressHelper.send(res, 403, false, null, ["Access Denied."]);

      let todoList: TodoList = {title: req.body.title, todoItems: req.body.todoItems, modifiedOn: new Date()};
      let updateFilter: TodoList = {_id: new ObjectId(req.body._id), user: new ObjectId(user._id)};

      let result = await this.rep.update(updateFilter, todoList);
      if (!result || !result.acknowledged || result.modifiedCount < 1)
        return ExpressHelper.send(res, 500, false, null, ["Request Failed."]);

      return ExpressHelper.send(res, 200, true, result);
    };
  }

  public delete(): express.RequestHandler {
    return async (req: express.Request, res: express.Response) => {
      if (!req || !req.params || !req.params.id) return ExpressHelper.send(res, 400, false, null, ["Request Denied."]);

      if (!req.headers || !req.headers.auth) return ExpressHelper.send(res, 400, false, null, ["Request Denied."]);
      let user: User = (await AuthorizationUtils.jwtDecode( req.headers.auth as string )) as User;
      if (!user || !user._id) return ExpressHelper.send(res, 403, false, null, ["Access Denied."]);

      let result = await this.rep.delete({ _id: new ObjectId(req.params.id), user: new ObjectId(user._id) });
      if (!result || !result.acknowledged || result.deletedCount < 1) 
        return ExpressHelper.send(res, 500, false, null, ["Request Failed."]);

      return ExpressHelper.send(res, 200, true, result);
    };
  }
}

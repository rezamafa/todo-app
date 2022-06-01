import express from "express";
import Repository from './todoReposirory';
import {apiResponse} from '../../models/expressModels'
import {User} from '../../models/user';
import { TodoList, TodoItem } from "../../models/todoList";

export default class TodoListController {
    
    private rep = new Repository;

    public get() : express.RequestHandler {
        return async (req: express.Request, res: express.Response) => {
            if (!req.body || !req.body._id) return res.status(400).json(<apiResponse>{ Success: false, Errors: ['Request Denied.'] });

            let todoList : TodoList = req.body as TodoList ;

            let result = await this.rep.get(todoList);
            if (!result) return res.status(404).json(<apiResponse>{ Success: false, Errors: ['TodoList not found.'] });

            return res.status(200).json(<apiResponse>{ Success: true, Data: result });
        } 
    }

    public create() : express.RequestHandler {
        return async (req: express.Request, res: express.Response) => {
            if (!req.body || !req.body._id) return res.status(400).json(<apiResponse>{ Success: false, Errors: ['Request Denied.'] });

            let todoList : TodoList = req.body as TodoList ;

            let result = await this.rep.create(todoList);
            if (!result) return res.status(500).json(<apiResponse>{ Success: false, Errors: ['TodoList failed.'] });

            return res.status(200).json(<apiResponse>{ Success: true, Data: result });
        } 
    }

    public update() : express.RequestHandler {
        return async (req: express.Request, res: express.Response) => {
            if (!req.body || !req.body.todoList || !req.body.todoListUpdate) {
                return res.status(400).json(<apiResponse>{ Success: false, Errors: ['Request Denied.'] });
            }

            let todoList : TodoList = req.body.todoList as TodoList ;
            let todoListUpdate: TodoList = req.body.todoListUpdate as TodoList

            let result = await this.rep.update(todoList,todoListUpdate)
            if (!result) return res.status(500).json(<apiResponse>{ Success: false, Errors: ['Update failed.'] });

            return res.status(200).json(<apiResponse>{ Success: true, Data: result });
        } 
    }

    public delete() : express.RequestHandler {
        return async (req: express.Request, res: express.Response) => {
            if (!req.body || !req.body._id) return res.status(400).json(<apiResponse>{ Success: false, Errors: ['Request Denied.'] });

            let todoList : TodoList = req.body as TodoList ;

            let result = await this.rep.delete(todoList);
            if (!result) return res.status(500).json(<apiResponse>{ Success: false, Errors: ['Request failed.'] });

            return res.status(200).json(<apiResponse>{ Success: true, Data: result });
        } 
    }

    public getAll() : express.RequestHandler {
        return async (req: express.Request, res: express.Response) => {
            if (!req.body || !req.body.user || !req.body.user._id) {
                return res.status(400).json(<apiResponse>{ Success: false, Errors: ['Request Denied.'] });
            }

            let todoListByUser : TodoList = req.body as TodoList ;

            let result = await this.rep.getAll(todoListByUser);
            if (!result) return res.status(500).json(<apiResponse>{ Success: false, Errors: ['Request failed.'] });

            return res.status(200).json(<apiResponse>{ Success: true, Data: result });
        } 
    }
}